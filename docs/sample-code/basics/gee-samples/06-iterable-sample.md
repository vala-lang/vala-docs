# Iterable Sample

You implement two pieces: [`Iterable<G>`](https://valadoc.org/gee-0.8/Gee.Iterable.html)
with `iterator ()` and an [`element_type`](https://valadoc.org/gee-0.8/Gee.Traversable.element_type.html)
property (from [`Traversable`](https://valadoc.org/gee-0.8/Gee.Traversable.html)), and a class that
implements [`Iterator<G>`](https://valadoc.org/gee-0.8/Gee.Iterator.html) for that iterable.

This follows the "Implementing your own Iterable" example from the archived
[Gee Samples](https://wiki.gnome.org/Projects/Vala/GeeSamples) wiki page, updated for
current libgee. Notable changes from the wiki version:

- `Iterator` now requires `valid` and `read_only` properties.
- The old `first ()` helper on `Iterator` is no longer part of the interface, so it is
  dropped here.
- Both interfaces inherit from `Gee.Traversable`, which has an abstract `foreach ()`
  method that you must implement. You also need to list `Traversable<G>` explicitly
  in the interface list of each class (the `[GenericAccessors]` prerequisite is not
  pulled in automatically by `Iterable` / `Iterator` in user-written code).
- `int` is used with a nullable type argument (`int?`) because libgee's interfaces
  use `[GenericAccessors]`. Passing a non-boxed primitive like plain `int` makes
  `valac` emit invalid C for the generated type/destroy/dup accessors.

`Range` walks integers in the half-open interval `[from, to)` (`from` inclusive,
`to` exclusive).

Both listings below are complete programs. The first is the minimal sample; the second
adds an optional Ruby- or Groovy-style `each ()` on `Range` (**highlighted** lines).

```vala
using Gee;

public class Range : Object, Traversable<int?>, Iterable<int?> {

    public int from { get; private set; }
    public int to { get; private set; }

    public Range (int from, int to) {
        assert (from < to);
        this.from = from;
        this.to = to;
    }

    public Type element_type {
        get { return typeof (int); }
    }

    public Iterator<int?> iterator () {
        return new RangeIterator (this);
    }

    public bool @foreach (Gee.ForallFunc<int?> f) {
        var it = iterator ();
        while (it.next ()) {
            if (!f (it.get ())) {
                return false;
            }
        }
        return true;
    }
}

public class RangeIterator : Object, Traversable<int?>, Iterator<int?> {

    private Range range;
    private int current;
    private bool _valid;

    public RangeIterator (Range range) {
        this.range = range;
        this.current = range.from - 1;
        this._valid = false;
    }

    public bool read_only {
        get { return true; }
    }

    public bool valid {
        get { return _valid; }
    }

    public bool has_next () {
        return this.current + 1 < this.range.to;
    }

    public bool next () {
        if (!has_next ()) {
            return false;
        }
        this.current++;
        this._valid = true;
        return true;
    }

    /* The `new` keyword hides `Object.get ()` so this becomes the Iterator element accessor. */
    public new int? get () {
        return this.current;
    }

    public void remove () {
        assert_not_reached ();
    }

    public bool @foreach (Gee.ForallFunc<int?> f) {
        if (_valid) {
            if (!f (get ())) {
                return false;
            }
        }
        while (next ()) {
            if (!f (get ())) {
                return false;
            }
        }
        return true;
    }
}

void main () {
    foreach (int? i in new Range (10, 20)) {
        stdout.printf ("%d\n", (!) i);
    }
}
```

## Optional: `each ()` helper

Same program with a delegate and `each ()` on `Range`, and `main` using that API.
**Highlighted** lines are everything added relative to the listing above (the helper and
a sample call).

```vala {32-38,98-102}
using Gee;

public class Range : Object, Traversable<int?>, Iterable<int?> {

    public int from { get; private set; }
    public int to { get; private set; }

    public Range (int from, int to) {
        assert (from < to);
        this.from = from;
        this.to = to;
    }

    public Type element_type {
        get { return typeof (int); }
    }

    public Iterator<int?> iterator () {
        return new RangeIterator (this);
    }

    public bool @foreach (Gee.ForallFunc<int?> f) {
        var it = iterator ();
        while (it.next ()) {
            if (!f (it.get ())) {
                return false;
            }
        }
        return true;
    }

    public delegate void RangeEachFunc (int i);

    public void each (RangeEachFunc each_func) {
        foreach (int? i in this) {
            each_func ((!) i);
        }
    }
}

public class RangeIterator : Object, Traversable<int?>, Iterator<int?> {

    private Range range;
    private int current;
    private bool _valid;

    public RangeIterator (Range range) {
        this.range = range;
        this.current = range.from - 1;
        this._valid = false;
    }

    public bool read_only {
        get { return true; }
    }

    public bool valid {
        get { return _valid; }
    }

    public bool has_next () {
        return this.current + 1 < this.range.to;
    }

    public bool next () {
        if (!has_next ()) {
            return false;
        }
        this.current++;
        this._valid = true;
        return true;
    }

    /* The `new` keyword hides `Object.get ()` so this becomes the Iterator element accessor. */
    public new int? get () {
        return this.current;
    }

    public void remove () {
        assert_not_reached ();
    }

    public bool @foreach (Gee.ForallFunc<int?> f) {
        if (_valid) {
            if (!f (get ())) {
                return false;
            }
        }
        while (next ()) {
            if (!f (get ())) {
                return false;
            }
        }
        return true;
    }
}

void main () {
    new Range (10, 20).each ((i) => {
        stdout.printf ("%d\n", i);
    });
}
```

## Compile and Run

```shell
valac --pkg gee-0.8 gee-iterable.vala
./gee-iterable
```

Either listing prints the integers `10` through `19` once.

See the [Collections](/tutorials/programming-language/main/04-00-advanced-features/04-04-collections)
chapter for how `foreach` uses iterators.

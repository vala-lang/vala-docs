# 3.2. Construction

Vala supports two construction schemes that both target the same GObject type system:
- Java/C#-style** constructors (named creation methods with bodies where you assign fields and call helpers)
- GObject-style construction (`Object (...)`, **construct properties**, and `construct { }` blocks).

They are equally central to writing GObject types; which you emphasize depends on the API you publish and how subclasses and bindings should interact with your type.

When to use which?:
- Prefer Java/C#-style constructors when you want familiar control flow, several ergonomic entry points via named constructors, and straightforward initialization in the constructor body. 
- Prefer GObject-style construction when you need construct-only properties, a single ordered initialization path that always runs (including for instances created via `Object.new` or language bindings), or alignment with GObject-based C libraries. 

Combining both is common in real code: named constructors provide a clear call surface and delegate configuration through `Object (property: value, ...)` while shared setup lives in `construct` blocks or construct properties.

## Java/C#-style constructors

Vala does not support constructor overloading for the same reasons that
method overloading is not allowed, which means a class may not have
multiple constructors with the same name. However, this is no problem
because Vala supports named constructors. If you want to offer
multiple constructors you may give them different name additions:

```vala
public class Button : Object {

    public Button () {
    }

    public Button.with_label (string label) {
    }

    public Button.from_stock (string stock_id) {
    }
}
```

Instantiation is analogous:

```vala
new Button ();
new Button.with_label ("Click me");
new Button.from_stock (Gtk.STOCK_OK);
```

You may chain constructors via `this ()` or `this.{name_extension} ()`:

```vala
public class Point : Object {
    public double x;
    public double y;

    public Point (double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Point.rectangular (double x, double y) {
        this (x, y);
    }

    public Point.polar (double radius, double angle) {
        this.rectangular (radius * Math.cos (angle), radius * Math.sin (angle));
    }
}

void main () {
    var p1 = new Point.rectangular (5.7, 1.2);
    var p2 = new Point.polar (5.7, 1.2);
}
```

## GObject-style construction

GObject-style construction matches how GObject builds instances in C. It introduces **construct properties**, a special `Object (...)` call, and a `construct` block. For example:

```vala
public class Person : Object {

    /* Construction properties */
    public string name { get; construct; }
    public int age { get; construct set; }

    public Person (string name) {
        Object (name: name);
    }

    public Person.with_age (string name, int years) {
        Object (name: name, age: years);
    }

    construct {
        // do anything else
        stdout.printf ("Welcome %s\n", this.name);
    }
}
```

With this scheme, each construction method that participates centers on an `Object (...)` call for setting so-called **construct properties**. The `Object (...)` call takes a variable number of named
arguments in the form of `property: value`. These properties must be
declared as `construct` or `set` properties. They will be set to the
given values and afterwards all `construct {}` blocks in the hierarchy
from `GLib.Object` down to our class will be called.

The `construct` block is guaranteed to be called when an instance of
this class is created, even if it is created as a subtype. It does
neither have any parameters, nor a return value. Within this block you
can call other methods and set member variables as needed.

Construct properties are defined just as `get` and `set` properties, and
therefore can run arbitrary code on assignment. If you need to do
initialization based on a single construct property, it is possible to
write a custom `construct` block for the property, which will be
executed immediately on assignment, and before any other construction
code.

If a construct property is declared without `set` it is a so-called
**construct only** property, which means it can only be assigned on
construction, but no longer afterwards. In the example above `name` is
such a construct only property.

Here's a summary of the various types of properties together with the
nomenclature usually found in the documentation of gobject-based
libraries:

```vala
public int a { get; private set; }    // Read
public int b { private get; set; }    // Write
public int c { get; set; }            // Read / Write
public int d { get; set construct; }  // Read / Write / Construct
public int e { get; construct; }      // Read / Write-Construct-Only
```

In some cases you may also want to perform some action - not when
instances of a class are created - but when the class itself is created
by the GObject runtime. In GObject terminology we are talking about a
snippet of code run inside the `class_init` function for the class in
question. In Java this is known as **static initializer blocks**. In Vala
this looks like:

```vala
/* This snippet of code is run when the class
 * is registered with the type system */
 static construct {
   ...
}
```

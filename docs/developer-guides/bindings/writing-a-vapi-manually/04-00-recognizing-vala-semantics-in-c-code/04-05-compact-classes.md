# 4.5. Compact Classes

Vala has [three types of class](https://gnome.pages.gitlab.gnome.org/vala/manual/classes.html):
GObject subclasses, GType classes and compact classes. The relevant
parts of a non-GLib based C library can be bound to a compact class in
Vala.

## 4.5.1. Singly-Owned Classes

The most common case is the singly-owned compact class, which follows
one of these patterns:

```c
typedef struct foo Foo;
/* Create a new Foo handle. */
Foo *foo_make(void);
/* Make a copy of a Foo. */
Foo *foo_dup(Foo*);
/* Free a Foo handle. */
void foo_free(Foo*);

typedef struct bar *Bar;
/* Open a new Bar from a file, NULL if an error occurs. */
Bar bar_open(const char *filename);
/* Dispose of a Bar when finished. */
void bar_close(Bar);
```

These should both be bound as compact classes. The `foo_make` and
`bar_open` functions will allocate memory and create a new instance of
the type (this is where documentation is helpful). There's an important
subtle difference between these two: where the pointer is mentioned. In
the case of `Foo`, the pointer is mentioned in every function, while
`Bar` has it baked into the `typedef.` Vala will always add a star, so
`Bar` will be actually be bound using `struct bar`.

The second difference is the constructor: `Foo`'s constructor will not
fail, but `Bar`'s might fail. Vala constructors are not permitted to
return null. `Bar`'s constructor is best bound as a static method, as
these can return null.

```vala
[CCode (cname = "Foo", free_function = "foo_free")]
[Compact]
public class Foo {
    [CCode (cname = "foo_make")]
    public Foo ();

    [CCode (cname = "foo_dup")]
    public Foo dup ();
}

[CCode (cname = "struct bar", free_function = "bar_close", has_type_id = false)]
[Compact]
public class Bar {
    [CCode (cname = "bar_open")]
    public static Bar? open (string filename);
}
```

In case explicit duplication is needed, include a member function of the
copy function called `dup()`, if available.

## 4.5.2. Reference-Counted Classes

Reference-counted classes usually have a pattern as follows:

```c
typedef struct foo Foo;
Foo *foo_new();
Foo *foo_retain(Foo*);
void foo_release(Foo*);
```

and should be bound as:

```vala
[CCode (cname = "foo", ref_function = "foo_retain", unref_function = "foo_release")]
[Compact]
public class Foo {
    [CCode (cname = "foo_new")]
    public Foo ();
    [CCode (cname = "foo_retain")]
    public void @ref ();
    [CCode (cname = "foo_release")]
    public void unref ();
}
```

The `ref` and `unref` function are provided as a courtesy to the user
such that they might manually change the reference counts in difficult
situations.

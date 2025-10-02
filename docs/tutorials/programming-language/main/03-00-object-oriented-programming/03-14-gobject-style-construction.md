# 3.14. GObject-Style Construction

As pointed out before, Vala supports an alternative construction scheme
that is slightly different to the one described before, but closer to
the way GObject construction works. Which one you prefer depends on
whether you come from the GObject side or from the Java or C# side. The
gobject-style construction scheme introduces some new syntax elements:
*construct properties*, a special `Object(...)` call and a `construct`
block. Let's take a look at how this works:

```vala
public class Person : Object {

    /* Construction properties */
    public string name { get; construct; }
    public int age { get; construct set; }

    public Person(string name) {
        Object(name: name);
    }

    public Person.with_age(string name, int years) {
        Object(name: name, age: years);
    }

    construct {
        // do anything else
        stdout.printf("Welcome %s\n", this.name);
    }
}
```

With the gobject-style construction scheme each construction method only
contains an `Object(...)` call for setting so-called *construct
properties*. The `Object(...)` call takes a variable number of named
arguments in the form of `property: value`. These properties must be
declared as `construct` or `set` properties. They will be set to the
given values and afterwards all `construct {}` blocks in the hierarchy
from *GLib.Object* down to our class will be called.

The `construct` block is guaranteed to be called when an instance of
this class is created, even if it is created as a subtype. It does
neither have any parameters, nor a return value. Within this block you
can call other methods and set member variables as needed.

Construct properties are defined just as `get` and `set` properties, and
therefore can run arbitrary code on assignment. If you need to do
initialisation based on a single construct property, it is possible to
write a custom `construct` block for the property, which will be
executed immediately on assignment, and before any other construction
code.

If a construct property is declared without `set` it is a so-called
*construct only* property, which means it can only be assigned on
construction, but no longer afterwards. In the example above *name* is
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
instances of a class is created - but when the class itself is created
by the GObject runtime. In GObject terminology we are talking about a
snippet of code run inside the `class_init` function for the class in
question. In Java this is known as *static initializer blocks*. In Vala
this looks like:

```vala
/* This snippet of code is run when the class
 * is registered with the type system */
 static construct {
   ...
}
```

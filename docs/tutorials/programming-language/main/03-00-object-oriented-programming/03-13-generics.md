# 3.13. Generics

Vala includes a runtime generics system, by which a particular instance
of a class can be restricted with a particular type or set of types
chosen at construction time. This restriction is generally used to
require that data stored in the object must be of a particular type, for
example in order to implement a list of objects of a certain type. In
that example, Vala would make sure that only objects of the requested
type could be added to the list, and that on retrieval all objects would
be cast to that type.

In Vala, generics are handled while the program is running. When you
define a class that can be restricted by a type, there still exists only
one class, with each instance customised individually. This is in
contrast to C++ which creates a new class for each type restriction
required - Vala's is similar to the system used by Java. This has
various consequences, most importantly: that static members are shared
by the type as a whole, regardless of the restrictions placed on each
instance; and that given a class and a subclass, a generic refined by
the subclass can be used as a generic refined by the class.

The following code demonstrates how to use the generics system to define
a minimal wrapper class:

```vala
public class Wrapper<G>: GLib.Object {
    public G data { get; set; }
}
```

This "Wrapper" class must be restricted with a type in order to
instantiate it - in this case the type will be identified as "G", and
so instances of this class will store one object of "G" type.

In order to instantiate this class, a type must be chosen, for example,
the built in `string` type (in Vala there is no restriction on what type
may be used in a generic). To create and briefly use this class:

```vala
void main () {
    var w = new Wrapper<string>();
    w.data = "test";
    stdout.printf(w.data);
}
```

As you can see, when the data is retrieved from the wrapper, it is
assigned to an identifier with no explicit type. This is possible
because Vala knows what sort of objects are in each wrapper instance,
and therefore can do this work for you.

The fact that Vala does not create multiple classes out of your generic
definition means that you can code as follows: (This is called
`Type Erasure` which is same in Java to avoid massive expansion in
generated C code.)

```vala
class TestClass : GLib.Object {
}

void accept_object_wrapper(Wrapper<Glib.Object> w) {
}

...
var test_wrapper = new Wrapper<TestClass>();
accept_object_wrapper(test_wrapper);
...
```

Since all `TestClass` instances are also `Object`s, the
"accept_object_wrapper" method will happily accept the object it is
passed, and treat its wrapped object as though it was a `GLib.Object`
instance.

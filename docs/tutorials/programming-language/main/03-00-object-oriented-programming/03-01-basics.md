# 3.1. Basics

Although Vala doesn't force you to work with objects, some features are
not available any other way. As such, you will certainly want to program
in an object-oriented style most of the time. As with most current
languages, in order to define your own object types, you write a class
definition.

A class definition states what data each object of its type has, what
other object types it can hold references to, and what methods can be
executed on it. The definition can include a name of another class which
the new one should be a subclass of. An instance of a class is also an
instance of all its class's super classes, as it inherits from them
all their methods and data, although it may not be able to access all of
this itself. A class may also implement any number of interfaces, which
are sets of method definitions that must be implemented by the class -
an instance of a class is also an instance of each interface implemented
by its class or super classes.

Classes in Vala may also have "static" members. This modifier allows
either data or methods to be defined as belonging to the class as a
whole, rather than to a specific instance of it. Such members can be
accessed without possessing an instance of the class.

A simple class may be defined as follows:

```vala
public class TestClass : GLib.Object {

    /* Fields */
    public int first_data = 0;
    private int second_data;

    /* Constructor */
    public TestClass() {
        this.second_data = 5;
    }

    /* Method */
    public int method_1() {
        stdout.printf("private data: %d", this.second_data);
        return this.second_data;
    }
}
```

This code will define a new type (which is registered automatically with
the *gobject* library's type system) that contains three members. There
are two data members, the integers defined at the top, and one method
called *method_1*, which returns an integer. The class declaration
states that this class is a subclass of *GLib.Object*, and therefore
instances of it are also *Objects*, and contain all the members of that
type also. The fact that this class is descended from *Object* also
means that there are special features of Vala that can be used to easily
access some of *Object's* features.

This class is described as `public` (by default, classes are
`internal`). The implication of this is that it can referenced directly
by code outside of this file - if you are a C programmer of
glib/gobject, you will recognise this as being equivalent to defining
the class interfaces in a header file that other code can include.

The members are also all described as either `public` or `private`. The
member *first_data* is `public`, so it is visible directly to any user
of the class, and can be modified without the containing instance being
aware of it. The second data member is `private`, and so can only be
referenced by code belonging to this class. Vala supports four different
access modifiers:

| Modifier    | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| `public`    | No restrictions to access                                                                                       |
| `private`   | Access is limited to within the class/struct definition. This is the default if no access modifier is specified |
| `protected` | Access is limited to within the class definition and any class that inherits from the class                     |
| `internal`  | Access is limited exclusively to classes defined within the same package                                        |

The constructor initialises new instances of a class. It has the same
name as the class, may take zero or more arguments and is defined
without return type.

The final part of this class is a method definition. This method is to
be called *method_1*, and it will return an integer. As this method is
not static, it can only be executed on an instance of this class, and
may therefore access members of that instance. It can do this through
the `this` reference, which always points to the instance the method is
being called on. Unless there is an ambiguity, the `this` identifier can
be omitted if wished.

You can use this new class as follows:

```vala
TestClass t = new TestClass();
t.first_data = 5;
t.method_1();
```

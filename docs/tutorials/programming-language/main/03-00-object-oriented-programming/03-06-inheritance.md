# 3.6. Inheritance

In Vala, a class may derive from one or zero other classes. In practice
this is always likely to be one, although there is no implicit
inheritance as there is in languages like Java.

When defining a class that inherits from another, you create a
relationship between the classes where instances of the subclass are
also instances of the superclass. This means that operations on
instances of the superclass are also applicable on instances of the
subclass. As such, wherever an instance of the superclass is required,
an instance of the subclass can be substituted.

When writing the definition of a class it is possible to exercise
precise control over who can access what methods and data in the object.
The following example demonstrates a range of these options:

```vala
class SuperClass : GLib.Object {

    private int data;

    public SuperClass(int data) {
        this.data = data;
    }

    protected void protected_method() {
    }

    public static void public_static_method() {
    }
}

class SubClass : SuperClass {

    public SubClass() {
        base(10);
    }
}
```

*data* is an instance data member of *SuperClass*. There will be a
member of this type in every instance of *SuperClass*, and it is
declared `private` so will only be accessible by code that is a part of
*SuperClass*.

*protected_method* is an instance method of *SuperClass*. You will be
able to execute this method only an instance of *SuperClass* or of one
of its subclasses, and only from code that belongs to *SuperClass* or
one of its subclasses - this latter rule being the result of the
`protected` modifier.

*public_static_method* has two modifiers. The `static` modifier means
that this method may be called without owning an instance of
*SuperClass* or of one of its subclasses. As a result, this method will
not have access to a `this` reference when it is executed. The `public`
modifier means that this method can be called from any code, no matter
its relationship with *SuperClass* or its subclasses.

Given these definitions, an instance of *SubClass* will contain all
three members of *SuperClass*, but will only be able to access the
non-private members. External code will only be able to access the
public method.

With `base` a constructor of a subclass can chain up to a constructor of
its base class.

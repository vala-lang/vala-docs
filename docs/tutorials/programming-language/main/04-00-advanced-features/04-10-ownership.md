# 4.10. Ownership

## 4.10.1. Unowned References

Normally when creating an object in Vala you are returned a reference to
it. Specifically this means that as well as being passed a pointer to
the object in memory, it is also recorded in the object itself that this
pointer exists. Similarly, whenever another reference to the object is
created, this is also recorded. As an object knows how many references
there are to it, it can automatically be removed when needed. This is
the basis of [memory management](https://wiki.gnome.org/Projects/Vala/ReferenceHandling).

## 4.10.2. Methods ownership

*Unowned references* conversely are not recorded in the object they
reference. This allows the object to be removed when it logically should
be, regardless of the fact that there might be still references to it
The usual way to achieve this is with a method defined to return an
unowned reference, e.g.:

```vala
class Test {
    private Object o;

    public unowned Object get_unowned_ref () {
        this.o = new Object ();
        return this.o;
    }
}
```

When calling this method, in order to collect a reference to the
returned object, you must expect to receive a weak reference:

```vala
unowned Object o = get_unowned_ref ();
```

The reason for this seemingly over complicated example because of the
concept of ownership.

-   If the Object "o" was not stored in the class, then when the
    method "get_unowned_ref" returned, "o" would become unowned
    (i.e. there would be no references to it). If this were the case,
    the object would be deleted and the method would never return a
    valid reference.
-   If the return value was not defined as unowned, the ownership would
    pass to the calling code. The calling code is, however, expecting an
    unowned reference, which cannot receive the ownership.

If the calling code is written as

```vala
Object o = get_unowned_ref ();
```

Vala will try to either obtain a reference of or a duplicate of the
instance the unowned reference pointing to.

## 4.10.3. Properties ownership

In contrast to normal methods, properties always have unowned return
value. That means you can't return a new object created within the get
method. That also means, you can't use an owned return value from a
method call. The somewhat irritating fact is because of that a property
value is owned by the object that has this property. A call to obtain
this property value should not steal or reproduce (by duplicating, or
increasing the reference count of) the value from the object side.

As such, the following example will result in a compilation error:

```vala
public Object property {
    get {
        return new Object ();   // WRONG: property returns an unowned reference,
                               // the newly created object will be deleted when
                               // the getter scope ends the caller of the
                               // getter ends up receiving an invalid reference
                               // to a deleted object.
    }
}
```

nor can you do this:

```vala
public string property {
    get {
        return getter_method ();   // WRONG: for the same reason above.
    }
}

public string getter_method () {
    return "some text"; // "some text" is duplicated and returned at this point.
}
```

on the other hand, this is perfectly fine

```vala
public string property {
    get {
        return getter_method ();   // GOOD: getter_method returns an unowned value
    }
}

public unowned string getter_method () {
    return "some text";
    // Don't be alarmed that the text is not assigned to any strong variable.
    // Literal strings in Vala are always owned by the program module itself,
    // and exist as long as the module is in memory
}
```

The `unowned` modifier can be used to make automatic property's storage
unowned. That means

```vala
public unowned Object property { get; private set; }
```

is identical to

```vala
private unowned Object _property;

public Object property {
    get { return _property; }
}
```

The keyword `owned` can be used to specifically ask a property to return
a owned reference of the value, therefore causing the property value be
reproduced in the object side. Think twice before adding the `owned`
keyword. Is it a property or simply a `get_xxx` method? There may also
be problems in your design. Anyways, the following code is a correct
segment:

```vala
public owned Object property { owned get { return new Object (); } }
```

Unowned references play a similar role to pointers which are described
later. They are however much simpler to use than pointers, as they can
be easily converted to normal references. However, in general they
should not be widely used in the programs unless you know what you are
doing.

## 4.10.4. Ownership Transfer

The keyword `owned` is used to transfer ownership.

-   As a prefix of a parameter type, it means that ownership of the
    object is transferred into this code context.
-   As an type conversion operator, it can be used to avoid duplicating
    non-reference counting classes, which is usually impossible in Vala.
    For example,

```vala
Foo foo = (owned) bar;
```

This means that *bar* will be set to *null* and *foo* inherits the
reference/ownership of the object *bar* references.

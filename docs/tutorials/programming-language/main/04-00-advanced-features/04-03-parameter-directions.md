# 4.3. Parameter Directions

A method in Vala is passed zero or more arguments. The default behaviour
when a method is called is as follows:

-   Any value type parameters are copied to a location local to the
    method as it executes.
-   Any reference type parameters are not copied, instead just a
    reference to them is passed to the method.

This behaviour can be changed with the modifiers 'ref' and 'out'.

'out' from the caller side

>   you may pass an uninitialised variable to the method and you may
    expect it to be initialised after the method returns

'out' from callee side

>   the parameter is considered uninitialised and you have to initialise
    it

'ref' from caller side

>   the variable you're passing to the method has to be initialised and
    it may be changed or not by the method

'ref' from callee side

>   the parameter is considered initialised and you may change it or not

```vala
void method_1 (int a, out int b, ref int c) { ... }
void method_2 (Object o, out Object p, ref Object q) { ... }
```

These methods can be called as follows:

```vala
int a = 1;
int b;
int c = 3;
method_1 (a, out b, ref c);

Object o = new Object ();
Object p;
Object q = new Object ();
method_2 (o, out p, ref q);
```

The treatment of each variable will be:

-   "a" is of a value type. The value will be copied into a new memory
    location local to the method, and so changes to it will not be
    visible to the caller.
-   "b" is also of a value type, but passed as an `out` parameter. In
    this case, the value is not copied, instead a pointer to the data is
    passed to the method, and so any change to the method parameter will
    be visible to the calling code.
-   "c" is treated in the same way as "b", the only change is in the
    signalled intent of the method.
-   "o" is of a reference type. The method is passed a reference to
    the same object as the caller has. The method can therefore change
    that object, but if it reassigns to the parameter, that change will
    not be visible to the caller.
-   "p" is of the same type, but passed as an out parameter. This
    means that the method will receive a pointer to the reference to the
    object. It may therefore replace the reference with a reference to
    another object, and when the method returns the caller will instead
    own a reference to that other object. When you use this type of
    parameter, if you do not assign a new reference to the parameter, it
    will be set to `null`.
-   "q" is again of the same type. This case is treated like "p"
    with the important differences that the method may choose not to
    change the reference, and may access the object referred to. Vala
    will ensure that in this instance "q" actually refers to any
    object, and is not set to `null`.

Here is an example of how to implement `method_1 ()`:

```vala
void method_1 (int a, out int b, ref int c) {
    b = a + c;
    c = 3;
}
```

When setting the value to the out argument "b", Vala will ensure that
"b" is not `null`. So you can safely pass `null` as the second
argument of `method_1 ()` if you are not interested by this value.

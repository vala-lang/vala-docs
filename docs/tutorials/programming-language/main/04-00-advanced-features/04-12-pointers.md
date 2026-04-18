# 4.12. Pointers

Pointers are Vala's way of allowing manual memory management. Normally
when you create an instance of a type you receive a reference to it, and
Vala will take care of destroying the instance when there are no more
references left to it. By requesting instead a pointer to an instance,
you take responsibility for destroying the instance when it is no longer
wanted, and therefore get greater control over how much memory is used.

This functionality is not necessarily needed most of the time, as modern
computers are usually fast enough to handle reference counting and have
enough memory that small inefficiencies are not important. The times
when you might resort to manual memory management are:

-   When you specifically want to optimise part of a program and
    [unowned references](04-10-ownership#_4-10-1-unowned-references) are insufficient.
-   When you are dealing with an external library that does not
    implement reference counting for memory management (probably meaning
    one not based on gobject.)

In order to create an instance of a type, and receive a pointer to it:

```vala
Object* o = new Object ();
```

In order to access members of that instance:

```vala
o->method_1 ();
o->data_1;
```

In order to free the memory pointed to:

```vala
delete o;
```

Vala also supports the *address-of* (`&`) and *indirection* (`*`)
operators known from C:

```vala
int i = 42;
int* i_ptr = &i;    // address-of
int j = *i_ptr;     // indirection
```

The behavior is a bit different with reference types, you can omit the
address-of and indirection operator on assignment:

```vala
Foo f = new Foo ();
Foo* f_ptr = f;    // address-of
Foo g = f_ptr;     // indirection

unowned Foo f_weak = f;  // equivalent to the second line
```

The usage of reference-type pointers is equivalent to the use of unowned
references.

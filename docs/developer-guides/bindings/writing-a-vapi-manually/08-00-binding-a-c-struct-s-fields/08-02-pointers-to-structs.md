# 8.2. Pointers to Structs

Any field referenced as a pointer is slightly more complex.

If the type is a parented struct or the field is possibly null, suffix
the type with a question mark.

```c
foo_t *myfoo;
```

```vala
public foo? myfoo;
```

The next question is: is the reference owned? If the value was
overwritten, should the destructor be called? If the answer is no, then
prefix with `unowned`. This is often the case for a tree structure that
has parent pointers.

```c
foo_t *parent;
```

```vala
public unowned Foo parent;
```

If unowned is missing, a double-free event will occur when the field is
overwritten. If it is included when not needed, there will be a memory
leak.

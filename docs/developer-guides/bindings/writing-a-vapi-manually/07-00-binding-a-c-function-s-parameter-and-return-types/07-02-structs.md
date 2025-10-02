# 7.2. Structs

The majority of libraries receive structs passed by reference and it is
also the default behaviour of Vala to pass structs by reference. So to
pass a struct as an argument in a function or method call you just need
to specify the type of struct and the variable name. For example the C
code:

```c
typedef struct foo {
    int x;
    int y;
};
void compute_foo(foo *f);
```

would be bound as:

```vala
[CCode (cname = "foo", has_type_id = false)]
public struct Foo {
    public int x;
    public int y;
};
void compute_foo(Foo f);
```

Very rarely a C library function is written to receive a struct passed
by value and not reference. You will see the `struct` keyword used in
the C function's parameter. You may also see `const struct`. To get
Vala to pass the struct by value the `[SimpleType]` annotation needs to
be added to the Vala binding of the struct. The following pattern in C:

```c
typedef struct foo {
    int x;
    int y;
};
void compute_foo(struct foo f);
```

would be bound as:

```vala
[CCode (cname = "foo", has_type_id = false)]
[SimpleType]
public struct Foo {
    public int x;
    public int y;
}
void compute_foo(Foo f);
```

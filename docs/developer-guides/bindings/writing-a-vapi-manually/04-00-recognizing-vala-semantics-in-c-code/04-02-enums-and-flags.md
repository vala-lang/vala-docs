# 4.2. Enums and Flags

While C has support for enums, C programmers often do not use enums,
opting instead for #defines. Both of these structures can be bound to
Vala enums.

This first example is a straight mapping between a C enum and a Vala
enum. The C:

```c
typedef enum {
    FOO_A,
    FOO_B,
    FOO_C,
} foo_e;
```

and the Vala binding:

```vala
[CCode (cname = "foo_e", cprefix = "FOO_", has_type_id = false)]
public enum Foo {
    A,
    B,
    C
}
```

Note how `cprefix` is used in the above example to prepend `FOO_` to all
the Vala values when the C is generated.

The second example shows how a series of definitions of constants in C
can be mapped to a Vala enum:

```c
#define BAR_X 1
#define BAR_Y 2
#define BAR_Z 3
```

```vala
[CCode (cname = "int", cprefix = "BAR_", has_type_id = false)]
public enum Bar {
    X,
    Y,
    Z
}
```

Check where the `enum` is used to determine the correct type, though
`int` and `unsigned int` are the most common.

There is also a common tendency to use combinable bit patterns. These
are convertible to Vala flags enums.

```c
#define FOO_READ (1<<0)
#define FOO_WRITE (1<<1)
#define FOO_CREATE (1<<2)
```

```vala
[CCode (cname = "int", cprefix = "FOO_", has_type_id = false)]
[Flags]
public enum Foo {
    READ,
    WRITE,
    CREATE
}
```

In Vala, enums and flags may have member functions. In particular,
`strerr`-like functions are best converted to member functions.

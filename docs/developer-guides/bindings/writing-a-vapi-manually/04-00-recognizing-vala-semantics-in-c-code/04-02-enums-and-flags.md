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

## Supersets

If one set of enums or flags is a superset of another, but they are logically separate, You can create a different set of enums that refer to the same enum
or defines.

For example:

```c
#define FOO_A 1
#define FOO_B 2
#define FOO_C 3
#define FOO_D 4
/* takes FOO_A or B only */
void do_something(int);
/* takes any FOO_ value */
void do_something_else(int);
```

Can become this:

```vala
[CCode (cname = "int", cprefix = "FOO_", has_type_id = false)]
public enum Foo { A, B }
[CCode (cname = "int", cprefix = "FOO_", has_type_id = false)]
public enum FooExtended { C, D }
```

You can then cast one enum to another:

```vala
var foo_enum = (Foo) FooExtended.C;
```

## Member functions and constants

In Vala, enums and flags may have member functions and constants.
In particular, `strerr`-like functions are best converted to member functions.

### Enum aliases and `to_string()`

The default function `to_string()` can cause problems if the enum has aliases (the C error `duplicate case` will trigger). So to solve this,
you can create additional constants after the enum has been declared to add the missing enum aliases.

For example this enum:

```c
typedef enum {
    BAR_A,
    BAR_B,
    BAR_C,
    BAR_D,
    BAR_FIRST = BAR_A,
    BAR_LAST = BAR_D,
} bar_e;
```

Will become:

```vala
[CCode (cname = "bar_e", cprefix = "BAR_", has_type_id = false)]
public enum Bar {
    A,
    B,
    C;

    [CCode (cname = "BAR_")]
    public const Bar FIRST;

    [CCode (cname = "BAR_")]
    public const Bar LAST;
}
```

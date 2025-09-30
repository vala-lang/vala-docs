# 2.4. Create a Root Namespace

Normally all the bindings for a library are placed into a single root
namespace. For example libfoo or foolib, would best be placed in a
namespace called Foo. This follows the naming convention above. For
example an initial VAPI would be:

```vala
namespace Foo {
    // bindings
}
```

The binding can then either be used in a Vala program by prefixing the
namespace, e.g.:

```vala
void main () {
    Foo.library_function();
}
```

or bring the VAPI namespace into the scope of the file:

```vala
using Foo;

void main () {
    library_function ();
}
```

Namespaces also provide a convenient way to group functions. Typically,
for GLib-based libraries, the `x_y_foo` patterns can be translated
directly into a namespace as `x.y.foo`. Since most C libraries do not
follow these conventions, things are slightly murkier. As general rules
of thumb, try the following:

-   Move global variables, functions, constants, enums, flags, and
    delegate definitions into the class and struct definitions if they
    are clearly related only to that type. That is, it might make sense
    to move the `enum FooOptions` into `class Foo` as simply `Options`.
    Note that structs cannot contain enum, flag, or delegate
    definitions; only constants and static methods.
-   Use header files and directories as a guide. If the headers are
    stored as `foo-2.0/db/{handle,transaction,row}.h` or
    `foo-2.0/db_{handle,transaction,row}.h` or if `foo-2.0/db.h`
    contains definitions for `foo_handle`, `foo_tx`, and `foo_row`,
    there's a good chance that creating a namespace `Db` is a logical
    grouping.
-   Create namespaces for large groups of related constants. Sometimes,
    constant collections cannot be converted to enums, in which case,
    grouping them into a namespace is much easier to manage.

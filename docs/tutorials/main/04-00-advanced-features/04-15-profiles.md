# 4.15. Profiles

The generated C code can target a different minimum runtime by using
`valac`'s `--profile` option. Vala supports two different profiles:

-   `gobject` (default)
-   `libc`

A profile determines which Vala language features are available to match
the minimum runtime environment. The `gobject` profile enables code
generation that requires GLib's GType runtime type system and so the
runtime environment will usually require libgobject and its small number
of dependencies.

The `libc` profile removes the dependency on GLib and disables the
runtime type system. The profile either generates alternative code or
errors at compile time if a Vala language feature is used that requires
the runtime type system. This is useful for writing code that targets
microcontrollers or for generating binaries for system utilities or
extremely small container images. The runtime environment will usually
require a small subset of the ISO C standard library. The `posix`
profile is currently an alias for `libc` because a POSIX compatible
operating system includes the C standard library, but code generated
from the profile can target non-POSIX platforms where a minimal C
standard library is available for dynamic linking at runtime or
statically linked in to the binary.

To select a different profile use valac's `--profile` switch:

```shell
valac --profile=libc somecode.vala
```

Of course, the binary will still require the runtime dependencies needed
for the libraries targeted with `valac`'s `--pkg` option.

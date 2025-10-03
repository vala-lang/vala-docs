# 6.1. Using Libraries

Using a library in Vala is largely automated if you use the *valac*
compiler. The Vala specific library files make up what is known as a
package. You tell the compiler that a package is needed by your program
as follows:

```shell
valac --pkg gee-1.0 test.vala
```

This command means your program can use any of the definitions in the
*gee-1.0.vapi* file, and also any in any of the packages that *gee-1.0*
depends on. These dependencies would be listed in *gee-1.0.deps* if
there were any. In this example *valac* is set to build all the way to
binary, and will therefore incorporate information from *pkg-config* to
link the correct libraries. This is why the *pkg-config* names are also
used for Vala package names.

Packages are generally used with namespaces, but they are not
technically related. This means that even though your application is
built with reference to the package, you must still include the required
`using` statements in each file as appropriate, or else use the fully
qualified names of all symbols.

It is also possible to treat a local library (one that is not installed)
as a package. For comparison, Vala itself uses an internal version of
Gee. When *valac* is built it creates a VAPI file of this internal
library and uses it roughly as follows:

```shell
valac --vapidir ../gee --pkg gee ...
```

For details on how to generate this library, see the next section or the
example.

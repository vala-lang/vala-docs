# Shared library and GObject introspection

Build a tiny shared library in Vala, call it from another Vala program, then expose it to **GObject introspection** so runtimes such as GJS can call into it. Adapted from the archived GNOME Wiki page [Projects/Vala/SharedLibSample](https://wiki.gnome.org/Projects/Vala/SharedLibSample).

## Library source (`test_shared.vala`)

```vala
namespace MyMath {
    public int sum (int a, int b) {
        return a + b;
    }

    public int square (int a) {
        return a * a;
    }
}
```

### Build the `.so` and VAPI for direct Vala reuse

```shell
valac --library=test_shared -H test_shared.h test_shared.vala -X -fPIC -X -shared -o test_shared.so
```

`--library` tells the compiler you are building a library. Add `--vapi=name.vapi` if you need a specific VAPI file name. `-H` emits a C header for consumers that include C code. `-fPIC` and `-shared` are forwarded to the C compiler so the result is a position-independent shared object.

## Vala client (`main.vala`)

```vala
using MyMath;

int main (string[] args) {
    stdout.printf ("\nTesting shared library\n");
    stdout.printf ("\t2 + 3 is %d\n", sum (2, 3));
    stdout.printf ("\t8 squared is %d\n", square (8));
    return 0;
}
```

```shell
valac test_shared.vapi main.vala -X test_shared.so -X -I. -o valatest
export LD_LIBRARY_PATH=.:${LD_LIBRARY_PATH}
./valatest
```

`LD_LIBRARY_PATH` is only for local testing before `make install` places the library on the system loader path.

## GObject introspection metadata

Generate a GIR and typelib so other language bindings can load the library:

```shell
valac test_shared.vala -X -fPIC -X -shared -o test_shared.so --library=testShared --gir testShared-0.1.gir
g-ir-compiler --shared-library=test_shared.so --output=testShared-0.1.typelib testShared-0.1.gir
```

### GJS client (`client.js`)

```js
imports.gi.versions.testShared = '0.1';
const testShared = imports.gi.testShared;
print('Result: ' + testShared.square(42));
```

```shell
GI_TYPELIB_PATH=. LD_LIBRARY_PATH=. gjs client.js
```

Further language examples live in community repositories such as [antono/vala-object](https://github.com/antono/vala-object).

Modern projects usually wrap these `valac` flags inside **Meson** (`shared_library()`, `vala.generate_gir()`, and `gnome.generate_gir()`), which tracks dependencies and install locations for you.

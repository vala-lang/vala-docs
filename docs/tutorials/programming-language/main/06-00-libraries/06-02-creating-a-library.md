# 6.2. Creating a Library

## 6.2.1. Compilation and linking using Command Line

Vala is not yet capable of directly creating dynamic or static
libraries. To create a library, proceed with the `-c` (compile only)
switch and link the object files with your favourite linker, i.e.
`libtool` or `ar`.

```shell
valac -c ...(source files)
ar cx ...(object files)
```

or by compiling the intermediate C code in the compiler of you choice.
We'll be using *gcc* in these examples.

```shell
valac -C ...(source files)
gcc -o my-best-library.so --shared -fPIC ...(compiled C code files)...
```

### 6.2.1.1. Example

The following is an example of how to write a simple library in Vala,
and also to compile and test it locally without having to install it
first.

Save the following code to a file *test.vala*. This is the actual
library code, containing the functions we want to call from our main
program.

```vala
public class MyLib : Object {

    public void hello() {
        stdout.printf("Hello World, MyLib\n");
    }

    public int sum(int x, int y) {
        return x + y;
    }
}
```

Use the next command to generate *test.c*, *test.h* and *test.vapi*
files. These are the C versions of the library to be compiled, and the
VAPI file representing the library's public interface.

```shell
valac -C -H test.h --library test test.vala --basedir ./
```

Now compile the library:

```shell
gcc --shared -fPIC -o libtest.so $(pkg-config --cflags --libs gobject-2.0) test.c
```

Save the following code to a file called *hello.vala*. This is the code
that will use the library we have created.

```vala
void main() {
    var test = new MyLib();
    test.hello();
    int x = 4, y = 5;
    stdout.printf("The sum of %d and %d is %d\n", x, y, test.sum(x, y));
}
```

Now compile the application code, telling the compiler that we want to
link against the library we just created.

```shell
valac -X -I. -X -L. -X -ltest -o hello hello.vala test.vapi --basedir ./
```

We can now run the program. This command states that any required
libraries will be found in the current directory.

```shell
LD_LIBRARY_PATH=$PWD ./hello
```

The output of the program should be:

```shell
Hello World, MyLib
The sum of 4 and 5 is 9
```

You can also create a GObjectIntrospection GIR file for your library
with the `--gir` option:

```shell
valac -C test.vala --library test --gir Test-1.0.gir
```

GIR files are XML descriptions of the API.

This will generate a GIR file named `Test-1.0.gir`. The name of the GIR
file should follow the GObject Introspection naming conventions and
include an API version number.

A typelib file can then be generated from the GIR using g-ir-compiler:

```shell
g-ir-compiler --output MyLibrary-1.0.typelib MyLibrary-1.0.gir
```

GIR files are typically used to generate compile time bindings. Typelib
files are used to create runtime bindings and a binding generator will
read them using `libgirepository`.

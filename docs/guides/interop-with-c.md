# Interop with C

Vala compiles to C, so calling C code from Vala doesn't need a runtime bridge. A call to a C function in Vala becomes a regular C function call in the generated code.

All you need to do is tell the Vala compiler (`valac`) what the C function looks like. You can do this by declaring it as an **external method** using the `extern` modifier.

This guide starts with the simplest possible external method and then shows how the `CCode` attribute lets you change how `valac` calls C code, so that it feels natural to use from Vala.

::: tip
Declaring external methods directly in your Vala source code is a quick way to use C code in a single program. If you want to share the declarations for a whole library, write a [VAPI file](bindings/writing-a-vapi-manually) instead.
:::

## The Greeter Library

Every example on this page uses the same small C library, which we'll call `greeter`.

It has a header file, `greeter.h`:

```c
#ifndef GREETER_H
#define GREETER_H

int greeter_add (int a, int b);
char* greeter_make_greeting (const char* name);
char* GreeterMakeFarewell (const char* name);
const char* greeter_get_version (void);
char* greeter_join_names (const char** names, int n_names);

#endif
```

And a source file, `greeter.c`:

```c
#include "greeter.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char*
format_message (const char* prefix, const char* name)
{
    size_t size = strlen (prefix) + strlen (name) + 2;
    char* result = malloc (size);
    if (result != NULL) {
        snprintf (result, size, "%s%s!", prefix, name);
    }
    return result;
}

int
greeter_add (int a, int b)
{
    return a + b;
}

/* Returns a newly allocated string. The caller must free it. */
char*
greeter_make_greeting (const char* name)
{
    return format_message ("Hello, ", name);
}

/* Returns a newly allocated string. The caller must free it. */
char*
GreeterMakeFarewell (const char* name)
{
    return format_message ("Goodbye, ", name);
}

/* Returns a string that is owned by the library. Don't free it. */
const char*
greeter_get_version (void)
{
    return "1.0.0";
}

/* Returns a newly allocated string. The caller must free it. */
char*
greeter_join_names (const char** names, int n_names)
{
    size_t length = 1;
    for (int i = 0; i < n_names; i++) {
        length += strlen (names[i]) + 2;
    }

    char* result = calloc (length, 1);
    for (int i = 0; i < n_names; i++) {
        if (i > 0) {
            strcat (result, ", ");
        }
        strcat (result, names[i]);
    }
    return result;
}
```

## Calling C Without Any Attributes

The simplest way to call a C function is to declare a method with the same name and parameters in Vala and add the `extern` modifier. An `extern` method has no body, because its implementation is somewhere else.

```vala
extern int greeter_add (int a, int b);
extern string greeter_make_greeting (string name);

void main () {
    print ("2 + 3 = %d\n", greeter_add (2, 3));
    print ("%s\n", greeter_make_greeting ("Vala"));
}
```

Pass the C source file to `valac` along with your Vala source file:

```sh
valac main.vala greeter.c
```

Output:

```
2 + 3 = 5
Hello, Vala!
```

`valac` assumes that the C function has the same name as your Vala method, and it uses the Vala types you wrote to work out the C types (`int` becomes `gint`, `string` becomes `gchar*`).

Vala's memory management also applies to external methods. By default, the value returned from a method is **owned**. This is why the program above doesn't need to free the string returned by `greeter_make_greeting`: `valac` frees it for you, with `g_free`. This is safe for memory that C code allocated with `malloc`, because GLib uses the system allocator.

### Linking Against a Library

If the C code is in a compiled library instead of a source file, pass the library to the C compiler with `-X -l`. The `-X` option means that the next option is passed through to the C compiler.

::: warning
You must use `-X -l`. A plain `-l` is not a `valac` option, and `valac` stops with `Unknown option -l`.
:::

For example, if `greeter` was compiled into a library called `libgreeter` that is installed in a location that the C compiler already searches, such as `/usr/lib`, the library name is all you need:

```sh
valac main.vala -X -lgreeter
```

If the library is somewhere else, also tell the linker which directory to search with `-X -L`:

```sh
valac main.vala -X -lgreeter -X -L/path/to/lib
```

`-lgreeter` links against `libgreeter`, and `-L/path/to/lib` is the directory the linker should search for it. If you leave out `-L` and the library isn't in a standard location, the build fails because the linker can't find it.

If the library is a shared library, your program must also be able to find it when it runs. Install the library to a standard location, or add its directory to the library search path, such as `LD_LIBRARY_PATH` on Linux or `DYLD_LIBRARY_PATH` on macOS.

### Using `-X -L` Without `-X -l`

`-L` only adds a directory for the linker to search. It doesn't link anything by itself, so it's only useful when something else is already asking for the library.

This happens when you use a library through a package with `--pkg`. The package's pkg-config file usually contains the `-l` option for the library, so you don't pass `-X -l` yourself. If the library is installed somewhere the linker doesn't search and the pkg-config file doesn't say where, the build fails with an error such as `library 'greeter' not found`. Adding `-X -L` fixes it:

```sh
valac --pkg greeter main.vala -X -L/path/to/lib
```

If nothing asks for the library, `-X -L` doesn't help. The build fails with errors about undefined symbols or undefined references to functions like `greeter_add`, because the library is never linked.

## Telling valac Where the Header Is

In the first example, `valac` wrote its own declaration of each C function in the generated C code. This works for simple cases, but it means that the C compiler never sees the real declarations in `greeter.h`, so it can't check that your Vala declarations match them.

Use the `cheader_filename` argument of the `CCode` attribute to make `valac` include the header in the generated C code:

```vala
[CCode (cheader_filename = "greeter.h")]
extern int greeter_add (int a, int b);

[CCode (cheader_filename = "greeter.h")]
extern string greeter_make_greeting (string name);

void main () {
    print ("2 + 3 = %d\n", greeter_add (2, 3));
    print ("%s\n", greeter_make_greeting ("Vala"));
}
```

The generated C code now contains `#include <greeter.h>`. The C compiler needs to know where to find the header, so add the directory it is in with `-X -I`:

```sh
valac main.vala greeter.c -X -I.
```

## Using Vala-style Names

`greeter_add` is a perfectly good C name, but Vala code usually looks like `add`. The `cname` argument lets you give the method any name you want in Vala, while telling `valac` the name of the real C function:

```vala
[CCode (cname = "greeter_add", cheader_filename = "greeter.h")]
extern int add (int a, int b);

[CCode (cname = "greeter_make_greeting", cheader_filename = "greeter.h")]
extern string make_greeting (string name);

void main () {
    print ("2 + 3 = %d\n", add (2, 3));
    print ("%s\n", make_greeting ("Vala"));
}
```

This matters even more when the C function doesn't follow Vala's naming conventions. Vala methods are written in `lower_case_with_underscores`, but C libraries use all kinds of styles. The greeter library has a function called `GreeterMakeFarewell`, which is in `PascalCase`. If you declare it as it is, it stands out in your Vala code:

```vala
extern string GreeterMakeFarewell (string name);
```

Use `cname` to call it by a name that looks like the rest of your Vala code:

```vala
[CCode (cname = "GreeterMakeFarewell", cheader_filename = "greeter.h")]
extern string make_farewell (string name);

void main () {
    print ("%s\n", make_farewell ("Vala"));
}
```

Output:

```
Goodbye, Vala!
```

The C function is still called `GreeterMakeFarewell` in the generated C code. Only the name you use in Vala changed.

## Grouping Methods in a Namespace

Repeating `cname` and `cheader_filename` for every method gets tedious. Most C libraries use a prefix for the names of their functions, such as `greeter_`. In Vala, you can group the methods in a namespace that matches the prefix.

When you put `CCode` on a namespace, `cheader_filename` applies to everything inside it. `valac` also works out the C name of each method by adding a prefix that comes from the name of the namespace, converted from `CamelCase` to `lower_case_with_underscores`, followed by an underscore. For a namespace called `Greeter`, the prefix is `greeter_`:

```vala
[CCode (cheader_filename = "greeter.h")]
namespace Greeter {
    public extern int add (int a, int b);
    public extern string make_greeting (string name);

    [CCode (cname = "GreeterMakeFarewell")]
    public extern string make_farewell (string name);
}

void main () {
    print ("2 + 3 = %d\n", Greeter.add (2, 3));
    print ("%s\n", Greeter.make_greeting ("Vala"));
    print ("%s\n", Greeter.make_farewell ("Vala"));
}
```

- `Greeter.add` is the C function `greeter_add`, and `Greeter.make_greeting` is `greeter_make_greeting`.
- A method can still have its own `CCode` attribute. `GreeterMakeFarewell` doesn't start with `greeter_`, so `make_farewell` uses `cname` to name the C function in full. A method's `cname` is never given the namespace's prefix.

Now that the C functions live in a `Greeter` namespace, they look like ordinary Vala code.

### When the Namespace Name Doesn't Match the C Prefix

If you want the namespace to have a different name from the prefix that the C library uses, set the prefix yourself with the `lower_case_cprefix` argument:

```vala
[CCode (cheader_filename = "greeter.h", lower_case_cprefix = "greeter_")]
namespace Greetings {
    public extern int add (int a, int b);
}

void main () {
    print ("2 + 3 = %d\n", Greetings.add (2, 3));
}
```

Without `lower_case_cprefix`, `Greetings.add` would be the C function `greetings_add`, which doesn't exist.

`lower_case_cprefix` is the prefix for methods. For the types in a namespace, such as classes and enums, the prefix is set with the `cprefix` argument.

## Choosing Who Owns Returned Values

Values returned from a method are owned by default. When you get a `string` back, `valac` assumes that it must free it when it's no longer needed. This is correct for `greeter_make_greeting`, which allocates a new string every time, but it isn't correct for `greeter_get_version`, which returns a string that belongs to the library.

If you declare the return type as `string`, the program will try to free memory it doesn't own. Use `unowned string` instead:

```vala
[CCode (cheader_filename = "greeter.h")]
namespace Greeter {
    public extern int add (int a, int b);
    public extern string make_greeting (string name);

    [CCode (cname = "GreeterMakeFarewell")]
    public extern string make_farewell (string name);

    public extern unowned string get_version ();
}

void main () {
    print ("Greeter version: %s\n", Greeter.get_version ());
}
```

When you write declarations for C code, you are responsible for getting ownership right. The C library's documentation should say who is responsible for freeing a returned value. The [Memory Management](memory-management) guide explains `owned` and `unowned` in more detail.

## Passing Arrays

In C, an array is usually passed as a pointer plus a separate length parameter. Vala arrays carry their length around with them, so `valac` adds the length argument for you.

`greeter_join_names` takes an array of names followed by the number of names. By default, `valac` passes the length of an array as the parameter right after it, so you only need to declare the array:

```vala
[CCode (cheader_filename = "greeter.h")]
namespace Greeter {
    public extern int add (int a, int b);
    public extern string make_greeting (string name);

    [CCode (cname = "GreeterMakeFarewell")]
    public extern string make_farewell (string name);

    public extern unowned string get_version ();

    public extern string join_names (string[] names);
}

void main () {
    string[] names = { "Ada", "Grace", "Linus" };
    print ("%s\n", Greeter.join_names (names));
}
```

Output:

```
Ada, Grace, Linus
```

The Vala method only has one parameter, `names`. `valac` passes `names` and its length to `greeter_join_names`.

If a C function expects the length somewhere else, use the `array_length_pos` argument on the array parameter. Parameter positions start at `1` for the first parameter, and the length of an array is placed at the position of the array plus `0.1` unless you say otherwise. For example, a C function that takes the length *before* the array would use `[CCode (array_length_pos = 0.9)] string[] names`.

## The Finished Greeter Program

Putting everything together, this is the final version of the program. It's the same as the examples above, with all the declarations in a single namespace:

```vala
[CCode (cheader_filename = "greeter.h")]
namespace Greeter {
    public extern int add (int a, int b);
    public extern string make_greeting (string name);

    [CCode (cname = "GreeterMakeFarewell")]
    public extern string make_farewell (string name);

    public extern unowned string get_version ();

    public extern string join_names (string[] names);
}

void main () {
    print ("Greeter version: %s\n", Greeter.get_version ());
    print ("2 + 3 = %d\n", Greeter.add (2, 3));
    print ("%s\n", Greeter.make_greeting ("Vala"));
    print ("%s\n", Greeter.make_farewell ("Vala"));

    string[] names = { "Ada", "Grace", "Linus" };
    print ("Greeting: %s\n", Greeter.join_names (names));
}
```

Build and run it:

```sh
valac main.vala greeter.c -X -I.
./main
```

Output:

```
Greeter version: 1.0.0
2 + 3 = 5
Hello, Vala!
Goodbye, Vala!
Greeting: Ada, Grace, Linus
```

## Seeing What valac Generates

If you're not sure how your declarations are being translated, ask `valac` to only generate the C code with the `-C` option and look at the result:

```sh
valac -C main.vala
```

This creates `main.c`. You'll be able to see the exact C function calls that `valac` makes, including any arguments it adds, such as array lengths.

## What's Next?

The declarations in the `Greeter` namespace are what a binding is made of. If you want to use them in more than one program, or share them with other people, move them into a `.vapi` file. Check out [Writing a VAPI Manually](bindings/writing-a-vapi-manually) to learn how.

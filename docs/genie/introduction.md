# Introduction to Genie

This guide is a general introduction to the Genie programming language and a
walk-through of its syntax. It is a port of the official Genie tutorial that
was previously hosted on the GNOME Wiki. The same material is split into
chapters so you can read or link to smaller sections.

## What is Genie?

Genie is a programming language, in the same vein as [Vala](https://vala.dev).
Genie allows for a more modern programming style while being able to
effortlessly create and use [GObjects](https://docs.gtk.org/gobject/) natively
on Linux, \*BSD, Windows or macOS.

The syntax is designed to be clean, clear and concise, and is derived from
numerous modern languages like [Python](https://www.python.org/), Boo,
[D](https://dlang.org/) and [Object Pascal](https://en.wikipedia.org/wiki/Object_Pascal).

Genie is very similar to Vala in functionality but differs in syntax, allowing
the developer to use cleaner and less code to accomplish the same task.

Like Vala, Genie has the following advantages:

- Programs written in Genie have similar performance and resource usage to
  those written directly in Vala and C.
- Genie produces C code that compiles to an executable binary. This means
  Genie has none of the bloat and overhead that comes with many other
  high-level languages which utilize a VM (e.g. Python, Mono, Java).
- Classes in Genie are actually [GObjects](https://docs.gtk.org/gobject/), so
  Genie can be used for creating platform code like widgets and libraries
  where GObjects are required for
  [binding to other languages](https://gi.readthedocs.io/en/latest/).

## Hello World

As Hello World is the de facto first sample program, here is Genie's in all
its glory:

```genie
init
    print "Hello World"
```

Provided you have [Vala installed](../installation-guide), copy and paste the
code above and save it in a file called `hello.gs`. Genie code must be
written in files with the `*.gs` extension.

Compile and run it by simply issuing the following on a UNIX-like command line
in the same directory you saved `hello.gs`:

```shell
$ valac hello.gs
$ ./hello
```

When you want to compile Genie code, you give the compiler a list of the files
required, and the Genie/Vala compiler will work out how they fit together.

If you give `valac` the `-C` switch, it will create a C source code file
called `hello.c` instead of an executable binary file.

## Hello World Explained

As you can see, Genie is pretty clean and concise so the above example will
not need much explaining.

### init Block

An `init` block declared outside of a class or struct is equivalent to a
`main` function in C and only one of these may be present. Any code that needs
to be run at start up should be present here.

### Block Indentation

Block indentation in Genie uses tabs by default. So in the Hello World example
above, a tab appears prior to the keyword `print`.

It is also possible to tell it to use a certain number of spaces in lieu of a
tab by ensuring the first line of the source file contains the following
attribute:

```genie
[indent=2]
init
  print "Hello World"
```

That attribute tells Genie to ignore tabs and use 2 spaces to signify a block
indentation. An `indent=0` means use a tab.

Code examples on this page use spaces for indentation because the original
wiki converts tabs to spaces. When writing your own Genie programs use tabs
unless you have set the `[indent=N]` attribute.

### Case and Unicode

Genie is case sensitive, so be careful when mixing case in your code. Keywords
are always lowercase. Identifiers can be mixed case, but must be in the
Unicode U+0020 to U+007E range. This is the
[ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters)
range as a result of it being compiled into C code. For example:

```genie
init
    pi:double = Math.PI
    print pi.to_string()
```

would compile, but

```genie
init
    π:double = Math.PI
    print π.to_string()
```

would produce an error because the symbol `π` is outside the ASCII printable
range of characters.

Genie can, however, handle Unicode data very well. Here is an example of
Hello World with Unicode characters outside the ASCII range:

```genie
init
    Intl.setlocale( LocaleCategory.ALL, "" )
    print "Hello World! 你好世界"
```

C libraries use the US English, ASCII encoding, by default as part of the C
standard. The `setlocale` command changes this to the locale of the machine
and if this can handle Unicode and has Chinese glyphs installed then the
Chinese version of Hello World will be displayed.


## Chapters

1. [Compiling and Genie's relation to C](introduction/01-compiling) — VAPI, build scripts, static checks, and generated C
2. [Language basics](introduction/02-language-basics) — documentation style, identifiers, values, operators, control flow, scope
3. [Types, functions, and errors](introduction/03-types-functions-and-errors) — delegates, classes, generics, functions, `try` / `except`
4. [Objects](introduction/04-objects) — fields, constructors, properties, methods, signals, inheritance
5. [Collections and C interoperability](introduction/05-collections-and-interop) — operators, collections, C bindings
6. [Concurrency, IPC, and system interfaces](introduction/06-concurrency-and-systems) — async, D-Bus, pipes, signals, UIs
7. [Advanced topics](introduction/07-advanced) — attributes, memory, mixing Genie and Vala, further reading

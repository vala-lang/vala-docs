# 2. Command Line Tool

::: warning Warning

The `valadoc` command line tool may not be bundled with your
installation of the Vala. You will need to find a way to install it on
your operating system.
:::

Usage:

```shell
valadoc [OPTION...] FILE...
```

## 2.1. Essential Options

**-o,--directory=DIRECTORY**

>   Output directory of the generated documentation.
>
>   The name of the directory will also be used as the package name if a
    package name has not been explicitly set and cannot be derived from
    any other sources

**--package-name=NAME**

>   Sets the name of the package of the generated documentation.

**--package-version=VERSION**

>   Sets the package version of the generated documentation.

**--force**

>   Force the documentation to be generated, even if the output
    directory already exists.
>
>   As stated in the [quick start guide](../valadoc-guide/01-00-quick-start), 
    with this option set, generated documentation is only added or overwritten.

**--pkg=PACKAGE...**

>   Specify bindings to include in the documentation via their package
    names.

**--version**

>   Display the version number of the valadoc tool.

**-h, --help**

>   View the list of all of the commands and options that `valadoc`
    supports.
> 
>   You'll see additional options that aren't listed on this page when
    you use this option.

## 2.2. Doclets

A doclet controls the output format of the documentation that
`valadoc` generates. Select one with the `--doclet` option:

**--doclet=NAME**

>   Selects the doclet used to generate the documentation, by name or
    by path to a custom doclet. If this option isn't set, `valadoc`
    uses the `html` doclet.
>
>   See [How `--doclet` is resolved](#_2-2-4-how-doclet-is-resolved)
    for the details.

**-X, --doclet-arg=ARG**

>   Passes an argument through to the selected doclet. Some doclets,
    such as `gtkdoc`, accept their own set of options this way. Run
    `valadoc -X --help` to see the arguments a doclet supports.

`valadoc` includes the following doclets:

### 2.2.1. html

>   Generates a standard set of HTML pages, such as the documentation
    generated in the [quick start guide](../valadoc-guide/01-00-quick-start).
    This is the default doclet, so you don't need to pass `--doclet` to
    use it.

### 2.2.2. devhelp

>   Generates documentation for local API browsers. Alongside the
    HTML pages, it writes a `.devhelp2` index file for each package
    so that these browsers can find and search the documentation
    locally.
>
>   Select it with `--doclet=devhelp`.
>
>   [GNOME Manuals](https://apps.gnome.org/Manuals/) is the API
    browser you'll want to use with this doclet's output today. It's
    part of GNOME's core developer tools and still reads the devhelp
    documentation format, so the `.devhelp2` files this doclet
    generates work with it out of the box.
>
>   [GNOME Devhelp](https://wiki.gnome.org/Apps/Devhelp), the API
    browser this doclet was originally built for, has since been
    archived in favor of Manuals.

### 2.2.3. gtk-doc

>   Generates output in the [gtk-doc](https://gitlab.gnome.org/GNOME/gtk-doc)
    format, historically used to document C-based GNOME libraries.
    Newer libraries typically use
    [gi-docgen](https://gnome.pages.gitlab.gnome.org/gi-docgen/) for
    this purpose instead.
>
>   Select it with `--doclet=gtkdoc`.

### 2.2.4. How `--doclet` is resolved

A doclet is a shared library named `libdoclet.<suffix>`, where the
suffix depends on your platform (`libdoclet.so` on Linux and macOS,
`libdoclet.dll` on Windows). It lives
in a directory of its own, and that directory is what you point
`--doclet` at.

`valadoc` works out which directory to load from the value of
`--doclet` like this:

1. If `--doclet` isn't set, `valadoc` uses the installed `html`
   doclet.
2. If the value is an absolute path, it's used as it is. This is
   how you select a custom doclet.
3. Otherwise, `valadoc` first checks whether a directory with that
   name in the current working directory contains a
   `libdoclet.<suffix>` file. If it does, that directory is used.
4. If it doesn't, the value is treated as the name of a doclet
   that's installed with `valadoc`. That is why bare names such as
   `--doclet=devhelp` and `--doclet=gtkdoc` work.

Once the directory is chosen, `valadoc` opens the library, looks up
its `register_plugin` function, calls it to get a `GLib.Type` and
creates an instance of that type to generate the documentation.

### 2.2.5. Writing a custom doclet

A doclet library exports a C function named `register_plugin`. It
receives a `Valadoc.ModuleLoader` and returns the `GLib.Type` of a
class that implements the `Valadoc.Doclet` interface. That
interface has a single abstract method, `process`, which receives
the settings, the parsed API tree and an error reporter. This is how
the built-in `html` doclet registers itself:

```vala
public Type register_plugin (Valadoc.ModuleLoader module_loader) {
    return typeof (Valadoc.Html.Doclet);
}
```

Here is a minimal custom doclet, saved as `doclet.vala`:

```vala
public class MyDoclet : Object, Valadoc.Doclet {
    public void process (Valadoc.Settings settings,
                         Valadoc.Api.Tree tree,
                         Valadoc.ErrorReporter reporter) {
        print ("Generating documentation in %s\n", settings.path);
    }
}

public Type register_plugin (Valadoc.ModuleLoader module_loader) {
    return typeof (MyDoclet);
}
```

Build it as a shared library named `libdoclet.so` (use the suffix
for your platform) inside its own directory. The name of the
valadoc package to pass to `--pkg` depends on your Vala version, for
example `valadoc-0.56`:

```shell
mkdir -p my-doclet
valac --pkg valadoc-0.56 --library=doclet -X -fPIC -X -shared \
    doclet.vala -o my-doclet/libdoclet.so
```

Then pass the absolute path of that directory to `valadoc`:

```shell
valadoc --doclet=/absolute/path/to/my-doclet \
    --pkg=gio-2.0 -o docs --force source.vala
```

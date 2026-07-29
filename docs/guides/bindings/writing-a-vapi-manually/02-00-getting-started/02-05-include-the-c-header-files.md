# 2.5. Include the C Header Files

The `CCode` attribute `cheader_filename` defines the comma separated
list of headers to include in the generated C. For example,

```vala
[CCode (cheader_filename = "libfoo/foo.h")]
namespace Foo {
    // bindings
}
```

Try to apply headers to namespaces or containing types. Applying it to
an outer context prevents having to repeat it in the inner context.

A library will often have a single header that includes a number of
sub-headers. For an example see the
[https://gitlab.gnome.org/GNOME/glib/-/blob/main/glib/glib.h](https://gitlab.gnome.org/GNOME/glib/-/blob/main/glib/glib.h) 
header. In these cases only the main header file needs to be included.

# Bindings

Mono: runtime bindings (_wrappers_), GAPI tools,
_.sources_ files with XML syntax

Vala: no runtime bindings necessary, Vala method calls are direct C
function calls, mapped by _*.vapi_ (Vala API) files with
Vala syntax, annotated with attributes like `[CCode (...)]`

On Unix systems VAPI files are usually installed in

-   _/usr/share/vala/vapi/_ or
-   _/usr/local/share/vala/vapi/_

Using a vapi file (e.g. foo-1.0.vapi):

```bash
valac source.vala --pkg foo-1.0
```

The Vala compiler will additionally look for a corresponding
[pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/) file
(_*.pc_) with the same base name (e.g.
_foo-1.0.pc_), usually located in

-   _/usr/lib/pkgconfig/_ or
-   _/usr/local/lib/pkgconfig/_

and pass its configuration to the C compiler if existing.

VAPI files are either
[auto-generated](https://wiki.gnome.org/Projects/Vala/Bindings) for
GObject libraries or hand-written for non-GObject libraries.

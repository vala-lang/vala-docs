# 4. Vala Bindings - VAPI

The bindings are located in the vapi directories. What is described
below in most cases also applies to normal .vala files, but not usually
necessary to newly code written in Vala. They exist for the cases when
Vala's chosen values don't fit the API.

Bindings can be generated with the Vala introspection or GObject
Introspection.

## 4.1. Vala Introspection

This strategy was created before the GObject Introspection. There is a
process of replacing it with GObject Introspection going on.

1.  vala-gen-introspect is a program written in C (under
    /gobject-introspection) that will generate the .gi file from C
    headers.
2.  vapigen using the Vala.GIDLParser (under /vapigen) will then
    construct a Vala tree from the .gi file.

## 4.2. GObject Introspection

This will be the preferred way of generating GObject bindings at some
point, deprecating the old vala introspection.

1.  Existing libraries will distribute a .gir file.
2.  vapigen using the Vala.GirParser (under /vala) will then construct a
    Vala tree from the .gir file.

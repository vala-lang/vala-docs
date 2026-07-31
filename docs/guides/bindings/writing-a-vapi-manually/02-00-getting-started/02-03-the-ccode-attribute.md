# 2.3. The CCode Attribute

Vala generates C code in a certain style, examples are Vala following
its own naming conventions and the ordering of automatically generated
parameters. The `CCode` attribute provides fine control of the C code
produced by Vala and will be used extensively when binding a C library
that uses its own conventions.

The `CCode` attribute will be used for:

-   including a C header file
-   converting from Vala naming conventions to a library's naming
    conventions
-   binding a library to Vala's assisted memory management
-   controlling the position of function call arguments, especially Vala
    generated arguments
-   overcoming various edge cases

These are introduced at the relevant points throughout the tutorial. For
a single reference see the 
[Vala Manual Attributes Section](https://gnome.pages.gitlab.gnome.org/vala/manual/attributes.html).

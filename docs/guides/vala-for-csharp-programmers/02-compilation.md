# Compilation

C# (.NET / Mono): Compiled to CIL

```bash
csc source1.cs source2.cs /out:program.exe
gmcs source1.cs source2.cs -out:program.exe
```

Vala: compiled to native code via C code as intermediate code

```bash
valac source1.vala source2.vala -o program
```

Vala's standard object system is
[GObject](https://docs.gtk.org/gobject/), compiled Vala libraries are
valid C libraries.

## Using Packages

Mono: _-pkg:_

```bash
gmcs source.cs -pkg:gtk-sharp-2.0 -out:program.exe
```

Vala: _--pkg_

```bash
valac source.vala --pkg gtk+-2.0 -o program
```

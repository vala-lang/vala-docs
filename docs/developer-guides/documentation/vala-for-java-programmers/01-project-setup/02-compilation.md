# 1.2. Compilation

Java: compiled to JVM byte code (`.class` files)

```bash
javac SourceFile1.java SourceFile2.java
```

Vala: compiled to native code via C code as intermediate code

```bash
valac source1.vala source2.vala -o program
```

Vala's standard object system is [GObject](https://docs.gtk.org/gobject/). Compiled Vala libraries are valid C libraries.

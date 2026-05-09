# 1.3. Using Libraries

Java: `.jar` files

```bash
javac -classpath foo-1.0.jar;bar-3.0.jar SourceFile.java
```

Vala: packages (C libraries with `.vapi` files)

```bash
valac --pkg foo-1.0 --pkg bar-3.0 source.vala
```

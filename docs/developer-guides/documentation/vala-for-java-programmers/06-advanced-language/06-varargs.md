# 6.6. Varargs

Java:

```java
String format(String pattern, Object... arguments) {
    // ...
}
```

Vala: C-style varargs, not type-safe

```vala
string format (string pattern, ...) {
    var l = va_list ();
    // ...
}
```

For more information, see [Variable-length argument lists](/tutorials/programming-language/main/04-00-advanced-features/04-11-variable-length-argument-lists) in the Vala Tutorial. Type-safe varargs planned with `params` keyword.

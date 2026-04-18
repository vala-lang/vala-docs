# 6.8. Not Available

- No `final` classes (planned as sealed classes)
- No static classes (use nested namespaces instead)
- No anonymous inner classes (use delegates + closures instead)
- No constraints on generic type parameters
- No implicit conversion of objects to strings (no general `toString()`). However, types that have a `to_string()` method are supported by string templates (`@"..."`)
- No named breaks / labels
- No `strictfp`, `transient` keywords

# 3.11. Run-Time Type Information

Since Vala classes are registered at runtime and each instance carries
its type information you can dynamically check the type of an object
with the `is` operator:

```vala
bool b = object is SomeTypeName;
```

You can get the type information of `Object` instances with the
`get_type()` method:

```vala
Type type = object.get_type();
stdout.printf("%s\n", type.name());
```

With the `typeof()` operator you can get the type information of a type
directly. From this type information you can later create new instances
with `Object.new()`:

```vala
Type type = typeof(Foo);
Foo foo = (Foo) Object.new(type);
```

Which constructor will be called? It's the `construct {}` block that
will be described in the section about gobject-style construction.

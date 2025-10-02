# Object Base Class

C#: implicit inheritance from `object` (System.Object)

```csharp
class Foo
{
    // ...
}
```

Vala: no implicit inheritance from `Object` (GLib.Object)

```vala
class Foo : Object {
    // ...
}
```

What happens if you don't inherit from `Object`? Nothing terrible.
These classes will be slightly more lightweight, however, they will lack
some features such as property change notifications, and your objects
won't have a common base class. Usually inheriting from `Object` is
what you want.

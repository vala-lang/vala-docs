# Resource Disposing

C#: destructors are non-deterministic, implement `IDisposable` instead,
resource control with `using`

```csharp
class MyResource : IDisposable
{
    public void Dispose()
    {
        // ...
    }
}
/* Usage: */
using (var res = new MyResource()) {
    // ...
}
```

Vala: destructors are deterministic, you can implement the
[RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization)
pattern with destructor

```vala
class MyResource : Object {
    ~MyResource () {
        // ...
    }
}
/* Usage: */
{
    var res = new MyResource ();
    // ...
}
```

Resource is disposed as soon as it goes out of scope.

# Constructor Chaining

## Base Constructor Chain-Up

C#

```csharp
class Foo : Bar
{
    public Foo() : base(42)
    {
        // ...
    }
}
```

Vala: base call inside constructor

```vala
class Foo : Bar {
    public Foo () {
        base (42);
        // ...
    }
}
```

## Multiple Constructor Chaining

C#

```csharp
class Foo
{
    public Foo() : this("bar") { }
    public Foo(string bar) { }
}
```

Vala

```vala
class Foo : Object {
    public Foo () {
        this.with_bar ("bar");
    }

    public Foo.with_bar (string bar) {
    }
}
```

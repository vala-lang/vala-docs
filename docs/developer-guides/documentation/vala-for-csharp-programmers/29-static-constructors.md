# Static Constructors

C#: called before the first instance is created or any static members
are referenced

```csharp
class Foo
{
    static Foo()
    {
        System.Console.WriteLine("Static constructor invoked.");
    }
}
```

Vala: `static construct { }` block. The first time that a class, or any
subclass of it, is instantiated, this code is run. It is guaranteed that
this code will run exactly once in a program where such a class is used.

```vala
class Foo : Object {
    static construct {
        stdout.printf ("Static constructor invoked.\n");
    }
}
```

Additionally a Vala class can have a class construct { } block. This
block will be executed once at the first use of its class, and once at
the first use of each subclass of this class.

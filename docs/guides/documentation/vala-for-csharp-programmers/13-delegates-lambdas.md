# Delegates / Lambdas

C#

```csharp
delegate void DelegateType(string s);

void Method(string s)
{
    Console.WriteLine(s);
}

// Original style
DelegateType d1 = new DelegateType(Method);

// Direct method assignment
DelegateType d2 = Method;

// C# 2.0 style
DelegateType d3 = delegate(string s) => { Console.WriteLine(s); };

// Lambda Expression with types (C# 3.0)
DelegateType d4 = (string s) => { Console.WriteLine(s); };

// Lambda Expression without types (C# 3.0)
DelegateType d5 = (s) => { Console.WriteLine(s); };
```

Vala: either lambda expression without types or direct method assignment
(without `new ...`), no C# 2.0 style

```vala
delegate void DelegateType (string s);

void method (string s) {
    stdout.printf ("%s\n", s);
}
DelegateType d1 = method;
DelegateType d2 = (s) => { stdout.printf ("%s\n", s); };
```

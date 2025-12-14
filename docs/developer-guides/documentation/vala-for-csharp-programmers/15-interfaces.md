# Interfaces

C#

```csharp
interface IFoo
{
    void Foo(int i);
    int Bar(string s, double d);
}
```

Vala: `public abstract` necessary

```vala
interface Foo {
    public abstract void foo (int i);
    public abstract int bar (string s, double d);
}
```

Why? Because Vala interfaces may have non-abstract methods (i.e. methods
with implementations) and `private` methods! This means Vala interfaces
can be used as [mixins](https://en.wikipedia.org/wiki/Mixin) (restricted
form of multiple inheritance).

'I'-prefix not common in GObject world but allowed

C#: interface inheritance

```csharp
interface IfaceA
{
    void MethodA();
}

interface IfaceB : IfaceA
{
    void MethodB();
}

class Demo : IfaceB
{
    public void MethodA() { }
    public void MethodB() { }
}
```

Vala: interface prerequisites

```vala
interface IfaceA : Object {
    public abstract void method_a ();
}

interface IfaceB : Object, IfaceA {
    public abstract void method_b ();
}

class Demo : Object, IfaceA, IfaceB {
    public void method_a () { }
    public void method_b () { }
}
```

Interfaces in Vala may not inherit from other interfaces, but they may
declare other interfaces to be prerequisites, which works in roughly the
same way. Interfaces may also have a class as a prerequisite. This is
often used to ensure that an instance of an interface is also an
`Object` subclass. The fact that interfaces can not inherit from other
interfaces is mostly only a technical distinction - in practice Vala's
system works the same as C# in this area, but with the extra feature of
prerequsite classes.

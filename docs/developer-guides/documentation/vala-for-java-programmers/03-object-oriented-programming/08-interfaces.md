# 3.8. Interfaces

Java: interface methods are implicitly abstract

```java
public interface Foo {
    public void foo(int i);
    public int bar(String s, double d);
}
```

Vala: `abstract` explicitly necessary

```vala
public interface Foo {
    public abstract void foo (int i);
    public abstract int bar (string s, double d);
}
```

Why? Because Vala interfaces may have non-abstract methods (i.e. methods with implementations)! This means Vala interfaces can be used as [mixins](https://en.wikipedia.org/wiki/Mixin) (restricted form of multiple inheritance).

Vala interfaces may have static methods, e.g. factory methods.

Java: interface inheritance, default methods (JDK 8+)

```java
public interface IfaceA {
    public void methodA();
}

public interface IfaceB extends IfaceA {
    public void methodB();
}

public class Demo implements IfaceB {
    public void methodA() { }
    public void methodB() { }
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

Interfaces in Vala may not inherit from other interfaces, but they may declare other interfaces to be prerequisites, which works in roughly the same way. Interfaces may also have a class as a prerequisite. This is often used to ensure that an instance of an interface is also an `Object` subclass. The fact that interfaces can not inherit from other interfaces is mostly only a technical distinction - in practice Vala's system works the same as Java in this area, but with the extra feature of prerequisite classes.

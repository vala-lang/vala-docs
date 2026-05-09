# 3.6. Overriding

Java: all methods are virtual (overridable) by default, `final` prevents overriding

```java
public class Super {
    public int myMethod(int x, int y) { }
    public final void anotherMethod() { }
}

public class Sub extends Super {
    @Override
    public int myMethod(int x, int y) {
        super.myMethod(x, y);
        // ...
    }
}
```

Vala: all methods are non-virtual (not overridable) by default, overriding must be explicitly allowed with `virtual`. So it's the other way round. Vala has `override` keyword instead of `@Override` annotation, and it's not optional

```vala
public class Super : Object {
    public virtual int my_method (int x, int y) { }
    public void another_method () { }
}

public class Sub : Super {
    public override int my_method (int x, int y) {
        base.my_method (x, y);
        // ...
    }
}
```

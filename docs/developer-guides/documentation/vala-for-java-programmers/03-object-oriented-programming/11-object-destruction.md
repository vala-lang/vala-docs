# 3.11. Object Destruction

Java: finalizers, not deterministic

```java
public class Foo {
    @Override
    protected void finalize() {
    }
}
```

Vala: destructors, deterministic

```vala
public class Foo : Object {
    ~Foo () {
    }
}
```

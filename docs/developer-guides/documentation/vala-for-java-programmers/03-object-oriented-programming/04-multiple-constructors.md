# 3.4. Multiple Constructors

Java: constructor overloading

```java
public class Foo {
    public Foo() { }
    public Foo(int foo) { }
    public Foo(String bar) { }
}
```

```java
new Foo();
new Foo(42);
new Foo("hello");
```

Vala: named constructors instead of constructor overloading

```vala
public class Foo : Object {
    public Foo () { }
    public Foo.with_foo (int foo) { }
    public Foo.from_bar (string bar) { }
}
```

```vala
new Foo ();
new Foo.with_foo (42);
new Foo.from_bar ("hello");
```

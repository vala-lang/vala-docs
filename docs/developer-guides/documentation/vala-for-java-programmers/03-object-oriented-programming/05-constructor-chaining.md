# 3.5. Constructor Chaining

Java: `this()`

```java
class Foo {
    public Foo() {
        this("bar");
    }

    public Foo (String bar) {
    }
}
```

Vala: `this ()` or `this.name_addition ()`

```vala
class Foo : Object {
    public Foo () {
        this.with_bar ("bar");
    }

    public Foo.with_bar (string bar) {
    }
}
```

# 3.10. Method Hiding

By using the `new` modifier you can hide an inherited method with a new
method of the same name. The new method may have a different signature.
Method hiding is not to be confused with method overriding, because
method hiding does not exhibit polymorphic behaviour.

```vala
class Foo : Object {
    public void my_method() { }
}

class Bar : Foo {
    public new void my_method() { }
}
```

You can still call the original method by casting to the base class or
interface:

```vala
void main() {
    var bar = new Bar();
    bar.my_method();
    (bar as Foo).my_method();
}
```

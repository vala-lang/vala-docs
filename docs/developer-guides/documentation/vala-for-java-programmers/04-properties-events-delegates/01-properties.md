# 4.1. Properties

Java: Bean convention, `getX()` and `setX()` methods

```java
public class Person {
    private int age = 32;

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public static void main(String[] args) {
        Person p = new Person();
        p.setAge(p.getAge() + 1);
    }
}
```

Vala: language support for properties, `get { }` and `set { }` blocks, can be accessed like fields

```vala
public class Person : Object {
    private int _age = 32;

    public int age {
        get { return _age; }
        set { _age = value; }
    }
}

void main () {
    var p = new Person ();
    p.age++;
}
```

Or even shorter for the standard implementation:

```vala
public class Person : Object {
    public int age { get; set; default = 32; }
}
```

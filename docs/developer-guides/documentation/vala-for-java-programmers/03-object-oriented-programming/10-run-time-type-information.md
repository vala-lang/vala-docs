# 3.10. Run-Time Type Information

## Dynamic Type Check

Java: `obj instanceof Foo`

Vala: `obj is Foo`

## Dynamic Type Casting

Java: `Foo foo = (obj instanceof Foo) ? (Foo) obj : null`

Vala: `Foo foo = obj as Foo`

Of course, `(obj is Foo) ? (Foo) obj : null` would do as well.

## Getting Type Information

Java

```java
Class c = Foo.class;
System.out.println(c.getName());
Foo o = (Foo) c.newInstance();
```

Vala: `typeof ()` operator

```vala
Type t = typeof (Foo);
stdout.printf ("%s\n", t.name ());
Foo o = (Foo) Object.new (t);
```

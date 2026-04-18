# 6.1. Structs

A struct is a concept not available in Java. To understand the difference between a struct and a class we will look at two implementations of a `Point` type, once as class and once as struct:

```vala
class Point {
    public int x;
    public int y;

    public Point (int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void print () {
        stdout.printf ("(%d, %d)", this.x, this.y);
    }
}
```

```vala
struct Point {
    public int x;
    public int y;

    public Point (int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void print () {
        stdout.printf ("(%d, %d)", this.x, this.y);
    }
}
```

As you can see, the only difference is the `struct` keyword instead of `class`. However, struct types have different semantics than class types:

```vala
// Class
var p1 = new Point (2, 4);  // will allocate p1 on the heap
var p2 = p1;                // assignment by reference
p2.x = 3;
p1.print ();                // => (3, 4)   p1 changed as well
p2.print ();                // => (3, 4)
var p3 = new Point (3, 4);
p2 == p3;                   // => false (same values, but different references)
```

```vala
// Struct
var p1 = Point (2, 4);      // will allocate p1 on the stack
var p2 = p1;                // copied
p2.x = 3;
p1.print ();                // => (2, 4)   p1 did not change
p2.print ();                // => (3, 4)
var p3 = Point (3, 4);
p2 == p3;                   // => true (same values)
```

Structs are not allocated on the heap (that's why the `new` keyword is not used for the creation of structs). The most important difference is that structs are copied on assignment. They are value types, not reference types, i.e. they basically behave like `int`, `double`, etc.

Structs don't support inheritance and signals, and they can't implement interfaces.

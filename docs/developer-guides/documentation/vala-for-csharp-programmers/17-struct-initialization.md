# Struct Initialization

C#

```csharp
var p1 = new Point();
var p2 = new Point() { X = 2, Y = 3 };
Point p3;
p3.X = 2;
p3.Y = 3;
```

Vala: structs are instantiated without using the `new` operator.

```vala
var p1 = Point ();
var p2 = Point () { x = 2, y = 3 };
Point p3 = { 2, 3 };
```

Vala structs must be initialized before first use. A Vala struct cannot
implement interfaces.

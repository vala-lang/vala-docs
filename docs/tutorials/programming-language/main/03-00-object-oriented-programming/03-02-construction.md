# 3.2. Construction

Vala supports two slightly different construction schemes: the
Java/C#-style construction scheme which we will focus on for now, and
the GObject-style construction scheme which will be described in a
section at the end of the chapter.

Vala does not support constructor overloading for the same reasons that
method overloading is not allowed, which means a class may not have
multiple constructors with the same name. However, this is not a problem
because Vala supports **named constructors**. If you want to offer
multiple constructors, you may give them different name additions:

```vala
public class Button : Object {

    public Button () {
    }

    public Button.with_label (string label) {
    }

    public Button.from_stock (string stock_id) {
    }
}
```

Instantiation is analogous:

```vala
new Button ();
new Button.with_label ("Click me");
new Button.from_stock (Gtk.STOCK_OK);
```

You may chain constructors via `this ()` or `this.{name_extension} ()`:

```vala
public class Point : Object {
    public double x;
    public double y;

    public Point (double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Point.rectangular (double x, double y) {
        this (x, y);
    }

    public Point.polar (double radius, double angle) {
        this.rectangular (radius * Math.cos (angle), radius * Math.sin (angle));
    }
}

void main () {
    var p1 = new Point.rectangular (5.7, 1.2);
    var p2 = new Point.polar (5.7, 1.2);
}
```

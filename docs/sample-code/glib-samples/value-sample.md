# GValue Sample

This sample shows [`GLib.Value`](https://valadoc.org/gobject-2.0/GLib.Value.html): Vala can assign
plain values into a `Value`, reset it, and read values back with casts.

Save as `valuesample.vala`:

```vala
void main () {
    Value v;  // a GLib.Value

    v = 5;  // an integer auto-boxed into a Value
    print ("value: %d\n", (int) v);  // unboxing via cast

    // reset to its default value
    v.reset ();
    print ("value: %d\n", (int) v);  // unboxing via cast

    v = "hello";  // a string auto-boxed into a Value
    print ("value: %s\n", (string) v);  // unboxing via cast
}
```

## Compile and run

```shell
valac valuesample.vala
./valuesample
```

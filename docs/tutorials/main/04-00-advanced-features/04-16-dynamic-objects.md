# 4.16. Dynamic Objects

Vala normally checks every property, method and signal you use against the
bindings (VAPI files) of the library at compile time. Sometimes a
GObject-based library is only partly described by its bindings, so members
that exist at run time can't be found by the compiler. With the `dynamic`
keyword, an object can be treated as if it did not have all of its
properties and signals specified.

Without `dynamic`, using a member the compiler doesn't know about is an
error:

```vala
Object action = new SimpleAction ("greet", null);
action.enabled = false;   // error: The name `enabled' does not exist in the context of `GLib.Object?'
```

Declaring the variable as `dynamic` defers the lookup to run time:

```vala
void on_activate (Object source, Variant? parameter) {
    print ("activated\n");
}

void main () {
    dynamic Object action = new SimpleAction ("greet", null);

    // Read and write a property
    print ("name: %s\n", (string) action.name);
    action.enabled = true;

    // Connect to a signal and invoke it
    action.activate.connect (on_activate);
    action.activate.emit (null);
}
```

Compile with `valac --pkg gio-2.0`.

Properties and signals are looked up by name through GObject when the
program runs. Because of that, the compiler can no longer help you: if you
misspell a property name, the program compiles and GLib reports a critical
warning when that line is executed.

## 4.16.1. Dynamic Signals

A signal on a `dynamic` object is connected to with `connect ()`, like any
other signal. To invoke it, use `emit ()`. The `emit ()` call makes it clear
that a signal is meant rather than a method with the same name:

```vala
dynamic Gst.Element appsink = Gst.ElementFactory.make ("appsink", "my_src");
appsink.max_buffers = 0;
appsink.eos.connect (on_eos);
Gst.Sample? res = appsink.pull_sample.emit ();
```

This example sets a property, connects a handler to a signal and invokes
the `pull_sample` signal, which returns a value.

The `.emit ()` syntax is not limited to dynamic objects. It also works on
signals the compiler knows about, if you prefer it to calling the signal like
a method:

```vala
t1.sig_1.emit (5);   // same as: t1.sig_1 (5);
```

::: info Note

Lambda expressions can't be used as handlers for dynamic signals; the
compiler reports "Lambdas are not allowed for dynamic signals". Pass the
name of a method instead, as `on_activate` and `on_eos` are above.
:::

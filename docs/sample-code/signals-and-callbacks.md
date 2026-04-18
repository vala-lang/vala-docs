# Signals and Callbacks

A convenient way for objects to inform each other about events are so-called
_signals_. They are especially useful for GUI programming. For example, a button
may inform other objects through the signal _clicked_ about the fact that it has
been clicked on.

You define signals in a class and interested parties register their callback
functions to these signals of an instance. The instance can emit the signal in
the style of a method call and each
callback function (also referred to as _handler_) connected to
the signal will get called.

In languages like Java which don't offer a special signal mechanism you have to
implement this functionality usually with _listeners_, representing
the same concept.

```vala
class Foo : Object {
    public signal void some_event ();   // definition of the signal

    public void method () {
        some_event ();                  // emitting the signal (callbacks get invoked)
    }
}

void callback_a () {
    stdout.printf ("Callback A\n");
}

void callback_b () {
    stdout.printf ("Callback B\n");
}

void main () {
    var foo = new Foo ();
    foo.some_event.connect (callback_a);      // connecting the callback functions
    foo.some_event.connect (callback_b);
    foo.method ();
}
```

Note that a class with signals always has to inherit from `Object` or one of its
sub-classes. Callback functions get connected to a signal by calling ``.connect()``
on the signal.

A signal may also have multiple parameters. The signatures of the
callback functions have to match the one of the signal, except
that you may either leave out as many trailing parameters of the
signature as you like or provide the signal source
additionally as the first parameter of the callback function.

For Example:

```vala
public class Foo : Object {
    public signal void some_event (int x, int y, double z);
    // ...
}
```

The following callback signatures now match the signal:

```vala
void on_some_event ()
void on_some_event (int x)
void on_some_event (int x, int y)
void on_some_event (int x, int y, double z)
void on_some_event (Foo source, int x, int y, double z)
```

e names of the parameters and of the callback function may get chosen freely, of
course. The source object may help to distinguish in the case that you
connect one callback to different instances of the same type.

With the following syntax you can connect signals to anonymous
functions (lambdas) as well:

```vala
foo.some_event.connect ((source, x, y, z) => {
    stdout.printf ("%d %d %g\n", x, y, z);
});
```

Note that there are no type declarations in the parameter lists
of anonymous functions. The compiler automatically infers them from
the definition of the signal.

## Disconnecting Signals

You can disconnect signal callbacks in one of two ways.
The first and simple one is to call `myobject.mysignal.disconnect(callback)`.

The more advanced way (which you'll need for closures for example)
is to store the return value of the `connect()` call somewhere.
Its a ulong containing a signal handler id. Pass this signal handler id to
`myobject.disconnect()` - note that we are invoking `disconnect()` on
the object and not on the signal this time around.

```vala
foo.some_event.connect (on_some_event);
foo.some_event.disconnect (on_some_event);

ulong handler_id = foo.some_event.connect (() => { /* ... */ });
foo.disconnect (handler_id);
```

## Default Signal Handlers and connect_after()

A signal declared virtual may have a default signal handler implementation:

```vala
class Demo : Object {
    public virtual signal void sig () {
        stdout.printf ("default handler\n");
    }
}
```

Signal handlers are connected before (i.e. executed before) the
default signal handler. If you want to connect a signal
after the default handler use `connect_after()`:

```vala
void main () {
    var demo = new Demo ();
    demo.sig.connect (() => stdout.printf ("before\n"));
    demo.sig.connect_after (() => stdout.printf ("after\n"));
    demo.sig (); // emit signal
}
```

```shell
before
default handler
after
```

The default handler can be overridden by a subclass:

```vala
class Sub : Demo {
    public override void sig () {
        stdout.printf ("overridden default handler\n");
    }
}
```

## What about user_data?

If you're coming from a GObject/C background you might be wondering
how to pass a `user_data` argument to a signal handler.
The answer is: Vala uses the `user_data` argument
implicitly in the generated C code, either for the
context of a closure or for the instance reference (`this`) of
an instance method. So you can just access either
the outer data from within a closure or any instance
variable of the handler's class.

```vala
class Foo {
    public signal void sig ();
}

class Bar {
    private int data = 42;

    public void handler () {
        stdout.printf ("Data via instance: %d\n", this.data);
    }
}

void main () {
    var foo = new Foo ();

    int data = 42;
    foo.sig.connect (() => {        // 'user_data' in C code = variables from outer context
        stdout.printf ("Data via closure: %d\n", data);
    });

    var bar = new Bar ();
    foo.sig.connect (bar.handler);  // 'user_data' in C code = 'bar'

    // Emit signal
    foo.sig ();
}
```

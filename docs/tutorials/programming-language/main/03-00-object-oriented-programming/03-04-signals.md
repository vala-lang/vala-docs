# 3.4. Signals

Signals are a system provided by the Object class in GLib, and made
easily accessible by Vala to all descendants of Object. A signal is
recognisable to C# programmers as an event, or to Java programmers as an
alternative way of implementing event listeners. In short, a signal is
simply a way of executing an arbitrary number of externally identical
methods (i.e. ones with the same signature) at approximately the same
time. The actual methods of execution are internal to *gobject*, and not
important to Vala programs.

A signal is defined as a member of a class, and appears similar to a
method with no body. Signal handlers can then be added to the signal
using the `connect ()` method. In order to dive right in at the deep end,
the following example also introduces lambda expressions, a very useful
way to write signal handling code in Vala:

```vala
public class Test : GLib.Object {

    public signal void sig_1 (int a);

    public static int main (string[] args) {
        Test t1 = new Test ();

        t1.sig_1.connect ((t, a) => {
            stdout.printf ("%d\n", a);
        });

        t1.sig_1 (5);

        return 0;
    }
}
```

This code introduces a new class called "Test", using familiar syntax.
The first member of this class is a signal, called "sig_1", which is
defined as passing an integer. In the main method of this program, we
first create a Test instance - a requirement since signals always belong
to instances of classes. Next, we assign to our instance's "sig_1"
signal a handler, which we define inline as a lambda expression. The
definition states that the method will receive two arguments which we
call "t" and "a", but do not provide types for. We can be this terse
because Vala already knows the definition of the signal and can
therefore understand what types are required.

The reason there are two parameters to the handler is that whenever a
signal is emitted, the object on which it is emitted is passed as the
first argument to the handler. The second argument is that one that the
signal says it will provide.

Finally, we get impatient and decide to emit a signal. We do this by
calling the signal as though it was a method of our class, and allow
gobject to take care of forwarding the message to all attached handlers.
Understanding the mechanism used for this is not required to use signals
from Vala.

NB: Currently the `public` access modifier is the only possible option -
all signals can be both connected to and emitted by any piece of code.

Signals can be annotated with any combination of flags:

```vala
[Signal (action=true, detailed=true, run=true, no_recurse=true, no_hooks=true)]
public signal void sig_1 ();
```

More samples in [Signal Samples](https://wiki.gnome.org/Projects/Vala/SignalsAndCallbacks).

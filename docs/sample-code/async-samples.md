# Async Method Samples

These examples show different ways to use asynchronous methods in Vala. The
[Asynchronous Methods](../tutorials/programming-language/main/04-00-advanced-features/04-08-asynchronous-methods)
chapter in the main tutorial explains how `async`, `yield`, `.begin`, and `.end`
work. For more file and I/O oriented examples, see [GIO Samples](gio-samples).

Build the programs below with GIO, for example:

```shell
valac --pkg=gio-2.0 example.vala
```

## GIO Example

This sample calls GIO asynchronous APIs from inside an `async` method using
`yield`.

```vala
// Example with GIO asynchronous methods

async void list_dir () {
    var dir = File.new_for_path (Environment.get_home_dir ());
    try {
        var e = yield dir.enumerate_children_async (
            FileAttribute.STANDARD_NAME, 0, GLib.Priority.DEFAULT, null);
        while (true) {
            var files = yield e.next_files_async (
                10, GLib.Priority.DEFAULT, null);
            if (files == null) {
                break;
            }

            foreach (var info in files) {
                print ("%s\n", info.get_name ());
            }
        }
    } catch (Error err) {
        warning ("Error: %s\n", err.message);
    }
}

void main () {
    var loop = new GLib.MainLoop ();
    list_dir.begin ((obj, res) => {
        list_dir.end (res);
        loop.quit ();
    });
    loop.run ();
}
```

## Background Thread Example

This sample runs work on a background thread and resumes the `async` method
when the thread schedules the callback on the main context. It also shows how
exceptions from an `async` method surface at `.end()`.

On older Vala releases you may need `--target-glib` to match your GLib version
(for example `--target-glib 2.44`) to silence deprecation or binding warnings.

```vala
// Async method to run a slow calculation in a background thread

/*
 * With Vala 0.38+ this should compile without warnings, although you may want
 * to use the valac option `--target-glib 2.44` in your own code for maximum 
 * compatibility with GTask callbacks.
 * With Vala 0.36 use `--target-glib 2.44` or `--target-glib 2.36` to avoid the 
 * GSimpleAsyncResult deprecated warnings
 * With Vala before 0.32 use `--target-glib 2.32` to expose the bindings for the Thread constructors
 * Vala 0.16 is the minimum version required
 */

async double do_calc_in_bg (double val) throws ThreadError {
    SourceFunc callback = do_calc_in_bg.callback;
    double[] output = new double[1];

    // Hold reference to closure to keep it from being freed whilst
    // thread is active.
    ThreadFunc<bool> run = () => {
        // Perform a dummy slow calculation.
        // (Insert real-life time-consuming algorithm here.)
        double result = 0;
        for (int a = 0; a < 100000000; a++) {
            result += val * a;
        }

        // Pass back result and schedule callback
        output[0] = result;
        GLib.Idle.add ((owned) callback);
        return true;
    };
    new Thread<bool> ("thread-example", run);

    // Wait for background thread to schedule our callback
    yield;
    return output[0];
}

void main (string[] args) {
    var loop = new GLib.MainLoop ();
    do_calc_in_bg.begin (0.001, (obj, res) => {
        try {
            double result = do_calc_in_bg.end (res);
            stderr.printf ("Result: %f\n", result);
        } catch (ThreadError e) {
            string msg = e.message;
            stderr.printf ("Thread error: %s\n", msg);
        }

        loop.quit ();
    });
    loop.run ();
}
```

## Generator Example

This pattern, based on Luca Bruno's generator approach, uses `async` methods to
write iterator-style code. It can run without driving a `MainLoop`.

```vala
abstract class Generator<G> {
    private bool consumed;
    private unowned G value;
    private SourceFunc callback;

    protected Generator () {
        helper.begin ();
    }

    private async void helper () {
        yield generate ();
        consumed = true;
    }

    protected abstract async void generate ();

    protected async void feed (G value) {
        this.value = value;
        this.callback = feed.callback;
        yield;
    }

    public bool next () {
        return !consumed;
    }

    public G get () {
        var result = value;
        callback ();
        return result;
    }

    public Generator<G> iterator () {
        return this;
    }
}

class IntGenerator : Generator<int> {
    protected override async void generate () {
        for (int i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                yield feed (i);
            }
        }
    }
}

void main (string[] args) {
    var gen = new IntGenerator ();

    foreach (var item in gen) {
        stdout.printf ("Result: %d\n", item);
    }
}
```

## Async Sleep Example

A `nap()` helper that waits without blocking the main loop, so the UI (or other
idle work) can keep running.

```vala
public async void nap (uint interval, int priority = GLib.Priority.DEFAULT) {
    GLib.Timeout.add (interval, () => {
        nap.callback ();
        return false;
    }, priority);
    yield;
}

private async void do_stuff () {
    yield nap (1000);
}

private static int main (string[] args) {
    GLib.MainLoop loop = new GLib.MainLoop ();
    do_stuff.begin ((obj, async_res) => {
        loop.quit ();
    });
    loop.run ();

    return 0;
}
```

## Simple Example

A minimal `async` method that resumes from an idle callback and returns a value
to the `.end()` caller.

```vala
// Demo class with async function

class Test.Async : GLib.Object {
    public async string say (string sentence) {
        GLib.Idle.add (this.say.callback);
        yield;
        return sentence;
    }

    public static int main (string[] args) {
        Test.Async my_async = new Test.Async ();
        GLib.MainLoop main_loop = new GLib.MainLoop ();
        my_async.say.begin ("Hello World!", (obj, res) => {
            string sentence = my_async.say.end (res);
            print ("%s\n", sentence);
            main_loop.quit ();
        });
        main_loop.run ();
        return 0;
    }
}
```


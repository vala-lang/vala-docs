# Concurrency, IPC, and system interfaces

## Concurrency

Concurrency in a computer program is running multiple, independent tasks
within a given time frame. Physically this can be completed on a single
processor, but can also be completed on multiple processors in parallel.
Genie makes use of GLib's concurrency functions to implement this.

### GLib's Event Loop - GMainContext

`GMainContext` is usually wrapped in a higher level function, for example
GLib's `MainLoop` or GTK's `MainLoop`.

GLib's event loop is unrelated to Genie's `event` keyword. The `event`
keyword relates to synchronous communication between objects.

### Asynchronous Methods

Asynchronous methods are methods whose execution can be paused and resumed
under the control of the programmer. They are often used in the main thread
of an application where a method needs to wait for an external slow task to
complete, but must not stop other processing from happening. When the method
has to wait, it gives control of the CPU back to its caller (i.e. it yields),
but it arranges to be called back to resume execution when data becomes
ready.

Asynchronous methods are normally used with a GLib main loop running, because
idle callbacks are used to handle some of the internal callbacks.

Async methods in Genie use the GIO library to handle the callbacks, so must
be built with the `--pkg=gio-2.0` option.

An asynchronous method is defined with the `async` keyword. For example:

```genie
def async display_jpeg(fname : string)
    // Some code to load JPEG in a background thread here and display it when loaded
```

or

```genie
def async fetch_webpage(url : string, out text : string) : int raises IOError
    // Some code to fetch a webpage asynchronously and when ready return the
    // HTTP status code and put the page contents in 'text'
    text = result
    return status
```

The method may take arguments and return a value like any other method. It
may use a `yield` statement at any time to give control of the CPU back to
its caller.

An async method is called like that:

```genie
display_jpeg("test.jpg")
```

or

```genie
display_jpeg.begin("test.jpg")
```

These forms are equivalent and start the async method with the given
arguments.

When an asynchronous method starts running, it takes control of the CPU
until it reaches its first `yield` statement, at which point it returns to
the caller. When the method is resumed, it continues execution immediately
after that `yield` statement.

A common way of using `yield` is when calling another asynchronous method,
for example:

```genie
yield display_jpeg(fname)
```

or

```genie
text : string
var status = yield fetch_webpage(url, out text)
```

In both cases, the calling method gives up control of the CPU and does not
resume until the called method completes. The `yield` statement automatically
registers a callback with the called method to make sure that the caller
resumes correctly.

## Inter-Process Communication

### GVariant

The Vala compiler contains a module to generate
[`GVariant`](https://valadoc.org/glib-2.0/GLib.Variant). This is used in
Genie by casting to `Variant`. `GVariant` is used by GLib libraries for
serialization and deserialization, for example in D-Bus APIs and `GSettings`.

### D-Bus

The `[DBus]` attribute makes using the GDBus implementation of D-Bus easy in
Genie.

### Environment Variables

GLib has functions to access
[environment variables](https://en.wikipedia.org/wiki/Environment_variable).
These functions are cross-platform and work on Windows and POSIX
environments, such as Linux and macOS. They are bound in Vala within the
[`GLib.Environment`](https://valadoc.org/glib-2.0/GLib.Environment.html)
namespace. The following Genie code example lists all the variables in its
environment using a string template to format the output:

```genie
init
    var all_variables = Environment.list_variables()
    for var item in all_variables
        print( @"$(item) = $(Environment.get_variable(item))" )
```

POSIX systems have the `PWD` environment variable set when the program is
run from a shell. This variable contains the present working directory:

```genie
init
    print( @"Present working directory: $(Environment.get_variable( "PWD" ))" )
```

The GLib function to retrieve a variable's value returns `null` if the
variable is unknown. In Genie a null check would be needed. In this next
example an empty string is used if there is no value:

```genie
init
    var value = Environment.get_variable( "ENVIRONMENT_VARIABLE_THAT_DOES_NOT_EXIST" )
    if value == null
        value = ""
    print( "Environment variable value: " + value )
```

### Running External Programs

Use [`GLib.Subprocess`](https://valadoc.org/gio-2.0/GLib.Subprocess.html).
For low-level control use
[`GLib.SubprocessLauncher`](https://valadoc.org/gio-2.0/GLib.SubprocessLauncher.html).
These APIs are both part of GIO so you will need to compile with
`--pkg gio-2.0`.

## Pipes

::: info TODO

Add info on pipes

:::

## Handling C/POSIX System Signals

::: info TODO

Add info on andling C/POSIX System Signals

:::

## User Interfaces

### Command Line Interfaces

Use GLib's
[`OptionContext`](https://valadoc.org/glib-2.0/GLib.OptionContext) for option
parsing.

### Graphical User Interfaces

Genie has excellent bindings to GTK. This includes the `[GtkTemplate]`
attribute for accessing windows and widgets from a `GResource` compiled into
a program.

### Voice User Interfaces

Genie has excellent bindings to
[GStreamer](https://gstreamer.freedesktop.org/).


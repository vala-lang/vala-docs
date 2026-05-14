# 8.1. Debugging

For demonstration purposes we will create a buggy program by
intentionally dereferencing a `null` reference, which will result in a
segmentation fault:

```vala
class Foo : Object {
    public int field;
}

void main () {
    Foo? foo = null;
    stdout.printf ("%d\n", foo.field);
}
```

```shell
valac debug-demo.vala
./debug-demo
Segmentation fault
```

So how do we debug this program? The `-g` command line option tells the
Vala compiler to include Vala source code line information in the
compiled binary, `--save-temps` keeps the temporary C source files:

```shell
valac -g --save-temps debug-demo.vala
```

Vala programs can be debugged with the GNU Debugger `gdb` or one of its
graphical front-ends, e.g. [gdbgui](https://www.gdbgui.com/).

```shell
nemiver debug-demo
```

A sample `gdb` session:

```shell
gdb debug-demo
(gdb) run
Starting program: /home/valacoder/debug-demo

Program received signal SIGSEGV, Segmentation fault.
0x0804881f in _main () at debug-demo.vala:7
7           stdout.printf ("%d\n", foo.field);
(gdb)
```

## LLDB (common on macOS)

The same binary built with `valac -g` can be loaded into LLVM’s
[`lldb`](https://lldb.llvm.org/). After `lldb debug-demo`, use `run` like in
`gdb`, then `bt` (backtrace) to see Vala line numbers that were embedded at
compile time.

## GLib and GObject runtime checks

Many crashes or warnings in GLib-based code come from misuse of reference
counting, main-loop re-entrancy, or invalid object state. While debugging:

- Set [`G_DEBUG`](https://docs.gtk.org/glib/running.html#environment-variables)
  (for example `G_DEBUG=fatal-warnings` or `gc-friendly`) to turn selected
  warnings into breakpoints or clearer logs.
- Use `G_MESSAGES_DEBUG` to enable extra log output from components that honor
  `G_LOG_DOMAIN` (see the GLib “Running GLib Applications” documentation).

These do not replace a debugger, but they narrow down whether a failure is a
plain segfault or a GLib `g_return_if_fail` path.


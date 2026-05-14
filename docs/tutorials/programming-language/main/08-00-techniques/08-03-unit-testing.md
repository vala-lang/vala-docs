# 8.3. Unit Testing

Vala programs use the same unit-test harness as GLib and GTK: the
[`GLib.Test`](https://valadoc.org/glib-2.0/GLib.Test.html) API. Tests are ordinary
Vala functions registered with the harness; when you run the compiled binary, GLib
prints [TAP](https://testanything.org/)-style output and sets the process exit code
so CI systems (and [`meson test`](https://mesonbuild.com/Unit-tests.html)) can tell
pass from fail.

For a Unit Testing Sample Code see: [Testing Samples](../../../../sample-code/glib-samples/testing-samples).

## Minimal harness

Every test executable should call `Test.init` before registering tests, then
`Test.run` after registration:

```vala
void add_tests () {
    Test.add_func ("/example/math/adds", () => {
        assert (1 + 1 == 2);
    });
}

void main (string[] args) {
    Test.init (ref args);
    add_tests ();
    Test.run ();
}
```

Compile and run:

```shell
valac --pkg glib-2.0 tests.vala
./tests
```

`Test.add_func` takes a hierarchy path (by convention starting with `/`) and
a callback. Paths group related cases in the TAP log and in tools that understand
GLib’s test tree.

## Assertions and messages

Plain `assert (condition)` is the usual choice in Vala tests. When you need a
custom failure explanation, record context with `Test.message` and stop the case
with `Test.fail`, or skip unsupported platforms with `Test.skip`:

```vala
Test.add_func ("/example/strings/concat", () => {
    string got = "foo" + "bar";
    if (got != "foobar") {
        Test.message ("expected foobar, got %s", got);
        Test.fail ();
    }
});
```

The C GLib headers also expose `g_assert_cmpstr`-style macros for richer logs;
those are not always wrapped in Vala’s `glib-2.0` vapi, so many projects stick to
`assert` or explicit `Test.message` blocks.

## Suites and shared setup

For several cases that share expensive setup, register a
[`TestSuite`](https://valadoc.org/glib-2.0/GLib.TestSuite.html) or split setup into
helpers called from each `Test.add_func` callback. GLib also provides
`Test.add_data_func` / `Test.add_data_func_full` for table-driven cases where the
same function runs with different user data (see the GLib documentation for the
exact C→Vala naming you need in your Vala version).

## Subprocess and timing helpers

GLib can re-run the test binary in a subprocess to isolate crashes or to test
`MainLoop`-driven code. See the subprocess and trap-related symbols on
[`GLib.Test`](https://valadoc.org/glib-2.0/GLib.Test.html) (for example
`Test.trap_subprocess`) when a unit must simulate a separate process or capture
fatal errors.

## Meson and CI

Meson’s `test()` target runs an executable and interprets its exit status. A
minimal `meson.build` is shown on the
[Testing Samples](../../../../sample-code/glib-samples/testing-samples#meson) page.
In CI, run `meson test -C build` (or your build directory) so every registered
`Test.add_func` is executed automatically.

## See also

- [Testing Samples](../../../../sample-code/glib-samples/testing-samples) — full
  copy-paste example and Meson snippet
- [GLib.Test reference](https://valadoc.org/glib-2.0/GLib.Test.html)
- [8.1. Debugging](08-01-debugging) — using debuggers when a test or app crashes

# Testing Samples

This example shows how to register a minimal unit test with
[`GLib.Test`](https://valadoc.org/glib-2.0/GLib.Test.html), run it, and exit
with a useful status code. It adapts the “Simple test” section from the archived
[Vala TestSample](https://wiki.gnome.org/Projects/Vala/TestSample) page on the
GNOME Wiki.

## Program

Save the following as `test-simple.vala`:

```vala
void add_foo_tests () {
    Test.add_func ("/vala/test", () => {
        assert ("foo" + "bar" == "foobar");
    });
}

void main (string[] args) {
    Test.init (ref args);
    add_foo_tests ();
    Test.run ();
}
```

`Test.add_func` registers a test case under a path string (here `/vala/test`).
The closure runs inside the GLib test harness; failed assertions are reported
as test failures.

## Compile and run

```shell
valac test-simple.vala
./test-simple
```

On success, the process prints [TAP-style output](https://testanything.org/tap-specification.html) and exits with status 0.

## Meson

To run this test via [`meson test`](https://mesonbuild.com/Unit-tests.html), add
a small `meson.build`:

```text
project('simple-test', 'vala', version: '0.1.0')

sources = files('test-simple.vala')

deps = [dependency('glib-2.0'), dependency('gobject-2.0')]

exe = executable('unit-test', sources, dependencies: deps)
test('unit-test', exe)
```

Then:

```shell
meson setup build
meson compile -C build
meson test -C build
```

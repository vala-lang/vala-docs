# 7. Testing

A goal for Vala 1.0 is to have every tests for every documented feature
of the language.

Tests are located in the `tests` directory in the repository. There is
also a `tests` directory in the `valadoc` directory for tests specific
to the `valadoc` tool.

In order to run tests with `make check` you must have `dbus-glib`
development files installed, otherwise you will get invalid test
failures.

## 7.1. What drives the tests?

Running `make check` from the top of the repository (or from `tests`
directly) is what drives the suite: it builds `valac` and then asks
automake's generated test harness to run every file listed in `TESTS`
through `testrunner.sh`, reporting a summary of passes and failures.

The top-level `Makefile.am` also defines a few convenience wrappers
around `make check`:

- `make test` — plain `make check` in the `tests` directory.
- `make test-asan` / `make test-ubsan` — same, but with AddressSanitizer
  or UndefinedBehaviorSanitizer flags added to `TEST_CFLAGS`.
- `make test-update` — same, but with `UPDATE_EXPECTED=1` set, so
  expected C output files are regenerated rather than checked.

## 7.2. Where is the test suite defined?

The test suite is wired into the autotools build via `tests/Makefile.am`.
Every individual test file is listed under the `TESTS` variable in
that file (and in the `Makefile.am` of each test subdirectory that has
its own, such as `tests/girwriter`, `tests/gtktemplate` and
`tests/fastvapi`), so adding a new test means adding its filename to
the relevant `TESTS` list as well as creating the test file itself.

`tests/Makefile.am` also declares which file extensions are treated as
tests and which program is used to run them:

```
TEST_EXTENSIONS = .vala .gs .gir .test

TEST_RUNNER = $(abs_top_srcdir)/build-aux/testrunner.sh
VALA_LOG_COMPILER = $(TEST_RUNNER)
GS_LOG_COMPILER = $(TEST_RUNNER)
GIR_LOG_COMPILER = $(TEST_RUNNER)
TEST_LOG_COMPILER = $(TEST_RUNNER)
```

This uses automake's parallel test harness: each extension's
`*_LOG_COMPILER` variable tells automake which program to invoke to
"compile and run" a test with that extension, and here all of them
point at the same `build-aux/testrunner.sh` script. `AM_TESTS_ENVIRONMENT`
in the same file exports the environment variables (paths, compiler,
flags) that `testrunner.sh` relies on.

## 7.3. How do tests work?

The Vala compiler's tests either compare source file inputs with
expected outputs or test for invalid source code (to verify that the
compiler is reporting errors correctly). C outputs are also supported.

Test sources are organised into subdirectories of `tests` by topic
(e.g. `basic-types`, `arrays`, `dbus`, `errors`, `genie`), and each
test is one of the following file types:

- `.vala` / `.gs` — A Vala or Genie source file that is expected to
  compile and run successfully. If a matching `.c-expected` file
  exists alongside it, the generated C code is compared against it.
- `.test` — A plain text file containing one or more headers followed
  by a blank line and then the source code. This format is used for
  tests that need extra metadata, such as invalid code tests, D-Bus
  tests, or tests that declare required packages.
- `.gir` — A GIR file used to test `vapigen`'s VAPI generation; the
  output is compared against a matching `.vapi-expected` file.

A `.test` file can start with one or more of the following headers:

- `Packages: <name> ...` — Declares the packages to pass to `valac`
  via `--pkg` when compiling the test.
- `Invalid Code` — Marks the test as expected to fail compilation.
  The test passes only if `valac` reports an error.
- `D-Bus` — Marks the test as a D-Bus test. The test is compiled and
  run inside a private D-Bus session via `dbus-run-session`.

For example, an invalid code test looks like this:

```
Invalid Code

void main () {
	try {
	} catch (int e) {
	}
}
```

## 7.4. How does the test runner work?

`build-aux/testrunner.sh` is the script that actually turns a test
file into a pass/fail result. For every test file it is given, it:

1. Copies the source into a scratch build directory.
2. If the file is a `.test` file, parses its headers (`Packages:`,
   `Invalid Code`, `D-Bus`, ...) and the source blocks that follow
   them to figure out what to compile and how (e.g. build two
   programs for a D-Bus client/server pair).
3. Invokes `valac` (or `vapigen` for `.gir` tests) with the flags
   assembled from the test's headers, `tests-extra-environment.sh` (if
   present), and the environment exported by `AM_TESTS_ENVIRONMENT`.
4. For `Invalid Code` tests, checks that compilation fails as
   expected; otherwise it compiles and runs the resulting program, and
   diffs the generated C code against the matching `.c-expected` /
   `.h-expected` file when one exists.

Setting `UPDATE_EXPECTED=1` in the environment makes the runner
regenerate the `.c-expected` files instead of diffing against them,
which is how you refresh expected output after an intentional
codegen change.

## 7.5. Test environment configuration

Any directory under `tests` may contain a `tests-extra-environment.sh`
file. This is sourced by the test runner before compiling tests in
that directory, letting you customise the environment for every test
in the directory — for example, by adding extra `VALAFLAGS`:

```shell
VALAFLAGS="--vapidir ${abs_srcdir}/girwriter"
```

This is useful for things like pointing `valac` at a directory-local
VAPI, or otherwise tweaking compiler flags to exercise specific
behaviour without having to repeat the flags in every test.

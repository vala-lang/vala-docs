# Windows cross-build sample

Cross-compiling a Vala (or C/GTK) project for Windows from Linux, based on the archived GNOME Wiki page [Projects/Vala/Win32CrossBuildSample](https://wiki.gnome.org/Projects/Vala/Win32CrossBuildSample).

The wiki walked through **CMake**, an old MinGW toolchain (`i586-mingw32msvc`), GTK+ 2 bundles, and **NSIS** packaging. Those pieces are mostly historical: current developers typically use **Meson** with a **MinGW-w64** toolchain and GTK 3 or GTK 4 Windows runtimes from [gvsbuild](https://github.com/wingtk/gvsbuild) or similar distributors.

## What the wiki described (CMake + GTK+ 2 bundle)

The archive suggested:

- Installing `mingw32`, CMake, NSIS, and a pre-built GTK+ bundle for Windows.
- Unzipping the bundle under `win32/` and rewriting every `.pc` file’s `prefix=` so `PKG_CONFIG_PATH` points at the bundle.
- A `Toolchain.cmake` that sets `CMAKE_SYSTEM_NAME` to `Windows` and selects `i586-mingw32msvc-gcc`.
- A tiny `hello-world.c` linked with `gtk+-2.0` to prove the cross prefix works, then running the `.exe` with Wine.

That flow is useful as background reading, but the exact package names, URLs, and compiler triples on modern distributions differ. Treat the wiki as a narrative, not copy-paste instructions.

## Meson cross-compilation for Windows

Meson is the build system most Vala and GTK projects use today. A typical approach:

1. Install a MinGW-w64 cross compiler (for example `x86_64-w64-mingw32-gcc` on Debian/Ubuntu via `gcc-mingw-w64-x86-64`).
2. Install or build Windows copies of GLib/GTK and produce a **pkg-config** tree (gvsbuild output is common).
3. Write a Meson **cross file** describing the host system and tool paths.

`mingw-w64.ini` (adjust paths to your SDK root):

```text
[binaries]
c = 'x86_64-w64-mingw32-gcc'
cpp = 'x86_64-w64-mingw32-g++'
ar = 'x86_64-w64-mingw32-ar'
strip = 'x86_64-w64-mingw32-strip'
pkg-config = 'pkg-config'
windres = 'x86_64-w64-mingw32-windres'

[built-in options]
c_args = ['-I/path/to/windows-deps/include']
c_link_args = ['-L/path/to/windows-deps/lib']

[host_machine]
system = 'windows'
cpu_family = 'x86_64'
cpu = 'x86_64'
endian = 'little'

[properties]
pkg_config_libdir = '/path/to/windows-deps/lib/pkgconfig'
```

`meson.build`:

```text
project('hello', 'c', vala: true)

glib_dep = dependency('glib-2.0')
exe = executable('hello', 'main.vala', dependencies: glib_dep)
```

Configure and compile from your project root:

```shell
export PKG_CONFIG_PATH=/path/to/windows-deps/lib/pkgconfig
meson setup build-windows --cross-file mingw-w64.ini
meson compile -C build-windows
```

Meson then passes the correct `--pkg` arguments to `valac` and links against the Windows libraries described by the cross environment. Copy required DLLs next to the `.exe` (or run an install step that stages a runtime tree) before testing on Windows.

For GTK applications, follow upstream guidance for [GTK on Windows](https://www.gtk.org/docs/installations/windows/) and keep your SDK versions aligned with what your dependencies expect.

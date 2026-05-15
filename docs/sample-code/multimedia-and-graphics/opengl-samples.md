# OpenGL samples

Adapted from the archived GNOME Wiki page [Projects/Vala/OpenGLSamples](https://wiki.gnome.org/Projects/Vala/OpenGLSamples). That page covered GLFW 2, GtkGLExt (GTK 2), GLX, and GLUT. GLFW 2 and GtkGLExt are obsolete; Gtk.GLExt is unmaintained for modern GTK.

This page highlights GLFW 3 with the community `glfw3.vapi` from [vala-extra-vapis](https://gitlab.gnome.org/GNOME/vala-extra-vapis) for a minimal window and GL context. For libepoxy with Vala, the C library does not ship official vapi files; bindings are described below, and a runnable Meson reference app is [ValaGL](https://github.com/m-shinder/ValaGL). Legacy GtkGLExt / GLUT compile lines are summarized at the end for historians digging through the [wiki archive](https://wiki.gnome.org/Projects/Vala/OpenGLSamples).

## GLFW 3: window and clear color

Modern GLFW uses `glfwInit`, `glfwCreateWindow`, `glfwMakeContextCurrent`, and a core-profile context. The fixed-function `glBegin` / `glEnd` triangle from the old wiki is omitted here; use shaders with GLFW 3, or start from the snippet below and follow any current GLFW + OpenGL tutorial.

Vala does not ship GLFW in the default toolchain. Use `glfw3.vapi` from [vala-extra-vapis](https://gitlab.gnome.org/GNOME/vala-extra-vapis) ([GitHub mirror](https://github.com/GNOME/vala-extra-vapis)): clone the repo or copy `glfw3.vapi`, then pass `--vapidir /path/to/that/directory` with `--pkg glfw3`. That provides the `GLFW` namespace below; `pkg-config` still links the GLFW 3 C library.

```vala
using GLib;

int main () {
    if (!GLFW.init ()) {
        return 1;
    }

    GLFW.WindowHint.CLIENT_API.set ((int) GLFW.ClientAPI.OPENGL);
    GLFW.WindowHint.CONTEXT_VERSION_MAJOR.set (3);
    GLFW.WindowHint.CONTEXT_VERSION_MINOR.set (3);
    GLFW.WindowHint.OPENGL_PROFILE.set ((int) GLFW.OpenGLProfile.CORE);

    var win = new GLFW.Window (640, 480, "GLFW 3 + Vala");
    win.make_context_current ();

    /* OpenGL drawing needs a loader (libepoxy) plus Vala bindings — see “ValaGL” below. */

    while (!win.should_close) {
        GLFW.poll_events ();
        win.swap_buffers ();
    }

    GLFW.terminate ();
    return 0;
}
```

### Compile and run

1. Install GLFW 3 development files so `pkg-config` exposes `glfw3` (package names vary by distribution).
2. Obtain `glfw3.vapi`: clone [vala-extra-vapis](https://gitlab.gnome.org/GNOME/vala-extra-vapis) or download [`glfw3.vapi`](https://gitlab.gnome.org/GNOME/vala-extra-vapis/-/raw/master/glfw3.vapi) into a folder (for example `./vapi` in your project).

Point `--vapidir` at the directory that contains `glfw3.vapi` (the cloned repository root, or your `vapi/` copy).

```shell
valac --vapidir /path/to/vala-extra-vapis --pkg glfw3 -o glfw3-window glfw3-window.vala
./glfw3-window
```

If the C compiler cannot find GLFW headers, add an explicit include path (for example `-X -I/usr/include/GLFW`).

## Epoxy, `gl.vapi`, and ValaGL

[libepoxy](https://github.com/anholt/libepoxy) is a C library for OpenGL function pointer resolution; it does not include Vala `.vapi` files in the upstream project.

The fork [m-shinder/libepoxy](https://github.com/m-shinder/libepoxy) (branch [`vala-vapi`](https://github.com/m-shinder/libepoxy/tree/vala-vapi)) adds generated Vala bindings: in particular `gl.vapi`, tied to `epoxy/gl.h`, with OpenGL entry points exposed under the `GL` namespace (see that repository’s README for details).

Wiring together GLFW, libepoxy, `gl.vapi`, and a working render loop is best demonstrated as a Meson project rather than a one-line `valac` example. For a clear, working reference, see [ValaGL](https://github.com/m-shinder/ValaGL): it is a minimal GLFW-based OpenGL skeleton that integrates the necessary dependencies (including a subproject for the Vala-compatible fork of libepoxy), and provides step-by-step documentation for setup and building.

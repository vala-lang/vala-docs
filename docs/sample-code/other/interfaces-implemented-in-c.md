# Implementing Vala interfaces in GObject/C

Vala interfaces behave much like Java or C#: classes can implement one or more of them. You are not required to implement those interfaces in Vala; a GObject type written in C can implement them as well. This walkthrough is adapted from the archived GNOME Wiki page [Projects/Vala/MultiImplementInC](https://wiki.gnome.org/Projects/Vala/MultiImplementInC).

## Vala interface definitions

`test-testone.vala`:

```vala
namespace Test {
    public interface TestOne {
        public abstract void method_one ();
    }
}
```

`test-testtwo.vala`:

```vala
namespace Test {
    public interface TestTwo {
        public abstract void method_two ();
    }
}
```

Generate C headers and sources for the interfaces (and optionally compile the objects to verify your toolchain):

```shell
valac -C test-testone.vala
valac -C test-testtwo.vala
gcc -c test-testone.c $(pkg-config --cflags glib-2.0 gobject-2.0)
gcc -c test-testtwo.c $(pkg-config --cflags glib-2.0 gobject-2.0)
```

## C implementation (`test-impl.c`)

```c
#include "test-impl.h"

static void
test_impl_finalize (GObject *object)
{
}

static void
test_impl_class_init (TestImplClass *klass)
{
    GObjectClass *object_class = G_OBJECT_CLASS (klass);
    object_class->finalize = test_impl_finalize;
}

static void
test_impl_init (TestImpl *self)
{
}

static void
test_impl_method_one (TestTestOne *self)
{
}

static void
test_impl_method_two (TestTestTwo *self)
{
}

static void
test_test_one_iface_init (TestTestOneIface *iface)
{
    iface->method_one = test_impl_method_one;
}

static void
test_test_two_iface_init (TestTestTwoIface *iface)
{
    iface->method_two = test_impl_method_two;
}

G_DEFINE_TYPE_WITH_CODE (TestImpl, test_impl, G_TYPE_OBJECT,
    G_IMPLEMENT_INTERFACE (TEST_TYPE_TEST_ONE, test_test_one_iface_init)
    G_IMPLEMENT_INTERFACE (TEST_TYPE_TEST_TWO, test_test_two_iface_init))
```

## C header (`test-impl.h`)

```c
#ifndef __TEST_IMPL_H__
#define __TEST_IMPL_H__

#include <glib.h>
#include <glib-object.h>

G_BEGIN_DECLS

#define TEST_TYPE_IMPL (test_impl_get_type ())
#define TEST_IMPL(object)            (G_TYPE_CHECK_INSTANCE_CAST ((object), TEST_TYPE_IMPL, TestImpl))
#define TEST_IMPL_CLASS(klass)       (G_TYPE_CHECK_CLASS_CAST ((klass), TEST_TYPE_IMPL, TestImplClass))
#define TEST_IS_IMPL(object)         (G_TYPE_CHECK_INSTANCE_TYPE ((object), TEST_TYPE_IMPL))
#define TEST_IS_IMPL_CLASS(klass)    (G_TYPE_CHECK_CLASS_TYPE ((klass), TEST_TYPE_IMPL))
#define TEST_IMPL_GET_CLASS(obj)     (G_TYPE_INSTANCE_GET_CLASS ((obj), TEST_TYPE_IMPL, TestImplClass))

typedef struct _TestImpl      TestImpl;
typedef struct _TestImplClass TestImplClass;

struct _TestImpl {
    GObject parent;
};

struct _TestImplClass {
    GObjectClass parent_class;
};

GType     test_impl_get_type (void);
TestImpl *test_impl_new      (void);

G_END_DECLS

#endif /* __TEST_IMPL_H__ */
```

## Generating a VAPI for `TestImpl`

The wiki described using `gen-introspect` and `vapigen` from a Vala installation prefix. On current systems the tool names and paths differ; use the `vapigen` and GObject introspection utilities provided by your distribution’s Vala and `gobject-introspection` packages.

After generation, adjust the class declaration in `test-impl.vapi` so it lists the implemented interfaces:

```vala
public class Impl : GLib.Object, TestOne, TestTwo {
```

If you prefer to author the VAPI by hand:

```vala
[CCode (cprefix = "Test", lower_case_cprefix = "test_")]
namespace Test {
    [CCode (cheader_filename = "test-impl.h")]
    public class Impl : GLib.Object, TestOne, TestTwo {
        public Impl ();
    }

    [CCode (cheader_filename = "test-impl.h")]
    public class ImplClass {
    }
}
```

## Autotools sketch (`Makefile.am`)

The wiki included a `Makefile.am` fragment that runs `valac -C` on the Vala sources, links `test-impl.c`, and ships the hand-written `test-impl.vapi`. Modern projects more often use [Meson](./win32-cross-build#meson-cross-compilation-for-windows) or CMake instead of Automake; treat this as historical structure for the file list, not as a requirement.

## Vala test program (`tester.vala`)

```vala
namespace Test {
    public class Application {
        public static int main (string[] args) {
            var t = new Impl ();
            t.method_one ();
            t.method_two ();
            return 0;
        }
    }
}
```

Wire the generated interface C sources, `test-impl.c`, and the VAPI into one `valac` invocation (or your build system’s equivalent) so the linker sees every translation unit.

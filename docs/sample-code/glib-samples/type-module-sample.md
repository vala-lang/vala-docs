# TypeModule Sample

[`GLib.TypeModule`](https://valadoc.org/gobject-2.0/GLib.TypeModule.html) loads a shared library
that registers one or more [`GObject`](https://valadoc.org/gobject-2.0/GObject.Object.html) types. A
loader subclass opens the module, resolves its `[ModuleInit]` entry point, and the type system keeps
the library loaded while instances exist. This is the same example as in the
[Type Modules](../../developer-guides/plugins/01-type-modules) developer guide.

**Never unref a [`GLib.TypeModule`](https://valadoc.org/gobject-2.0/GLib.TypeModule.html) instance
yourself**; the type system owns its lifetime.

## Plugin (`plugin.vala`)

```vala
// plugin.vala
public class MyClass : Object {
    static construct {
        message ("MyClass init");
    }

    static ~MyClass () {
        message ("MyClass deinit");
    }
}

[ModuleInit]
Type plugin_init (GLib.TypeModule type_modul) {
    return typeof (MyClass);
}
```

## Loader (`loader.vala`)

```vala
// loader.vala
class MyModule : TypeModule {
    [CCode (has_target = false)]
    private delegate Type PluginInitFunc (TypeModule module);

    private GLib.Module module = null;

    private string name = null;

    public MyModule (string name) {
        this.name = name;
    }

    public override bool load () {
        string path = Module.build_path (null, name);
        module = Module.open (path, GLib.ModuleFlags.BIND_LAZY);
        if (null == module) {
            error ("Module not found");
        }

        void * plugin_init = null;
        if (! module.symbol ("plugin_init", out plugin_init)) {
            error ("No such symbol");
        }

        ((PluginInitFunc) plugin_init) (this);

        return true;
    }

    public override void unload () {
        module = null;

        message ("Library unloaded");
    }
}

// Never unref instance of GTypeModule
// https://web.archive.org/web/20111109085729/http://www.lanedo.com/~mitch/module-system-talk-guadec-2006/Module-System-Talk-Guadec-2006.pdf
static TypeModule module = null;

int main () {
    module = new MyModule ("plugin");
    module.load ();

    var o = GLib.Object.new (Type.from_name ("MyClass"));

    // free last instance, plugin unload
    o = null;

    return 0;
}
```

## Build

```shell
valac -o loader loader.vala --pkg=gmodule-2.0
valac --ccode plugin.vala
gcc -fPIC -shared -o libplugin.so plugin.c $(pkg-config --libs --cflags gobject-2.0 gmodule-2.0)
```

## Run

On GNU/Linux you typically need the load path for the shared library:

```shell
LD_LIBRARY_PATH=$PWD ./loader
```

You should see log lines for `MyClass` construction, destruction, and “Library unloaded”.

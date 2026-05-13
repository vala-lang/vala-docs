# Plugin Sample (GModule)

This sample loads a shared library at runtime with [`GLib.Module`](https://valadoc.org/gmodule-2.0/GLib.Module.html)
and calls an exported C symbol from Vala. It is a minimal **GModule** example (no
[TypeModule](type-module-sample) registration).

## Plugin (`plugin.vala`)

The plugin exposes a plain entry function. Build it as a shared library (see below).

```vala
// plugin.vala
public void plugin_entry () {
    print ("Hello from the plugin.\n");
}
```

## Loader (`loader.vala`)

```vala
// loader.vala
[CCode (has_target = false)]
private delegate void PluginEntryFunc ();

int main () {
    string path = Module.build_path (Environment.get_current_dir (), "plugin");
    unowned Module? m = Module.open (path, ModuleFlags.BIND_LAZY);
    if (m == null) {
        error ("Could not open module: %s", Module.error ());
    }

    void * sym;
    if (! m.symbol ("plugin_entry", out sym)) {
        error ("Could not find plugin_entry: %s", Module.error ());
    }

    ((PluginEntryFunc) sym) ();
    return 0;
}
```

`Module.build_path` picks a filename appropriate for the platform (for example `libplugin.so` on
GNU/Linux).

## Build

Generate C from the plugin, then link a shared library:

```shell
valac -C plugin.vala
gcc -fPIC -shared -o libplugin.so plugin.c $(pkg-config --cflags --libs glib-2.0 gobject-2.0 gmodule-2.0)
valac -o loader loader.vala --pkg=gmodule-2.0
```

## Run

Point the dynamic loader at the directory that contains `libplugin.so`:

```shell
LD_LIBRARY_PATH=$PWD ./loader
```

On macOS, use `DYLD_LIBRARY_PATH` instead of `LD_LIBRARY_PATH` if you build a `.dylib`.

For a type-aware plugin that registers GObject types from a module, see
[TypeModule sample](type-module-sample) and the [Type Modules](../../developer-guides/plugins/01-type-modules)
developer guide.

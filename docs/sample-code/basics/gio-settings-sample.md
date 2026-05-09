# GIO Settings Sample

Requires Vala >= 0.10.0 and GLib/GIO >= 2.26.

Create a [GSettings](https://docs.gtk.org/gio/class.Settings.html) schema for your
application, with the filename extension `.gschema.xml`, for example
`org.example.my-app.gschema.xml`:

```xml
<schemalist>
  <schema id="org.example.my-app" path="/org/example/my-app/" gettext-domain="my-app">

    <key name="greeting" type="s">
      <default l10n="messages">"Hello, earthlings"</default>
      <summary>A greeting</summary>
      <description>
        Greeting of the invading martians
      </description>
    </key>

    <key name="bottles-of-beer" type="i">
      <default>99</default>
      <summary>Bottles of beer</summary>
      <description>
        Number of bottles of beer on the wall
      </description>
    </key>

    <key name="lighting" type="b">
      <default>false</default>
      <summary>Is the light switched on?</summary>
      <description>
        State of an imaginary light switch.
      </description>
    </key>

  </schema>
</schemalist>
```

Install the schema under a `glib-2.0/schemas` directory inside one of the paths
in [`XDG_DATA_DIRS`](https://specifications.freedesktop.org/basedir-spec/latest/)
(for example `/usr/share/glib-2.0/schemas/` when installing system-wide), then
recompile schemas in that directory:

```shell
cp org.example.my-app.gschema.xml /usr/share/glib-2.0/schemas/
glib-compile-schemas /usr/share/glib-2.0/schemas/
```

The schema **id** in the XML (`org.example.my-app`) must match the string passed
to `new Settings ("…")` in your program.

```vala
void main () {
    var settings = new Settings ("org.example.my-app");

    var greeting = settings.get_string ("greeting");
    var bottles = settings.get_int ("bottles-of-beer");
    var lighting = settings.get_boolean ("lighting");

    print ("%s\n", greeting);
    print ("%d bottles of beer on the wall\n", bottles);
    print ("Is the light switched on? %s\n", lighting ? "yes" : "no");

    settings.changed.connect ((key) => {
        print ("Key '%s' changed\n", key);
        if (key == "greeting") {
            print ("New greeting: %s\n", settings.get_string ("greeting"));
        }
    });

    settings.set_int ("bottles-of-beer", bottles - 1);
    settings.set_boolean ("lighting", !lighting);
    settings.set_string ("greeting", "hello, world");

    print ("Please start 'dconf-editor' and edit keys in /org/example/my-app/\n");

    new MainLoop ().run ();
}
```

## Compile and Run

```shell
valac --pkg gio-2.0 gio-settings-demo.vala
./gio-settings-demo
```

Use `dconf-editor` to edit keys under `/org/example/my-app/`. On some systems you
need the `dconf-editor` or `dconf-tools` package.

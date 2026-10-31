# Clipboard

## Source Code

```vala
// Clipboard.vala

public class ClipboardSample : Gtk.Application {
    private Gtk.Entry entry;
    private Gdk.Clipboard clipboard;
    private Gtk.ApplicationWindow window;


    public ClipboardSample () {
        Object (application_id: "com.example.ClipboardSample");
    }

    public override void activate () {
        this.window = new Gtk.ApplicationWindow (this) {
            title = "Clipboard",
            default_width = 300,
            default_height = 60,
        };

        this.entry = new Gtk.Entry ();
        entry.placeholder_text = "Type here to set the clipboard's content!";

        this.clipboard = entry.get_clipboard ();
        this.clipboard.changed.connect (this.on_clipboard_changed);

       // If the user types something ...
        entry.changed.connect (() => {
            // Set text to clipboard
            clipboard.set_text (entry.text);
        });

        this.window.child = entry;
        this.window.present ();
    }

    private void on_clipboard_changed () {
        clipboard.read_text_async.begin (null, (obj, res) => {
            try {
                var content = clipboard.read_text_async.end (res);
                // Only load text from clipboard when the app starts
                this.clipboard.changed.disconnect (this.on_clipboard_changed);
                this.entry.text = content;
            } catch (GLib.Error err) {
                stderr.printf ("Error: %s", err.message);
            }
        });
    }

    public static int main (string[] args) {
        var app = new ClipboardSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 Clipboard.vala
```

Run:

```shell
./Clipboard.vala
```

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

### Source Code

::: code-group

```blueprint [clipboard.blp]
using Gtk 4.0;

template $ClipboardWindow: ApplicationWindow {
  title: "Clipboard";
  default-width: 300;
  default-height: 60;

  child: Entry entry {
    placeholder-text: "Type here to set the clipboard's content!";
    changed => $on_entry_changed();
  };
}
```

```vala [ClipboardBlueprint.vala]
// ClipboardBlueprint.vala

[GtkTemplate (ui = "/com/example/ClipboardSample/clipboard.ui")]
public class ClipboardWindow : Gtk.ApplicationWindow {
    [GtkChild]
    private unowned Gtk.Entry entry;

    private Gdk.Clipboard clipboard;

    public ClipboardWindow (Gtk.Application app) {
        Object (application: app);
    }

    construct {
        this.clipboard = entry.get_clipboard ();
        this.clipboard.changed.connect (this.on_clipboard_changed);
    }

    // If the user types something ...
    [GtkCallback]
    private void on_entry_changed () {
        // Set text to clipboard
        clipboard.set_text (entry.text);
    }

    private void on_clipboard_changed () {
        clipboard.read_text_async.begin (null, (obj, res) => {
            try {
                var content = clipboard.read_text_async.end (res);
                // Only load text from clipboard when the app starts
                this.clipboard.changed.disconnect (this.on_clipboard_changed);
                this.entry.text = content;
            } catch (GLib.Error err) {
                stderr.printf ("Error: %s", err.message);
            }
        });
    }
}

public class ClipboardSample : Gtk.Application {
    public ClipboardSample () {
        Object (application_id: "com.example.ClipboardSample");
    }

    public override void activate () {
        new ClipboardWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new ClipboardSample ();
        return app.run (args);
    }
}
```

```xml [clipboard.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/ClipboardSample">
    <file>clipboard.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile clipboard.blp --output clipboard.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources clipboard.gresource.xml --target=clipboard.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources clipboard.gresource.xml ClipboardBlueprint.vala clipboard.gresource.c
```

Run:

```shell
./ClipboardBlueprint
```

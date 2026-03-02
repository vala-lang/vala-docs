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

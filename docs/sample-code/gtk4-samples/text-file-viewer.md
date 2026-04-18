# Text File Viewer

## Source Code

```vala
// TextFileViewer.vala

public class TextFileViewerSample : Gtk.Application {
    private Gtk.TextView text_view;
    private Gtk.ApplicationWindow window;

    public TextFileViewerSample () {
        Object (application_id: "com.example.TextFileViewerSample");
    }

    public override void activate () {
        this.window = new Gtk.ApplicationWindow (this) {
            title = "Text File Viewer",
            default_width = 400,
            default_height = 300
        };

        var toolbar = new Gtk.Box (Gtk.Orientation.HORIZONTAL, 0);
        toolbar.add_css_class ("toolbar");

        var open_image = new Gtk.Image.from_icon_name ("document-open");
        var open_label = new Gtk.Label ("Open");

        var open_button_box = new Gtk.Box (Gtk.Orientation.HORIZONTAL, 0);
        open_button_box.append (open_image);
        open_button_box.append (open_label);

        var open_button = new Gtk.Button ();
        open_button.child = open_button_box;
        open_button.clicked.connect (on_open_button_clicked);

        toolbar.append (open_button);

        this.text_view = new Gtk.TextView () {
            editable = false,
            cursor_visible = false,
        };

        var scroll_view = new Gtk.ScrolledWindow () {
            hscrollbar_policy = Gtk.PolicyType.AUTOMATIC,
            vscrollbar_policy = Gtk.PolicyType.AUTOMATIC,
            vexpand = true,
            valign = Gtk.Align.FILL,
            child = this.text_view,
        };

        var vbox = new Gtk.Box (Gtk.Orientation.VERTICAL, 0);
        vbox.append (toolbar);
        vbox.append (scroll_view);

        this.window.child = vbox;
        this.window.present ();
    }

    private void on_open_button_clicked () {
        var file_dialog = new Gtk.FileDialog () {
            title = "Open File"
        };

        file_dialog.open.begin (this.window, null, (obj, res) => {
            try {
                var file = file_dialog.open.end (res);
                uint8[] contents;
                file.load_contents (null, out contents, null);
                this.text_view.buffer.text = (string) contents;
            } catch (Error e) {
                stderr.printf ("Error: %s\n", e.message);
            }
        });
    }

    public static int main (string[] args) {
        var app = new TextFileViewerSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 TextFileViewer.vala
```

Run:

```shell
./TextFileViewer.vala
```

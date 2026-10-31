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

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

### Source Code

::: code-group

```blueprint [text-file-viewer.blp]
using Gtk 4.0;

template $TextFileViewerWindow: ApplicationWindow {
  title: "Text File Viewer";
  default-width: 400;
  default-height: 300;

  child: Box {
    orientation: vertical;

    Box {
      orientation: horizontal;
      styles ["toolbar"]

      Button {
        clicked => $on_open_button_clicked();

        child: Box {
          orientation: horizontal;

          Image {
            icon-name: "document-open";
          }

          Label {
            label: "Open";
          }
        };
      }
    }

    ScrolledWindow {
      hscrollbar-policy: automatic;
      vscrollbar-policy: automatic;
      vexpand: true;
      valign: fill;

      child: TextView text_view {
        editable: false;
        cursor-visible: false;
      };
    }
  };
}
```

```vala [TextFileViewerBlueprint.vala]
// TextFileViewerBlueprint.vala

[GtkTemplate (ui = "/com/example/TextFileViewerSample/text-file-viewer.ui")]
public class TextFileViewerWindow : Gtk.ApplicationWindow {
    [GtkChild]
    private unowned Gtk.TextView text_view;

    public TextFileViewerWindow (Gtk.Application app) {
        Object (application: app);
    }

    [GtkCallback]
    private void on_open_button_clicked () {
        var file_dialog = new Gtk.FileDialog () {
            title = "Open File"
        };

        file_dialog.open.begin (this, null, (obj, res) => {
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
}

public class TextFileViewerSample : Gtk.Application {
    public TextFileViewerSample () {
        Object (application_id: "com.example.TextFileViewerSample");
    }

    public override void activate () {
        new TextFileViewerWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new TextFileViewerSample ();
        return app.run (args);
    }
}
```

```xml [text-file-viewer.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/TextFileViewerSample">
    <file>text-file-viewer.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile text-file-viewer.blp --output text-file-viewer.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources text-file-viewer.gresource.xml --target=text-file-viewer.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources text-file-viewer.gresource.xml TextFileViewerBlueprint.vala text-file-viewer.gresource.c
```

Run:

```shell
./TextFileViewerBlueprint
```

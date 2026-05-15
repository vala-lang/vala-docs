# Poppler sample (PDF rendering)

Adapted from the archived GNOME Wiki page [Projects/Vala/PopplerSample](https://wiki.gnome.org/Projects/Vala/PopplerSample). The original used GTK 3; this version uses **GTK 4**, `Gtk.Picture`, and keyboard controllers instead of `key-press-event`.

Give a local file path to a PDF (absolute paths are simplest).

```vala
using Cairo;
using Gdk;
using Gtk;

static string? pdf_uri;

public class PopplerApp : Gtk.Application {
    Poppler.Document document;
    Gtk.Picture picture;
    Cairo.ImageSurface surface;
    Cairo.Context context;
    Gtk.ApplicationWindow? main_window;
    int width = 800;
    int height = 600;
    int page_index = 0;

    public PopplerApp () {
        Object (
            application_id: "org.example.PopplerSample",
            flags: ApplicationFlags.HANDLES_OPEN
        );
    }

    public override void open (GLib.File[] files, string hint) {
        if (files.length == 0) {
            return;
        }
        pdf_uri = files[0].get_uri ();
        ensure_main_window ();
    }

    public override void activate () {
        /* On some platforms activate runs before open; do not quit until the main loop
         * has had a chance to deliver file arguments via open. */
        if (pdf_uri != null) {
            ensure_main_window ();
            return;
        }

        Idle.add (() => {
            if (pdf_uri == null) {
                stderr.printf ("Usage: %s /full/path/to/some.pdf\n", Environment.get_prgname ());
                quit ();
            } else {
                ensure_main_window ();
            }
            return Source.REMOVE;
        });
    }

    void ensure_main_window () {
        if (main_window != null || pdf_uri == null) {
            return;
        }

        try {
            this.document = new Poppler.Document.from_file (pdf_uri, "");
        } catch (Error e) {
            stderr.printf ("%s\n", e.message);
            quit ();
            return;
        }

        var window = new Gtk.ApplicationWindow (this) {
            title = "Poppler Vala Demo"
        };
        main_window = window;

        surface = new ImageSurface (Format.ARGB32, width, height);
        context = new Context (surface);
        picture = new Gtk.Picture ();

        render_page ();

        window.child = picture;

        var key_controller = new Gtk.EventControllerKey ();
        key_controller.key_pressed.connect (on_key_pressed);
        /* ShortcutManager.add_controller shadows Widget.add_controller on ApplicationWindow. */
        ((Gtk.Widget) window).add_controller (key_controller);

        window.present ();
    }

    bool on_key_pressed (Gtk.EventControllerKey ctl, uint keyval, uint keycode, Gdk.ModifierType state) {
        unichar ch = Gdk.keyval_to_unicode (keyval);
        if (ch == 'q') {
            quit ();
            return true;
        }

        page_index++;
        page_index %= document.get_n_pages ();
        render_page ();
        return true;
    }

    void render_page () {
        context.set_source_rgb (1, 1, 1);
        context.paint ();

        var page = document.get_page (page_index);
        page.render (context);

        surface.flush ();
        int stride = surface.get_stride ();
        size_t n = (size_t) stride * (size_t) surface.get_height ();
        uint8[] buf = new uint8[(int) n];
        unowned uint8[] pixels = surface.get_data ();
        GLib.Memory.copy ((void*) buf, (void*) pixels, n);
        var bytes = new GLib.Bytes.take ((owned) buf);
        var texture = new Gdk.MemoryTexture (
            width, height, MemoryFormat.B8G8R8A8_PREMULTIPLIED, bytes, (size_t) surface.get_stride ());
        picture.set_paintable (texture);
    }

    public static int main (string[] args) {
        var app = new PopplerApp ();
        return app.run (args);
    }
}
```

## Compile and run

```shell
valac --pkg poppler-glib --pkg gtk4 -o popplersample popplersample.vala
./popplersample /full/path/to/some.pdf
```

Press any key to advance a page; press **q** to quit.

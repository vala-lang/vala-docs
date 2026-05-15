# Pango and Cairo samples

Adapted from the archived GNOME Wiki page [Projects/Vala/PangoCairoSample](https://wiki.gnome.org/Projects/Vala/PangoCairoSample). The first program (`pags`) renders a text file to PNG pages. The second draws glyph metrics with **GTK 4** instead of GTK 3.

## Render text to PNG pages (`pags`)

This sample matches the wiki’s command-line tool: it reads a UTF-8 text file and lays it out with Pango, rasterizes with Cairo, and writes `page-001.png`, and so on.

```vala
using Cairo;
using Pango;

public class Pags {

    static void clear_page (Cairo.Context cr, int width, int height,
                            double margin, double top_margin, bool do_rotate) {
        cr.identity_matrix ();
        cr.set_source_rgb (1.0, 1.0, 1.0);
        cr.rectangle (0, 0, width, height);
        cr.fill ();
        cr.set_source_rgb (0.0, 0.0, 0.0);
        if (do_rotate) {
            cr.translate (width, 0);
            cr.rotate (Math.PI / 2);
        }
        cr.move_to (margin, top_margin);
    }

    const OptionEntry[] option_entries = {
        { "width", 'w', 0, OptionArg.INT, ref width, "Image width", "PIXELS" },
        { "height", 'h', 0, OptionArg.INT, ref height, "Image height", "PIXELS" },
        { "family", 'f', 0, OptionArg.STRING, ref font_family, "Font family", "NAME" },
        { "font-size", 's', 0, OptionArg.DOUBLE, ref font_size, "Font size", "VALUE" },
        { "margin", 'm', 0, OptionArg.DOUBLE, ref margin, "Margin", "VALUE" },
        { "justify", 'j', 0, OptionArg.NONE, ref do_justify, "Justify", null },
        { "rotate", 'r', 0, OptionArg.NONE, ref do_rotate, "Rotate", null },
        { "", 0, 0, OptionArg.FILENAME_ARRAY, ref filenames, null, "FILE" },
        { null }
    };

    static int width = 320;
    static int height = 240;
    static string font_family;
    static double font_size;
    static double margin;
    static bool do_justify = false;
    static bool do_rotate = false;
    static string[] filenames;

    static int main (string[] args) {
        font_family = "Sans";
        font_size = 14;
        margin = font_size;

        try {
            var opt_context = new OptionContext ("- Render text files to image files");
            opt_context.set_help_enabled (true);
            opt_context.add_main_entries (option_entries, "pags");
            opt_context.parse (ref args);
        } catch (OptionError e) {
            stderr.printf ("Option parsing failed: %s\n", e.message);
            return -1;
        }

        double top_margin = margin * 2;
        double bottom_margin = margin;

        if (filenames == null) {
            stdout.printf ("Need name of text file!\n");
            return -1;
        }

        Pango.Rectangle ink_rect, logical_rect;

        string text;
        try {
            FileUtils.get_contents (filenames[0], out text);
        } catch (FileError e) {
            stderr.printf ("Failed reading file %s!\n", filenames[0]);
            return -1;
        }

        var surface = new Cairo.ImageSurface (Cairo.Format.RGB24, width, height);
        var cr = new Cairo.Context (surface);

        var font_description = new Pango.FontDescription ();
        font_description.set_family (font_family);
        font_description.set_size ((int) (font_size * Pango.SCALE));

        var rwidth = width;
        var rheight = height;
        if (do_rotate) {
            rwidth = height;
            rheight = width;
        }
        var layout = Pango.cairo_create_layout (cr);
        layout.set_font_description (font_description);
        layout.set_justify (do_justify);
        layout.set_width ((int) ((rwidth - 2 * margin) * Pango.SCALE));
        layout.set_text (text, -1);

        var pagenum_font_description = new Pango.FontDescription ();
        pagenum_font_description.set_family ("Sans");
        pagenum_font_description.set_size ((int) (9 * Pango.SCALE));
        var pagenum_layout = Pango.cairo_create_layout (cr);
        pagenum_layout.set_font_description (pagenum_font_description);

        int page_num = 1;
        double ybottom = rheight - top_margin - bottom_margin;
        var iter = layout.get_iter ();

        clear_page (cr, width, height, margin, top_margin, do_rotate);
        /* Single-line layouts start on the last line; at_last_line() is true
         * immediately, so a while (!at_last_line()) loop never ran. */
        while (true) {
            double y_pos = 0;
            bool first_line = true;
            bool page_overflow = false;

            while (true) {
                iter.get_line_extents (out ink_rect, out logical_rect);
                var line = iter.get_line_readonly ();

                if (ink_rect.width == 0) {
                    double dy = font_size / 2;
                    y_pos += dy;
                    if (!first_line) {
                        cr.rel_move_to (0, dy);
                    }
                } else {
                    double xstart = 1.0 * logical_rect.x / Pango.SCALE;
                    cr.rel_move_to (xstart, 0);
                    Pango.cairo_show_layout_line (cr, line);
                    cr.rel_move_to (-xstart, (int) (logical_rect.height / Pango.SCALE));
                    y_pos += logical_rect.height / Pango.SCALE;
                }

                if (y_pos > ybottom) {
                    page_overflow = iter.next_line ();
                    break;
                }
                first_line = false;

                if (!iter.next_line ()) {
                    break;
                }
            }

            pagenum_layout.set_text (page_num.to_string (), -1);
            pagenum_layout.get_extents (out ink_rect, out logical_rect);
            cr.move_to (rwidth - logical_rect.width / Pango.SCALE, rheight - margin);
            Pango.cairo_show_layout (cr, pagenum_layout);

            surface.write_to_png ("page-%03d.png".printf (page_num));
            page_num++;

            if (!page_overflow) {
                break;
            }
            cr.show_page ();
            clear_page (cr, width, height, margin, top_margin, do_rotate);
        }

        return 0;
    }
}
```

### Compile and run

Compile:

```shell
valac --pkg cairo --pkg pango --pkg pangocairo pags.vala
```

Run:

```shell
./pags mychapter.txt
```

## Extent demo (GTK 4)

Draws Pango layout extents (line, run, cluster, or character) for debugging text layout. Edit `r_name` in `main` to switch between `"line"`, `"run"`, `"cluster"`, and `"char"`.

```vala
using Gtk;
using Cairo;
using GLib;
using Pango;

public class ExtentDemoWindow : Gtk.ApplicationWindow {
    public string font_family { get; set; default = "Sans"; }
    public double font_size { get; set; default = 24; }
    public string display_text { get; set; default = ""; }
    public string r_name { get; set; default = "cluster"; }
    public Pango.Alignment text_align { get; set; default = Pango.Alignment.LEFT; }
    public bool justify_text { get; set; default = false; }
    public int draw_width { get; set; default = 800; }
    public int draw_height { get; set; default = 600; }
    int x_margin = 5;
    int y_margin = 5;
    int x_offset = 0;
    int y_offset = 25;

    public ExtentDemoWindow (Gtk.Application app) {
        Object (application: app, title: "Pango extents");
        var da = new DrawingArea ();
        da.set_size_request (draw_width, draw_height);
        da.set_draw_func (on_draw);
        child = da;
    }

    void on_draw (DrawingArea area, Cairo.Context ctx, int w, int h) {
        var font_description = new Pango.FontDescription ();
        font_description.set_family (font_family);
        font_description.set_size ((int) (font_size * Pango.SCALE));

        var playout = Pango.cairo_create_layout (ctx);
        playout.set_font_description (font_description);
        playout.set_markup (display_text, -1);

        ctx.set_source_rgb (1, 1, 1);
        ctx.paint ();
        ctx.set_source_rgb (0, 0, 0);
        ctx.translate (x_margin, y_margin);
        ctx.translate (x_offset, y_offset);

        playout.set_width ((int) (draw_width * Pango.SCALE));
        playout.set_height ((int) (draw_height * Pango.SCALE));
        playout.set_ellipsize (Pango.EllipsizeMode.END);
        playout.set_alignment (text_align);
        playout.set_justify (justify_text);

        ctx.move_to (0, 0);
        Pango.cairo_show_layout (ctx, playout);

        ctx.set_source_rgba (0, 1, 0, 0.7);
        ctx.set_line_width (1);

        var li = playout.get_iter ();

        for (bool more = true; more;) {
            Pango.Rectangle ink_rect = Pango.Rectangle ();
            Pango.Rectangle log_rect = Pango.Rectangle ();
            if (r_name == "line") {
                li.get_line_extents (out ink_rect, out log_rect);
            } else if (r_name == "run") {
                li.get_run_extents (out ink_rect, out log_rect);
            } else if (r_name == "cluster") {
                li.get_cluster_extents (out ink_rect, out log_rect);
            } else if (r_name == "char") {
                ink_rect = li.get_char_extents ();
                log_rect = ink_rect;
            }
            var x = descale (ink_rect.x);
            var y = descale (ink_rect.y);
            var rw = descale (ink_rect.width);
            var rh = descale (ink_rect.height);
            ctx.rectangle (x + 0.5, y + 0.5, rw - 1.0, rh - 1.0);
            ctx.stroke ();

            if (r_name == "line") {
                more = li.next_line ();
            } else if (r_name == "run") {
                more = li.next_run ();
            } else if (r_name == "cluster") {
                more = li.next_cluster ();
            } else if (r_name == "char") {
                more = li.next_char ();
            } else {
                more = false;
            }
        }
    }

    int descale (int i) {
        return i / Pango.SCALE;
    }
}

void present_extent_window (Gtk.Application app, string display_text) {
    var win = new ExtentDemoWindow (app);
    win.display_text = display_text;
    win.r_name = "cluster";
    win.text_align = Pango.Alignment.LEFT;
    win.justify_text = false;
    win.present ();
}

int main (string[] args) {
    var app = new Gtk.Application ("org.example.ExtentDemo",
        ApplicationFlags.HANDLES_OPEN | ApplicationFlags.DEFAULT_FLAGS);

    string demo = "᾿Απ᾿ τὰ κόκκαλα βγαλμένη\nτῶν ῾Ελλήνων τὰ ἱερά\n" +
        "καὶ σὰν πρῶτα ἀνδρειωμένη\n" +
        "χαῖρε, ὦ χαῖρε, ᾿Ελευθεριά! \n" +
        "well let's do some fishy things too.";

    app.activate.connect (() => {
        present_extent_window (app, demo);
    });

    app.open.connect ((files, hint) => {
        string text = demo;
        if (files.length > 0) {
            try {
                uint8[] raw;
                string etag;
                files[0].load_contents (null, out raw, out etag);
                text = (string) raw;
            } catch (Error e) {
                stderr.printf ("Failed reading file: %s\n", e.message);
                return;
            }
            if (!text.validate ()) {
                stderr.printf ("invalid utf8 string\n");
                return;
            }
        }
        present_extent_window (app, text);
    });

    return app.run (args);
}
```

### Compile and run

Compile:

```shell
valac --pkg gtk4 --pkg pangocairo extentdemo.vala
```

Run:

```shell
./extentdemo
```

Run with file:

```shell
./extentdemo myfile.txt
```

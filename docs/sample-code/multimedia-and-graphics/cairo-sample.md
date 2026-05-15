# Cairo sample (GTK drawing)

Adapted from the archived GNOME Wiki page [Projects/Vala/CairoSample](https://wiki.gnome.org/Projects/Vala/CairoSample). The wiki used GTK 3; the primary example below uses GTK 4 and `Gtk.DrawingArea.set_draw_func`.

The wiki also described multi-threaded drawing with Gdk threads (GTK 2) and shaped / transparent windows (GTK 2 and GTK 3). Shaped windows are tied to old GDK APIs; see the [wiki archive](https://wiki.gnome.org/Projects/Vala/CairoSample). The threaded animation idea matches the upstream Cairo article [Threaded animation with Cairo](https://cairographics.org/threaded_animation_with_cairo/); a GTK 4 port that keeps heavy Cairo work off the UI thread is below.

## Basic shapes (GTK 4)

```vala
using Gtk;
using Cairo;

public class CairoSampleApp : Gtk.Application {

    const int SIZE = 30;

    public CairoSampleApp () {
        GLib.Object (application_id: "org.example.CairoSample");
    }

    public override void activate () {
        var window = new ApplicationWindow (this) {
            title = "Cairo Vala Demo",
            default_width = 450,
            default_height = 550
        };

        var drawing_area = new DrawingArea ();
        drawing_area.set_draw_func (on_draw);
        window.child = drawing_area;
        window.present ();
    }

    void on_draw (Gtk.DrawingArea da, Cairo.Context ctx, int width, int height) {
        ctx.set_source_rgb (0, 0, 0);

        ctx.set_line_width (SIZE / 4);
        ctx.set_tolerance (0.1);

        ctx.set_line_join (LineJoin.ROUND);
        ctx.set_dash (new double[] { SIZE / 4.0, SIZE / 4.0 }, 0);
        stroke_shapes (ctx, 0, 0);

        ctx.set_dash (null, 0);
        stroke_shapes (ctx, 0, 3 * SIZE);

        ctx.set_line_join (LineJoin.BEVEL);
        stroke_shapes (ctx, 0, 6 * SIZE);

        ctx.set_line_join (LineJoin.MITER);
        stroke_shapes (ctx, 0, 9 * SIZE);

        fill_shapes (ctx, 0, 12 * SIZE);

        ctx.set_line_join (LineJoin.BEVEL);
        fill_shapes (ctx, 0, 15 * SIZE);
        ctx.set_source_rgb (1, 0, 0);
        stroke_shapes (ctx, 0, 15 * SIZE);
    }

    void stroke_shapes (Context ctx, int x, int y) {
        draw_shapes (ctx, x, y, ctx.stroke);
    }

    void fill_shapes (Context ctx, int x, int y) {
        draw_shapes (ctx, x, y, ctx.fill);
    }

    delegate void DrawMethod ();

    void draw_shapes (Context ctx, int x, int y, DrawMethod draw_method) {
        ctx.save ();

        ctx.new_path ();
        ctx.translate (x + SIZE, y + SIZE);
        bowtie (ctx);
        draw_method ();

        ctx.new_path ();
        ctx.translate (3 * SIZE, 0);
        square (ctx);
        draw_method ();

        ctx.new_path ();
        ctx.translate (3 * SIZE, 0);
        triangle (ctx);
        draw_method ();

        ctx.new_path ();
        ctx.translate (3 * SIZE, 0);
        inf (ctx);
        draw_method ();

        ctx.restore ();
    }

    void triangle (Context ctx) {
        ctx.move_to (SIZE, 0);
        ctx.rel_line_to (SIZE, 2 * SIZE);
        ctx.rel_line_to (-2 * SIZE, 0);
        ctx.close_path ();
    }

    void square (Context ctx) {
        ctx.move_to (0, 0);
        ctx.rel_line_to (2 * SIZE, 0);
        ctx.rel_line_to (0, 2 * SIZE);
        ctx.rel_line_to (-2 * SIZE, 0);
        ctx.close_path ();
    }

    void bowtie (Context ctx) {
        ctx.move_to (0, 0);
        ctx.rel_line_to (2 * SIZE, 2 * SIZE);
        ctx.rel_line_to (-2 * SIZE, 0);
        ctx.rel_line_to (2 * SIZE, -2 * SIZE);
        ctx.close_path ();
    }

    void inf (Context ctx) {
        ctx.move_to (0, SIZE);
        ctx.rel_curve_to (0, SIZE, SIZE, SIZE, 2 * SIZE, 0);
        ctx.rel_curve_to (SIZE, -SIZE, 2 * SIZE, -SIZE, 2 * SIZE, 0);
        ctx.rel_curve_to (0, SIZE, -SIZE, SIZE, -2 * SIZE, 0);
        ctx.rel_curve_to (-SIZE, -SIZE, -2 * SIZE, -SIZE, -2 * SIZE, 0);
        ctx.close_path ();
    }

    public static int main (string[] args) {
        return new CairoSampleApp ().run (args);
    }
}
```

### Compile and run

```shell
valac --pkg gtk4 cairo-sample.vala
./cairo-sample
```

## Multi-threaded animation (GTK 4)

The [wiki threaded example](https://wiki.gnome.org/Projects/Vala/CairoSample) used `Gdk.Pixmap`, `expose_event`, `Gdk.threads_enter` / `Gdk.threads_leave`, and `Thread.create`. None of that exists on GTK 4, and you must not call GTK or Gdk from a worker thread. The pattern here matches the [Cairo threaded animation](https://cairographics.org/threaded_animation_with_cairo/) article: rasterize to a `Cairo.ImageSurface` on a background thread, then hand the finished surface to the main loop with `Idle.add` so `Gtk.DrawingArea` can paint it from `set_draw_func` only on the main thread. Width and height are read on the main thread in the timer callback before each `GLib.Thread` is started (the wiki’s `pixmap.get_size` under Gdk locks is replaced by that snapshot).

Function names `do_draw` and `timer_exe` are kept aligned with the wiki / cairographics walkthroughs for easier comparison.

```vala
using Gtk;
using Cairo;

public class CairoThreadedGtk4App : Gtk.Application {

    Gtk.DrawingArea da;
    Cairo.ImageSurface? buffer;
    GLib.Mutex buffer_mutex;
    int currently_drawing;
    int i_draw;
    int thread_w;
    int thread_h;
    GLib.Thread<void*>? thread_info;
    bool first_execution = true;

    public CairoThreadedGtk4App () {
        GLib.Object (application_id: "org.example.CairoThreadedGtk4");
    }

    public override void activate () {
        var window = new ApplicationWindow (this) {
            title = "Cairo threaded animation (GTK 4)",
            default_width = 500,
            default_height = 500
        };
        da = new DrawingArea ();
        da.set_draw_func (on_draw);
        window.child = da;
        window.present ();
        Timeout.add (100, timer_exe);
    }

    void on_draw (DrawingArea area, Context ctx, int width, int height) {
        buffer_mutex.lock ();
        var surf = buffer;
        buffer_mutex.unlock ();
        if (surf != null) {
            ctx.set_source_surface (surf, 0, 0);
            ctx.paint ();
        } else {
            ctx.set_source_rgb (0.5, 0.5, 0.5);
            ctx.paint ();
        }
    }

    // do_draw runs in a separate thread whenever we would like to update our animation
    void* do_draw () {
        currently_drawing = 1;

        int width = thread_w;
        int height = thread_h;

        var cst = new Cairo.ImageSurface (Cairo.Format.ARGB32, width, height);
        var cr = new Cairo.Context (cst);

        i_draw++;
        i_draw = i_draw % 300;
        cr.set_source_rgb (0.9, 0.9, 0.9);
        cr.paint ();
        for (int k = 0; k < 100; k++) {
            for (int j = 0; j < 1000; j++) {
                cr.set_source_rgb ((double) j / 1000.0, (double) j / 1000.0,
                                  1.0 - (double) j / 1000.0);
                cr.move_to (i_draw, j / 2);
                cr.line_to (i_draw + 100, j / 2);
                cr.stroke ();
            }
        }

        Idle.add (() => {
            buffer_mutex.lock ();
            buffer = cst;
            buffer_mutex.unlock ();
            currently_drawing = 0;
            da.queue_draw ();
            return false;
        });

        return null;
    }

    bool timer_exe () {
        int drawing_status = GLib.AtomicInt.get (ref currently_drawing);

        if (drawing_status == 0) {
            if (!first_execution) {
                if (thread_info != null) {
                    thread_info.join ();
                    thread_info = null;
                }
            }
            thread_w = da.get_width ();
            thread_h = da.get_height ();
            if (thread_w < 2) {
                thread_w = 500;
            }
            if (thread_h < 2) {
                thread_h = 500;
            }
            thread_info = new Thread<void*> ("cairo-thread", do_draw);
        }

        da.queue_draw ();
        first_execution = false;
        return true;
    }

    public static int main (string[] args) {
        return new CairoThreadedGtk4App ().run (args);
    }
}
```

### Compile and run (threaded sample)

Compile:

```shell
valac --pkg gtk4 cairo-threaded-gtk4.vala
```

Run:

```shell
./cairo-threaded-gtk4
```



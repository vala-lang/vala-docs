# GStreamer samples

Adapted from the archived GNOME Wiki page [Projects/Vala/GStreamerSample](https://wiki.gnome.org/Projects/Vala/GStreamerSample). These examples target GStreamer 1.x (`gstreamer-1.0`). The wiki’s GStreamer 0.10 snippets are omitted here.

## Square-wave test tone

Plays a square wave through the default audio sink until you stop the process (Ctrl+C).

```vala
using Gst;

void main (string[] args) {
     // Initializing GStreamer
    Gst.init (ref args);

    // Creating pipeline and elements
    var pipeline = new Pipeline ("test");
    var src = ElementFactory.make ("audiotestsrc", "my_src");
    var sink = ElementFactory.make ("autoaudiosink", "my_sink");

    // Adding elements to pipeline
    pipeline.add_many (src, sink);

    // Linking source to sink
    src.link (sink);

    // Setting waveform to square
    src.set ("wave", 1);

    // Set pipeline state to PLAYING
    pipeline.set_state (State.PLAYING);

    // Creating and starting a GLib main loop
    new MainLoop ().run ();
}
```

### Compile and run

```shell
valac --pkg gstreamer-1.0 gst-squarebeep.vala
./gst-squarebeep
```

## Stream player (`playbin`)

Plays a URI passed on the command line, or a default HTTP stream if none is given. The bus callback prints errors, end-of-stream, state changes, and basic tags.

```vala
using Gst;

public class StreamPlayer {

    MainLoop loop = new MainLoop ();

    void foreach_tag (Gst.TagList list, string tag) {
        switch (tag) {
        case "title":
            string tag_string;
            list.get_string (tag, out tag_string);
            stdout.printf ("tag: %s = %s\n", tag, tag_string);
            break;
        default:
            break;
        }
    }

    bool bus_callback (Gst.Bus bus, Gst.Message message) {
        switch (message.type) {
        case MessageType.ERROR:
            GLib.Error err;
            string debug;
            message.parse_error (out err, out debug);
            stdout.printf ("Error: %s\n", err.message);
            loop.quit ();
            break;
        case MessageType.EOS:
            stdout.printf ("end of stream\n");
            break;
        case MessageType.STATE_CHANGED:
            Gst.State oldstate;
            Gst.State newstate;
            Gst.State pending;
            message.parse_state_changed (out oldstate, out newstate, out pending);
            stdout.printf ("state changed: %s->%s:%s\n",
                           oldstate.to_string (), newstate.to_string (),
                           pending.to_string ());
            break;
        case MessageType.TAG:
            Gst.TagList tag_list;
            stdout.printf ("taglist found\n");
            message.parse_tag (out tag_list);
            tag_list.foreach ((TagForeachFunc) foreach_tag);
            break;
        default:
            break;
        }

        return true;
    }

    public void play (string stream) {
        dynamic Element play = ElementFactory.make ("playbin", "play");
        play.uri = stream;

        Bus bus = play.get_bus ();
        bus.add_watch (0, bus_callback);

        play.set_state (State.PLAYING);

        loop.run ();
    }
}

const string DEFAULT_STREAM = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg";

int main (string[] args) {
    Gst.init (ref args);

    var player = new StreamPlayer ();
    player.play (args.length > 1 ? args[1] : DEFAULT_STREAM);

    return 0;
}
```

### Compile and run

```shell
valac --pkg gstreamer-1.0 gst-play-stream.vala
./gst-play-stream
```

## Video in a GTK 4 window (`playbin` + `gtk4paintablesink`)

This example embeds video in GTK 4 by setting `playbin`’s `video-sink` to `gtk4paintablesink`, then assigning the sink’s `paintable` property to a `Gtk.Picture`.

Pass a URI on the command line (`file://…` or `https://…`). If you omit it, a small default HTTPS sample is used.

```vala
using Gst;
using Gtk;
using GLib;

public class PlaybinGtk4SinkWindow : Gtk.ApplicationWindow {
    Gst.Element playbin;

    public PlaybinGtk4SinkWindow (Gtk.Application app, string media_uri) {
        GLib.Object (application: app);

        title = "playbin + gtk4paintablesink";
        default_width = 640;
        default_height = 480;

        var picture = new Gtk.Picture ();
        picture.hexpand = true;
        picture.vexpand = true;
        picture.can_shrink = true;

        playbin = Gst.ElementFactory.make ("playbin", "bin");
        playbin["uri"] = media_uri;

        var gtk4sink = Gst.ElementFactory.make ("gtk4paintablesink", "sink");
        if (gtk4sink != null) {
            Gdk.Paintable? paintable = null;
            gtk4sink.get ("paintable", out paintable);
            if (paintable != null) {
                picture.paintable = paintable;
            }
            playbin["video-sink"] = gtk4sink;
        } else {
            warning ("gtk4paintablesink missing: install gst-plugin-gtk4 (GStreamer Rust gtk4 plugin).");
        }

        var play = new Gtk.Button.from_icon_name ("media-playback-start-symbolic");
        play.clicked.connect (() => playbin.set_state (Gst.State.PLAYING));
        var stop = new Gtk.Button.from_icon_name ("media-playback-stop-symbolic");
        stop.clicked.connect (() => playbin.set_state (Gst.State.READY));
        var quit = new Gtk.Button.from_icon_name ("application-exit-symbolic");
        quit.clicked.connect (() => {
            playbin.set_state (Gst.State.NULL);
            application.quit ();
        });

        var row = new Gtk.Box (Orientation.HORIZONTAL, 6) { halign = Align.CENTER, margin_top = 6 };
        row.append (play);
        row.append (stop);
        row.append (quit);

        var box = new Gtk.Box (Orientation.VERTICAL, 6);
        box.append (picture);
        box.append (row);
        set_child (box);
    }
}

int main (string[] args) {
    Gst.init (ref args);
    var app = new Gtk.Application ("com.example.PlaybinGtk4", ApplicationFlags.DEFAULT_FLAGS);
    string uri = args.length > 1 ? args[1] : "https://www.w3schools.com/html/mov_bbb.mp4";
    app.activate.connect (() => {
        new PlaybinGtk4SinkWindow (app, uri).present ();
    });
    return app.run (args);
}
```

### Compile and run

Compile:

```shell
valac --pkg gtk4 --pkg gstreamer-1.0 playbin-gtk4sink.vala
```

Run:

```shell
./playbin-gtk4sink
```

Run with your own specified video:

```shell
./playbin-gtk4sink "file:///path/to/local.webm"
```

## PocketSphinx live demo (GTK 4)

This is an updated port of the GStreamer + PocketSphinx example from the [GNOME Wiki GStreamer sample](https://wiki.gnome.org/Projects/Vala/GStreamerSample). The wiki version targeted GStreamer 0.10, GTK 2, `gconfaudiosrc`, and the `vader` element. Current PocketSphinx + GStreamer guidance uses GStreamer 1.x, an `autoaudiosrc` (or `pulsesrc`) capture chain, and element bus messages from the `pocketsphinx` element instead of GObject signals plus manual `Gst.Message.application` forwarding (see the [CMU Sphinx GStreamer wiki](https://cmusphinx.github.io/wiki/gstreamer/)).

You need the `pocketsphinx` GStreamer plugin (for example from your distribution’s PocketSphinx / GStreamer speech packages). Confirm with:

```shell
gst-inspect-1.0 pocketsphinx
```

If that fails, install PocketSphinx with GStreamer support and adjust `GST_PLUGIN_PATH` as described in the CMU Sphinx documentation.

```vala
/* Copyright (c) 2008 Carnegie Mellon University.
 *
 * You may modify and redistribute this file under the same terms as
 * the CMU Sphinx system. See
 * https://cmusphinx.sourceforge.net/html/LICENSE for more information.
 *
 * Port: GTK 4, GStreamer 1.x, element bus messages (CMU livedemo style).
 */

using Gtk;
using Gst;

public class SphinxLiveDemoApp : Gtk.Application {
    Gtk.TextBuffer textbuf;
    Gtk.TextView text_view;
    Gtk.ToggleButton speak_button;
    Gst.Element? pipeline;

    public SphinxLiveDemoApp () {
        GLib.Object (application_id: "org.example.SphinxLiveDemo");
    }

    public override void activate () {
        var window = new Gtk.ApplicationWindow (this) {
            title = "GStreamer / PocketSphinx live demo",
            default_width = 400,
            default_height = 260
        };

        textbuf = new Gtk.TextBuffer (null);
        text_view = new Gtk.TextView.with_buffer (textbuf);
        text_view.wrap_mode = WrapMode.WORD;
        text_view.vexpand = true;

        var scroll = new Gtk.ScrolledWindow ();
        scroll.set_child (text_view);
        scroll.set_policy (PolicyType.AUTOMATIC, PolicyType.AUTOMATIC);

        speak_button = new Gtk.ToggleButton.with_label ("Speak");
        speak_button.clicked.connect (on_speak_button_clicked);

        var box = new Gtk.Box (Orientation.VERTICAL, 6) {
            margin_start = 10,
            margin_end = 10,
            margin_top = 10,
            margin_bottom = 10
        };
        box.append (scroll);
        box.append (speak_button);

        window.set_child (box);
        window.close_request.connect (() => {
            if (pipeline != null) {
                pipeline.set_state (Gst.State.NULL);
            }
            return false;
        });

        window.present ();

        init_gst ();
    }

    void init_gst () {
        try {
            /* 16 kHz mono PCM is typical for pocketsphinx; audioresample converts. */
            pipeline = Gst.parse_launch (
                "autoaudiosrc ! audioconvert ! audioresample ! pocketsphinx name=asr ! fakesink");
        } catch (Error e) {
            stderr.printf ("Failed to create pipeline: %s\n", e.message);
            return;
        }

        Gst.Bus bus = pipeline.get_bus ();
        bus.add_signal_watch ();
        bus.message.connect (on_bus_message);

        pipeline.set_state (Gst.State.PAUSED);
    }

    void on_bus_message (Gst.Bus bus, Gst.Message msg) {
        if (msg.type != Gst.MessageType.ELEMENT) {
            return;
        }

        unowned Gst.Structure? st = msg.get_structure ();
        if (st == null || st.get_name () != "pocketsphinx") {
            return;
        }

        /* Final utterance: structure contains "final" and "hypothesis". */
        bool is_final = false;
        if (st.has_field ("final")) {
            st.get_boolean ("final", out is_final);
        }

        unowned string? hyp_ptr = st.get_string ("hypothesis");
        if (hyp_ptr == null) {
            return;
        }
        string hyp = hyp_ptr;

        if (is_final) {
            insert_final_result (hyp);
            pipeline.set_state (Gst.State.PAUSED);
            speak_button.active = false;
            speak_button.label = "Speak";
        } else {
            show_partial_result (hyp);
        }
    }

    void show_partial_result (string hyp) {
        textbuf.begin_user_action ();
        textbuf.delete_selection (true, text_view.editable);
        textbuf.insert_at_cursor (hyp, hyp.length);
        Gtk.TextIter iter;
        unowned Gtk.TextMark ins = textbuf.get_insert ();
        textbuf.get_iter_at_mark (out iter, ins);
        iter.backward_chars (hyp.length);
        textbuf.move_mark (ins, iter);
        textbuf.end_user_action ();
    }

    void insert_final_result (string hyp) {
        textbuf.begin_user_action ();
        textbuf.delete_selection (true, text_view.editable);
        textbuf.insert_at_cursor (hyp, hyp.length);
        textbuf.end_user_action ();
    }

    void on_speak_button_clicked () {
        if (pipeline == null) {
            return;
        }
        if (speak_button.active) {
            speak_button.label = "Stop";
            pipeline.set_state (Gst.State.PLAYING);
        } else {
            speak_button.label = "Speak";
            pipeline.set_state (Gst.State.PAUSED);
        }
    }

    public static int main (string[] args) {
        Gst.init (ref args);
        var app = new SphinxLiveDemoApp ();
        return app.run (args);
    }
}
```

### Compile and run

```shell
valac --pkg gtk4 --pkg gstreamer-1.0 sphinx-livedemo.vala
./sphinx-livedemo
```

On Linux you can swap `autoaudiosrc` for `pulsesrc` in the launch string if you prefer PulseAudio capture. The old `vader` voice-activity element is not required with current PocketSphinx (VAD is handled inside the decoder).

If `get_boolean ("final", …)` does not match your installed plugin’s fields, run `gst-inspect-1.0 pocketsphinx` and adjust the `on_bus_message` parser to match the posted structure (field names can vary slightly by version).

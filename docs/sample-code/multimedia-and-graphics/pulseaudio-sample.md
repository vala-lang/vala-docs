# PulseAudio sample (playback)

Adapted from the archived GNOME Wiki page [Projects/Vala/PulseAudioSamples](https://wiki.gnome.org/Projects/Vala/PulseAudioSamples). The wiki example used GTK 2 only to run a `Gtk.main` loop; PulseAudio already ships a GLib mainloop adapter, so this version uses `GLib.MainLoop` instead.

The program connects a PulseAudio context, waits until the context is ready, configures a playback stream, and writes an interleaved stereo sine wave from the write callback.

```vala
using PulseAudio;

public class AudioDevice : GLib.Object {
    PulseAudio.GLibMainLoop pa_loop;
    PulseAudio.Context context;
    Context.Flags cflags;
    PulseAudio.SampleSpec spec;
    PulseAudio.Stream.BufferAttr attr;
    double m_amp = 0.3;
    double m_freq = 500;
    double m_time = 0;
    double twopi_over_sr;

    public AudioDevice () {
        Object ();
    }

    construct {
        this.spec = PulseAudio.SampleSpec () {
            format = PulseAudio.SampleFormat.S16LE,
            channels = 2,
            rate = 44100
        };
        twopi_over_sr = (2.0 * Math.PI) / (double) spec.rate;
    }

    public void start () {
        this.pa_loop = new PulseAudio.GLibMainLoop ();
        this.context = new PulseAudio.Context (pa_loop.get_api (), null);
        this.cflags = Context.Flags.NOFAIL;
        this.context.set_state_callback (cstate_cb);

        if (this.context.connect (null, this.cflags, null) < 0) {
            print ("pa_context_connect() failed: %s\n",
                   PulseAudio.strerror (context.errno ()));
        }
    }

    public void stream_over_cb (Stream stream) {
        print ("AudioDevice: stream overflow...\n");
    }

    public void stream_under_cb (Stream stream) {
        print ("AudioDevice: stream underflow...\n");
    }

    public void write_cb (Stream stream, size_t nbytes) {
        uint len = (uint) (nbytes / sizeof (int16));
        int16[] data = new int16[len];

        for (uint i = 0; i < len; i += spec.channels) {
            int16 val = (int16) (32767.0 * m_amp * Math.sin (m_freq * m_time * twopi_over_sr));
            for (uint j = 0; j < spec.channels; j++) {
                data[i + j] = val;
            }
            this.m_time++;
        }

        stream.write ((void *) data, sizeof (int16) * data.length);
    }

    public void cstate_cb (Context context) {
        Context.State state = context.get_state ();
        if (state == Context.State.UNCONNECTED) { print ("state UNCONNECTED\n"); }
        if (state == Context.State.CONNECTING) { print ("state CONNECTING\n"); }
        if (state == Context.State.AUTHORIZING) { print ("state AUTHORIZING\n"); }
        if (state == Context.State.SETTING_NAME) { print ("state SETTING_NAME\n"); }
        if (state == Context.State.READY) { print ("state READY\n"); }
        if (state == Context.State.FAILED) { print ("state FAILED\n"); }
        if (state == Context.State.TERMINATED) { print ("state TERMINATED\n"); }

        if (state == Context.State.READY) {
            this.attr = PulseAudio.Stream.BufferAttr ();
            size_t fragment_size = 0;
            size_t n_fragments = 0;
            Stream.Flags flags = Stream.Flags.INTERPOLATE_TIMING
                | Stream.Flags.AUTO_TIMING_UPDATE
                | Stream.Flags.EARLY_REQUESTS;

            PulseAudio.Stream stream = new PulseAudio.Stream (context, "", this.spec);
            stream.set_write_callback (write_cb);
            stream.set_overflow_callback (stream_over_cb);
            stream.set_underflow_callback (stream_under_cb);

            size_t fs = spec.frame_size ();

            if ((fragment_size % fs) == 0 && n_fragments >= 2 && fragment_size > 0) {
                print ("something went wrong\n");
                return;
            }

            if (n_fragments < 2) {
                if (fragment_size > 0) {
                    n_fragments = (spec.bytes_per_second () / 2 / fragment_size);
                    if (n_fragments < 2) {
                        n_fragments = 2;
                    }
                } else {
                    n_fragments = 12;
                }
            }

            if (fragment_size <= 0) {
                fragment_size = spec.bytes_per_second () / 2 / n_fragments;
                if (fragment_size < 1024) {
                    fragment_size = 1024;
                }
            }

            print ("fragment_size: %s, n_fragments: %s, fs: %s\n",
                   fragment_size.to_string (), n_fragments.to_string (), fs.to_string ());

            attr.maxlength = (uint32) (fragment_size * (n_fragments + 1));
            attr.tlength = (uint32) (fragment_size * n_fragments);
            attr.prebuf = (uint32) fragment_size;
            attr.minreq = (uint32) fragment_size;

            int tmp = stream.connect_playback (null, attr, flags, null, null);
            if (tmp < 0) {
                print ("connect_playback returned %s\n", tmp.to_string ());
                print ("pa_stream_connect_playback() failed: %s\n",
                       PulseAudio.strerror (context.errno ()));
            }
        }
    }
}

int main (string[] args) {
    var loop = new GLib.MainLoop (null, false);
    var adev = new AudioDevice ();
    adev.start ();
    loop.run ();
    return 0;
}
```

## Compile and run

```shell
valac --pkg libpulse --pkg posix --pkg libpulse-mainloop-glib pulse.vala
./pulse
```

Stop playback with Ctrl+C.


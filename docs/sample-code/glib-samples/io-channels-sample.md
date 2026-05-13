# IO Channels Sample

Vala port of the pipe example described in [this Linux Journal article](https://www.linuxjournal.com/article/8545).
It uses [`GLib.IOChannel`](https://valadoc.org/glib-2.0/GLib.IOChannel.html) with a
[`GLib.MainLoop`](https://valadoc.org/glib-2.0/GLib.MainLoop.html) so reads and writes on a pipe are
driven by event sources. The program runs until you stop it (for example with Ctrl+C). It adapts
the archived [Vala IoChannelsSample](https://wiki.gnome.org/Projects/Vala/IoChannelsSample) page on
the GNOME Wiki.

## Program

Save as `giochanneltest.vala`:

```vala
public class PipeTalker : Object {

    // reading callback
    private bool gio_in (IOChannel gio, IOCondition condition) {
        IOStatus ret;
        string msg;
        size_t len;

        if ((condition & IOCondition.HUP) == IOCondition.HUP) {
            print ("Read end of pipe died!\n");
        }

        try {
            ret = gio.read_line (out msg, out len, null);
        } catch (IOChannelError e) {
            print ("Error reading: %s\n", e.message);
            return false;
        } catch (ConvertError e) {
            print ("Error reading: %s\n", e.message);
            return false;
        }

        print ("Read %u bytes: %s\n", (uint) len, msg);

        return true;
    }

    // writing callback
    private bool gio_out (IOChannel gio, IOCondition condition) {
        string msg = "The price of greatness is responsibility.\n";
        IOStatus ret;
        size_t len;

        if ((condition & IOCondition.HUP) == IOCondition.HUP) {
            print ("Write end of pipe died!\n");
        }

        try {
            ret = gio.write_chars ((char[]) msg, out len);
        } catch (IOChannelError e) {
            print ("Error writing: %s\n", e.message);
            return false;
        } catch (ConvertError e) {
            print ("Error writing: %s\n", e.message);
            return false;
        }

        print ("Wrote %u bytes.\n", (uint) len);

        return true;
    }

    public void init_channels () {
        IOChannel io_read, io_write;
        int[] fd = new int[2];
        int ret;

        ret = Posix.pipe (fd);
        if (ret == -1) {
            print ("Creating pipe failed: %s\n", GLib.strerror (Posix.errno));
            return;
        }

        io_read = new IOChannel.unix_new (fd[0]);
        io_write = new IOChannel.unix_new (fd[1]);

        if (io_read == null || io_write == null) {
            print ("Cannot create new IOChannel!\n");
            return;
        }

        if (io_read.add_watch (IOCondition.IN | IOCondition.HUP, gio_in) == 0) {
            print ("Cannot add watch on IOChannel!\n");
            return;
        }

        if (io_write.add_watch (IOCondition.OUT | IOCondition.HUP, gio_out) == 0) {
            print ("Cannot add watch on IOChannel!\n");
            return;
        }
    }

    public static int main () {
        var loop = new MainLoop (null, false);
        var pt = new PipeTalker ();
        pt.init_channels ();
        loop.run ();
        return 0;
    }
}
```

## Compile and run

```shell
valac --pkg posix giochanneltest.vala
./giochanneltest
```

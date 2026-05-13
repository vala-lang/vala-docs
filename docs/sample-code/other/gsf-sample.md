# GSF sample (ZIP archives)

This sample shows how to use [LibGSF](https://gitlab.gnome.org/GNOME/libgsf) to read entries from a ZIP archive and write them into a directory tree. Adapted from the archived GNOME Wiki page [Projects/Vala/GSFSample](https://wiki.gnome.org/Projects/Vala/GSFSample).

The original wiki page targeted Vala 0.8 and LibGSF 1.14.17; the example below uses normal `try` / `catch` error handling instead of the invalid bare `catch` blocks shown in the archive.

```vala
using Gsf;

int main () {
    try {
        var file = new Gsf.InputStdio ("myarchive.zip");
        var zipfile = new Gsf.InfileZip (file);
        var folder = new Gsf.OutfileStdio ("myarchive");

        int num_items = zipfile.num_children ();
        for (int i = 0; i < num_items; i++) {
            var item = zipfile.child_by_index (i);
            var itemfile = Gsf.StructuredBlob.read (item);
            itemfile.write (folder);
        }
    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
        return 1;
    }

    return 0;
}
```

## Compile and run

Place a ZIP archive named `myarchive.zip` in the current directory, then:

```shell
valac --pkg libgsf-1 gsf-sample.vala
./gsf-sample
```

Your distribution may ship the pkg-config module as `libgsf-1` or a similar name; adjust `--pkg` to match what `pkg-config --list-all | grep -i gsf` reports.

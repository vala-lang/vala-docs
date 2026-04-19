# GIO Compression Sample

Deflate and inflate a file in gzip format using
[`ZlibCompressor`](https://docs.gtk.org/gio/class.ZlibCompressor.html) and
[`ZlibDecompressor`](https://docs.gtk.org/gio/class.ZlibDecompressor.html).
Requires GLib/GIO >= 2.24.

```vala
const ZlibCompressorFormat FORMAT = ZlibCompressorFormat.GZIP;

void compress (File source, File dest) throws Error {
    convert (source, dest, new ZlibCompressor (FORMAT));
}

void decompress (File source, File dest) throws Error {
    convert (source, dest, new ZlibDecompressor (FORMAT));
}

void convert (File source, File dest, Converter converter) throws Error {
    var src_stream = source.read ();
    var dst_stream = dest.replace (null, false, 0);
    var conv_stream = new ConverterOutputStream (dst_stream, converter);
    // 'splice' pumps all data from an InputStream to an OutputStream
    conv_stream.splice (src_stream, 0);
}

int main (string[] args) {
    if (args.length < 2) {
        stdout.printf ("Usage: %s FILE\n", args[0]);
        return 0;
    }

    var infile = File.new_for_commandline_arg (args[1]);
    if (!infile.query_exists ()) {
        stderr.printf ("File '%s' does not exist.\n", args[1]);
        return 1;
    }

    var zipfile = File.new_for_commandline_arg (args[1] + ".gz");
    var outfile = File.new_for_commandline_arg (args[1] + "_out");

    try {
        compress (infile, zipfile);
        decompress (zipfile, outfile);
    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
        return 1;
    }

    return 0;
}
```

## Compile and Run

```shell
valac --pkg gio-2.0 gio-compression.vala
./gio-compression FILENAME
```

# TIFF sample (libtiff)

Read a TIFF image into an RGBA raster, then write a grayscale TIFF. Adapted from the archived GNOME Wiki page [Projects/Vala/TiffSample](https://wiki.gnome.org/Projects/Vala/TiffSample).

The wiki used `error ()`, which throws in Vala; this version reports failures on `stderr` and returns a non-zero exit status instead.

```vala
using Tiff;
using GLib;

public class TiffReadWrite : Object {

    uint32[] raster;
    uint32 width;
    uint32 height;
    uint32 size;

    string fname { get; set; }
    string fmode { get; set; }

    public TiffReadWrite (string filename, string mode) {
        this.fname = filename;
        this.fmode = mode;
    }

    public bool read_image () {
        var tif = new TIFF (fname, fmode);

        if (tif == null) {
            stderr.printf ("Couldn't open file %s\n", fname);
            return false;
        }

        tif.GetField (TIFFTAG_IMAGEWIDTH, out this.width);
        tif.GetField (TIFFTAG_IMAGELENGTH, out this.height);
        this.size = this.width * this.height;

        raster = new uint32[size];
        if (!tif.ReadRGBAImage (this.width, this.height, this.raster, 0)) {
            stderr.printf ("Couldn't read image %s\n", this.fname);
            return false;
        }
        return true;
    }

    public void write_image (string filename) {
        var newtif = new TIFF (filename, "w");
        var row = new uint8[width];

        newtif.SetField (TIFFTAG_IMAGEWIDTH, this.width);
        newtif.SetField (TIFFTAG_IMAGELENGTH, this.height);
        newtif.SetField (TIFFTAG_BITSPERSAMPLE, 8);
        newtif.SetField (TIFFTAG_COMPRESSION, COMPRESSION_LZW);
        newtif.SetField (TIFFTAG_PLANARCONFIG, PLANARCONFIG_CONTIG);
        newtif.SetField (TIFFTAG_ORIENTATION, ORIENTATION_BOTLEFT);

        for (uint32 h = 0; h < this.height; h++) {
            for (uint32 w = 0; w < this.width; w++) {
                row[w] = (uint8) raster[this.width * h + w];
            }
            newtif.WriteScanline ((tdata_t) row, h, 0);
        }
    }

    public static int main (string[] args) {
        string? in_arg = args[1];
        if (in_arg == null) {
            stderr.printf ("Usage: %s <input.tif>\n", args[0]);
            return 1;
        }

        var tt = new TiffReadWrite (in_arg, "r");

        if (!tt.read_image ()) {
            return 1;
        }
        tt.write_image ("/tmp/test.tiff");

        return 0;
    }
}
```

## Compile and run

```shell
valac --pkg tiff -X -ltiff -o tiffreadwrite tiffreadwrite.vala
./tiffreadwrite sample.tif
```

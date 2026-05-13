# USB device listing (libusb)

This sample lists attached USB devices using [libusb](https://libusb.info/) bindings. Adapted from the archived GNOME Wiki page [Projects/Vala/USBSample](https://wiki.gnome.org/Projects/Vala/USBSample).

```vala
using LibUSB;

int main () {
    Context context;
    Device[] devices;

    Context.init (out context);
    devices = context.get_device_list ();

    stdout.printf ("\n USB device list\n---------------\n");

    int i = 0;
    while (devices[i] != null) {
        var dev = devices[i];

        stdout.printf ("\n Bus number   : %04x\n", dev.get_bus_number ());
        stdout.printf (" Address      : %04x\n", dev.get_device_address ());

        DeviceDescriptor desc = DeviceDescriptor (dev);
        stdout.printf (" Vendor ID    : %04x\n", desc.idVendor);
        stdout.printf (" Product ID   : %04x\n", desc.idProduct);
        stdout.printf ("\n");
        i++;
    }

    return 0;
}
```

## Compile and run

```shell
valac --pkg libusb-1.0 usb-sample.vala
./usb-sample
```

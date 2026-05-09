# D-Bus Basic (GDBus) Samples

Vala supports D-Bus through the GDBus API in GLib/GIO (≥ 2.26). Vala maps
`lower_case` names to D-Bus `CamelCase` names for methods, signals, and
properties.

## Server

The `[DBus (name = "…")]` attribute on a class sets the **D-Bus interface name**.

```vala
/* Note: this attribute specifies the _interface_ name.  It
 * is called 'name =' for historical reasons.
 */
[DBus (name = "org.example.Demo")]
public class DemoServer : Object {

    private int counter;

    public int ping (string msg) {
        stdout.printf ("%s\n", msg);
        return counter++;
    }

    public int ping_with_signal (string msg) {
        stdout.printf ("%s\n", msg);
        pong (counter, msg);
        return counter++;
    }

    /* A parameter of type GLib.BusName is not part of the D-Bus signature;
       it receives the sender's unique bus name. */
    public int ping_with_sender (string msg, GLib.BusName sender) {
        stdout.printf ("%s, from: %s\n", msg, sender);
        return counter++;
    }

    public void ping_error () throws Error {
        throw new DemoError.SOME_ERROR ("There was an error!");
    }

    public signal void pong (int count, string msg);
}

[DBus (name = "org.example.DemoError")]
public errordomain DemoError
{
    SOME_ERROR
}

void on_bus_acquired (DBusConnection conn) {
    try {
        conn.register_object ("/org/example/demo", new DemoServer ());
    } catch (IOError e) {
        stderr.printf ("Could not register service\n");
    }
}

void main () {
    Bus.own_name (BusType.SESSION, "org.example.Demo", BusNameOwnerFlags.NONE,
                  on_bus_acquired,
                  () => {},
                  () => stderr.printf ("Could not acquire name\n"));

    new MainLoop ().run ();
}
```

```shell
valac --pkg gio-2.0 gdbus-demo-server.vala
```

## Client

Interface methods should be declared with `throws IOError` (or a compatible
error domain) where the remote call can fail.

```vala
[DBus (name = "org.example.Demo")]
interface Demo : Object {
    public abstract int ping (string msg) throws IOError;
    public abstract int ping_with_sender (string msg) throws IOError;
    public abstract int ping_with_signal (string msg) throws IOError;
    public signal void pong (int count, string msg);
}

void main () {
    /* Needed only if your client is listening to signals; you can omit it otherwise */
    var loop = new MainLoop();

    /* Important: keep demo variable out of try/catch scope not lose signals! */
    Demo demo = null;

    try {
        demo = Bus.get_proxy_sync (BusType.SESSION, "org.example.Demo",
                                                    "/org/example/demo");

        /* Connecting to signal pong! */
        demo.pong.connect((c, m) => {
            stdout.printf ("Got pong %d for msg '%s'\n", c, m);
            loop.quit ();
        });

        int reply = demo.ping ("Hello from Vala");
        stdout.printf ("%d\n", reply);

        reply = demo.ping_with_sender ("Hello from Vala with sender");
        stdout.printf ("%d\n", reply);

        reply = demo.ping_with_signal ("Hello from Vala with signal");
        stdout.printf ("%d\n", reply);

    } catch (IOError e) {
        stderr.printf ("%s\n", e.message);
    }
    loop.run();
}
```

```shell
valac --pkg gio-2.0 gdbus-demo-client.vala
```

Run the server in one terminal, then the client in another (same session bus).

## Type Table

| D-Bus | Vala | Description | Example |
| --- | --- | --- | --- |
| b | bool | Boolean | |
| y | uint8 | Byte | |
| i | int | Integer | |
| u | uint | Unsigned integer | |
| n | int16 | 16-bit integer | |
| q | uint16 | Unsigned 16-bit integer | |
| x | int64 | 64-bit integer | |
| t | uint64 | Unsigned 64-bit integer | |
| d | double | Double | |
| s | string | String | |
| v | GLib.Variant | Variant | |
| o | GLib.ObjectPath | Object path | |
| a | array | Array | `ai` -> `int[]` |
| a{} | GLib.HashTable<,> | Dictionary | `a{sv}` -> `HashTable<string, Variant>` |
| () | struct | Struct | `a(ii)` maps to `Foo[]` where `Foo` might be defined as `struct Foo { public int a; public int b; };`<br>A struct representing `a(tsav)` might look like `struct Bar { public uint64 a; public string b; public Variant[] c;}` |

See [D-Bus struct mapping in the reference](https://dbus.freedesktop.org/doc/dbus-specification.html#type-system).

## Debugging D-Bus Applications

### D-Spy

[D-Spy](https://apps.gnome.org/Dspy/) is a modern graphical D-Bus inspector that has superseded D-Feet. It allows you to browse the D-Bus, inspect interfaces, and invoke methods on your services.

### dbus-monitor

Open a terminal and enter:


```shell
dbus-monitor
```

Excerpt from the output showing a property change notification:

```
signal sender=:1.454 -> dest=(null destination) serial=9 path=/org/example/demo; interface=org.freedesktop.DBus.Properties; member=PropertiesChanged
   string "org.example.Demo"
   array [
      dict entry(
         string "pubprop"
         variant             string "1018873421"
      )
   ]
   array [
   ]
```

## Property Change Notifications

This service exposes a string property and emits
`org.freedesktop.DBus.Properties` `PropertiesChanged` when it changes (for use
with `dbus-monitor` and similar tools).

The timeout will change the property every few seconds. The notifications can be visualized by the terminal program 'dbus-monitor' that comes with most distributions.

Example Code partly by Faheem:

```vala
[DBus (name = "org.example.Demo")]
public class DemoServer : Object {

    public string pubprop { owned get; set; }

    private weak DBusConnection conn;

    public DemoServer (DBusConnection conn) {
        this.conn = conn;
        this.notify.connect (send_property_change);
    }

    private void send_property_change (ParamSpec p) {
        var builder = new VariantBuilder (VariantType.ARRAY);
        var invalid_builder = new VariantBuilder (new VariantType ("as"));

        if (p.name == "pubprop") {
            builder.add ("{sv}", "pubprop", new Variant.string (pubprop));
        }

        try {
            conn.emit_signal (null,
                              "/org/example/demo",
                              "org.freedesktop.DBus.Properties",
                              "PropertiesChanged",
                              new Variant ("(sa{sv}as)",
                                           "org.example.Demo",
                                           builder,
                                           invalid_builder)
                              );
        } catch (Error e) {
            stderr.printf ("%s\n", e.message);
        }
    }
}

public class NotificationsTest : Object {

    private DemoServer dserver;

    public NotificationsTest () {
        Bus.own_name (BusType.SESSION, "org.example.Demo", BusNameOwnerFlags.NONE,
                      on_bus_acquired, on_name_acquired, on_name_lost);
    }

    private void on_bus_acquired (DBusConnection conn) {
        print ("bus acquired\n");
        try {
            this.dserver = new DemoServer (conn);
            conn.register_object ("/org/example/demo", this.dserver);
        } catch (IOError e) {
            print ("%s\n", e.message);
        }
    }

    private void on_name_acquired () {
        print ("name acquired\n");
    }

    private void on_name_lost () {
        print ("name lost\n");
    }

    public void setup_timeout () {
        Timeout.add_seconds (4, () => {
            dserver.pubprop = Random.next_int ().to_string ();
            return true;
        });
    }
}

void main () {
    var nt = new NotificationsTest ();
    nt.setup_timeout ();
    new MainLoop ().run ();
}
```

```shell
valac --pkg gio-2.0 gdbus-change-notifications.vala
```

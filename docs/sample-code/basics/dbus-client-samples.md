# D-Bus Client Examples

These examples require Vala ≥ 0.9.2 and GLib/GIO ≥ 2.26.

Rules for writing Vala D-Bus client interfaces:

- Annotate the interface with `[DBus (name = "…")]`.
- Map D-Bus `CamelCase` names to Vala `lower_case` names.
- Add `throws GLib.Error` (or `throws GLib.DBusError`, `throws GLib.IOError`) to
  methods that can fail over the bus.

## BlueZ — Bluetooth Discovery

Requires a working BlueZ stack on the system D-Bus (`BusType.SYSTEM`).

```vala
[DBus (name = "org.bluez.Adapter")]
interface Bluez : Object {
    public signal void discovery_started ();
    public signal void discovery_completed ();
    public signal void remote_device_found (string address, uint klass, int rssi);
    public signal void remote_name_updated (string address, string name);

    public abstract void discover_devices () throws GLib.Error;
}

MainLoop loop;

void on_remote_device_found (string address, uint klass, int rssi) {
    stdout.printf ("Remote device found (%s, %u, %d)\n",
                   address, klass, rssi);
}

void on_discovery_started () {
    stdout.printf ("Discovery started\n");
}

void on_remote_name_updated (string address, string name) {
    stdout.printf ("Remote name updated (%s, %s)\n", address, name);
}

void on_discovery_completed () {
    stdout.printf ("Discovery completed\n");
    loop.quit ();
}

int main () {
    Bluez bluez;
    try {
        bluez = Bus.get_proxy_sync (BusType.SYSTEM, "org.bluez",
                                                          "/org/bluez/hci0");

        bluez.remote_device_found.connect (on_remote_device_found);
        bluez.discovery_started.connect (on_discovery_started);
        bluez.discovery_completed.connect (on_discovery_completed);
        bluez.remote_name_updated.connect (on_remote_name_updated);

        bluez.discover_devices ();
    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
        return 1;
    }

    loop = new MainLoop ();
    loop.run ();

    return 0;
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 dbus-bluez.vala
./dbus-bluez
```

## Purple — Instant Messaging (Pidgin)

Talks to Pidgin's D-Bus service when it is running.

```vala
[DBus (name = "im.pidgin.purple.PurpleInterface")]
interface Purple : Object {
    public signal void received_im_msg (int account, string sender, string msg,
                                        int conv, uint flags);

    public abstract int[] purple_accounts_get_all_active () throws GLib.Error;
    public abstract string purple_account_get_username (int account) throws GLib.Error;
}

int main () {
    try {
        Purple purple = Bus.get_proxy_sync (BusType.SESSION,
                                            "im.pidgin.purple.PurpleService",
                                            "/im/pidgin/purple/PurpleObject");

        var accounts = purple.purple_accounts_get_all_active ();
        foreach (int account in accounts) {
            string username = purple.purple_account_get_username (account);
            stdout.printf ("Account %s\n", username);
        }

        purple.received_im_msg.connect ((account, sender, msg) => {
            stdout.printf (@"Message received $sender: $msg\n");
        });

        var loop = new MainLoop ();
        loop.run ();

    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
        return 1;
    }

    return 0;
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 dbus-purple.vala
./dbus-purple
```

## Skype Status Client (outdated)

::: warning Historical example

This targeted Skype's old D-Bus API. It is unlikely to work with current Skype
installations; it is kept as a reference for string-based D-Bus clients.

:::

```vala
[DBus (name = "com.Skype.API")]
interface Skype : Object {
    public abstract string invoke (string cmd) throws GLib.Error;
}

string send (Skype skype, string cmd) throws GLib.Error {
    return skype.invoke (cmd);
}

void send_check (Skype skype, string cmd, string expected) throws GLib.Error {
    string actual = send (skype, cmd);
    if (actual != expected) {
        stderr.printf ("Bad result '%s', expected '%s'\n", actual, expected);
    }
}

int main (string[] args) {
    try {

        Skype skype = Bus.get_proxy_sync (BusType.SESSION,
                                          "com.Skype.API", "/com/Skype");

        send_check (skype, "NAME skype-status-client", "OK");
        send_check (skype, "PROTOCOL 2", "PROTOCOL 2");

        if (args.length < 2) {
            stdout.printf ("%s\n", send (skype, "GET USERSTATUS"));
        } else {
            send_check (skype, "SET USERSTATUS " + args[1], "USERSTATUS " + args[1]);
        }

    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
        return 1;
    }

    return 0;
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 dbus-skype.vala
```

## Waiting for a Service (outdated)

For the old approach, see the original example in the archived wiki:  
https://wiki.gnome.org/Projects(2f)Vala(2f)DBusClientSamples(2f)Waiting.html

For new code, it is recommended to use current GLib APIs, such as [`Bus.watch_name`](https://valadoc.org/gio-2.0/GLib.Bus.watch_name.html), to wait until a name appears on the bus.

## Generating a Vala Interface from XML

To implement a client for an existing D-Bus service, you can generate a Vala
interface from an XML introspection document using
[vala-dbus-binding-tool](https://github.com/freesmartphone/vala-dbus-binding-tool).

For objects that implement `org.freedesktop.DBus.Introspectable`, obtain XML with:

```shell
dbus-send --print-reply --type=method_call \
  --dest=busname objectpath \
  org.freedesktop.DBus.Introspectable.Introspect
```

Alternatively, [D-Spy](https://gitlab.gnome.org/GNOME/d-spy) can be used as a
graphical tool to browse D-Bus peers and send commands. It supersedes the older
D-Feet application.

The [vala-dbus-binding-tool](https://github.com/freesmartphone/vala-dbus-binding-tool)
can be used on the obtained XML file. In its most basic form the command looks
like this:

```shell
vala-dbus-binding-tool --api-path=path_to_xml_file
```

This will create a vala file for all interfaces provided by the object.

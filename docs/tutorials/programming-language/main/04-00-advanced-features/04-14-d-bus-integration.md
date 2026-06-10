# 4.14. D-Bus Integration

Vala has tight integration with [D-Bus] built into the language, which
makes both consuming and implementing D-Bus services ergonomic and
straightforward. Under the hood, it is built on GDBus, the
implementation of D-Bus inside GLib.

[D-Bus]: http://freedesktop.org/wiki/Software/dbus

Overall, the design of D-Bus integration in Vala is such that you
declare a Vala interface or a class matching the D-Bus interface,
annotate it with the `[DBus]` attribute, and then use its methods,
signals, and properties just like you would with any other type. Vala
and GDBus handle all the complexity of D-Bus, RPC, serialization and
deserialization in the background.

To export a custom class as a D-Bus service you just need to annotate it
with the `DBus` code attribute and register an instance of this class
with your local D-Bus session.

```vala
[DBus (name = "org.example.DemoService")]
public class DemoService : Object {
    /* Private field, not exported via D-Bus */
    int counter;

    /* Public field, not exported via D-Bus */
    public int status;

    /* Public property, exported via D-Bus */
    public int something { get; set; }

    /* Public signal, exported via D-Bus
     * Can be emitted on the server side and can be connected to on the client side.
     */
    public signal void sig1 ();

    /* Public method, exported via D-Bus */
    public void some_method () {
        counter++;
        stdout.printf ("heureka! counter = %d\n", counter);
        sig1 ();  // emit signal
    }

    /* Public method, exported via D-Bus and showing the sender who is
       calling the method (not exported in the D-Bus interface) */
    public void some_method_sender (string message, GLib.BusName sender) {
        counter++;
        stdout.printf ("heureka! counter = %d, '%s' message from sender %s\n",
                      counter, message, sender);
    }
}
```

Register an instance of the service and start a main loop:

```vala
void on_bus_acquired (DBusConnection conn) {
    try {
        // start service and register it as dbus object
        var service = new DemoService ();
        conn.register_object ("/org/example/demo", service);
    } catch (IOError e) {
        stderr.printf ("Could not register service: %s\n", e.message);
    }
}

void main () {
    // try to register service name in session bus
    Bus.own_name (BusType.SESSION, "org.example.DemoService", /* name to register */
                  BusNameOwnerFlags.NONE, /* flags */
                  on_bus_acquired, /* callback function on registration succeeded */
                  () => {}, /* callback on name register succeeded */
                  () => stderr.printf ("Could not acquire name\n")); /*callback on name lost */

    // start main loop
    new MainLoop ().run ();
}
```

You must compile this example with the `gio-2.0` package:

```shell
valac --pkg gio-2.0 dbus-demo-service.vala
./dbus-demo-service
```

All member names are automatically mangled from Vala's
`lower_case_with_underscores` naming convention to D-Bus **CamelCase**
names. The exported D-Bus interface of this example will have a property
`Something`, a signal `Sig1` and a method `SomeMethod`. You can open a
new terminal window and call the method from command line with:

```shell
dbus-send --type=method_call                   \
          --dest=org.example.DemoService       \
          /org/example/demo                    \
          org.example.DemoService.SomeMethod
```

or

```shell
dbus-send --type=method_call                   \
          --dest=org.example.DemoService       \
          /org/example/demo                    \
          org.example.DemoService.SomeMethodSender \
          string:'hello world'
```

## 4.14.1

Some comprehensive examples:
[D-Bus Client Examples](../../../../sample-code/basics/dbus-client-samples) and
[D-Bus Basic (GDBus) Samples](../../../../sample-code/basics/dbus-basic-samples).

Write an interface...

## 4.14.2 Type mapping

The simple types are mapped as follows:

|D-Bus|        Meaning       |                Vala              |
|-----|----------------------|----------------------------------|
| `y` | byte                 | `uint8`, `int8`, `char`, `uchar` |
| `b` | boolean              | `bool`                           |
| `n` | 16-bit signed int    | `short`, `int16`                 |
| `q` | 16-bit unsigned int  | `ushort`, `uint16`, `unichar2`   |
| `i` | 32-bit signed int    | `int`, `int32`                   |
| `u` | 32-bit unsigned int  | `uint`, `uint32`, `unichar`      |
| `x` | 64-bit signed int    | `int64`                          |
| `t` | 64-bit unsigned int  | `uint64`                         |
| `d` | double               | `double`                         |
| `s` | UTF-8 string         | `string`                         |
| `o` | D-Bus object path    | `GLib.ObjectPath`                |
| `v` | variant              | `GLib.Variant`                   |
| `g` | D-Bus type signature | `GLib.VariantType`               |
| `h` | Unix file descriptor | `GLib.UnixInputStream`, `GLib.UnixOutputStream`, `GLib.Socket`, `GLib.FileDescriptorBased` |

D-Bus **arrays** are mapped to Vala arrays, so for example `as` maps to
`string[]`.

D-Bus **structures** (also known as tuples) are mapped to Vala
structures. For example, `(usiiad)` might be mapped to the following
structure:

```vala
struct DisplayMode {
    uint id;
    string name;
    int width;
    int height;
    double[] frequencies;
}
```

D-Bus **dictionaries** are mapped to `GLib.HashTable`. For example,
`a{is}` maps to `HashTable<int, string>`.

::: info Note

Due to how generics are internally implemented in Vala, it is not
possible to use non-nullable versions of larger structures (including
`int64`, `uint64`, and `double`) as generic type arguments (because they
don't fit into a pointer-sized value). For example,
`HashTable<int64, string>` will not work.

To work around this, you have to "box" the types by using their nullable
versions, such as `HashTable<int64?, string>`. Yet despite using such a
nullable type on the Vala side, you can never actually store a `null`
value there, because D-Bus's type system has no concept of nullable
types.
:::

Alternatively, it is possible to treat a dictionary as an array of
entries, using a structure with an appropriate `[DBus (signature)]`
attribute to represent an entry:

```vala
[DBus (signature = "{xs}"]
struct UserEntry {
    int64 id;
    string name;
}

UserEntry[] users;  // a{xs}
```

A common pattern is using a dictionary of type `a{sv}`, known as
**vardict**. In addition to the above options, `a{sv}` can be also
mapped to `GLib.VariantDict` (since Vala 0.56.19).

# 4.14.3 Special parameters

In addition to the parameters that are directly marshalled and passed
over D-Bus, your Vala methods can have special paramters of the
following types:

A parameter of type [`GLib.Cancellable?`] in a method allows a client to
asynchronously cancel the method call. On the server side, this
parameter will currently always equal `null`.

On the server side, parameters of type [`GLib.DBusConnection`] and
[`GLib.DBusMethodInvocation`] contain the D-Bus connection that the
current method call is being made on, and the full method invocation
object. This may be useful in case an object is exported on several
D-Bus connections.

A parameter of type [`GLib.BusName?`], generally, means the [bus name]
of the peer you're interacting with. Specifically, in methods on the
server side this contains the bus name of the caller of the method, in
signals on the client side this contains the emitter of the signal; and
in signals on the server side this can be used to emit a
[unicast signal] directed to a specific peer.

Note that on peer-to-peer D-Bus connections (without a message broker),
there are no bus names. For this reason, the `GLib.BusName?` argument
should be declared as nullable.

[`GLib.Cancellable?`]: https://valadoc.org/gio-2.0/GLib.Cancellable.html
[`GLib.DBusConnection`]: https://valadoc.org/gio-2.0/GLib.DBusConnection.html
[`GLib.DBusMethodInvocation`]: https://valadoc.org/gio-2.0/GLib.DBusMethodInvocation.html
[`GLib.BusName?`]: https://valadoc.org/glib-2.0/GLib.BusName.html
[bus name]: https://dbus.freedesktop.org/doc/dbus-specification.html#message-protocol-names-bus
[unicast signal]: https://dbus.freedesktop.org/doc/dbus-specification.html#message-bus-routing

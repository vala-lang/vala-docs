# GUPnP sample (WAN IP connection)

This program listens for UPnP `WANIPConnection` services and prints the external IP address reported by your router’s IGD. Adapted from the archived GNOME Wiki page [Projects/Vala/GUPnP_sample](https://wiki.gnome.org/Projects/Vala/GUPnP_sample).

```vala
using GUPnP;

void service_available_cb (ServiceProxy sp) {
    string value = "";
    sp.send_action ("GetExternalIPAddress", null, "NewExternalIPAddress", typeof (string), out value);
    print ("External IP is %s\n".printf (value));
}

int main (string[] args) {
    var ctx = new Context (null, null, 0);
    var cp = new ControlPoint (ctx, "urn:schemas-upnp-org:service:WANIPConnection:1");
    cp.service_proxy_available.connect (service_available_cb);
    cp.set_active (true);

    var loop = new GLib.MainLoop ();
    loop.run ();

    return 0;
}
```

## Compile and run

```shell
valac --pkg gupnp-1.0 gupnp-demo.vala
./gupnp-demo
```

You need a network where UPnP IGD is enabled; many restrictive networks block the discovery traffic, in which case the callback may never fire.

Some routers expose `WANPPPConnection` instead of `WANIPConnection`; adjust the service URN string to match your device if needed.

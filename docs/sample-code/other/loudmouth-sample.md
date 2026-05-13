# Loudmouth (XMPP) sample

[Loudmouth](https://wiki.gnome.org/Archive/Loudmouth) is a C library for Jabber/XMPP. These snippets are adapted from the archived GNOME Wiki page [Projects/Vala/LoudmouthSample](https://wiki.gnome.org/Projects/Vala/LoudmouthSample).

::: warning Legacy library

Loudmouth is unmaintained and its synchronous API was already marked legacy on the wiki. Prefer a maintained stack (for example [libstrophe](https://strophe.im/libstrophe/), [QXmpp](https://invent.kde.org/libraries/qxmpp), or bindings built on [libsoup](https://libsoup.gnome.org/) plus modern XMPP specs) for new projects.

:::

## Synchronous client

```vala
/*
 * Copyright (C) 2004 Imendio AB
 * Copyright (C) 2009 Harley Laue <losinggeneration@gmail.com>
 *
 * SPDX-License-Identifier: LGPL-2.1-or-later
 */

using Lm;

class LmSyncDemo {

    static string? server = null;
    static string? message = null;
    static string? username = null;
    static string? password = null;
    static string? recipient = null;
    static string? resource;
    static int port;

    const OptionEntry[] options = {
        { "server", 's', 0, OptionArg.STRING, ref server, "Server to connect to", "server.org" },
        { "username", 'u', 0, OptionArg.STRING, ref username, "Username", "user" },
        { "password", 'p', 0, OptionArg.STRING, ref password, "Password", "secret" },
        { "recipient", 't', 0, OptionArg.STRING, ref recipient, "JID to message", "peer@server.org" },
        { "message", 'm', 0, OptionArg.STRING, ref message, "Message body", "\"hello\"" },
        { "resource", 'r', OptionFlags.OPTIONAL_ARG, OptionArg.STRING, ref resource, "XMPP resource", "jabber-send" },
        { "port", 'o', OptionFlags.OPTIONAL_ARG, OptionArg.INT, ref port, "Server port", "5222" },
        { null }
    };

    static int main (string[] args) {
        resource = "jabber-send";
        port = Connection.DEFAULT_PORT;

        try {
            var opt_context = new OptionContext ("- Loudmouth synchronous sample");
            opt_context.set_help_enabled (true);
            opt_context.add_main_entries (options, null);
            opt_context.parse (ref args);
            if (server == null || message == null || recipient == null
                || username == null || password == null) {
                print ("You must provide username, password, server, recipient, and message\n");
                print ("%s", opt_context.get_help (true, null));
                return 1;
            }
        } catch (OptionError e) {
            stdout.printf ("%s\n", e.message);
            return 1;
        }

        var connection = new Connection (server);

        try {
            print ("Connecting to %s\n", server);
            connection.open_and_block ();

            print ("Authenticating as '%s' with resource '%s'\n", username, resource);
            connection.authenticate_and_block (username, password, resource);

            var m = new Message (recipient, MessageType.MESSAGE);
            m.node.add_child ("body", message);

            print ("Sending message to %s\n", recipient);
            connection.send (m);

            connection.close ();
        } catch (GLib.Error e) {
            stderr.printf ("Error: %s\n", e.message);
            return 1;
        } finally {
            if (connection.is_open ()) {
                try {
                    connection.close ();
                } catch (GLib.Error e) {
                    stderr.printf ("Error while closing: %s\n", e.message);
                }
            }
        }

        return 0;
    }
}
```

### Compile and run

```shell
valac --pkg loudmouth-1.0 lm-send-sync.vala
./lm-send-sync -s jabber.example -u user -p secret -m "Hello" -t peer@jabber.example
```

## Asynchronous GTK+ client

This example matches the archived wiki’s **asynchronous** Loudmouth API: `open`, `authenticate`, and `send` run from callbacks instead of blocking the UI thread. It depends on **GTK+ 2**, which is end-of-life and may be absent on current distributions; keep it only for maintaining old code or understanding how the non-blocking API was used.

```vala
using Gtk;
using Lm;

class MainWindow : Window {

    private Label status;
    private Button dconnect;
    private Button send;
    private Entry server;
    private Entry message;
    private Entry recipient;
    private Entry username;
    private Entry password;
    private Entry resource;

    private Connection cn;

    public MainWindow () {
        this.title = "jabber-send";
        create_widgets ();
        this.destroy.connect (on_quit);
        this.send.clicked.connect (send_message);
        this.dconnect.clicked.connect (do_connect);
    }

    private void create_widgets () {
        var hboxbut = new HBox (false, 5);
        status = new Label ("");
        dconnect = new Button.with_label ("Connect");
        send = new Button.with_label ("Send Message");

        server = new Entry ();
        username = new Entry ();
        password = new Entry ();
        resource = new Entry ();
        recipient = new Entry ();
        message = new Entry ();

        send.sensitive = false;
        status.label = "Disconnected";
        resource.text = "jabber-send";

        hboxbut.add (dconnect);
        hboxbut.add (send);

        var vbox = new VBox (false, 5);
        vbox.pack_start (hbox ("Server:", server), false, false, 0);
        vbox.pack_start (hbox ("Username:", username), false, false, 0);
        vbox.pack_start (hbox ("Password:", password), false, false, 0);
        vbox.pack_start (hbox ("Resource:", resource), false, false, 0);
        vbox.pack_start (hbox ("Recipient:", recipient), false, false, 0);
        vbox.pack_start (hbox ("Message:", message), false, false, 0);
        vbox.pack_start (status, true, true, 0);
        vbox.pack_start (hboxbut, false, false, 0);
        add (vbox);
    }

    private HBox hbox (string label, Widget w) {
        var box = new HBox (false, 5);
        box.pack_start (new Label.with_mnemonic (label), false, false, 5);
        box.pack_start (w, true, true, 5);
        return box;
    }

    private void on_quit () {
        if (cn != null) {
            do_disconnect ();
        }
        Gtk.main_quit ();
    }

    private void connected (Connection connection, bool success) {
        if (success) {
            status.label = "Opened connection and authenticated";
            dconnect.label = "Disconnect";
            dconnect.clicked.disconnect (do_connect);
            dconnect.clicked.connect (do_disconnect);
            send.sensitive = true;
        } else {
            status.label = "Authentication failed";
        }
        dconnect.sensitive = true;
    }

    private void send_message () {
        var m = new Message (recipient.text, Lm.MessageType.MESSAGE);
        m.node.add_child ("body", message.text);

        try {
            cn.send (m);
            status.label = "Message sent";
        } catch (GLib.Error e) {
            status.label = "Error: " + e.message;
        }
    }

    private void auth (Connection connection, bool success) {
        if (!success) {
            status.label = "Connection failed";
            dconnect.sensitive = true;
            return;
        }

        status.label = "Authenticating with " + server.text;
        try {
            connection.authenticate (username.text, password.text,
                resource.text, connected, null);
        } catch (GLib.Error e) {
            status.label = "Error: " + e.message;
        }
    }

    private void do_connect () {
        if (cn != null && cn.is_open ()) {
            try {
                cn.close ();
            } catch (GLib.Error e) {
                status.label = "Error: " + e.message;
                return;
            }
        }

        cn = new Connection (server.text);

        try {
            cn.open (auth, null);
            status.label = "Loading connection to " + server.text;
            dconnect.sensitive = false;
        } catch (GLib.Error e) {
            status.label = "Error: " + e.message;
        }
    }

    private void do_disconnect () {
        try {
            cn.close ();
            status.label = "Disconnected";
            dconnect.clicked.disconnect (do_disconnect);
            dconnect.clicked.connect (do_connect);
            dconnect.label = "Connect";
            send.sensitive = false;
        } catch (GLib.Error e) {
            status.label = "Error: " + e.message;
        }
    }

    static int main (string[] args) {
        Gtk.init (ref args);

        var window = new MainWindow ();
        window.show_all ();

        Gtk.main ();
        return 0;
    }
}
```

### Compile and run (GTK+ 2)

```shell
valac --pkg loudmouth-1.0 --pkg gtk+-2.0 lm-send-async.vala
./lm-send-async
```

A GTK 4 port would replace `Gtk.main` / `HBox` / `VBox` with `Gtk.Application`, modern layout widgets, and signal wiring; Loudmouth itself remains unmaintained, so new GUI work should plan on replacing the transport layer as well.

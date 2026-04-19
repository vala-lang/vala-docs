# GIO Networking Sample

These examples use the socket and resolver APIs in GIO (GLib >= 2.22 - Can check with `pkg-config glib-2.0 --modversion`, Vala >=
0.11.0). The client examples contact remote hosts and run them where outbound network
access is allowed.

## Synchronous Client Example

```vala
void main () {
    var host = "www.example.com";

    try {
        var resolver = Resolver.get_default ();
        var addresses = resolver.lookup_by_name (host, null);
        var address = addresses.nth_data (0);
        print (@"Resolved $host to $address\n");

        var client = new SocketClient ();
        var conn = client.connect (new InetSocketAddress (address, 80));
        print (@"Connected to $host\n");

        var message = @"GET / HTTP/1.1\r\nHost: $host\r\n\r\n";
        conn.output_stream.write (message.data);
        print ("Wrote request\n");

        var response = new DataInputStream (conn.input_stream);
        var status_line = response.read_line (null).strip ();
        print ("Received status line: %s\n", status_line);

    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 gio-network-client.vala
./gio-network-client
```

## Asynchronous Client Example

```vala
class AsyncDemo {

    private MainLoop loop;

    public AsyncDemo (MainLoop loop) {
        this.loop = loop;
    }

    public async void http_request () throws Error {
        try {
            var resolver = Resolver.get_default ();
            var addresses = yield resolver.lookup_by_name_async ("www.example.com");
            var address = addresses.nth_data (0);
            print ("(async) resolved www.example.com to %s\n", address.to_string ());

            var socket_address = new InetSocketAddress (address, 80);
            var client = new SocketClient ();
            var conn = yield client.connect_async (socket_address);
            print ("(async) connected to www.example.com\n");

            var message = "GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n";
            yield conn.output_stream.write_async (message.data, Priority.DEFAULT);
            print ("(async) wrote request\n");

            conn.socket.set_blocking (true);

            var input = new DataInputStream (conn.input_stream);
            message = input.read_line (null).strip ();
            print ("(async) received status line: %s\n", message);
        } catch (Error e) {
            stderr.printf ("%s\n", e.message);
        }

        this.loop.quit ();
    }
}

void main () {
    var loop = new MainLoop ();
    var demo = new AsyncDemo (loop);
    demo.http_request.begin ();
    loop.run ();
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 gio-network-client-async.vala
./gio-network-client-async
```

## Server Example

```vala
void process_request (InputStream input, OutputStream output) throws Error {
    var data_in = new DataInputStream (input);
    string line;
    while ((line = data_in.read_line (null)) != null) {
        stdout.printf ("%s\n", line);
        if (line.strip () == "") break;
    }

    string content = "<html><h1>Hello from Vala server</h1></html>";
    var header = new StringBuilder ();
    header.append ("HTTP/1.0 200 OK\r\n");
    header.append ("Content-Type: text/html\r\n");
    header.append_printf ("Content-Length: %lu\r\n\r\n", content.length);

    output.write (header.str.data);
    output.write (content.data);
    output.flush ();
}

int main () {
    try {
        var service = new SocketService ();
        service.add_inet_port (8080, null);
        service.start ();
        while (true) {
            var conn = service.accept (null);
            process_request (conn.input_stream, conn.output_stream);
        }
    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
    return 0;
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 gio-server.vala
./gio-server
```

Open `http://localhost:8080/` in a browser.

## Asynchronous Server Example

```vala
bool on_incoming_connection (SocketConnection conn) {
    stdout.printf ("Got incoming connection\n");
    process_request.begin (conn);
    return true;
}

async void process_request (SocketConnection conn) {
    try {
        var dis = new DataInputStream (conn.input_stream);
        var dos = new DataOutputStream (conn.output_stream);
        string req = yield dis.read_line_async (Priority.HIGH_IDLE);
        dos.put_string ("Got: %s\n".printf (req));
    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
}

void main () {
    try {
        var srv = new SocketService ();
        srv.add_inet_port (3333, null);
        srv.incoming.connect (on_incoming_connection);
        srv.start ();
        new MainLoop ().run ();
    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 gio-server-async.vala
./gio-server-async
```

Connect with netcat or telnet to port 3333, for example:
`echo "blub" | nc localhost 3333`

## UDP Server Example

```vala
int main () {
    try {

        var socket = new Socket (SocketFamily.IPV4,
                                 SocketType.DATAGRAM,
                                 SocketProtocol.UDP);
        var sa = new InetSocketAddress (new InetAddress.loopback (SocketFamily.IPV4),
                                        3333);
        socket.bind (sa, true);

        var source = socket.create_source (IOCondition.IN);
        source.set_callback ((s, cond) => {
            try {
                uint8 buffer[4096];
                size_t read = s.receive (buffer);
                buffer[read] = 0;
                print ("Got %ld bytes of data: %s", (long) read, (string) buffer);
            } catch (Error e) {
                stderr.printf (e.message);
            }
            return true;
        });
        source.attach (MainContext.default ());

        new MainLoop ().run ();

    } catch (Error e) {
        stderr.printf (e.message);
        return 1;
    }

    return 0;
}
```

### Compile and Run

```shell
valac --pkg gio-2.0 gio-udp-demo.vala
./gio-udp-demo
```

Example: `echo "blub" | nc -u 127.0.0.1 3333`

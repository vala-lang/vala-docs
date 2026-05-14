# Weather HTTP client (GIO socket)

HTTP GET over a plain TCP socket using GIO's `Resolver`, `SocketClient`, and
`DataInputStream`.

## Program

Save as `weather-client.vala`:

```vala
void main (string[] args) {
    string key = Environment.get_variable ("WEATHER_API_KEY") ?? "";
    string city = "London";
    if (key == "") {
        stderr.printf ("Set WEATHER_API_KEY to a key from https://www.weatherapi.com/\n");
        return;
    }
    if (args.length > 1) {
        city = args[1];
    }
    const string HOST = "api.weatherapi.com";
    const uint16 PORT = 80;
    string query = @"/v1/current.json?key=$key&q=$(Uri.escape_string (city, null, false))";
    string message = @"GET $query HTTP/1.1\r\nHost: $HOST\r\nConnection: close\r\n\r\n";

    try {
        var resolver = Resolver.get_default ();
        var addresses = resolver.lookup_by_name (HOST, null);
        var address = addresses.nth_data (0);
        stderr.printf (@"Resolved $HOST to $address\n");

        var client = new SocketClient ();
        var conn = client.connect (new InetSocketAddress (address, PORT));
        stderr.printf (@"Connected to $HOST\n");

        conn.output_stream.write (message.data);
        stderr.printf ("Wrote HTTP request\n");

        var response = new DataInputStream (conn.input_stream);
        var status_line = response.read_line (null).strip ();
        stderr.printf (@"Status: '$status_line'\n");

        if (!("200" in status_line)) {
            stderr.printf ("Expected 200 OK\n");
            return;
        }

        var headers = new HashTable<string, string> (str_hash, str_equal);
        while (true) {
            string? raw = response.read_line (null);
            if (raw == null) {
                break;
            }
            string line = raw.strip ();
            if (line.length == 0) {
                break;
            }
            var parts = line.split (":", 2);
            if (parts.length == 2) {
                headers[parts[0].strip ()] = parts[1].strip ();
            }
        }
        if (!headers.contains ("Content-Length")) {
            stderr.printf ("No Content-Length header\n");
            return;
        }
        int content_length = int.parse (headers["Content-Length"]);
        var body = new uint8[content_length];
        size_t actual_length = 0;
        response.read_all (body, out actual_length);
        stdout.write (body[0:actual_length]);
        stdout.putc ('\n');
    } catch (Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

## Compile and run

Create a free API key at [weatherapi.com](https://www.weatherapi.com/), then:

```shell
export WEATHER_API_KEY="your-key-here"
valac --pkg gio-2.0 weather-client.vala
./weather-client
./weather-client "New York"
```

The JSON body is written to `stdout`; progress messages go to `stderr`.

For production HTTP you would normally use [Soup](https://valadoc.org/libsoup-3.0/Soup.html)
or another high-level client instead of hand-parsing headers.

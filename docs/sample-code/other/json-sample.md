# JSON samples (json-glib)

Examples adapted from the archived GNOME Wiki page [Projects/Vala/JsonSample](https://wiki.gnome.org/Projects/Vala/JsonSample). The HTTP examples use **libsoup 3** (`Soup.Session.send_and_read`) like the rest of this documentation, instead of the older `send_message` + `response_body` API from the wiki.

## Parse JSON from memory

```vala
void main () {
    const string data = """
    {
      "title": "Example",
      "values": [1, 2, 3]
    }
    """;

    try {
        var parser = new Json.Parser ();
        parser.load_from_data (data, -1);

        var root = parser.get_root ().get_object ();
        stdout.printf ("title = %s\n", root.get_string_member ("title"));

        var values = root.get_array_member ("values");
        stdout.printf ("first value = %lld\n", values.get_int_element (0));
    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

```shell
valac --pkg json-glib-1.0 json-parse.vala
./json-parse
```

## HTTP GET with libsoup 3 and json-glib

This mirrors the old “Gisgraphy” example: download JSON over HTTP, then navigate the tree. The URL below is a stable public test endpoint; swap it for your own REST service.

```vala
void main () {
    const string uri = "https://jsonplaceholder.typicode.com/todos/1";

    var session = new Soup.Session ();
    var message = new Soup.Message ("GET", uri);

    try {
        GLib.Bytes body = session.send_and_read (message);
        if (message.get_status () != Soup.Status.OK) {
            stderr.printf ("HTTP %u\n", message.get_status ());
            return;
        }

        var parser = new Json.Parser ();
        parser.load_from_data ((string) body.get_data (), -1);

        var obj = parser.get_root ().get_object ();
        stdout.printf ("userId = %lld\n", obj.get_int_member ("userId"));
        stdout.printf ("title = %s\n", obj.get_string_member ("title"));
        stdout.printf ("completed = %s\n", obj.get_boolean_member ("completed") ? "true" : "false");
    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

```shell
valac --pkg libsoup-3.0 --pkg json-glib-1.0 json-http.vala
./json-http
```

## Glosbe translation API

The wiki used plain `http://` and `Soup.URI.encode`. Prefer HTTPS and `Uri.escape_string` when calling third-party APIs.

```vala
string translate (string text, string input_language, string output_language) throws GLib.Error {
    string uri = "https://glosbe.com/gapi/translate";
    string phrase = Uri.escape_string (text, null, false);
    string full_uri = "%s?phrase=%s&from=%s&dest=%s&format=json&pretty=true".printf (
        uri, phrase, input_language, output_language);

    var session = new Soup.Session ();
    var message = new Soup.Message ("GET", full_uri);
    GLib.Bytes body = session.send_and_read (message);

    var parser = new Json.Parser ();
    parser.load_from_data ((string) body.get_data (), -1);

    var root_object = parser.get_root ().get_object ();
    return root_object.get_array_member ("tuc")
        .get_object_element (0)
        .get_object_member ("phrase")
        .get_string_member ("text");
}

void main () {
    try {
        string translated = translate ("Hello World", "eng", "spa");
        stdout.printf ("Translated text: %s\n", translated);
    } catch (GLib.Error e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

```shell
valac --pkg libsoup-3.0 --pkg json-glib-1.0 json-translator.vala
./json-translator
```

Online APIs change frequently; treat the Glosbe snippet as a pattern, not a guarantee of current service behaviour.

## Transmission RPC (historical)

The wiki included a larger sample that built JSON with `Json.Generator`, posted it with `Soup.SessionAsync`, and parsed torrent metadata from Transmission. That code targets **libsoup 2.4** (`SessionAsync`, `Message.response_body`, and manual `X-Transmission-Session-Id` handling). Porting it cleanly requires rewriting authentication and I/O for libsoup 3; keep the [archived page](https://wiki.gnome.org/Projects/Vala/JsonSample) handy if you still maintain a libsoup 2 toolchain.

```shell
valac --thread --pkg libsoup-2.4 --pkg json-glib-1.0 transmission-rpc.vala   # legacy
```

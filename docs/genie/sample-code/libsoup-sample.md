# LibSoup server example

Tiny `Soup.Server` with two routes, from the archived GNOME Wiki page
[Projects/Genie/LibSoupSample](https://wiki.gnome.org/Projects/Genie/LibSoupSample).
This targets **libsoup 2.4** (`Soup.Server` style APIs).

```genie
uses
	GLib
	Soup

def default_handler (server : Soup.Server, msg : Soup.Message, path : string,
	query : GLib.HashTable?, client : Soup.ClientContext)

	response_text : string = (
		"<html><body><p>Current location: %s</p>"
		+ "<p><a href=\"/xml\">Test XML</a></p></body></html>").printf (path)

	msg.set_response ("text/html", Soup.MemoryUse.COPY, response_text.data)

def xml_handler (server : Soup.Server, msg : Soup.Message, path : string,
	query : GLib.HashTable?, client : Soup.ClientContext)

	response_text : string = "<node><subnode>test</subnode></node>"
	msg.set_response ("text/xml", Soup.MemoryUse.COPY, response_text.data)

init
	var server = new Soup.Server (Soup.SERVER_PORT, 8088)
	server.add_handler ("/", default_handler)
	server.add_handler ("/xml", xml_handler)
	server.run ()
```

## Compile and run

```shell
valac --pkg libsoup-2.4 --thread soup-server-example.gs
./soup-server-example
```

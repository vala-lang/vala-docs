# Libsoup Samples

Adapted from original samples in Vala GNOME Wiki: https://wiki.gnome.org/Projects(2f)Vala(2f)LibSoupSample.html

However `libsoup-3.0` is used instead of `libsoup-2.4`.

All of these samples require the `libsoup-3.0` package to be installed.

## Fetch Latest Mastodon Status From a Username

This sample requires both `libsoup-3.0` and `json-glib-1.0` packages to be installed

### Source Code

```vala
// mastodon-status-sample.vala
void main () {
	const string username = "gnome";	
	const string server_url = "floss.social";
	const string api_path = "/api/v1";
 	
 	string base_url = @"http://$(server_url)$(api_path)";

 	stdout.printf (@"Getting latest status of @$(username)@$(server_url)\n");

	// Create a HTTP session to the Mastodon server instance URL
	var session = new Soup.Session ();	
	
	// Get account ID from account lookup via username
	var id_lookup_message = new Soup.Message ("GET", @"$(base_url)/accounts/lookup?acct=$(username)");
	string account_id_lookup_url = @"$(base_url)/accounts/lookup?q=$(username)";
	stdout.printf ("Account lookup url: %s\n", account_id_lookup_url);

	GLib.Bytes raw_id_lookup_response_data = session.send_and_read (id_lookup_message);
	string id_lookup_response_data = (string) raw_id_lookup_response_data.get_data (); // It's a JSON response string (content-type: application/json)

	// Parse the account id lookup response data
	var parser = new Json.Parser ();
	parser.load_from_data (id_lookup_response_data);

	Json.Object account_lookup_root_object = parser.get_root ().get_object ();
	string account_id = account_lookup_root_object.get_string_member ("id");
	stdout.printf ("Account ID: %s\n", account_id);

	// Get latest status from the account using the account ID
	var statuses_message = new Soup.Message ("GET", @"$(base_url)/accounts/$(account_id)/statuses?limit=1");
	GLib.Bytes raw_statuses_message_response_data = session.send_and_read (statuses_message);
	string statuses_message_response_data = (string) raw_statuses_message_response_data.get_data ();
	
	// Output account statuses response with pretty printing
	parser.load_from_data (statuses_message_response_data);
	Json.Node statuses_root = parser.get_root ();

	stdout.printf (
		"Statuses for account @%s@%s:\n%s\n",
		username, server_url,
		Json.to_string (statuses_root, true)
	);
}
```

### Compile and Run:

```shell
valac --pkg libsoup-3.0 --pkg json-glib-1.0 mastodon-status-sample.vala
./mastodon-status-sample.vala
```

## Synchronous HTTP Request

### Source Code

```vala
// synchronous-http-request-sample.vala
void main () {
	var session = new Soup.Session ();
	var fetch_message = new Soup.Message ("GET", "http://vala.dev");

	// Send a synchronous request
	GLib.Bytes raw_fetch_response_data = session.send_and_read (fetch_message);
	string fetch_response_data = (string) raw_fetch_response_data.get_data ();

	// Loop through and output the response headers in from the request
	stdout.printf ("Response headers:\n");
	fetch_message.response_headers.foreach ((name, val) => {
        stdout.printf ("Name: %s -> Value: %s\n", name, val);
	});

	stdout.printf ("\n");

	// Show response body data length and the response data itself
	stdout.printf ("Response body:\n");
	stdout.printf ("Message length: %d\n%s\n",
					raw_fetch_response_data.length,
					fetch_response_data);
}
```

### Compile and Run

```shell
valac --pkg libsoup-3.0 synchronous-http-request-sample.vala
./synchronous-http-request-sample.vala
```

## Asynchronous HTTP Request

### Source Code

```vala
// asynchronous-http-request-sample.vala
async void main () {
	var session = new Soup.Session ();
	var fetch_message = new Soup.Message ("GET", "http://vala.dev");

	// Send an asynchronous request (great for programs like GUI Applications where you don't want to block the main thread)
	GLib.Bytes raw_fetch_response_data = yield session.send_and_read_async (fetch_message, GLib.Priority.DEFAULT, null);
	string fetch_response_data = (string) raw_fetch_response_data.get_data ();

	// Loop through and output the response headers in from the request
	stdout.printf ("Response headers:\n");
	fetch_message.response_headers.foreach ((name, val) => {
        stdout.printf ("Name: %s -> Value: %s\n", name, val);
	});

	stdout.printf ("\n");

	// Show response body data length and the response data itself
	stdout.printf ("Response body:\n");
	stdout.printf ("Message length: %d\n%s\n",
					raw_fetch_response_data.length,
					fetch_response_data);

}
```

### Compile and Run

```shell
valac --pkg libsoup-3.0 asynchronous-http-request-sample.vala
./asynchronous-http-request-sample.vala
```


## Simple Server

### Source Code

```vala
// simple-server-sample.vala
void default_handler (Soup.Server server, Soup.ServerMessage msg, string path, HashTable<string, string>? query)
{
	var content_type_params = new HashTable<string, string> (GLib.str_hash, GLib.str_equal);
	content_type_params["charset"] = "UTF-8";

	msg.set_status (Soup.Status.OK, null);
	msg.get_response_headers ().set_content_type ("text/html", content_type_params);

	msg.get_response_body ().append_take ("""<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Simple Server Sample (Vala + libsoup-3.0)</title>
</head>
<body>
  <body>
    <p>Current location: %s</p>
    <p><a href="/json">Test JSON</a></p>
  </body>
</html>
    """.printf (path).data);
}

void json_handler (Soup.Server server, Soup.ServerMessage msg, string path, HashTable<string, string>? query)
{
	var content_type_params = new HashTable<string, string> (GLib.str_hash, GLib.str_equal);
	content_type_params["charset"] = "UTF-8";
	msg.set_status (Soup.Status.OK, null);
	msg.get_response_headers ().set_content_type ("application/json", content_type_params);

    msg.get_response_body ().append_take ("""{
  "result": {
    "message": "Test Passed"
  } 
}
	""".data);
}

void main () {
	const int port = 8088;

    var server = new Soup.Server (null);
    server.add_handler ("/", default_handler);
    server.add_handler ("/json", json_handler);
    
    try {
		server.listen_local (port, 0);
		stdout.printf ("Server is running on http://localhost:%d\n", port);

		var loop = new GLib.MainLoop ();
		loop.run ();
    } catch (Error e) {
    	stderr.printf ("Could not start the server: %s\n", e.message);
    }


}
```

### Compile and Run

```shell
valac --pkg libsoup-3.0 simple-server-sample.vala
```

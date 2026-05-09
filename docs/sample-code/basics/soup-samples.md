# Libsoup Samples

Adapted from original samples in Vala GNOME Wiki: https://wiki.gnome.org/Projects(2f)Vala(2f)LibSoupSample.html

However `libsoup-3.0` instead of `libsoup-2.4`.

## Fetch Latest Mastodon Status From a Username

This sample requires both `libsoup-3.0` and `json-glib-1.0` packages to be installed

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
	string id_lookup_response_data = (string) raw_id_lookup_response_data.get_data(); // It's a JSON response string (content-type: application/json)

	// Parse the account id lookup response data
	var parser = new Json.Parser ();
	parser.load_from_data (id_lookup_response_data);

	Json.Object account_lookup_root_object = parser.get_root ().get_object ();
	string account_id = account_lookup_root_object.get_string_member ("id");
	stdout.printf ("Account ID: %s\n", account_id);

	// Get latest status from the account using the account ID
	var statuses_message = new Soup.Message ("GET", @"$(base_url)/accounts/$(account_id)/statuses?limit=1");
	var raw_statuses_message_response_data = session.send_and_read (statuses_message);
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

Build instructions:

```vala
valac --pkg libsoup-3.0 --pkg json-glib-1.0 mastodon-status-sample.vala
```
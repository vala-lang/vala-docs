# Networking with GIO

A small multi-threaded TCP listener that replies with a fixed HTML page. Based
on the archived GNOME Wiki page
[Projects/Genie/GIONetworkingSample](https://wiki.gnome.org/Projects/Genie/GIONetworkingSample)
(credited there to an example by Jezra Lickter).

The wiki originally mentioned GLib ≥ 2.22, Libgee, and Vala ≥ 0.11.0. Most
current systems ship **Gee 0.8** (`gee-0.8` for `pkg-config`). Older examples
sometimes used `gee-1.0`; use whichever matches your installation.

```genie
uses
	GLib
	Gee

init
	var ws = new WebServer ()
	ws.run ()

struct Request
	full_request : string
	path : string
	query : string

struct Response
	status_code : string
	content_type : string
	data : string

class WebServer

	def run ()
		tss : ThreadedSocketService = new ThreadedSocketService (100)
		ia : InetAddress = new InetAddress.any (SocketFamily.IPV4)
		isaddr : InetSocketAddress = new InetSocketAddress (ia, 8001)
		try
			tss.add_address (isaddr, SocketType.STREAM, SocketProtocol.TCP, null, null)
		except e : Error
			stderr.printf ("%s\n", e.message)
			return
		tss.run.connect (connection_handler)

		ml : MainLoop = new MainLoop ()
		tss.start ()
		stdout.printf ("Serving on port 8001\n")
		ml.run ()

	def connection_handler (conn : SocketConnection) : bool
		first_line : string = ""
		size : size_t = 0
		request : Request = Request ()
		dis : DataInputStream = new DataInputStream (conn.input_stream)
		dos : DataOutputStream = new DataOutputStream (conn.output_stream)
		try
			first_line = dis.read_line (out size)
			var parts = first_line.split (" ")
			if parts.length > 1
				request.full_request = parts[1]
		except e : Error
			stderr.printf ("%s\n", e.message)
		response : Response = Response ()
		response.status_code = "HTTP/1.1 200 OK\n"
		response.content_type = "text/html"
		response.data = "<html><body><h1>Hello, Genie webserver alive</h1></body></html>"
		serve_response (response, dos)
		return false

	def serve_response (response : Response, dos : DataOutputStream)
		try
			dos.put_string (response.status_code)
			dos.put_string ("Server: Genie Socket\n")
			dos.put_string ("Content-Type: %s\n".printf (response.content_type))
			dos.put_string ("Content-Length: %d\n".printf (response.data.length))
			dos.put_string ("\n")
			dos.put_string (response.data)
		except e : Error
			stderr.printf ("%s\n", e.message)
```

## Compile and run

```shell
valac --pkg gio-2.0 --pkg gee-0.8 webserver.gs
./webserver
```

If your distribution still ships Gee 0.1, try `--pkg gee-1.0` instead of
`gee-0.8`.

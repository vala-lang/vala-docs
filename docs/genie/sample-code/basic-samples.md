# Basic Genie samples

Small console programs covering hello world, standard I/O, math, command-line
arguments, simple files, process spawning, and a minimal `GObject` class.
Adapted from the archived GNOME Wiki page
[Projects/Genie/BasicSamples](https://wiki.gnome.org/Projects/Genie/BasicSamples).

For richer file and network I/O, prefer GIO-based patterns (see the Vala docs
[sample code](/sample-code/) and [GIO samples](/sample-code/basics/gio-samples)).

## Hello world

```genie
init
	print ("hello, world\n")
```

### Compile and run

```shell
valac hello.gs
./hello
```

If the binary should have a different name:

```shell
valac hello.gs -o greeting
./greeting
```

## Reading user input

```genie
init
	stdout.printf ("Please enter your name: ")
	name : string = stdin.read_line ()
	if name is not null
		stdout.printf ("Hello, %s!\n", name)
```

Genie provides `stdin`, `stdout`, and `stderr` for the three standard streams.
The `printf` method takes a format string and a variable number of arguments.

## Mathematics

Math functions live in the [`Math`](https://valadoc.org/glib-2.0/GLib.Math.html)
namespace.

```genie
init

	stdout.printf ("Please enter the radius of a circle: ")
	radius : double = double.parse (stdin.read_line ())
	stdout.printf ("Circumference: %g\n", 2 * Math.PI * radius)

	stdout.printf ("sin(pi/2) = %g\n", Math.sin (Math.PI / 2))

	// Random numbers

	stdout.printf ("Today's lottery results:")

	for var i = 0 to 6
		stdout.printf (" %d", Random.int_range (1, 49))

	stdout.printf ("\n")
	stdout.printf ("Random number between 0 and 1: %g\n", Random.next_double ())
```

## Command-line arguments

```genie
init

	// Output the number of arguments
	stdout.printf ("%d command line argument(s):\n", args.length)

	// Enumerate all command line arguments
	for s in args
		stdout.printf ("%s\n", s)
```

The first command-line argument (`args[0]`) is always the program invocation.

## Reading and writing text file content

Very basic text file handling using `GLib.FileUtils`.

```genie
init
	try
		filename : string = "data.txt"

		// Writing
		content : string = "hello, world"
		FileUtils.set_contents (filename, content)

		// Reading
		read : string
		FileUtils.get_contents (filename, out read)

		stdout.printf ("The content of file '%s' is:\n%s\n", filename, read)
	except e : FileError
		stderr.printf ("%s\n", e.message)
```

## Spawning processes

```genie
init
	try
		// Non-blocking
		Process.spawn_command_line_async ("ls")

		// Blocking (waits for the process to finish)
		Process.spawn_command_line_sync ("ls")

		// Blocking with output
		standard_output : string
		standard_error : string
		exit_status : int
		Process.spawn_command_line_sync (
			"ls", out standard_output, out standard_error, out exit_status)
	except e : SpawnError
		stderr.printf ("%s\n", e.message)
```

## First class (GObject)

```genie
/* class derived from GObject */
class BasicSample : Object

	/* public instance method */
	def run ()
		stdout.printf ("Hello World\n")

/* application entry point */
init
	var sample = new BasicSample ()
	sample.run ()
```

The entry point may live inside the class if you prefer:

```genie
class BasicSample : Object

	def run ()
		stdout.printf ("Hello World\n")

	def static main ()
		var sample = new BasicSample ()
		sample.run ()
```

In that case `main` must be declared `static`.

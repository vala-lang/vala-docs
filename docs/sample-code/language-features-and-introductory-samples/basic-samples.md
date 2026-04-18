# Basic Samples

Small console programs covering Hello World, I/O, math, command-line arguments,
files, processes, and a minimal GObject class. Adapted from the archived
[Basic Vala Samples](https://wiki.gnome.org/Projects/Vala/BasicSample) page.

See [Language Features and Introductory Samples](../language-features-and-introductory-samples) for the full set.

## Hello World

```vala
void main () {
    print ("hello, world\n");
}
```

### Compile and run

```shell
valac hello.vala
./hello
```

If the binary should have a different name:

```shell
valac hello.vala -o greeting
./greeting
```

## Reading user input

```vala
void main () {
    stdout.printf ("Please enter your name: ");
    string? name = stdin.read_line ();
    if (name != null) {
        stdout.printf ("Hello, %s!\n", name);
    }
}
```

Vala provides `stdin`, `stdout`, and `stderr` for the three standard streams.
The `printf` method takes a format string and a variable number of arguments.

## Mathematics

Math functions live in the [`Math`](https://valadoc.org/glib-2.0/GLib.Math.html) namespace.

```vala
void main () {

    stdout.printf ("Please enter the radius of a circle: ");
    double radius = double.parse (stdin.read_line ());
    stdout.printf ("Circumference: %g\n", 2 * Math.PI * radius);

    stdout.printf ("sin(pi/2) = %g\n", Math.sin (Math.PI / 2));

    // Random numbers

    stdout.printf ("Today's lottery results:");
    for (int i = 0; i < 6; i++) {
        stdout.printf (" %d", Random.int_range (1, 49));
    }
    stdout.printf ("\n");

    stdout.printf ("Random number between 0 and 1: %g\n", Random.next_double ());
}
```

## Command-line arguments and exit code

```vala
int main (string[] args) {

    // Output the number of arguments
    stdout.printf ("%d command line argument(s):\n", args.length);

    // Enumerate all command line arguments
    foreach (string arg in args) {
        stdout.printf ("%s\n", arg);
    }

    // Exit code (0: success, 1: failure)
    return 0;
}
```

The first command-line argument (`args[0]`) is always the program name.

## Reading and writing text file content

Basic text file handling. For richer I/O with GIO (including asynchronous APIs),
see [Async Method Samples](../async-samples). The retired GNOME Wiki
also contains additional [GIO-oriented examples](https://wiki.gnome.org/Projects/Vala/GIOSamples).

```vala
void main () {
    try {
        string filename = "data.txt";

        // Writing
        string content = "hello, world";
        FileUtils.set_contents (filename, content);

        // Reading
        string read;
        FileUtils.get_contents (filename, out read);

        stdout.printf ("The content of file '%s' is:\n%s\n", filename, read);
    } catch (FileError e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

## Spawning processes

```vala
void main () {
    try {
        // Non-blocking
        Process.spawn_command_line_async ("ls");

        // Blocking (waits for the process to finish)
        Process.spawn_command_line_sync ("ls");

        // Blocking with output
        string standard_output, standard_error;
        int exit_status;
        Process.spawn_command_line_sync ("ls", out standard_output,
                                               out standard_error,
                                               out exit_status);
    } catch (SpawnError e) {
        stderr.printf ("%s\n", e.message);
    }
}
```

## First class (GObject)

```vala
/* class derived from GObject */
public class BasicSample : Object {

    /* public instance method */
    public void run () {
        stdout.printf ("Hello World\n");
    }
}

/* application entry point */
int main (string[] args) {
    var sample = new BasicSample ();
    sample.run ();
    return 0;
}
```

The entry point may live inside the class if you prefer:

```vala
public class BasicSample : Object {

    public void run () {
        stdout.printf ("Hello World\n");
    }

    static int main (string[] args) {
        var sample = new BasicSample ();
        sample.run ();
        return 0;
    }
}
```

In that case `main` must be declared `static`.

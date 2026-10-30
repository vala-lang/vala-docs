# 2.9. Input / Output

## Stdout

The [*Hello World* program](../01-00-first-program) in chapter 1 used [`print ()`](https://valadoc.org/glib-2.0/GLib.print.html) to print a string. Vala also offers `stdout.printf ()`, which writes to the C standard output stream.

Both take a *format string* followed by any number of arguments of different types. The format string follows the same rules as [C format strings](http://en.wikipedia.org/wiki/Printf): it contains placeholders that are replaced with the argument values when the function is called.

```vala
stdout.printf ("Hello, world\n");
print ("Hello, world\n");
stdout.printf ("%d %g %s\n", 42, 3.1415, "Vala");
```

Neither function adds a newline for you, so end the format string with `\n` when you want one.

### `print ()` vs `stdout.printf ()`

The two work mostly the same, but they come from different places:

- `stdout.printf ()` comes from the C standard library. `stdout` is a [`FileStream`](https://valadoc.org/glib-2.0/GLib.FileStream.html), so you can use it with the other file stream APIs, such as `stdout.flush ()` and `stdout.puts ()`, and pass it to code that expects a `FileStream`.
- `print ()` is part of GLib. It works well with the rest of the GLib library, for example with the [format macros GLib provides for its basic types](https://docs.gtk.org/glib/types.html). These are available in Vala as constants such as `int64.FORMAT` and `uint64.FORMAT`.
- The output of `print ()` can be redirected with [`set_print_handler ()`](https://valadoc.org/glib-2.0/GLib.set_print_handler.html), for example to show it in a window or write it to a file. `stdout.printf ()` always writes to the C standard output stream.

```vala
int64 big_number = int64.MAX;
print ("%" + int64.FORMAT + "\n", big_number);
```

```vala
set_print_handler ((text) => {
    stdout.printf ("[custom handler] %s", text);
});

print ("Hello, world\n"); // Prints "[custom handler] Hello, world"
```

For more information, see the Valadoc pages for [`print ()`](https://valadoc.org/glib-2.0/GLib.print.html) and [`printerr ()`](https://valadoc.org/glib-2.0/GLib.printerr.html).

## Stderr

To print an error message to the console, you can use `stderr.printf ()` instead of `stdout.printf ()`, or you can use [`printerr ()`](https://valadoc.org/glib-2.0/GLib.printerr.html) instead of `print ()`.

```vala
stderr.printf ("I'm an error message !\n");
printerr ("I'm an error message !\n");
```

The same differences apply: `stderr` is a `FileStream` from the C standard library, while `printerr ()` is a GLib function whose output can be redirected with [`set_printerr_handler ()`](https://valadoc.org/glib-2.0/GLib.set_printerr_handler.html).

## Logging

`print ()` and `printerr ()` are for your program's normal output. For messages about what your program is doing, or about problems in it, GLib provides logging functions. They add a timestamp and the source file and line number to each message, and they let users control which messages they see.

### `log ()`

[`log ()`](https://valadoc.org/glib-2.0/GLib.log.html) is the function every other logging function is built on. It takes a log domain, a log level, a format string and the arguments for the format string.

```vala
log (string? log_domain, LogLevelFlags log_level, string format, ...)
```

- **Log domain:** a name that says which part of a program or library a message comes from, such as `"MyApp"`. Pass `null` for no domain. Users can use the domain to choose which messages to show (see [Showing debug and info messages](#showing-debug-and-info-messages)), and you can use it to give a part of your program its own [log handler](#changing-how-log-messages-are-handled).
- **Log level:** a value of the [`LogLevelFlags`](https://valadoc.org/glib-2.0/GLib.LogLevelFlags.html) enum that says how important the message is. The table below shows each level.
- **Format string and arguments:** these work like `print ()`. You don't need to end the message with `\n`, because the default log handler adds a newline for you.

<table>
  <thead>
    <tr>
      <th>Log level</th>
      <th>Convenience function</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>LogLevelFlags.LEVEL_DEBUG</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.debug.html"><code>debug ()</code></a></td>
    </tr>
    <tr>
      <td><code>LogLevelFlags.LEVEL_INFO</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.info.html"><code>info ()</code></a></td>
    </tr>
    <tr>
      <td><code>LogLevelFlags.LEVEL_MESSAGE</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.message.html"><code>message ()</code></a></td>
    </tr>
    <tr>
      <td><code>LogLevelFlags.LEVEL_WARNING</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.warning.html"><code>warning ()</code></a></td>
    </tr>
    <tr>
      <td><code>LogLevelFlags.LEVEL_CRITICAL</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.critical.html"><code>critical ()</code></a></td>
    </tr>
    <tr>
      <td><code>LogLevelFlags.LEVEL_ERROR</code></td>
      <td><a href="https://valadoc.org/glib-2.0/GLib.error.html"><code>error ()</code></a></td>
    </tr>
  </tbody>
</table>

```vala
log ("MyApp", LogLevelFlags.LEVEL_MESSAGE, "Loaded %d items", 3);
log ("MyApp", LogLevelFlags.LEVEL_WARNING, "Config file not found, using defaults");
```

When run, this prints the following on stderr. The domain is part of each line:

```
MyApp-Message: 13:44:44.132: example.vala:1: Loaded 3 items

(process:45518): MyApp-WARNING **: 13:44:44.132: example.vala:2: Config file not found, using defaults
```

Everything that applies to the levels in the [convenience functions](#logging-convenience-functions) below applies to `log ()` too: levels below message are hidden unless `G_MESSAGES_DEBUG` is set, and a log with `LogLevelFlags.LEVEL_ERROR` always terminates the program. With a domain, `G_MESSAGES_DEBUG` can name the domain, so `G_MESSAGES_DEBUG=MyApp ./my-program` shows the debug and info messages logged with the `"MyApp"` domain, but not the ones logged with other domains.

You can add `LogLevelFlags.FLAG_FATAL` to a level to make that one message terminate the program, even when the level normally doesn't:

```vala
log ("MyApp", LogLevelFlags.LEVEL_MESSAGE | LogLevelFlags.FLAG_FATAL, "Cannot continue");
```

Use `log ()` when you need to choose the log domain or when the level is only known at runtime. Otherwise the convenience functions are shorter and clearer.

### Logging convenience functions

Writing out the domain and the level every time is long, so GLib provides a function for each log level. They are shortcuts for `log ()` with the matching level and no log domain.

Each function takes a format string followed by arguments, like `print ()`. You don't need to end the message with `\n`, because the default log handler adds a newline for you.

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Level</th>
      <th>Use it for</th>
      <th>Printed by default</th>
      <th>Stream</th>
      <th>Stops the program</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.debug.html"><code>debug ()</code></a></td>
      <td>Debug</td>
      <td>Detailed information to help you find bugs</td>
      <td>No</td>
      <td>stdout</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.info.html"><code>info ()</code></a></td>
      <td>Info</td>
      <td>Informational messages that are less important than <code>message ()</code></td>
      <td>No</td>
      <td>stdout</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.message.html"><code>message ()</code></a></td>
      <td>Message</td>
      <td>Normal messages about what the program is doing</td>
      <td>Yes</td>
      <td>stderr</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.warning.html"><code>warning ()</code></a></td>
      <td>Warning</td>
      <td>Unexpected external conditions, such as a missing file or a misconfigured system</td>
      <td>Yes</td>
      <td>stderr</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.warning_once.html"><code>warning_once ()</code></a></td>
      <td>Warning</td>
      <td>The same as <code>warning ()</code>, but only the first time that line of code runs</td>
      <td>Yes, once</td>
      <td>stderr</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.critical.html"><code>critical ()</code></a></td>
      <td>Critical</td>
      <td>A bug in your program, such as an invalid argument</td>
      <td>Yes</td>
      <td>stderr</td>
      <td>No</td>
    </tr>
    <tr>
      <td><a href="https://valadoc.org/glib-2.0/GLib.error.html"><code>error ()</code></a></td>
      <td>Error</td>
      <td>A bug so serious that the program can't continue</td>
      <td>Yes</td>
      <td>stderr</td>
      <td><strong>Yes, always</strong></td>
    </tr>
  </tbody>
</table>

```vala
int items = 3;

debug ("Loaded %d items", items);
info ("Starting up");
message ("Loaded %d items", items);
warning ("Config file not found, using defaults");
critical ("Index %d is out of range", 7);
error ("Unrecoverable state, shutting down");
```

When run, this prints the following (the stream each line is on is in the table above):

```
** Message: 13:33:13.201: example.vala:4: Loaded 3 items

** (process:39732): WARNING **: 13:33:13.201: example.vala:5: Config file not found, using defaults

** (process:39732): CRITICAL **: 13:33:13.201: example.vala:6: Index 7 is out of range

** (process:39732): ERROR **: 13:33:13.201: example.vala:7: Unrecoverable state, shutting down
```

The `debug ()` and `info ()` lines aren't there. See [Showing debug and info messages](#showing-debug-and-info-messages) below.

#### `debug ()`

Use `debug ()` for detailed messages that help you track down bugs while developing. They are hidden by default, so you can leave them in your code without cluttering the output for users.

```vala
debug ("Connecting to %s on port %d", host, port);
```

#### `info ()`

Use `info ()` for informational messages. Like `debug ()`, they are hidden by default, and they are rarely needed.

```vala
info ("Starting up");
```

#### `message ()`

Use `message ()` for ordinary messages that users may want to see, such as progress or status updates.

```vala
message ("Loaded %d items", items);
```

#### `warning ()`

Use `warning ()` when something unexpected happened outside of your program, but your program can carry on. Examples are a missing file, a bad system configuration or invalid contents in a file. The program continues running after a warning.

```vala
warning ("Config file not found, using defaults");
```

::: tip
Warnings and error messages aren't meant for reporting errors to the user of your program. If the caller of a function can do something about a failure, use a [`GLib.Error`](https://valadoc.org/glib-2.0/GLib.Error.html) and `throws` instead (see [Error Handling](../04-00-advanced-features/04-02-error-handling)).
:::

#### `warning_once ()`

`warning_once ()` works like `warning ()`, but only logs the first time that line of code runs. Use it for a warning in code that runs many times, such as inside a loop or in a function that is called often, so the output isn't flooded with the same warning. It is available since GLib 2.64.

```vala
for (int i = 0; i < 3; i++) {
    warning_once ("Retrying (%d)", i);
}
```

This logs `Retrying (0)` once and does nothing on the other iterations. Each `warning_once ()` call in your code is tracked separately, so a different call elsewhere still logs its own first warning.

#### `critical ()`

Use `critical ()` when you detect a bug in your own program or in a library you use, such as being called with an invalid argument. It prints a message and the program carries on, so the bug may cause further problems afterwards.

```vala
critical ("Index %d is out of range", index);
```

Vala's runtime checks, such as a failed `requires` precondition in a method, also log a critical message.

#### `error ()`

Use `error ()` only for failures that should never happen and that you can't recover from. It prints a message and then **always** terminates the program, usually with a core dump, so don't use it for errors you expect to happen, such as a file not existing. Vala knows `error ()` never returns, so code after it is unreachable.

```vala
error ("Unrecoverable state, shutting down");
```

### Showing debug and info messages

To see `debug ()` and `info ()` messages, set the `G_MESSAGES_DEBUG` environment variable to `all` to see all of them, or to a list of log domains separated by spaces.

```
G_MESSAGES_DEBUG=all ./my-program
```

::: warning
You must start your program with the `G_MESSAGES_DEBUG=all` environment variable set for `debug ()` and `info ()` messages to be printed.
:::

### Making warnings and critical messages stop your program

While developing, it helps to stop at the first warning or critical message, so you can find what caused it in a debugger. Set the `G_DEBUG` environment variable to make them fatal:

```
G_DEBUG=fatal-warnings ./my-program
G_DEBUG=fatal-criticals ./my-program
```

With `fatal-warnings`, `warning ()`, `warning_once ()` and `critical ()` stop the program. With `fatal-criticals`, only `critical ()` does.

### Changing how log messages are handled

You can change how log messages are formatted and where they go with the [`Log.set_default_handler ()`](https://valadoc.org/glib-2.0/GLib.Log.set_default_handler.html) function.

```vala
Log.set_default_handler ((domain, level, message) => {
    print ("[custom] %s\n", message);
});

message ("Hello"); // Prints something like "[custom] example.vala:5: Hello"
```

To handle only the messages of one log domain, use [`Log.set_handler ()`](https://valadoc.org/glib-2.0/GLib.Log.set_handler.html). Messages from other domains still use the default handler.

```vala
Log.set_handler ("MyApp", LogLevelFlags.LEVEL_MASK, (domain, level, message) => {
    print ("[%s] %s\n", domain, message);
});

log ("MyApp", LogLevelFlags.LEVEL_WARNING, "Hello");  // Handled by the handler above
log ("Other", LogLevelFlags.LEVEL_WARNING, "Hello");  // Handled by the default handler
```

For more information, see the GLib documentation on [message logging](https://docs.gtk.org/glib/logging.html) and the Valadoc pages for [`log ()`](https://valadoc.org/glib-2.0/GLib.log.html), [`debug ()`](https://valadoc.org/glib-2.0/GLib.debug.html), [`info ()`](https://valadoc.org/glib-2.0/GLib.info.html), [`message ()`](https://valadoc.org/glib-2.0/GLib.message.html), [`warning ()`](https://valadoc.org/glib-2.0/GLib.warning.html), [`warning_once ()`](https://valadoc.org/glib-2.0/GLib.warning_once.html), [`critical ()`](https://valadoc.org/glib-2.0/GLib.critical.html) and [`error ()`](https://valadoc.org/glib-2.0/GLib.error.html).


## Stdin

To read a line from the console, you can use the `stdin.read_line ()` function. This function reads a line from the console and returns it as a string.

```vala
string? line;
while ((line = stdin.read_line ()) != null) {
    stdout.printf ("You entered: %s\n", line);
}
```

Or use `stdin.scanf ()` to read formatted input from the console.

```vala
int day, month, year;
stdout.printf ("Enter your birthday (dd/mm/yyyy): ");
stdin.scanf ("%d/%d/%d", out day, out month, out year);
stdout.printf ("You were born on %d/%d/%d\n", day, month, year);
```

::: warning

If you use `stdin.scanf ()` with a `%s` format specifier, you must supply a buffer large enough to hold the input. If you omit a buffer or use one that is too small, you may get a segmentation fault.

:::

```vala
uint8 buffer[128];
stdin.scanf ("%s", out buffer);
stdout.printf ("You entered: %s\n", (string)buffer);
```


## Opening Files (File Streams)

To open a file, you can use the `FileStream.open ()` function. This function takes the name of the file and the mode in which you want to open the file. The mode can be one of the following:

```vala
var fs = FileStream.open ("toto.txt", "r");
if (fs == null) {
    print ("Cannot open file");
    return;
}

string? line = null;
while ((line = fs.read_line ()) != null) {
    print (line);
}
```


| Mode | Description |
|------|-------------|
| `r` | Open text file for reading. The stream is positioned at the beginning of the file. |
| `r+` | Open for reading and writing. The stream is positioned at the beginning of the file. |
| `w` | Truncate file to zero length or create text file for writing. The stream is positioned at the beginning of the file. |
| `w+` | Open for reading and writing. The file is created if it does not exist, otherwise it is truncated. The stream is positioned at the beginning of the file. |
| `a` | Open for appending (writing at end of file). The file is created if it does not exist. The stream is positioned at the end of the file. |
| `a+` | Open for reading and appending (writing at end of file). The file is created if it does not exist. Output is always appended to the end of the file. POSIX is silent on what the initial read position is when using this mode. For glibc, the initial file position for reading is at the beginning of the file, but for Android/BSD/macOS, the initial file position for reading is at the end of the file. |


## FileUtils

The [`GLib.FileUtils`](https://valadoc.org/glib-2.0/GLib.FileUtils.html) namespace contains convenience functions for performing operations when working with files.

A common use-case when working with Vala is reading and writing the contents of files.

You can use `FileUtils.get_contents ()` and `FileUtils.set_contents ()` to read and write the contents of a file.

```vala
string content;

// Get all contents of a file and store it inside the `content` string variable.
FileUtils.get_contents ("my_text.txt", out content);

// Replace every 'a' with 'b' in the `content` string
string new_content = content.replace ("a", "b");

// Write the updated text stored in the `content` string variable to the file
FileUtils.set_contents ("my_text.txt", new_content);
```

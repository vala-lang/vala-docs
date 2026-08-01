# 2.9. Input / Output

## Stdout

The [*Hello World* program](../01-00-first-program) in chapter 1 used `print ()` for a single string. For formatted output and for consistency with much existing C and GObject code, Vala also offers `stdout.printf ()`, which can take an arbitrary number of arguments of different types. The first argument is always a *format string*, following the same rules as [C format strings](http://en.wikipedia.org/wiki/Printf). If you must output an error message you can use `stderr.printf ()` instead of `stdout.printf ()`.

To print a message to the console, you can use `stdout.printf ()` or `print ()`. Both are similar to `printf ()` in C. `stdout.printf ()` takes a format string and a list of arguments. The format string contains placeholders for the arguments; the placeholders are replaced with the argument values when the function is called.

```vala
stdout.printf ("Hello, world\n");
print ("Hello, world\n");
stdout.printf ("%d %g %s\n", 42, 3.1415, "Vala");
```

## Stderr

To print an error message to the console, you can use `stderr.printf ()` instead of `stdout.printf ()`, or you can use `printerr ()`.

```vala
stderr.printf ("I'm an error message !");
printerr ("I'm an error message !");
```

For debugging messages, Vala provides `debug ()`, `message ()`, `warning ()`, and `critical ()`.

```vala
message ("I'm a message !");
warning ("I'm a warning !");
critical ("I'm a critical message !");
```

You can change how log messages are formatted with the `Log.set_default_handler ()` function.


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

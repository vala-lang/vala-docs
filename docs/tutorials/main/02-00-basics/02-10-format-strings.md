# 2.10. Format Strings

The printing functions covered in [2.9. Input / Output](02-09-input-output), such as `print ()` and `stdout.printf ()`, take a *format string*.

A placeholder in a format string has the form `%[flags][width][.precision][length]specifier`. The sections below list what you can use.

## Format strings that work with the C `printf` functions

These work with `stdout.printf ()`, `stderr.printf ()` and the other `printf`-style functions from the C standard library. They also work with GLib's `print ()` and `printerr ()`.

Specifiers:

- `%d`, `%i`: Signed decimal integer
- `%u`: Unsigned decimal integer
- `%o`: Unsigned octal integer
- `%x`: Unsigned hexadecimal integer (lowercase letters)
- `%X`: Unsigned hexadecimal integer (uppercase letters)
- `%f`, `%F`: Decimal floating-point number
- `%e`: Floating-point number in scientific notation (lowercase `e`)
- `%E`: Floating-point number in scientific notation (uppercase `E`)
- `%g`: Shortest of `%f` and `%e` for the given value
- `%G`: Shortest of `%F` and `%E` for the given value
- `%a`, `%A`: Hexadecimal floating-point number
- `%c`: Single character
- `%s`: String
- `%p`: Pointer address
- `%%`: A literal `%` character

Length modifiers, placed before the specifier (for example `%ld`):

- `hh`: Argument is a `char`-sized integer
- `h`: Argument is a `short`
- `l`: Argument is a `long` or `ulong`
- `ll`: Argument is a `long long`
- `z`: Argument is a `size_t` or `ssize_t`

Flags, placed right after the `%`:

- `-`: Left-align the output within the width
- `+`: Always print a sign for numbers
- ` ` (space): Print a space in front of non-negative numbers
- `0`: Pad with zeros instead of spaces
- `#`: Use an alternate form (for example, a `0x` prefix with `%x`)

Width and precision:

- A number such as `%5d`: Minimum width of the output
- `.` followed by a number such as `%.2f`: Digits after the decimal point for floating-point numbers, or the maximum number of characters for strings
- `*` in place of a number such as `%*d`: Take the width (or the precision, after the `.`) from the next argument

```vala
stdout.printf ("|%5d|%-5d|%05d|\n", 42, 42, 42); // Prints "|   42|42   |00042|"
stdout.printf ("%.2f %x %c\n", 3.14159, 255, 'V'); // Prints "3.14 ff V"
```

## Format strings exclusive to GLib

GLib provides format macros for printing fixed-size and platform-dependent types portably, because the right length modifier differs between platforms. They are plain strings, so they work with any `printf`-style function, but they come from GLib rather than from the C standard.

The macros are available in Vala as constants on the matching type. Join them with a `%` at the start of the placeholder by concatenating strings:

- `int16.FORMAT`, `uint16.FORMAT`: Format for 16-bit integers
- `int32.FORMAT`, `uint32.FORMAT`: Format for 32-bit integers
- `int64.FORMAT`, `uint64.FORMAT`: Format for 64-bit integers
- `size_t.FORMAT`, `ssize_t.FORMAT`: Format for `size_t` and `ssize_t` values
- `uintptr.FORMAT`, `intptr.FORMAT`: Format for pointer-sized integers
- `Pid.FORMAT`: Format for process IDs
- `FORMAT_MODIFIER`, on the integer types above except `Pid` (for example `int64.FORMAT_MODIFIER`): Just the length modifier, to combine with your own specifier and flags. It can be an empty string, such as for `int32`

```vala
uint64 big_number = uint64.MAX;
print ("%" + uint64.FORMAT + "\n", big_number); // Prints "18446744073709551615"
print ("%08" + int64.FORMAT_MODIFIER + "x\n", (int64) 255); // Prints "000000ff"
```

# Input samples

Examples for reading from the terminal and standard input, adapted from the archived GNOME Wiki page [Projects/Vala/InputSamples](https://wiki.gnome.org/Projects/Vala/InputSamples).

## Reading a single line

```vala
int main () {
    stdout.printf ("Please enter your name: ");
    string? name = stdin.read_line ();
    if (name != null) {
        stdout.printf ("Hello, %s!\n", name);
    }
    return 0;
}
```

## Reading all of standard input

`stdin.gets` uses the safer `fgets()`-style API, not `gets()`.

```vala
string read_stdin () {
    var input = new StringBuilder ();
    var buffer = new char[1024];
    while (!stdin.eof ()) {
        string? read_chunk = stdin.gets (buffer);
        if (read_chunk != null) {
            input.append (read_chunk);
        }
    }
    return input.str;
}

int main () {
    string name = read_stdin ();
    stdout.printf ("\n-----\n%s\n", name);
    return 0;
}
```

```shell
valac stdin-input.vala
./stdin-input
```

## GNU Readline

```vala
using Readline;

void main () {
    while (true) {
        string? name = Readline.readline ("Please enter your name: ");
        if (name != null && name != "") {
            stdout.printf ("Hello, %s\n", name);
            Readline.History.add (name);
        } else {
            break;
        }
    }
}
```

```shell
valac readline-sample.vala --pkg readline -X -lreadline
./readline-sample
```

## Character input

```vala
public static int main (string[] args) {
    int c = 0;
    stdout.printf ("Type something and press enter. Type '0' to quit\n");
    do {
        c = stdin.getc ();
        if (c > 10) {
            stdout.printf ("%c (%d)\n", c, c);
        }
    } while (c != '0');
    return 0;
}
```

## Scanf

Useful for parsing typed numbers (see also the Wikipedia article on [scanf format strings](https://en.wikipedia.org/wiki/Scanf#Format_string_specifications)).

```vala
public static int main () {
    float f;
    double d;
    int i;
    long l;

    stdout.printf ("Enter a float   : ");
    stdin.scanf ("%f", out f);

    stdout.printf ("Enter a double  : ");
    stdin.scanf ("%lf", out d);

    stdout.printf ("Enter an integer: ");
    stdin.scanf ("%d", out i);

    stdout.printf ("Enter a long    : ");
    stdin.scanf ("%ld", out l);

    stdout.printf ("The numbers you entered\n");
    stdout.printf ("Float  : %f\n", f);
    stdout.printf ("Double : %lf\n", d);
    stdout.printf ("Integer: %d\n", i);
    stdout.printf ("Long   : %ld\n", l);
    return 0;
}
```

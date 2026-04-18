# Intermediate Samples

Slightly larger examples: a class with a property, signal, and lambda handler,
plus a number-guessing game.

Adapted from the archived [Vala Advanced Example](https://wiki.gnome.org/Projects/Vala/AdvancedSample) page.

See [Language Features and Introductory Samples](../language-features-and-introductory-samples) for the full set.

## Class with property, signal, and lambda

```vala
public class AdvancedSample : Object {
    public string name { get; set; }   // Property
    public signal void foo ();         // Signal

    public AdvancedSample (string name) {
        this.name = name;
    }

    public void run () {
        // Assigning anonymous function as signal handler
        this.foo.connect ((s) => {
            stdout.printf ("Lambda expression: Argument is %s!\n", this.name);
        });

        // Emitting the signal
        this.foo ();
    }
}

void main (string[] args) {
    foreach (string arg in args) {
        var sample = new AdvancedSample (arg);
        sample.run ();
    }
}
```

### Compile and run

```shell
valac -o advancedsample AdvancedSample.vala
./advancedsample
```

## Number guessing

```vala
public class NumberGuessing {
    private int min;
    private int max;

    public NumberGuessing (int min, int max) {
        this.min = min;
        this.max = max;
    }

    public void start () {
        int try_count = 0;
        int number = Random.int_range (min, max);

        stdout.printf ("Welcome to Number Guessing!\n\n");
        stdout.printf ("I have thought up a number between %d and %d\n", min, max);
        stdout.printf ("which you have to guess now. Don't worry, I will\n");
        stdout.printf ("give you some hints.\n\n");

        while (true) {
            try_count++;

            stdout.printf ("Try #%d\n", try_count);
            stdout.printf ("Please enter a number between %d and %d: ", min, max);
            int input = int.parse (stdin.read_line ());

            if (number == input) {
                stdout.printf ("Congratulations! You win.\n");
                break;
            } else {
                var how = number > input ? "greater" : "less";
                stdout.printf ("Wrong. The wanted number is %s than %d.\n", how, input);
            }
        }
    }
}

void main (string[] args) {
    var game = new NumberGuessing (1, 100);
    game.start ();
}
```

### Compile and run

```shell
valac number-guessing.vala
./number-guessing
```

# Advanced Genie sample

Examples from the archived GNOME Wiki page
[Projects/Genie/AdvancedSample](https://wiki.gnome.org/Projects/Genie/AdvancedSample):
a class with a custom `event`, and a small number-guessing game.

## Event handling

```genie
class AdvancedSample

	prop name : string
	event foo ()

	construct (name : string)
		self.name = name

	def run () : void
		self.foo.connect (event_handler)
		self.foo ()

	def event_handler ()
		stdout.printf ("Name: %s\n", name)

init
	for s in args
		var sample = new AdvancedSample (s)
		sample.run ()
```

### Compile and run

```shell
valac -o advancedsample AdvancedSample.gs
./advancedsample
```

## Number guessing

Requires a Vala/Genie toolchain with `stdin.read_line ()` support (the wiki
originally noted Vala 0.7.5 or newer).

```genie
class NumberGuessing

	prop min : int
	prop max : int

	construct (m : int, n : int)
		self.min = m
		self.max = n

	def start ()
		try_count : int = 0
		number : int = Random.int_range (min, max)

		stdout.printf ("Welcome to Number Guessing!\n\n")
		stdout.printf ("I have thought up a number between %d and %d\n", min, max)
		stdout.printf ("which you have to guess now. Don't worry, I will\n")
		stdout.printf ("give you some hints.\n\n")

		while true
			stdout.printf ("Try #%d\n", ++try_count)
			stdout.printf ("Please enter a number between %d and %d: ", min, max)
			input : int = int.parse (stdin.read_line ())
			if number is input
				stdout.printf ("Congratulations! You win.\n")
				break
			else
				stdout.printf ("Wrong. The wanted number is %s than %d.\n",
					number > input ? "greater" : "less", input)

init
	var game = new NumberGuessing (1, 100)
	game.start ()
```

### Compile and run

```shell
valac numberguessing.gs
./numberguessing
```

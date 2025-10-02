# 2.6. Control Structures

```vala
while (a > b) { a--; }
```

Will decrement *a* repeatedly, checking before each iteration that *a*
is greater than *b*.

```vala
do { a--; } while (a > b);
```

Will decrement *a* repeatedly, checking after each iteration that *a* is
greater than *b*.

```vala
for (int a = 0; a < 10; a++) { stdout.printf("%d\n", a); }
```

Will initialize *a* to 0, then print *a* repeatedly until *a* is no
longer less than 10, incrementing *a* after each iteration.

```vala
foreach (int a in int_array) { stdout.printf("%d\n", a); }
```

Will print out each integer in an array, or another iterable collection.
The meaning of "iterable" will be described later.

All of the four preceding types of loop may be controlled with the
keywords `break` and `continue`. A `break` instruction will cause the
loop to immediately terminate, while `continue` will jump straight to
the test part of the iteration.

```vala
if (a > 0) { stdout.printf("a is greater than 0\n"); }
else if (a < 0) { stdout.printf("a is less than 0\n"); }
else { stdout.printf("a is equal to 0\n"); }
```

Executes a particular piece of code based on a set of conditions. The
first condition to match decides which code will execute, if *a* is
greater than 0 it will not be tested whether it is less than 0. Any
number of else if blocks is allowed, and zero or one else blocks.

```vala
switch (a) {
case 1:
    stdout.printf("one\n");
    break;
case 2:
case 3:
    stdout.printf("two or three\n");
    break;
default:
    stdout.printf("unknown\n");
    break;
}
```

A `switch` statement runs exactly one or zero sections of code based on
the value passed to it. In Vala there is no fall through between cases,
except for empty cases. In order to ensure this, each non-empty case
must end with a `break`, `return` or `throw` statement. It is possible
to use switch statements with strings.

A note for C programmers: conditions must always evaluate to a Boolean
value. This means that if you want to check a variable for `null` or 0
you must do this explicitly: `if (object != null) { }` or
`if (number != 0) { }`.

# 4.11. Variable-Length Argument Lists

Vala supports C-style variable-length argument lists ("varargs") for
methods. They are declared with an ellipsis ("...") in the method
signature. A method with varargs requires at least one fixed argument:

```vala
void method_with_varargs (int x, ...) {
    var l = va_list ();
    string s = l.arg ();
    int i = l.arg ();
    stdout.printf ("%s: %d\n", s, i);
}
```

In this example `x` is a fixed argument to meet the requirements. You
obtain the varargs list with `va_list ()`. Then you can retrieve the
arguments one after another by calling the generic method `arg<T> ()`
sequentially on this list, with T being the type that the argument should
be interpreted as. If the type is clear from the context (as in our
example), the type is inferred automatically, and you can just call
`arg ()` without the generic type argument.

This example parses an arbitrary number of **string–double** argument
pairs:

```vala
void method_with_varargs (int fixed, ...) {
    var l = va_list ();
    while (true) {
        string? key = l.arg ();
        if (key == null) {
            break;  // end of the list
        }
        double val = l.arg ();
        stdout.printf ("%s: %g\n", key, val);
    }
}

void main () {
    method_with_varargs (42, "foo", 0.75, "bar", 0.25, "baz", 0.32);
}
```

It checks for `null` as a sentinel to recognize the end of the varargs
list. Vala always implicitly passes `null` as the last argument of a
varargs method call.

Varargs have a serious drawback that you should be aware of: they are
not type-safe. The compiler can't tell you whether you are passing
arguments of the right type to the method or not. That's why you should
consider using varargs only if you have a good reason, for example:
providing a convenience function for C programmers using your Vala
library, binding a C function. Often an array argument is a better
choice.

A common pattern with varargs is to expect alternating **string–value**
pairs as arguments, usually meaning **gobject property–value**. In this
case you can write `property: value` instead, e.g.:

```vala
actor.animate (AnimationMode.EASE_OUT_BOUNCE, 3000, x: 100.0, y: 200.0, rotation_angle_z: 500.0, opacity: 0);
```

is equivalent to:

```vala
actor.animate (AnimationMode.EASE_OUT_BOUNCE, 3000, "x", 100.0, "y", 200.0, "rotation-angle-z", 500.0, "opacity", 0);
```

## The `params` Keyword

If all of the variable arguments have the same type, you can declare the
last parameter of a method as an array with the `params` keyword instead
of using varargs. Callers pass the values as separate arguments, and the
compiler collects them into an array for you:

```vala
int sum (params int[] values) {
    int total = 0;
    foreach (int value in values) {
        total += value;
    }
    return total;
}

void greet (string greeting, params string[] names) {
    foreach (string name in names) {
        stdout.printf ("%s, %s!\n", greeting, name);
    }
}

void main () {
    stdout.printf ("%d\n", sum (1, 2, 3));  // 6
    stdout.printf ("%d\n", sum ());         // 0
    greet ("Hello", "Alice", "Bob");
}
```

Unlike varargs, `params` is type-safe: the compiler checks that every
argument matches the array's element type, and no `va_list` or `null`
sentinel is needed. The `params` parameter must be the last parameter of
the method, and passing zero values is allowed.

> **Note:** Support for `params` arrays is experimental, so the compiler
> emits a warning when you declare one. You can't pass an existing array
> in place of the individual values.

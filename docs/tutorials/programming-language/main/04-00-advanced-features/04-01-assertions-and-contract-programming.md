# 4.1. Assertions and Contract Programming

With *assertions* a programmer can check assumptions at runtime. The
syntax is `assert(condition)`. If an assertion fails the program will
terminate with an appropriate error message. There are a few more
assertion methods within the GLib standard namespace, e.g.:

`assert_not_reached()`

`return_if_fail(bool expr)`

`return_if_reached()`

`warn_if_fail(bool expr)`

`warn_if_reached()`

You might be tempted to use assertions in order to check method
arguments for `null`. However, this is not necessary, since Vala does
that implicitly for all parameters that are not marked with `?` as being
*nullable*.

```vala
void method_name(Foo foo, Bar bar) {
    /* Not necessary, Vala does that for you:
    return_if_fail(foo != null);
    return_if_fail(bar != null);
    */
}
```

Vala supports basic [contract programming](http://en.wikipedia.org/wiki/Contract_programming)
features. A method may have preconditions (`requires`) and
postconditions (`ensures`) that must be fulfilled at the beginning or
the end of a method respectively:

```vala
double method_name(int x, double d)
        requires (x > 0 && x < 10)
        requires (d >= 0.0 && d <= 1.0)
        ensures (result >= 0.0 && result <= 10.0)
{
    return d * x;
}
```

`result` is a special variable representing the return value.

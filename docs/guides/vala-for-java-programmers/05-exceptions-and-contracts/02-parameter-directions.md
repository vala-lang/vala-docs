# 5.2. Parameter Directions

Vala methods can have so-called `out` or `ref` arguments. If a method argument is marked as `out` or `ref` argument in the method signature it means that the method can change the value of the passed variable (only variables can be passed as `out` or `ref` arguments) and the change is still in effect after the method returns. If the passed variable is of a reference type the method can change the reference itself (assign a whole new object to the variable instead of just changing the state of the passed object).

The difference between `out` and `ref` is that a variable passed as `ref` argument must be initialized before it is passed to the method, while a variable passed as `out` argument can be uninitialized and is expected to be initialized by the method.

The keywords must be used both at the method definition and when calling the method.

```vala
/*
 * This method takes a normal argument, an 'out' argument
 * and a 'ref' argument.
 */
void my_method (int a, out int b, ref int c) {
    a = 20;  // will have no effect outside of this method

    // until now 'b' is considered uninitialized
    b = 30;  // initialize 'b', will affect the passed variable

    c = 40;  // will affect the passed variable
}

void main () {
    int x = 2;
    int y;      // may be uninitialized
    int z = 4;  // must be initialized before it is passed as 'ref' argument
    my_method (x, out y, ref z);
    stdout.printf ("%d %d %d\n", x, y, z);  // => "2 30 40"
    // 'x' is still the same, 'y' and 'z' have changed
}
```

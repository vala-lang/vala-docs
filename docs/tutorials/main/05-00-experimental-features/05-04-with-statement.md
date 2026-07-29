# 5.4. With Statement

::: danger

Experimental Feature

:::

The `with` statement creates scoped blocks in which members of the given expression can be accessed without repeating its name.

```bnf
with ( [ ( var | unowned var | type-name identifier ) = ] expression ) embedded_statement
```

```vala
struct Color {
    int red;
    int green;
    int blue;
}

void main ()
{
    Color c = {255, 0, 0};

    print ("red: %d, green: %d, blue: %d\n", c.red, c.green, c.blue);
    with (c) {
        red = 1;
        green = 2;
        blue = 3;
    }
    print ("red: %d, green: %d, blue: %d\n", c.red, c.green, c.blue);
}
```


The `with` statement is a convenient way to access members of a struct or class without prefixing them with the object name. 

::: warning

Use `with` statements carefully, as they can make programs harder to read and understand.
:::
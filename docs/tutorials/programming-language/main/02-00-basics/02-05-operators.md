# 2.5. Operators

### Assignment Operators

| Values |
|--------|
| `=`    |

The left operand must be an identifier, and the right must
result in a value or reference as appropriate.

```vala
var character = 'c';
```

In this example, the variable `character` is assigned the value `c`.

### Arithmetic Operators

| Values                   |
|--------------------------|
| `+`, `-`, `/`, `*`, `%`  |

Basic arithmetic, applied to left and right operands.

```vala
var a = 1;
a = a + 2; // => a = 3
a = a - 2; // => a = -1
a = a / 2; // => a = 0 (integer division)
a = a * 2; // => a = 2
a = a % 2; // => a = 1
```

The `+` operator can also concatenate strings.

```vala
string name = "John";
string greeting_message = "Hello " + name + "."; 
// => greeting_message = "Hello John."
```

> [!note]
> String concatenation is fine for a small number of operations, like in the example above, but
> for larger operations, consider using the `StringBuilder` class.
> 
> Also consider formatting strings (like shown in the previous tutorial) instead for better readability.

### Assignment Arithmetic Operators

| Values                       |
|------------------------------|
| `+=`, `-=`, `/=`, `*=`, `%=` |

```vala
var a = 1;
a += 2; // a = a + 2 => a = 3
a -= 2; // a = a - 2 => a = -1
a /= 2; // a = a / 2 => a = 0 (integer division)
a *= 2; // a = a * 2 => a = 2
a %= 2; // a = a % 2 => a = 1
```

Arithmetic operation between left and right operands, where the left
must be a variable, to which the result is assigned.

### Increment and Decrement Operators

| Values     |
|------------|
| `++`, `--` |

Increment and decrement operations with implicit assignment. These take
just one argument, which must be an identifier of a simple data type.
The value will be changed and assigned back to the identifier. These
operators may be placed in either prefix or postfix positions - with the
former the evaluated value of the statement will be the newly calculated
value, with the latter the original value is returned.

**Post-Increment**
```vala
var money = 10;
var money_after_operation = money++; 
// => money_after_operation = 10, money = 11
```

**Post-Decrement**
```vala
var money = 10;
var money_after_operation = money--; 
// => money_after_operation = 10, money = 9
```

**Pre-Increment**
```vala
var money = 10;
var money_after_operation = ++money; 
// => money_after_operation = 11, money = 11
```

**Pre-Decrement**
```vala
var money = 10;
var money_after_operation = --money; 
// => money_after_operation = 9, money = 9
```

### Bitwise Operators

| Values                                  |
|-----------------------------------------|
| `\|`, `^`, `&`, `~`, ` \|=`, `&=`, `^=` |

Bitwise operations: or, exclusive or, and, not. The second set includes
assignments and is analogous to the arithmetic versions. These can be
applied to any of the simple value types. (There is no assignment
operator associated with `~` because this is a unary operator. The
equivalent operation is just `a = ~a`).

### Bit Shift Operators

| Values     |
|------------|
| `<<`, `>>` |

Bit shift operations, shifting the left operand a number of bits
according the right operand.

| Values       |
|--------------|
| `<<=`, `>>=` |

Bit shift operations, shifting the left operand a number of bits
according the right operand. The left operand must be an identifier, to
which the result is assigned.

### Equality and Inequality Comparisons

| Values                           |
|----------------------------------|
| `==`, `!=`, `<`, `>`, `>=`, `<=` |


Evaluates to a `bool` value dependent on whether the left
and right operands are equal. In the case of value types this means
their values are equal, in the case of reference types that the objects
are the same instance. An exception to this rule is the `string` type,
which is tested for equality by value.

Inequality tests. Evaluate to a `bool` value dependent on whether the
left and right operands are different in the manner described. These are
valid for simple value data types, and the `string` type. For strings
these operators compare the lexicographical order.

### Logic Operators

| Values            |
|-------------------|
| `!`, `&&`, `\|\|` |

These operations can be applied to
Boolean values - the first taking just one value the others two.

**Not Operator**  `!`
```vala
string password = "shinyBoat$111";

bool has_number = /\d+/.match (password); 
// regex for contains one or more numbers

if (!has_number) {
    // ... do something if there aren't any numbers in the password
}
```

**And Operator** `&&`
```vala
string product_name = "long wool socks";

if (product_name.contains ("socks") && product_name.contains ("wool")) {
    // ... do something if both are true
}
```

**Or Operator** `||`
```vala
string role = "lead_admin";

if (role.contains ("admin") || role.contains ("staff")) {
    // ... do something if either is true
}
```

### Ternary Conditional Operator

| Values |
|--------|
| `?`    |

Evaluates a condition and returns either
the value of the left or the right sub-expression based on whether the
condition is true or false: `[condition] ? [value if true] : [value if false]`

```vala
class User {
    public bool is_subscriber;
    // ...
}

double get_fee (User user) {
    return user.is_subscriber ? 0.00 : 10.00;
}
```

In the example above, method `get_fee` returns $0.00 for subscribers and $10.00 for non-subscribers based on the 
boolean value of the `is_subscriber` member variable.

### Coalescing Operator

| Values |
|--------|
| `??`   |

Null coalescing operator: `a ?? b` is equivalent to `a != null ? a : b`.
This operator is useful to provide a default value in case a
reference is `null`:

```vala
stdout.printf("Hello, %s!\n", name ?? "unknown person");
```

### In Operator

| Values |
|--------|
| `in`   |

Checks if the right operand contains the left operand. This operator
works on arrays, strings, collections or any other type that has an
appropriate `contains()` method. For strings, it performs a substring
search.

```vala
var numbers = {1, 2, 3};
if (4 in numbers) {
    // ...
}
````

Operators cannot be overloaded in Vala. There are extra operators that
are valid in the context of lambda declarations and other specific
tasks - these are explained in the context they are applicable.

# 2.5. Operators

## Assignment (`=`)

```vala
=
```

Assignment. The left operand must be an identifier, and the right must
result in a value or reference as appropriate.

## Basic arithmetic (`+`, `-`, `/`, `*`, `%`)

```vala
+, -, /, *, %
```

Basic arithmetic, applied to left and right operands. The `+` operator
can also concatenate strings.

## Compound assignment (arithmetic)

```vala
+=, -=, /=, *=, %=
```

Arithmetic operation between left and right operands, where the left
must be an identifier, to which the result is assigned.

## Increment and decrement (`++`, `--`)

```vala
++, --
```

Increment and decrement operations with implicit assignment. These take
just one argument, which must be an identifier of a simple data type.
The value will be changed and assigned back to the identifier. These
operators may be placed in either prefix or postfix positions - with the
former the evaluated value of the statement will be the newly calculated
value, with the latter the original value is returned.

## Bitwise operators

```vala
|, ^, &, ~, |=, &=, ^=
```

Bitwise operations: or, exclusive or, and, not. The second set include
assignment and are analogous to the arithmetic versions. These can be
applied to any of the simple value types. (There is no assignment
operator associated with `~` because this is a unary operator. The
equivalent operation is just `a = ~a`).

## Bit shift (`<<`, `>>`)

```vala
<<, >>
```

Bit shift operations, shifting the left operand a number of bits
according the right operand.

## Compound assignment (bit shift)

```vala
<<=, >>=
```

Bit shift operations, shifting the left operand a number of bits
according the right operand. The left operand must be an identifier, to
which the result is assigned.

## Equality (`==`)

```vala
==
```

Equality test. Evaluates to a `bool` value dependent on whether the left
and right operands are equal. In the case of value types this means
their values are equal, in the case of reference types that the objects
are the same instance. An exception to this rule is the `string` type,
which is tested for equality by value.

## Relational and inequality (`<`, `>`, `>=`, `<=`, `!=`)

```vala
<, >, >=, <=, !=
```

Inequality tests. Evaluate to a `bool` value dependent on whether the
left and right operands are different in the manner described. These are
valid for simple value data types, and the `string` type. For strings
these operators compare the lexicographical order.

## Logical operators (`!`, `&&`, `||`)

```vala
!, &&, ||
```

Logic operations: not, and, or. These operations can be applied to
Boolean values - the first taking just one value the others two.

## Ternary conditional (`?` `:`)

```vala
? :
```

Ternary conditional operator. Evaluates a condition and returns either
the value of the left or the right sub-expression based on whether the
condition is true or false: `condition ? value_if_true : value_if_false`

## Null coalescing (`??`)

```vala
??
```

Null coalescing operator: `a ?? b` is equivalent to `a != null ? a : b`.
This operator is useful for example to provide a default value in case a
reference is `null`:

```vala
stdout.printf ("Hello, %s!\n", name ?? "unknown person");
```

## Null-conditional (`?.`, `?[]`)

```vala
?., ?[]
```

Null-conditional (“safe navigation”) operators. If the expression to the
left of `?.` is `null`, the member access or method call is skipped and
the whole expression evaluates to `null`; otherwise it behaves like a
normal `.` access. For example, `widget?.destroy ()` calls `destroy ()`
only when `widget` is not `null`. A `void` method invoked this way is
simply skipped when the receiver is `null`. The `?[]` form does the same
for element access (and slice expressions use a related `?[ … ]`
syntax).

## Non-null assertion (`(!)`)

```vala
(!)
```

Non-null assertion (explicit non-null cast). This unary operator tells
the compiler to treat a nullable expression as non-null, which is
needed in some situations such as assigning a nullable reference to a
non-nullable variable when you know the value is not `null`:

```vala
o1 = (!) o2;
```

It is used most often together with strict non-null checking; see
[5.3. Strict Non-Null Mode](../05-00-experimental-features/05-03-strict-non-null-mode).

## Membership (`in`)

```vala
in
```

Checks if the right operand contains the left operand. This operator
works on arrays, strings, collections or any other type that has an
appropriate `contains ()` method. For strings, it performs a substring
search.

## Operator overloading

Operators cannot be overloaded in Vala. There are extra operators that
are valid in the context of lambda declarations and other specific
tasks - these are explained in the context they are applicable.

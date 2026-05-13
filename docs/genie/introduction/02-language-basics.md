# Language basics

## Technical Documentation

### Naming Conventions

Identifiers have to use the ASCII character set to produce compatible C code.
That is the main rule about identifiers. Naming conventions are followed in
the GLib programming world that are useful to know and follow:

| Style              | Used with                          |
|--------------------|------------------------------------|
| `lower_snake_case` | Functions / Methods                |
| `UpperCamelCase`   | Classes, Enums, Namespaces, Structs |
| `UPPER_SNAKE_CASE` | Enum values                        |

Examples:

```genie
def function_name ()
    pass

class ClassExample

enum EnumExample
    FIRST_VALUE
    SECOND_VALUE

namespace NamespaceExample
```

### Comments

Genie allows comments in code in two different ways:

```genie
// Comment continues until end of line

/* Comment lasts between delimiters */
```

## Identifiers

An identifier is defined by its name and its type, e.g. `i:int` meaning an
integer called `i`. In the case of value types this also creates an object of
the given type. For reference types this just defines a new reference that
doesn't initially point to anything.

Reference types are instantiated using the `new` operator and the name of a
construction method, which is usually just the name of the type. For example,
`var o = new Object()` creates a new `Object` and makes `o` a reference to
it.

Prefixing symbols with `@` lets you use reserved keywords as identifiers.
This is mainly useful for bindings. You can use an argument `@for` for
example.

## Data Values

### Text

Text is stored in the `string` type and delimited between double quotes:

```genie
a:string = "Some text"
```

Multi-line text can be delimited between three double quotes:

```genie
a:string = """
Multi-line text
Examples of where this is useful are SQL and text menus"""
```

This is called a verbatim string.

Single quotes delimit a single character:

```genie
a:char = 'a'
```

#### Including a Variable's Value in a String

Genie provides a number of ways to create text templates that can include the
value of a variable in a string.

String concatenation with the `+` operator:

```genie
init
    name:string = "Genie"
    print( "My name is " + name )
```

[printf style formatting](https://en.wikipedia.org/wiki/Printf_format_string):

```genie
init
    name:string = "Genie"
    print( "My name is %s", name )
    print( "My name is %s and everyone calls me %s", name, name )
```

String templates use the `@` prefix before the string and string
interpolation uses the `$` prefix:

```genie
init
    name:string = "Genie"
    print( @"My name is $name" )
```

String templates can be over multiple lines and evaluate expressions:

```genie
init
    name:string = "Genie"
    print( @"My name is $name
You can call me $name
Two plus two is $(2 + 2)
The current date and time is: $( new DateTime.now_local() )" )
```

String templates rely on the type having a `to_string()` method. So in the
example above, the result of `2 + 2` returns an `int` and `int` has a
`to_string()` method. The same for the `DateTime` object.

### Numbers

#### Whole Numbers

Whole numbers are represented by the integer type:

```genie
a:int = 1
```

This should cover most use cases when starting with Genie, but you can also
set the width of the integer and make it unsigned:

```genie
init
    a:int = 1
    b:int8 = 2
    c:int16 = 3
    d:int32 = 4
    e:int64 = 5
    print "%i, %i, %i, %i, %lli", a, b, c, d, e

    f:uint = 6
    g:uint8 = 7
    h:uint16 = 8
    i:uint32 = 9
    j:uint64 = 10
    print "%u, %u, %u, %u, %llu", f, g, h, i, j
```

#### Real Numbers

Real numbers are represented by the double-precision floating point number
type:

```genie
a:double = 0.5
```

This is C implementation specific, but will usually be IEEE 754
double-precision floating-point format.

### Booleans

A boolean stores either `true` or `false`:

```genie
a:bool = true
```

### Enumerations and Flags

The following code example defines an `enum` type. This is an enumerable
sequence of values starting from zero. In this example `FIRST_VALUE` has the
value 0 and `SECOND_VALUE` has the value 1:

```genie
enum MyEnum
    FIRST_VALUE
    SECOND_VALUE
```

It is possible to give a specific integer value to any entity in an enum:

```genie
enum MyEnum
    FIRST_VALUE = 1
    THIRD_VALUE = 3
```

An enum value is referred to by its type and identifier, e.g.
`MyEnum.FIRST_VALUE`.

The `[Flags]` attribute marks an enum as a set of binary digits (bits). In
this example `Colors.RED` is 1 (001 in binary), `Colors.GREEN` is 2 (010) and
`Colors.BLUE` is 4 (100). `Colors.YELLOW` is 3 (011), a combination of `RED`
and `GREEN`:

```genie
[Flags]
enum Colors
    RED
    GREEN
    BLUE
    YELLOW = RED | GREEN
    MAGENTA = RED | BLUE
    CYAN = GREEN | BLUE
```

### Dates and Times

Handling dates and times is a complex area. This sub-section focuses on
day-to-day use of dates and times on Earth. GLib provides classes for
handling dates and times. See:

- [GLib.DateTime](https://valadoc.org/glib-2.0/GLib.DateTime)
- [GLib.Date](https://valadoc.org/glib-2.0/GLib.Date)

#### Monotonic Time

Monotonic time is a timer provided by your system. GLib gives cross-platform
access to a monotonic timer running at microsecond resolution. A monotonic
timer is useful for timing the duration of an event. An example in Genie:

```genie
init
    Intl.setlocale()
    var start = get_monotonic_time()
    Thread.usleep( 1000000 )
    var stop = get_monotonic_time()
    print( "| %20s | %20s | %20s |", "Start (µs)", "Stop (µs)", "Duration (seconds)" )
    print( "|---------------------+---------------------+----------------------|" )
    print( "|%20lld |%20lld | %20.6f |", start, stop, ((double)(stop - start)/1000000) )
```

`Intl.setlocale()` is needed to print the Unicode character for micro, `µ`,
in the table header.

The example uses another GLib function, `Thread.usleep()`, to pause the
current program for a second (one million microseconds). A reading is taken
of the monotonic time before and after the sleep call. The results are then
printed in a table with the elapsed time in seconds.

## Operators

```genie
/* assignment */
a = 2

/* arithmetic */
a = 2+2         // 4
a = 2-2         // 0
a = 2/2         // 1
a = 2*2         // 4
a = 2%2         // 0

a++     // equivalent to a = a + 1
a--     // equivalent to a = a - 1
a += 2  // equivalent to a = a + 2
a -= 2
a /= 2
a *= 2
a %= 2

/* relational */
a > b
a < b
a >= b
a <= b
a is not b // not equal, eg: if a is not 2 do print "a is not 2"
a is b     // equality, eg:  if a is 2 do print "a is 2"

/* logical */
a and b
a or b
not (b)

if (a > 2) and (b < 2)
    print "a is greater than 2 and b is less than 2"

/* bitwise operators (same as C syntax) */
|, ^, &, ~, |=, &=, ^=

/* bit shifting */
<<=, >>=

/* Object related */
obj isa Class
```

## Control Flow Statements

Local control flow statements can be a block or a single line. Single line
control flow statements must use the `do` keyword between the condition and
the statements to be executed. Genie also provides non-local control flow
with an event based model using the `async` modifier and `yield` statement.
Event based control flow is covered later in the section about concurrency.

`if`, `while` and `for` may be controlled with the keywords `break` and
`continue`. A `break` instruction will cause the loop to immediately
terminate, while `continue` will jump straight to the next part of the
iteration.

### Conditional Execution with `if`

```genie
if a > 0
    print "a is greater than 0"
else if a is 0
    print "a is equal to 0"
else
    print "a is less than 0"
```

executes a particular piece of code based on a set of conditions. The first
condition to match decides which code will execute; if `a` is greater than 0
it will not be tested whether it is less than 0. Any number of `else if`
blocks is allowed, and zero or one `else` blocks.

```genie
if a > 0 do print "a is greater than 0"
```

### `case ... when`

```genie
case a
    when 0,1,2
        print "a is less than 3"
    when 3
        print "a is 3"
    default
        print "a is greater than 3"
```

A `case...when` statement runs a section of code based on the value passed to
it. In Genie (unlike C) there is no fall-through between cases; as soon as a
match is found no more will be checked.

Genie `case...when` statements work with string variables, too:

```genie
var s = "winter"
case s
    when "winter"
        print "its cold"
    when "summer"
        print "its warm"
    default
        print "its warm and cold"
```

### Conditional Loops with `while`

```genie
while a > b
    a--
```

```genie
while a > b do a--
```

will decrement `a` repeatedly, checking before each iteration that `a` is
greater than `b`.

```genie
count:int = 1
do
    print "%i", count
    count++
while count <= 10
```

will always print at least one value of `count`.

### Collection Iteration with `for`

```genie
for s in args do print s
```

will print out each element in the `args` string array or another iterable
collection. The meaning of iterable will be described later.

Genie can also generate number sequences with the `to` and `downto`
keywords:

```genie
for var i = 1 to 10
    print "i is %d", i
```

will initialize `i` to 1 and then call the `print` statement repeatedly
whilst incrementing `i` until it reaches a value of 10.

## Scope of Identifiers

### Block Level Scope

Genie uses meaningful whitespace to show blocks of code. This makes it easy
to identify a block of code. When an identifier is declared it can only be
accessed in the block of code it is declared in. Attempting to access the
identifier outside of that block will result in an error from the Vala
compiler.

A variable is an identifier that identifies an instance of a data type. A
variable is declared with its label, a colon and its data type, e.g.
`a:string` or `b:int`. It is good practise to also initialize the variable by
assigning a value to the variable at the same time, e.g.
`a:string = "example string"` or `b:int = 0`. This avoids an error if you
try to read an uninitialized variable.

An advantage of having an identifier only accessible in the block it is
declared is that the identifier can be re-used without a name clash. For
example:

```genie
init
    if true
        a:string = "test"
        print a
    if true
        a:string = "another"
        print a
```

### Global Scope

Identifiers that are available in all blocks of the program, the global
scope, should generally be avoided because they make it hard to test code.
Writeable global identifiers introduce uncertainty into the program because
it becomes unclear where the values are altered.

### Namespaces

```genie
namespace MyNameSpace
   // blah...
```

Everything within the indent of this statement is in the namespace
`MyNameSpace` and must be referenced as such. Any code outside this namespace
must either use qualified names for anything within the namespace, or be in
a file with an appropriate `uses` declaration.

Namespaces can be nested, either by nesting one declaration inside another,
or by giving a name of the form `NameSpace1.NameSpace2`.

To use a namespace, use the `uses` statement:

```genie
uses
    Gtk
```

### Access Modifiers

Identifiers within objects can be marked as private or public. A private
identifier is only accessible within the block scope of the object. A public
identifier can also be accessed within the block scope where the object was
created.

### Scope Based Resource Management

The `final` block of an object is called when the object goes out of scope.
This can be used to release any resources claimed by the object.

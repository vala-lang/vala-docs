# Types, functions, and errors

## Identifiers and Type

### Function Signatures (Delegates)

```genie
delegate DelegateType(a:int)
```

A delegate is a type of function pointer, allowing chunks of code to be
passed around like objects. The example above defines a delegate called
`DelegateType` which represents a function taking an `int` and not returning
a value. Any function with such a signature may be used as a delegate as
shown in the following sample:

```genie
[indent=4]

delegate DelegateType (a : int) : bool

def f1 (a:int) : bool
    print "testing delegate value %d", a
    return true

def f2 (d:DelegateType, a:int)
    var c = d (a)

init
    f2 (f1, 5)
```

This code will execute the function `f2`, passing in a pointer to function
`f1` and the number 5. `f2` will then execute the function `f1`, passing it
the number.

Delegates may also be created locally. A member method can also be assigned
to a delegate:

```genie
class Test : Object
    data : int = 5
    def method (a:int)
        print "%d %d", a, data

delegate DelegateType (a : int)

init
    var t = new Test()
    d : DelegateType = t.method
    d(1)
```

Using a delegate within a class is quite similar to its usage in a namespace.
It is important, however, to utilize the constructor to avoid
`assertion self != null failed` run-time errors:

```genie
class Test:Object
    delegate DelegateType (a : int)
    data : int = 5
    d : DelegateType

    construct()
        self.d = method

    def method( b:int )
        print "%d %d", b, data

    def run ( c:int )
        d( c )

init
    var t = new Test()
    t.run( 1 )
```

### Classes

Classes allow new data types to be defined. When a class is instantiated it
is called an object. Classes are covered in detail in the [Objects](#objects)
section below.

### Interfaces

A class in Genie may implement any number of interfaces. Each interface is a
type, much like a class, but one that cannot be instantiated. By implementing
one or more interfaces, a class may declare that its instances are also
instances of the interface, and therefore may be used in any situation where
an instance of that interface is expected.

```genie
interface Test
    prop abstract data:int

    def abstract fn ()
```

A possible implementation of this interface is:

```genie
init
    var f = new Foo()
    f.fn()

interface Test
    prop abstract data:int

    def abstract fn()

class Foo:Object implements Test
    prop data:int

    def fn()
        print "fn"
```

Interfaces in Genie may also inherit from other interfaces:

```genie
interface List : Collection
```

A class wishing to implement `List` must also describe all implemented
interfaces:

```genie
class ListCLass : Object implements Collection, List
```

### Type Inference

Genie has a mechanism called Type Inference, whereby a local variable may be
defined using `var` instead of giving a type, so long as it is unambiguous
what type is meant:

```genie
var i = 3

var
    a = "happy"
    b = "sad"
    c = "ambivalent"

for var I = 1 to 10
    print "looping"
```

`var` can be used for type inferencing in both single lines and blocks as
well as for statement initializers.

### Parameters of Type (Generics)

Genie includes a runtime generics system, by which a particular instance of
a class can be restricted with a particular type or set of types chosen at
construction time:

```genie
[indent=4]
init
    var string_wrapper = new Wrapper of string
    string_wrapper.set_data ("Hello World")
    var s = string_wrapper.get_data ()
    print s

    var int_wrapper = new Wrapper of int
    int_wrapper.set_data (6)
    var data = int_wrapper.get_data ()
    print "test int is  %d", data

    var test_wrapper = new Wrapper of TestClass
    var test = new TestClass
    test.accept_object_wrapper (test_wrapper)

class Wrapper of G : Object
    _data : G

    def set_data (data : G)
        _data = data

    def get_data () : G
        return _data

class TestClass : Object

    def accept_object_wrapper (w : Wrapper of Object)
        print "accepted object"
```

In Genie, generics are handled while the program is running. When you define
a class that can be restricted by a type, there still exists only one class,
with each instance customised individually. This is in contrast to C++ which
creates a new class for each type restriction required - Genie's system is
similar to the one used by Java.

## Functions

### Defining a Named Function

A block of Genie code can be labelled with an identifier. The identifier can
then be used to call the block at other points in the program without
needing to copy the original code. In Genie a function definition starts
with the `def` keyword, followed by some optional function definition
modifiers, and then the identifier:

```genie
def example_function()
    print( "example_function has been called" )
```

To call a function from another part of your program, place parentheses
`()` after the function identifier:

```genie
init
    example_function()

def example_function()
    print( "example_function has been called" )
```

This example will output:

```
example_function has been called
```

A function can also be assigned to a variable. Genie is a strongly typed
language and a type must be given to the variable. Types for functions are
declared with the `delegate` keyword:

```genie
delegate FunctionExample()
```

In the following example the `FunctionExample` type is used to declare the
`call_me` variable. First the `example_function` is assigned to `call_me`.
Note that `example_function` does not have parentheses after it; this means
it is not the result of the function itself that is assigned to the
variable, but the identifier of the function:

```genie
init
    example_function()
    call_me:FunctionExample = example_function
    call_me()
    call_me = example_procedure
    call_me()

delegate FunctionExample()

def example_function()
    print( "example_function called" )

def example_procedure()
    print( "example_procedure called" )
```

### Parameters

A function in Genie is passed zero or more parameters. The default behaviour
when a function is called is as follows:

- Any value type parameters are copied to a location local to the function as
  it executes.
- Any reference type parameters are not copied, instead just a reference to
  them is passed to the function.

This behaviour can be changed with the modifiers `ref` and `out`.

- `out` from the caller side: you may pass an uninitialized variable to the
  method and you may expect it to be initialized after the method returns.
- `out` from the callee side: the parameter is considered uninitialized and
  you have to initialize it.
- `ref` from the caller side: the variable you're passing to the method has
  to be initialized and it may or may not be changed by the method.
- `ref` from the callee side: the parameter is considered initialized and
  you may change it or not.

Here's an example:

```genie
[indent=4]
init
    var
        a = 1
        b = 2
        c = 3

    Foo.bar (a, out b,  ref c)

    print "a=%d, b=%d, c=%d", a,b,c

class Foo : Object

    def static bar (a:int, out b: int, ref c: int)
        a = 10
        b = 20
        c = 30
```

The treatment of each variable will be:

- `a` is of a value type. The value will be copied into a new memory location
  local to the function, and so changes to it will not be visible to the
  caller.
- `b` is also of a value type, but passed as an `out` parameter. In this
  case, the value is not copied, instead a pointer to the data is passed to
  the function, and so any change to the function parameter will be visible
  to the calling code.
- `c` is treated in the same way as `b`, the only change is in the signalled
  intent of the function.

## `try...except` Blocks

GLib has a system for managing runtime exceptions called `GError`. Genie
translates this into a form familiar to modern programming languages, but its
implementation means it is not quite the same as in Java or C#. It is
important to consider when to use this type of error handling: `GError` is
specifically designed to deal with recoverable runtime errors that are not
known until the program runs on a live system. You should not use `GError`
for problems that can be foreseen, such as reporting that an invalid value
has been passed to a function.

Using exceptions is a matter of:

1. Declaring that a function may raise an error:

   ```genie
   def fn (s:string) raises IOError
   ```

2. Throwing the error when appropriate:

   ```genie
   if not check_file (s)
       raise new IOError.FILE_NOT_FOUND ("Requested file could not be found.")
   ```

3. Catching the error from the calling code:

   ```genie
   try
       fn("home/jamie/test")
   except ex : IOError
       print "Error: %s", ex.message
   ```

Errors have three components: "domain", "code" and "message". Error domains
describe the type of problem, and equate to a subclass of `Exception` in
Java. The third part, the error code, is a refinement describing the exact
variety of problem encountered.

The way to define this information about error types is related to the
implementation in GLib. In order for the examples here to work, a definition
is needed such as:

```genie
exception IOError
    FILE_NOT_FOUND
    FILE_NO_READ_PERMISSION
    FILE_IS_LOCKED
```

A `finally` block can be placed after `try` and any `except` blocks to be run
always at the end of the section, regardless of whether an error was thrown
or any handlers were executed:

```genie
[indent=4]

exception ErrorType1
    CODE_1A

exception ErrorType2
    CODE_2A

init
    try
        Test.catcher ()
    except ex:ErrorType1
        print ex.message + " was caught"

class Test:Object

    def static thrower () raises ErrorType1, ErrorType2
        raise new ErrorType2.CODE_2A( "Error CODE 2A was raised" )

    def static catcher () raises ErrorType1
        try
            thrower ()
        except ex:ErrorType2
            print ex.message
        finally
            print "all exceptions handled"
```

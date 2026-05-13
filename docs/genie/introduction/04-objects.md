# Objects

Genie is an object-oriented language, although it is quite possible to write
code without objects. In most cases you will want to use objects to build
your application as they have a number of benefits.

Objects may contain fields, properties, methods and events, all of which can
be made publicly available to other code or can be private and internal to
the object. An object's class can also inherit from another class.

All members of an object are publicly accessible, unless they are defined in
the class with an identifier starting with an underscore or use the
`private` keyword modifier.

An object is instantiated using the `new` operator before the object's
class:

```genie
init
    var foo = new Foo()
```

## Fields

Fields are variables declared in the scope of the class.

## Constructors

A `construct` block is used to define a creation method at construction time
when an object is being instantiated via the `new` operator. A class can
have many creation methods with either different names or different
parameters:

```genie
[indent=4]

init
    /* different creation methods can be specified */
    var foobar = new Foo( 10 )

    /* this creation method is the same as above but is named differently */
    var foobar2 = new Foo.with_bar( 10 )

class Foo:Object

    construct( b:int )
        a = b

    construct with_bar( bar:int )
        a = bar

    prop a:int

    init
        print "foo is initialized"

    final
        print "foo is being destroyed"
```

An `init` block is used to write code that pertains to the initialization of
the class - only one of these may be present in any class declaration. An
`init` block declared outside of a class is equivalent to a `main` function
in C and is used to perform initialization of the entire application. `init`
blocks do not have any parameters.

## Destructors

A `final` block is used to perform any finalization of the class when an
object instance is destroyed. Final blocks do not take parameters.

## Properties

Genie classes can also have properties which are identical to GObject
properties.

Within a class, properties can be defined in various ways:

```genie
class Foo:Object

    prop name:string

    prop readonly count:int

    [Description(nick="output property", blurb="This is the output property of the Foo class")]
    prop output:string
        get
            return "output"
        set
            _name = value
```

In the simplest case, the `name` property is declared without any get/set
methods so Genie automatically creates a private field called `_name` (it
always generates a field with the same name as the property but with an
underscore prepended) and performs automatic get/set operations for you.

Properties that can only be read and never written must use the `readonly`
keyword as in the `count` property above.

In order to use these properties, refer to them in the same way as public
members of the class:

```genie
var t = new T()
t.name = "my name"
```

## Methods

Methods are actions on an object.

Methods always start with the keyword `def` followed by optional modifiers
(`private`, `abstract`, `inline`, `extern`, `virtual`, `override`), the name
of the method, a list of method parameters (if any) and lastly, if it
returns a value, the type of the return value.

Here's an example:

```genie
[indent=4]

init
    var f = new Foo ()
    print f.bar ("World")

class Foo

    def static bar( name:string):string
        return "Hello " + name
```

The above defines a method called `bar` which takes a string parameter
called `name` and returns a string.

All methods, properties and events can also take modifiers to define further
options. Modifiers are always placed between the `def` keyword and the
method name:

- **private** - indicates that this method/property/event is not accessible
  from outside the defining class. It is not necessary to include this
  modifier if its name starts with an underscore.
- **extern** - indicates that this method is defined outside of Genie/Vala
  sources and is often implemented in C.
- **inline** - hints to the compiler that it should inline this method to
  improve performance. This is useful for very small methods.
- **static** - indicates a method that can be run without needing an instance
  of the class. Static methods never change the state or properties of a
  class instance.

## Events (Signals)

An event is similar to a method, but allows for multiple methods or functions
to be called from a single source. It is an example of the
[observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) and uses
[GObject's signals](https://docs.gtk.org/gobject/concepts.html#signals) for
its underlying implementation.

The `event` keyword defines a member of a class as an event source and
appears similar to a method with no body. Event handlers can then be added
to the event using the `connect()` method:

```genie
init
    var a = new Test()
    a.test_event.connect( first_handler )
    a.test_event.connect( second_handler )
    a.test_event()

class Test
    event test_event()

def first_handler()
    print( "first_handler called" )

def second_handler()
    print( "second_handler called" )
```

We emit the event by calling it like a method on the class.

Events in Genie are the same as signals in Vala and are commonly used in the
GTK graphical toolkit.

## Sub-Typing

Sub-typing in Genie is pretty much the same as in other OO languages.
Multiple inheritance is not supported and so a class in Genie can only
descend directly from one other class, although its super-type can descend
from another class. A class can also implement many interfaces.

- **abstract** - indicates that the method body is not defined in the current
  class but any subclass must implement this method. Useful when defining
  interfaces.
- **virtual** - indicates that this method may be overridden in subclasses.
- **override** - indicates to override the super class virtual method of the
  same name and replace it with the new definition. If no method with the
  `virtual` modifier exists in the superclass then the compiler will signal
  an error.

## Inheriting from `Object`

A simple example:

```genie
class Foo:Object

    /* property declaration */
    prop p1:int

    /* method declaration */
    def bar( name:string )
        print "hello %s p1 is %d", name, p1

    /* method with return value */
    def bar2():string
        return "bar2 method was called"
```

The above example shows that class `Foo` is a subclass of `Object`, which
means it inherits all the features of GLib's GObject such as interfaces and
events.

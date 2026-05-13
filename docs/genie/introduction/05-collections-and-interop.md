# Collections and C interoperability

## Special Operators

You can check if an object is of a given `Object` type by using the `isa`
operator:

```genie
init
    var o = new list of string
    if o isa Object
        print "a list of string is an object"
    if o isa list of Object
        print "a list of string is a list of Object"
    if o isa Gee.Iterable
        print "a list of string implements Iterable"
```

## Collections

Genie has a number of collection types built in, including arrays, lists and
dicts.

Gee provides the support for `list` and `dict` types in Genie, so if you make
use of these you will need to have libgee installed (as will anyone who wants
to run your compiled programs). If you don't make use of lists and dicts then
you do not need this library.

### GLib's GenericArray

[`GenericArray`](https://valadoc.org/glib-2.0/GLib.GenericArray) is a binding
to GLib's `GPtrArray` (Pointer Arrays). It works well with reference types.
Note that the `data` field of `GenericArray` is used to get access to the
underlying array:

```genie
init
    var collection = new GenericArray of Example()
    collection.add( new Example( "First" ))
    collection.add( new Example( "Second" ))
    for item in collection.data
        item.show()

class Example
    _value:string = ""

    construct( value:string )
        _value = value

    def show()
        print( _value )
```

Basic types like `int` and `double` will need to be made into reference
types by "boxing". This means adding a `?` to the type, for example `int?`:

```genie
init
    var collection = new GenericArray of int?()
    collection.add( 1 )
    collection.add( 2 )
    for item in collection.data
        print( "%i", item )
```

### GLib's HashTable

GLib's [`HashTable`](https://valadoc.org/glib-2.0/GLib.HashTable) maps to
D-Bus's dictionary type. So it is useful for writing D-Bus code in Genie. A
D-Bus dictionary of type `a{sv}` would be created in Genie as:

```genie
new HashTable of (string,Variant)(str_hash, str_equal)
```

This has a string as a key and a `GVariant` as a value. The `HashTable`
needs to be supplied with a hashing function and equality comparison
function for the key's data type.

### Lists (Gee's ArrayList)

Lists are ordered collections of items, accessible by numeric index. They
can grow and shrink automatically as items are added/removed.

```genie
var l = new list of string
```

The above creates a string list but as with generics all other types are
supported too. Elements in a list can be accessed and changed just like an
array. As lists are also iterables `for..in` can be used to iterate over
them too:

```genie
[indent=4]

init
    /* test lists */
    var l = new list of string

    l.add ("Genie")
    l.add ("Rocks")
    l.add ("The")
    l.add ("World")

    for s in l
        print s

    print " "

    l[2] = "My"

    for s in l
        print s
```

### Dicts (Gee's HashMap)

Dicts (also known as dictionaries) are an unordered collection of items
accessible by index of arbitrary type. They can be used as lookup tables
and to quickly map values of one type to values of the same or another type.

Dicts typically consist of key/value pairs and when creating a new one you
need to specify the key and value types:

```genie
var d = new dict of string,string
```

Dicts, like lists, can be accessed by key index and their keys and values
can also be iterated over using the standard `for..in` statement:

```genie
[indent=4]

init
    /* test dicts */
    var d = new dict of string,string

    /* add or change entries with following */
    d["Genie"] = "Great"
    d["Vala"] = "Rocks"

    /* access entries using d[key] */
    for var s in d.keys
        print "%s => %s", s, d[s]
```

### Iterators

A `for` loop can be used to iterate over a class's collection by adding
`get()` and `next()` methods to the class.

### Searches

The `in` operator can be used to search if an item is in a class's
collection by adding a `contains()` method to the class.

## Interfacing with a C Library

### Nullable Types

By default, Genie will make sure that all references point to actual
objects. This means that you can't arbitrarily assign `null` to a variable.
If it is allowable for a reference to be null you should declare the type
with a `?` modifier. This allows you to assert which types may be null, and
so hopefully avoid related errors in your code.

This modifier can be placed both on parameter types and return types of
functions:

```genie
/* allows null to be passed as param and allows null to be returned */
def fn_allow_nulls (param : string?) : string?
        return param

/* attempting to pass null as param will lead to that function aborting */
def fn_no_null (param : string) : string
        return param
```

These checks are performed at run time. For release versions of a program,
when the code is fully debugged, the checks can be disabled. See the `valac`
documentation for how to do this.

### Arrays

An array is an ordered collection of items of a fixed size. You cannot
change the size of an array so additional elements cannot be added or
removed (although existing elements can have their value changed).

An array is created by using `array of type name` followed by the fixed
size of the array, e.g. `var a = new array of int[10]` to create an array of
10 integers. The length of such an array can be obtained by the `length`
member variable, e.g. `var count = a.length`.

Arrays can take initializers too, in which case there is no need to specify
a length:

```genie
tokens : array of string = {"This", "Is", "Genie"}
```

Arrays can be constant too:

```genie
const int_array : array of int = {1, 2, 3}
```

Individual elements in an array can be accessed by their position index.
They can also be iterated over using the standard `for..in` statement:

```genie
[indent=4]
const int_array : array of int = {1, 2, 3}

init
    tokens : array of string = {"This", "Is", "Genie"}
    var sa = new array of string[3]

    var i = 0
    for s in tokens
        print s
        sa[i] = s
        i++

    sa[2] = "Cool"

    for s in sa
        print s

    for i in int_array
        print "number %d", i
```

### Structs

A struct type is a compound value type. A Genie struct may have methods in a
limited way and may also have private data.

```genie
struct StructName
    a : string
    i : int
```

The example struct `StructName` can be initialized as follows:

```genie
var mystruct = StructName()
var mystruct = StructName() {"mystring", 1}
var mystruct = StructName() {
    a = "mystring",
    i = 1
}
```

### Callbacks

A Genie function can be passed as a callback to a library function. The
identifier of the Genie callback function needs to be passed as an argument
to the library function:

```genie
init
    CLibrary.library_function( my_callback )

def my_callback( example:string )
    print example
```

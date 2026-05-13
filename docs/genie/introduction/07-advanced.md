# Advanced topics


An attribute is metadata that specifies alternative handling of the source
below it.

Attributes may be used to:

- Change indentation from tabs to spaces
- Modify the generated C code (`CCode`)
- Specify a variant type of structs (`SimpleType`, `FloatingType`, etc.)
- Provide a description of an object

Attributes are placed in square brackets `[]` immediately before the symbol
they modify. Multiple attributes applying to the same symbol can be separated
by a comma:

```genie
[CCode (cname="dbCallbackStruct", cprefix="Foo__"), Compact]
class Callback
```

With exception of the `indent` attribute, all attributes only apply to the
following symbol and its children.

For a complete and current list of available attributes, see the
[Vala Reference Manual - Attributes](https://gnome.pages.gitlab.gnome.org/vala/manual/attributes.html).

## Advanced Memory Management

There are broadly two types of data in Genie: reference types and value
types. These names describe how instances of the types are passed around the
system - a value type is copied whenever it is assigned to a new
identifier, a reference type is not copied, instead the new identifier is
simply a new reference to the same object.

Genie's value types are the basic simple data types, and the compound type
`struct`. The simple types are:

- `char`, `uchar`
- `int`, `uint`
- `float`, `double`
- `bool` (boolean)
- `unichar` (Unicode character)
- `string`

The reference types are all types declared as a class, regardless of whether
they are descended from GLib's `Object`. Genie will ensure that when you pass
an object by reference the system will keep track of the number of
references currently alive in order to manage memory for you.

### Weak References

Genie's memory management is based on automatic reference counting. Each
time an object is assigned to a variable its internal reference count is
increased by 1; each time a variable referencing an object goes out of scope
its internal reference count is decreased by 1. If the reference count
reaches 0 the object will be freed.

However, it is possible to form a reference cycle with your data structures.
For example, with a tree data structure where a child node holds a reference
to its parent and vice versa, or a doubly-linked list where each element
holds a reference to its predecessor and the predecessor holds a reference
to its successor.

In these cases objects could keep themselves alive simply by referencing
each other, even though they should be freed. To break such a reference
cycle you can use the `weak` modifier for one of the references:

```genie
class Node : Object
    prev : weak Node
    next : Node
```

This topic is explained in detail on the
[Memory Management](../../developer-guides/memory-management.md) page.

### Unowned References

Normally when creating an object in Genie you are returned a reference to
it. Specifically this means that as well as being passed a pointer to the
object in memory, it is also recorded in the object itself that this pointer
exists. Similarly, whenever another reference to the object is created, this
is also recorded.

Unowned References conversely are not recorded in the object they reference.
This allows the object to be removed when it logically should be, regardless
of the fact that there might still be references to it. The usual way to
achieve this is with a function defined to return an unowned reference:

```genie
class Test
    o : Object
    def get_unowned_ref () : unowned Object
        o = new Object()
        return o
```

When calling this function, in order to collect a reference to the returned
object, you must expect to receive an unowned reference:

```genie
o : unowned Object = get_unowned_ref()
```

### Ownership Transfer

The keyword `(owned)`, like in Vala, is used to transfer ownership.

As a prefix of a parameter (or property) type it means that ownership of the
object is transferred. As an operator, it can be used to avoid copies of
non-reference counting classes:

```genie
var s = "hello"

/* s will be null when ownership is transferred */
t : string = (owned) s

print t
print s
```

This means that `s` will be set to `null` and `t` inherits the
reference/ownership of `s`.

### Pointers

Pointers are Genie's way of allowing manual memory management. Normally when
you create an instance of a type you receive a reference to it, and Genie
will take care of destroying the instance when there are no more references
left to it. By requesting a pointer to an instance instead, you take
responsibility for destroying the instance when it is no longer wanted, and
therefore get greater control over how much memory is used.

In order to create an instance of a type and receive a pointer to it, you
must add the `*` suffix to the type declaration:

```genie
o : Object* = new Object
```

In order to access members of that instance:

```genie
o->function_1
o->data_1
```

In order to free the memory pointed to:

```genie
delete o
```

## Using Genie and Vala Together

Since Genie and Vala share the same compiler, it is very easy to use them
together in a single project.

Here is a quick example:

```vala
// Vala: test_vg.vala
public class TestVala {
    public void vala_print (string str) {
        stdout.printf ("%s", str);
    }
}

void main () {
    test ("Hello vala+genie");

    var test_class = new TestGenie ();

    test_class.vala_print ("call to inherited parent member from Vala\n");
    test_class.genie_print ("call to member from Genie\n");
}
```

```genie
[indent=4]
// Genie: test_gv.gs
def test (str : string)
    print "%s", str

class TestGenie : TestVala
    def genie_print(str : string)
        stdout.printf("GENIE: ")
        vala_print(str)
```

Compile with:

```shell
$ valac -o test_vala-genie test_vg.vala test_gv.gs
```

Notes:

- File names must differ, even if they are in different paths.

## More Resources

- [Developing Genie](../developing-genie.md) - useful starting point if you want to
  improve the Genie scanner and parser, includes communication channels for
  developers and a detailed guide on downloading and compiling the Vala
  source code.
- [Tutorials, Blogs and Code Examples](../resources.md) - a page listing links
  to numerous tutorials, articles, blogs, code examples and projects.
- [Valadoc.org](https://valadoc.org) - comprehensive documentation on
  bindings to C libraries, useful starting point for coding any project.
- [Vala mailing list](https://mail.gnome.org/mailman/listinfo/vala-list) -
  where Genie questions can be asked too.

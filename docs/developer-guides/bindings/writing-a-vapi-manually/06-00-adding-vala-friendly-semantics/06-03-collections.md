# 6.3. Collections

Vala has several standard method names that are designed to work with
Vala syntaxes like `foreach`.

The `get ()` method is used by Vala to implement the square bracket
indexing syntax. For example a `list` instance with a `get` method that
returns a list item, `list.get (index)`, can also be written
`list [index]`.

In the next example the C function signature returns an item in the
collection:

```c
blkid_partition
blkid_partlist_get_partition (blkid_partlist ls,
                              int n);
```

This could be bound in the VAPI as:

```vala
[Compact]
[CCode (cname = "blkid_partlist")]
public class ListOfPartitions {
    [CCode (cname = "blkid_partlist_get_partition")]
    public unowned Partition get (int index);
}
```

Note that `[CCode (cname = "blkid_partlist_get_partition")]` is used to
change the Vala method name `get` to the name required in C. The binding
can then be used in Vala code to get an item in the collection:

```vala
var partition = partitions [count];
```

`set` is the Vala method to replace an item in the collection. `set`
must return `void`.

Both the index methods, `get` and `set`, can take as many parameters as
the C function allowing for multi-dimensional indexes to be bound. With
`set` in Vala the final parameter must be the new value.

By binding a `size` property in Vala to a function that returns the size
of the collection in C then Vala's `foreach` keyword can be used with
the collection. The `get` index method is also required. The following
example continues with the !PartitionList example above. The C function
signature to get the size of the list is:

```c
int
blkid_partlist_numof_partitions (blkid_partlist ls);
```

This is bound as:

```vala
[Compact]
[CCode (cname = "blkid_partlist")]
public class ListOfPartitions {
    [CCode (cname = "blkid_partlist_get_partition")]
    public unowned Partition get (int index);
    public int size { [CCode (cname = "blkid_partlist_numof_partitions")] get; }
}
```

Note that the CCode `cname` translation is inside the body of the
property.

The binding can now be used in Vala code with `foreach`:

```vala
foreach (var partition in partitions) { /* do something with the partition */ }
```

If the collection is unowned then Vala will give an error:
`duplicating ListOfPartitions instance, use unowned variable or explicitly invoke copy method`.
See [Bug 661876](https://bugzilla.gnome.org/show_bug.cgi?id=661876).

For an unowned collection a `for` loop will still work:

```vala
for (int count = 0; count < partitions.size; count++) {
    var partition = partitions [count];
    /* do something with the partition */
}
```

For container-like instances, Vala provides syntactic sugar to convert
certain operations into method calls:

```vala
x in a // → a.contains (x)
a[x, y] // → a.get (x, y)
a[x, y] = z // → a.set (x, y, z);
foreach (var x in a) { /* … */ } // → var x; var i = a.iterator (); while ((x = i.next_value ()) != null) { /* … */ }
foreach (var x in a) { /* … */ } // → var i = a.iterator (); while (i.next ()) { var x = i.get (); /* … */ }
```

If appropriate, providing methods that match these prototypes will allow
use of the sugar.

`contains` must return `bool`.

Iterators require an intermediate object to be the holder of the
iteration state. That class must implement a next_value function that
returns the next value or null if iteration is to stop or it may have a
next method with signature `bool next ()` that moves to the next element
and returns true if there is one and a method `T get ()` to retrieve the
current value of the iterator. It is rare for a C program to have the
interface needed to do this.

Use your best judgement in deciding whether or not to use these
conventions. This is modifying the interface, but it does tend to make
the resulting interface easier to use.

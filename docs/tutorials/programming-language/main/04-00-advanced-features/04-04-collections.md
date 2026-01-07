# 4.4. Collections

[Gee](https://wiki.gnome.org/Projects/Libgee) is a library of collection
classes, written in Vala. The classes should all be familiar to users of
libraries such as Java's Foundation Classes. Gee consists of a set of
interfaces and various types that implement these in different ways.

If you want to use Gee in your own application, install the library
separately on your system. Gee can be obtained from
[http://wiki.gnome.org/Projects/Libgee](http://wiki.gnome.org/Projects/Libgee). 
In order to use the library you must compile your programs with `--pkg gee-0.8`.

The fundamental types of collection are:

-   Lists: Ordered collections of items, accessible by numeric index.
-   Sets: Unordered collections of distinct.
-   Maps: Unordered collection of items, accessible by index of
    arbitrary type.

All the lists and sets in the library implement the *Collection*
interface, and all maps the *Map* interface. Lists also implement *List*
and sets *Set*. These common interfaces means not only that all
collections of a similar type can be used interchangeably, but also that
new collections can be written using the same interfaces, and therefore
used with existing code.

Also common to every *Collection* type is the *Iterable* interface. This
means that any object in this category can be iterated through using a
standard set of methods, or directly in Vala using the `foreach` syntax.

All classes and interfaces use the generics system. This means that they
must be instantiated with a particular type or set of types that they
will contain. The system will ensure that only the intended types can be
put into the collections, and that when objects are retrieved they are
returned as the correct type.

[Gee API documentation](http://valadoc.org/gee-0.8/index.htm),
[Gee Examples](../../../../developer-guides/gee-samples).

Some important Gee classes are:

## 4.4.1. ArrayList\<G\>

Implementing: Iterable\<G\>, Collection\<G\>, List\<G\>

An ordered list of items of type `G` backed by a dynamically resizing
array. This type is very fast for accessing data, but potentially slow
at inserting items anywhere other than at the end, or at inserting items
when the internal array is full.

## 4.4.2. HashMap\<K,V\>

Implementing: Iterable\<Entry\<K,V\>\>, Map\<K,V\>

A 1:1 map from elements of type `K` to elements of type `V`. The mapping
is made by computing a hash value for each key - this can be customised
by providing pointers to functions for hashing and testing equality of
keys in specific ways.

You can optionally pass custom hash and equal functions to the
constructor, for example:

```vala
var map = new Gee.HashMap<Foo, Object> (foo_hash, foo_equal);
```

For strings and integers the hash and equal functions are detected
automatically, objects are distinguished by their references by default.
You have to provide custom hash and equal functions only if you want to
override the default behaviour.

## 4.4.3. HashSet\<G\>

Implementing: Iterable\<G\>, Collection\<G\>, Set\<G\>

A set of elements of type `G`. Duplicates are detected by computing a
hash value for each key - this can be customised by providing pointers
to functions for hashing and testing equality of keys in specific ways.

## 4.4.4. Read-Only Views

You can get a read-only view of a collection via the *read_only_view*
property, e.g. `my_map.read_only_view`. This will return a wrapper that
has the same interface as its contained collection, but will not allow
any form of modification, or any access to the contained collection.

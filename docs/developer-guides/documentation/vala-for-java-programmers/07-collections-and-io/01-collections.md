# 7.1. Collections

Java: `java.util.*` package

Vala: `Gee` namespace, `--pkg gee-1.0`, [Libgee](https://wiki.gnome.org/Projects/Libgee)

See [Gee Examples](/sample-code/gee-samples), [Gee documentation](https://valadoc.org/gee-1.0/).

Vala allows array-like access for Gee collections (e.g. `my_map[key]` is equivalent to `my_map.get (key)`). Vala supports an `in` operator for collections: `x in my_collection` is equivalent to `my_collection.contains (x)`. This operator also works with strings, even though strings are not collections.

Please note that Libgee checks for errors like the bounds for the index key with an `assert`, and so it won't raise any catchable `RuntimeException` like Java does.

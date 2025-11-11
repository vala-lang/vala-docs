# Collections

C#: `System.Collections.Generic` namespace

Vala: `Gee` namespace, `--pkg gee-0.8`,
[Libgee](https://wiki.gnome.org/Projects/Libgee)

Rough equivalents:

_Classes_:

| System.Collections.Generic | Gee                       |
|----------------------------|---------------------------|
| Dictionary                 | HashMap                   |
| HashSet                    | HashSet                   |
| LinkedList                 | LinkedList                |
| List                       | ArrayList                 |
| Queue                      | LinkedList, PriorityQueue |
| SortedDictionary           | TreeMap                   |
| Stack                      | LinkedList                |

_Interfaces_:

| System.Collections.Generic | Gee                |
|----------------------------|--------------------|
| ICollection                | Collection         |
| IComparer                  | Comparable         |
| IDictionary                | Map                |
| IEnumerable                | Iterable           |
| IEnumerator                | Iterator           |
| IList                      | List, Queue, Deque |

See [Gee Examples](../../gee-samples)

You can access and assign Gee collection items via indexers (e.g.
`my_map[key]` is equivalent to `my_map.get (key)`). Vala supports an
`in` operator for collections: `x in my_collection` is equivalent to
`my_collection.contains (x)`. This operator also works with strings,
even though strings are not collections.

Please note that Libgee checks for errors like the bounds for the index
key with an `assert`, and so it won't raise any catchable
`SystemException` like in C#.

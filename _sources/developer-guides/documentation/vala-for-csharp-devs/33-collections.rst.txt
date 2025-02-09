Collections
===========

C#: ``System.Collections.Generic`` namespace

Vala: ``Gee`` namespace, ``--pkg gee-1.0``, `Libgee <https://wiki.gnome.org/Projects/Libgee>`_

Rough equivalents:

========================== ===
System.Collections.Generic Gee
========================== ===
`Classes`
Dictionary                 HashMap
HashSet                    HashSet
LinkedList                 LinkedList
List                       ArrayList
Queue                      LinkedList, PriorityQueue
SortedDictionary           TreeMap
Stack                      LinkedList
`Interfaces`
ICollection                Collection
IComparer                  Comparable
IDictionary                Map
IEnumerable                Iterable
IEnumerator                Iterator
IList                      List
                           Queue
                           Deque
========================== ===

See `Gee Examples <https://wiki.gnome.org/Projects/Vala/GeeSamples>`_

You can access and assign Gee collection items via indexers (e.g.
``my_map[key]`` is equivalent to ``my_map.get (key)``). Vala supports an ``in``
operator for collections: ``x in my_collection`` is equivalent to
``my_collection.contains (x)``. This operator also works with strings, even
though strings are not collections.

Please note that Libgee checks for errors like the bounds for the index key with
an ``assert``, and so it won't raise any catchable ``SystemException`` like in
C#.
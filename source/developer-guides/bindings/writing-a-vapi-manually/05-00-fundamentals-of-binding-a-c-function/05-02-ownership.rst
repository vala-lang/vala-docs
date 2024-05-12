
Ownership
=========

All parameters are, by default, unowned, unless marked with the ``owned`` keyword. All return values and ``ref`` and ``out`` parameters are, by default, owned, unless marked with the ``unowned`` keyword. The basic types mentioned above have no ownership since they may be copied at will.

It is often the case that a function will return one of its input values, particularly when filling a buffer. It is crucial that the ownership is correct. If not done correctly, Vala will acquire a second copy of the pointer that it thinks it has to free, and free the same chunk of memory twice, leaking to a bad time spent in Valgrind.

**If ownership semantics are not correct, either a memory leak has been written or a double-free has been written.** It is frequently the case that one needs to read the source to be absolutely sure that ownership semantics are correct.

Often C programmers will mark return values as const when they are unowned.

See also: :doc:`../10-00-awkward-situations/10-02-dependently-typed-ownership`.
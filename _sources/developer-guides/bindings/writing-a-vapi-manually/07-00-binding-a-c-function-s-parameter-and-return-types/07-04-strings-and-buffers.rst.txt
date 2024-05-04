Strings and Buffers
===================

In C, strings and buffers are generally treated like arrays, but Vala may require slightly more finesse. In Vala, a string is a null-terminated list of UTF-8 data that is immutable. If the use case is anything but that, an array of ``uint8`` is the prefered way of dealing with that data.

Frequently, functions take a buffer, fill it with a string and then return the buffer or null (e.g., ``realpath``\(3)). The buffer should be a ``uint8[]`` and the return value an ``unowned string?``, typically.

Again, check thoroughly for the ownership of strings being returned. Frequently, the caller does not free the string, especially if it is marked ``const``.

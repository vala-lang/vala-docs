Pointers in C (or what all these *'s mean)
==========================================

The asterisk, ``*``, is the indirection operator in C. Although, be aware it is also the multiplication operator. The indirection operator means an identifier contains a pointer to a memory location. Usually the data type held in the memory location is also indicated. For example ``int *identifier`` means an ``int`` is held at the memory location pointed to by ``identifier``. The data type, however, does not have to be specified and instead the "generic" type can be used: ``void *identifier``.

There can be multiple levels of indirection, e.g. ``char **identifier``.

The 'address of' operator is ampersand, ``&``.

The use of the indirection operator and the address of operator is relevant to binding function signatures, which is covered in a later section. For a comprehensive explanation of pointers in C see `you need to know about pointers in C <http://boredzo.org/pointers>`_.

For now it is enough to understand that the pointer gives no indication of how the memory pointed to is managed. It is not known from seeing a pointer in the C code whether the memory is constant, stack allocated or heap allocated.

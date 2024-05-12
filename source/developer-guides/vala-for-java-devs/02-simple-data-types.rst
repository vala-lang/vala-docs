Simple Data Types
=================

Basic Types
-----------

In Vala, the sizes of standard types (``int``, ``long``, etc.) are architecture-dependent. To get the size of a type in bytes, you can use the ``sizeof`` operator. For example:

.. code-block:: vala

   int size = sizeof (int);

Vala provides additional types with architecture-independent guaranteed sizes:

- Signed: ``int8``, ``int16``, ``int32``, ``int64``
- Unsigned: ``uint8``, ``uint16``, ``uint32``, ``uint64``

Note that there is no ``byte`` type in Vala. Instead, you can use ``uint8`` or ``int8``.

Vala uses ``bool`` instead of ``boolean`` for boolean values.

Vala also has an additional basic type called ``unichar``, which represents a Unicode character.

Constant Modifier
-----------------

In Vala, the ``const`` keyword is used to declare constants, similar to ``final`` in Java.


Methods on Basic Types
----------------------

Vala's basic types have methods that can be called directly on the values. For example:

.. code-block:: vala

   int a = (-4).abs ();
   string s = a.to_string ();
   int b = int.max (5, 7);      // static method call on 'int'

In the above code:

- ``(-4).abs ()`` calls the ``abs`` method on the integer value ``-4``, returning its absolute value.
- ``a.to_string ()`` converts the integer ``a`` to a string representation.
- ``int.max (5, 7)`` calls the static ``max`` method on the ``int`` type, returning the maximum value between ``5`` and ``7``.

These are just a few examples of the methods available on Vala's basic types.

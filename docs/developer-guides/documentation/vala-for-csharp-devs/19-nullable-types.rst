Nullable Types
==============

C#: mark nullable value types

.. code-block:: csharp

   int? i = null;

Vala: mark nullable reference type arguments and return values of methods. They are non-nullable by default!

.. code-block:: vala

   Foo? method (Foo? foo, Bar bar) {
       return null;
   }

In this example: ``foo`` and return value may be ``null``, ``bar`` must be
non-null. Checked at run-time, and to some extent at compile time.

Conclusion: same syntax (``?`` type modifier), different meanings.
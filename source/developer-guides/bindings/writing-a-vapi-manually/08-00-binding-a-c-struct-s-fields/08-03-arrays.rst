Arrays
======

Arrays come in two varieties in C: a pointer to allocated memory or included in the structure. Vala follows a similar convention:

.. code-block:: c

   int foo[20];
   int *bar;

.. code-block:: vala

   public int foo[20];
   public int[] bar;

Note the position of the square brackets in the Vala versions. For fixed-length arrays Vala expects the square brackets (as well as the length) to follow the variable name, whereas for dynamically-sized arrays Vala expects the square brackets to follow the type (and not contain a length).

Again, if the array may be null, suffix the type with a question mark.

Vala arrays have lengths associated with them. Often, C programmers do this too:

.. code-block:: c

   int *foo;
   size_t foo_count;

which is bound as:

.. code-block:: vala

   [CCode (array_length_cname = "foo_count", array_length_type = "size_t")]
   public int[] foo;

Often, the size will not be included, by the array will be null-terminated:

.. code-block:: c

   Foo **foos;

.. code-block:: vala

   [CCode (array_null_terminated = true)]
   public Foo[] foos;

Occasionally, the length is not included, but defined elsewhere, such as a constant:

.. code-block:: c

   /* Array length must be FOO_COUNT */
   Foo **foos;

.. code-block:: vala

   [CCode (array_length_cexpr = "FOO_COUNT")]
   public Foo[] foos;

Since Vala will only allow a numeric value as an array length, using a ``array_length_cexpr`` may be convenient if the array length can vary as new releases of the library occur.

Vala does not really do C-style stacked arrays (a.k.a. ragged multi-dimensional arrays), so binding them as arrays is nigh impossible without extra C code.Since Vala's pointer semantics are the same, they can be treated as pointers though.

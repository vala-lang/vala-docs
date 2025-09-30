Arrays
======

Vala arrays are designed to match most of the C array semantics. Since C arrays, generally, have no explicit length, Vala needs special hints to know what to do. There are several cases for the length of an array, discussed below. For a parameter, a ``CCode`` attribute attached to that parameter controls the array's binding. For a return value, the ``CCode`` attribute **of the method** controls the array's binding.


Array Length is Passed as an Argument
-------------------------------------

By default, Vala assumes the first case and does the following transformation:

.. code-block:: vala

   void foo (double[] array);
   double[] foo (float f);

.. code-block:: c

   void foo(double *array, int array_length);
   double *foo(float f, int *array_length);

If the C code does this, there are still two potential mismatches: the order of parameters and the type of the array length. Often, the array length is a ``size_t`` or ``unsigned int``. The ``array_length_pos`` can move the position of the array's length parameter, see :doc:`Changing the Position of Parameters <../05-00-fundamentals-of-binding-a-c-function/05-05-changing-the-position-of-generated-arguments>`. The ``array_length_type`` specifies a string with the C type of the array (e.g., ``size_t``).


Array is Null-Terminated
------------------------

The ``array_null_terminated`` will assume the array is null terminated, like a string is, and set the array length automatically by iterating over the items in the array. Since Vala always allocates padding in arrays with the final element as null, passing a Vala-declared array in does not involve modifying the array in any way.


Array Length is a Constant Expression
-------------------------------------

The ``array_length_cexpr`` can be set to the C expression that populates the array's value. It does not have access to the array, the instance of the object being called, or any other context. It must be a context-free expression.


Array Length is Unknown
-----------------------

If the array length is unknown, setting ``array_length = false`` in the ``CCode`` attribute will cause Vala to set the array's ``.length`` property to -1 and not pass the length when used as a parameter.


Array Length is Known by Some Awkward Means
-------------------------------------------

This is only applicable for arrays being returned. If the array's length can be determined, but non-trivially, a wrapper function can be included that sets the array's ``.length property`` to the correct value. See :doc:`Array Lengths <../10-00-awkward-situations/10-01-array-lengths>`.


Constants
=========

This sub-section introduces:
* the ``#define`` pre-processor directive in C
* the stages the Vala compiler follows

A constant does not vary during the running of a program and must be a simple type or string. As an example, if the C library defines a constant through a ``#define`` statement:

.. code-block:: c

   #define CUSTOM_PI 3.14159265358979323846

``#define`` is simple text substitution by the pre-processor. So relevant occurrences of ``CUSTOM_PI`` are replaced with ``3.14159265358979323846`` by the C pre-processor before the C code is then compiled. This is why no type information is given. Also, because this is done before compilation it is implicit that the value is constant. 

When binding this to Vala the type information and that it is constant are made explicit:

.. code-block:: vala

   public const double CUSTOM_PI;

An important point to note is the value is not bound, only the identifier. Vala will use the identifier in the generated C code and then the C pre-processor will replace it with the value before compilation.

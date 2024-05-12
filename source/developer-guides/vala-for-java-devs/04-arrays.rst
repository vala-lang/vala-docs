Arrays
======

Dynamic Growth
--------------

You can add elements to arrays dynamically by using the ``+=`` operator. The array will be reallocated with sizes of powers of two:

.. code-block:: vala

    int[] squares = {};
    for (int i = 0; i < 100; i++) {
        squares += i * i;
    }

No Boundary Checking
--------------------

However, there is no runtime boundary checking for arrays in Vala:

.. code-block:: vala

    int[] a = new int[10];
    a[20] = 1;  // not safe!

(Optional boundary checking is planned for a future version of Vala.)

Multi-Dimensional Arrays
------------------------

Java: jagged multi-dimensional arrays ``[][]`` (arrays of arrays)

.. code-block:: java

    int[][] matrix = new int[3][];
    for (int[] row : matrix) {
        row = new int[4];
    }

Vala: rectangular multi-dimensional arrays ``[,]``, ``[,,]``, etc. (allocated as one contiguous memory block), jagged array support planned

.. code-block:: vala

    int[,] matrix = new int[3,4];

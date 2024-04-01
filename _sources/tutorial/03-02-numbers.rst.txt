Numbers
=======

In this section we'll:

- Teach you about some numeric data types
- Explain what operators are
- Help you write programs using variables with numeric data types

You will write code for this section in a different directory to the one used for the Hello World program. Follow the following instructions below to do so: 

1. Create a new directory called ``Numbers`` under your ``ValaProjects`` directory.
2. Under the ``Numbers``  directory you have just created, create a new file called ``main.vala``.

Introduction to Numbers
-----------------------

In the last section, we showed an example of a variable:

.. code-block:: vala
   
   string my_name = "Sara";

In your ``main.vala`` file, create a `main` method with, an ``int`` variable assignment, in the `main` method's body:

.. code-block:: vala
   :caption: main.vala - ``int`` variable declaration.

   public static void main () {
       int num = 42;
   }

The ``num`` variable of you've created in the line above stores `int` values and you have set the value of it to ``42``.

You can print the value of ``num`` by adding using the ``print`` method. Add this line below where you wrote the ``num`` variable's delcaration:

.. code-block:: vala
   :caption: main.vala - Print value of ``num``
   :emphasize-lines: 3

   public static void main () {
       int num = 42;
       print ("Value of num: %d\n", num);
   }

Now, compile your code in ``main.vala`` and run the generated program. You'll see the following output:

.. code-block:: output
   
   Value of num: 42


.. note::

   ``%d`` is a format specifier. We use this specify where we want an `integer` value to be displayed in the printed message. ``num`` after the ``,`` is the variable that will be substituted for ``%d``.

   We'll cover format specifiers in more detail, in later sections.


Different numeric data types
----------------------------

.. warning::

   It's pretty hard to find documentation on exactly how these GLib data types behave. As of now, the descriptions of each data type may be inaccurate.

Vala has many numeric data types such as:

- ``char`` - Stores 8 bit integer numbers.
- ``uchar`` - Stores unsinged 8 bit numbers
- ``short`` - Stores 16-bit integer numbers
- ``ushort`` - Stores unsigned 16 bit numbers
- ``int`` - Stores integer numbers (platform dependant behaviour) 
- ``uint`` - Stores unsigned integer numbers (platform dependant behaviour)
- ``long`` - Stores "big" integer numbers (platform dependent behaviour).
- ``ulong`` - Stores unsigned "big" integer numbers (platform dependent behaviour).
- ``size_t`` - Stores at least 16 bit integer numbers
- ``ssize_t`` - Stores at least 16 bit unsigned integer numbers
- ``int8`` - Stores 8 bit integer numbers
- ``uint8`` - Stores unsinged 8 bit integer numbers
- ``int16`` - Stores 16 bit integer numbers
- ``uint16`` - Stores unsigned 16 bit integer numbers
- ``int32`` - Stores 32 bit integer numbers
- ``uint32`` - Stores unsinged 32 bit integer numbers
- ``int64`` - Stores 64 bit integer numbers
- ``uint64`` - Stores unsigned 64 bit integer numbers
- ``unichar`` - Stores unsigned 32 bit integer numbers
- ``float`` - Stores 32-bit floating-point numbers
- ``double`` - Stores 64-bit floating-point numbers

.. note::

   **Floating-point** numbers are numbers with decimal points in them like: ``2.5``.

.. note::

   The **unsigned** types above only store postive numbers, allowing them to store bigger numbers values that their signed variants can't. **Unsinged** types also use the same amount of storage space as their signed variants too.

.. tip::
   
   Some of the data types behave similarly to C data types of the same name.


Artithmetic Operations
----------------------

Rather than teaching you how each of these data types work in detail, we'll give you pre-written code that shows you how a few of them behave. 

Some of these data types will be covered in the rest of the tutorial. 

Replace all the code in ``main.vala`` with this code below:

.. code-block:: vala
   :caption: main.vala - Numeric data type examples

   public static void main () {
       // Addition: 
       int sum = 5 + 5; // sum = 10

       // Subtraction: difference = 5
       int difference = 12-7; // difference = 5

       // Multiplication: product = 4
       int product = 2 * 2; // product = 4

       // Division:
       float quotient = 64.2f / 2f; // quotient = 32.1
       double second_quotient = 99.9 / 11.1; // quotient = 9.0

       // Integer division results in the decimal part of the quotient not being 
       // included:
       int floored_quotient = 16 / 5; // floored_quotient = 3

       // Modulus
       int remainder = 1 % 2; // remainder = 1
       int no_remainder = 2 % 2; // no_reminader = 0

       // Reusing variables

       int changing_num = 1;
       changing_num = changing_num + 1; 
       changing_num = changing_num - sum;
       changing_num = changing_num * difference; 
       changing_num = changing_num / product;

       print ("Changing number: %d\n", changing_num);
   }

Can you guess the value of ``changing_num`` that gets printed?

Now run and compile the code, you should see the value ``-10`` gets printed. 

.. note::

   You might see some warnings when compiling the code.
   Don't worry about these, this is because there were variables we didn't use.

   The code will run fine.


Feel free to experiment with arithmetic operations by creating your own math expressions.


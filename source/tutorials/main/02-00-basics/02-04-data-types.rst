Data Types
==========

Broadly speaking there are two types of data in Vala: *reference types* and *value types*.  These names describe how instances of the types are passed around the system - a value type is copied whenever it is assigned to a new identifier, a reference type is not copied, instead the new identifier is simply a new reference to the same object.

A constant is defined by putting ``const`` before the type.  The naming convention for constants is ``ALL_UPPER_CASE``.

Value Types
-----------

Vala supports a set of the simple types as most other languages do.

* Byte, ``char``, ``uchar``; their names are *char* for historical reasons.
* Character, ``unichar``; a 32-bit Unicode character
* Integer, ``int``, ``uint``
* Long Integer, ``long``, ``ulong``
* Short Integer, ``short``, ``ushort``
* Guaranteed-size Integer, ``int8``, ``int16``, ``int32``, ``int64`` as well as their unsigned siblings ``uint8``, ``uint16``, ``uint32``, ``uint64``. The numbers indicate the lengths in bits.
* Float number, ``float``, ``double``
* Boolean, ``bool``; possible values are ``true`` and ``false``
* Compound, ``struct``
* Enumeration, ``enum``; represented by integer values, not as classes like Java's enums

Here are some examples.

.. code-block:: vala

   unichar c = 'u';
   float percentile = 0.75f;
   const double MU_BOHR = 927.400915E-26;
   bool the_box_has_crashed = false;

   /* defining a struct */
   struct Vector {
       public double x;
       public double y;
       public double z;
   }

   /* defining an enum */
   enum WindowType {
       TOPLEVEL,
       POPUP
   }

Most of these types may have different sizes on different platforms, except for the guaranteed-size integer types.  The ``sizeof`` operator returns the size that a variable of a given type occupies in bytes:

.. code-block:: vala

   ulong nbytes = sizeof(int32);    // nbytes will be 4 (= 32 bits)

You can determine the minimum and maximum values of a numerical type with *.MIN* and *.MAX*, e.g. ``int.MIN`` and ``int.MAX``.

Strings
-------

The data type for strings is ``string``. Vala strings are UTF-8 encoded and immutable.

.. code-block:: vala

   string text = "A string literal";

Vala offers a feature called *verbatim strings*.  These are strings in which escape sequences (such as ``\n``) won't be interpreted, line breaks will be preserved and quotation marks don't have to be masked.  They are enclosed with triple double quotation marks.  Possible indentations after a line break are part of the string as well.

.. code-block:: vala

   string verbatim = """This is a so-called "verbatim string".
   Verbatim strings don't process escape sequences, such as \n, \t, \\, etc.
   They may contain quotes and may span multiple lines.""";

Strings prefixed with '@' are string templates. They can evaluate embedded variables and expressions prefixed with '$':

.. code-block:: vala

   int a = 6, b = 7;
   string s = @"$a * $b = $(a * b)";  // => "6 * 7 = 42"

The equality operators ``==`` and ``!=`` compare the content of two strings, contrary to Java's behaviour which in this case would check for referential equality.

You can slice a string with ``[start:end]``.  Negative values represent positions relative to the end of the string:

.. code-block:: vala

   string greeting = "hello, world";
   string s1 = greeting[7:12];        // => "world"
   string s2 = greeting[-4:-2];       // => "or"

Note that indices in Vala start with 0 as in most other programming languages.  Starting with Vala 0.11 you can access a single byte of a string with ``[index]``:

.. code-block:: vala

   uint8 b = greeting[7];             // => 0x77

However, you cannot assign a new byte value to this position, since Vala strings are immutable.

Many of the basic types have reasonable methods for parsing from and converting to strings, for example:

.. code-block:: vala

   bool b = bool.parse("false");           // => false
   int i = int.parse("-52");               // => -52
   double d = double.parse("6.67428E-11"); // => 6.67428E-11
   string s1 = true.to_string();           // => "true"
   string s2 = 21.to_string();             // => "21"

Two useful methods for writing and reading strings to/from the console (and for your first explorations with Vala) are *stdout.printf()* and *stdin.read_line()*:

.. code-block:: vala

   stdout.printf("Hello, world\n");
   stdout.printf("%d %g %s\n", 42, 3.1415, "Vala");
   string input = stdin.read_line();
   int number = int.parse(stdin.read_line());

You already know *stdout.printf()* from the *Hello World* example.  Actually, it can take an arbitrary number of arguments of different types, whereas the first argument is a *format string*, following the same rules as `C format strings <http://en.wikipedia.org/wiki/Printf>`_. If you must output an error message you can use *stderr.printf()* instead of *stdout.printf()*.

In addition the *in* operation can be used to determine whether one string contains another, e.g.

.. code-block:: vala

   if ("ere" in "Able was I ere I saw Elba.") ...

For more information, please report to `the complete overview of the string class <http://www.valadoc.org/glib-2.0/string.html>`_.

A :doc:`sample program </developer-guides/string-sample>` demonstrating string usage is also available.

Arrays
------

An array is declared by giving a type name followed by ``[]`` and created by using the ``new`` operator e.g. ``int[] a = new int[10]`` to create an array of integers.  The length of such an array can be obtained by the *length* member variable e.g. ``int count = a.length``.  Note that if you write ``Object[] a = new Object[10]`` no objects will be created, just the array to store them in.

.. code-block:: vala

   int[] a = new int[10];
   int[] b = { 2, 4, 6, 8 };

You can slice an array with ``[start:end]``:

.. code-block:: vala

   int[] c = b[1:3];     // => { 4, 6 }

Slicing an array will result in a reference to the requested data, not a copy.  However, assigning the slice to an owned variable (as is done above) will result in a copy.  If you would like to avoid a copy, you must either assign the slice to an unowned array or pass it directly to an argument (arguments are, by default, unowned):

.. code-block:: vala

   unowned int[] c = b[1:3];     // => { 4, 6 }

Multi-dimensional arrays are defined with ``[,]`` or ``[,,]`` etc.

.. code-block:: vala

   int[,] c = new int[3,4];
   int[,] d = {{2, 4, 6, 8},
               {3, 5, 7, 9},
               {1, 3, 5, 7}};
   d[2,3] = 42;

This sort of array is represented by a single contiguous memory block.  Jagged multi-dimensional arrays (``[][]``, also known as "stacked arrays" or "arrays of arrays"), where each row may have a different length, are not yet supported.

To find the length of each dimension in a multi-dimensional array, the *length* member becomes an array, storing the length of each respective dimension.

.. code-block:: vala

   int[,] arr = new int[4,5];
   int r = arr.length[0];
   int c = arr.length[1];

Please note that you can't get a mono-dimensional array from a multidimensional array, or even slice a multidimensional array:

.. code-block:: vala

   int[,] arr = {{1,2},
                {3,4}};
   int[] b = arr[0];  // won't work
   int[] c = arr[0,];  // won't work
   int[] d = arr[:,0];  // won't work
   int[] e = arr[0:1,0];  // won't work
   int[,] f = arr[0:1,0:1];  // won't work

You can append array elements dynamically with the ``+=`` operator.  However, this works only for locally defined or private arrays.  The array is automatically reallocated if needed.  Internally this reallocation happens with sizes growing in powers of 2 for run-time efficiency reasons.  However, ``.length`` holds the actual number of elements, not the internal size.

.. code-block:: vala

   int[] e = {};
   e += 12;
   e += 5;
   e += 37;

You can resize an array by calling *resize()* on it. It will keep the original content (as much as fits).

.. code-block:: vala

   int[] a = new int[5];
   a.resize(12);

You can move elements within an array by calling *move(src, dest, length)* on it. The original positions will be filled with 0.

.. code-block:: vala

   uint8[] chars = "hello world".data;
   chars.move (6, 0, 5);
   print ((string) chars); // "world "

If you put the square brackets *after* the identifier together with an indication of size you will get a fixed-size array.  Fixed-size arrays are allocated on the stack (if used as local variables) or in-line allocated (if used as fields) and you can't reallocate them later.

.. code-block:: vala

   int f[10];     // no 'new ...'

Vala does not do any bounds checking for array access at runtime.  If you need more safety you should use a more sophisticated data structure like an *ArrayList*. You will learn more about that later in the section about *collections*.

Reference Types
---------------

The reference types are all types declared as a class, regardless of whether they are descended from GLib's *Object* or not. Vala will ensure that when you pass an object by reference the system will keep track of the number of references currently alive in order to manage the memory for you. The value of a reference that does not point anywhere is ``null``. More on classes and their features in the section about object oriented programming.

.. code-block:: vala

   /* defining a class */
   class Track : GLib.Object {             /* subclassing 'GLib.Object' */
       public double mass;                 /* a public field */
       public double name { get; set; }	/* a public property */
       private bool terminated = false;	/* a private field */
       public void terminate() {           /* a public method */
           terminated = true;
       }
   }

Static Type Casting
-------------------

In Vala, you can cast a variable from one type to another. For a static type cast, a variable is casted by the desired type name with parenthesis.  A static cast doesn't impose any runtime type safety checking. It works for all Vala types. For example,

.. code-block:: vala

   int i = 10;
   float j = (float) i;

Vala supports another casting mechanism called *dynamic cast* which performs runtime type checking and is described in the section about object oriented programming.

Type Inference
--------------

Vala has a mechanism called *type inference*, whereby a local variable may be defined using ``var`` instead of giving a type, so long as it is unambiguous what type is meant. The type is inferred from the right hand side of the assignment. It helps reduce unnecessary redundancy in your code without sacrificing static typing:

.. code-block:: vala

   var p = new Person();     // same as: Person p = new Person();
   var s = "hello";          // same as: string s = "hello";
   var l = new List<int>();  // same as: List<int> l = new List<int>();
   var i = 10;               // same as: int i = 10;

This only works for local variables.  Type inference is especially useful for types with generic type arguments (more on these later).  Compare

.. code-block:: vala

   MyFoo<string, MyBar<string, int>> foo = new MyFoo<string, MyBar<string, int>>();

vs.

.. code-block:: vala

   var foo = new MyFoo<string, MyBar<string, int>>();

Defining new Type from other
----------------------------

Defining a new type is a matter of derive it from the one you need. Here is an example:

.. code-block:: vala

   /* defining an alias for a basic type (equivalent to typedef int Integer in C)*/
   [SimpleType]
   public struct Integer : uint {
   }

.. code-block:: vala

   /* Define a new type from a container like GLib.List with elements type GLib.Value */
   public class ValueList : GLib.List<GLib.Value> {
       [CCode (has_construct_function = false)]
       protected ValueList ();
       public static GLib.Type get_type ();
   }


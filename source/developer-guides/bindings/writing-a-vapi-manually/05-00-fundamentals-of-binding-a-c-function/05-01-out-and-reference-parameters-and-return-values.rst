Out and Reference Parameters and Return Values
==============================================

C makes rather heavy use of out parameters as an alternate method to returning. Unfortunately, because of the non-uniform nature of this return system, it is rather confusing.

For all types except structs, when returned, the instance is returned, per usual. Any supplementary information (delegate targets, array lengths) are quietly appended as out parameters. To return another value, a parameter may be declared as ``out``. Vala will assume the function will accept a pointer to this value, which it will populate upon return. A ``ref`` parameter is similar, but the parameter must be initialised before the function is called and the function may manipulate its value.

Consider the following:

.. code-block:: c

   int div_and_mod(int a, int b, int *mod) {
       *mod = a % b;
       return a / b;
   }

.. code-block:: vala

   public int div_and_mod (int a, int b, out int mod);


This works just as easily for class type parameters:

.. code-block:: c

   int open_file_and_fd(const char *filename, FILE **file) {
       FILE *f = fopen(filename, "r");
       if (file)
       *file = f;
       return (f == NULL) ? -1 : fileno(f);
   }

.. code-block:: vala

   public int open_file_and_fd (string filename, out FileStream file);

For arrays and delegates, this means returning both the parameter and its associated parameters:

.. code-block:: c

   void do_approximation(int *input_array, int input_length, int **output_array, int *output_length);

.. code-block:: vala

   public void do_approximation (int[] input, out int[] output);


Note that when you think of an “out array” what you may actually want is just a buffer. If the caller allocates the memory, you want a buffer, not an out array.

Returning structs is rather different. Because struct's memory is allocated by the caller, an out parameter for a struct is indistinguishable from a regular pointer. Moreover, returning a struct actually means including a hidden out parameter.

.. code-block:: vala

   public struct Foo { … }
   public Foo get_foo (int x);
   public void get_foo2 (int x, out Foo f);
   
.. code-block:: c

   void get_foo(int x, foo *ret);
   void get_foo2(int x, foo *ret);

To return a struct directly, the question mark operator will box it, and make it look heap allocated:

.. code-block:: vala

   public Foo? get_foo (int x);
   public int make_foo (int y, out Foo? f);

.. code-block:: c

   foo *get_foo(int x);
   int make_foo(int y, foo **f);

The ownership rules in :doc:`05-02-ownership` apply.


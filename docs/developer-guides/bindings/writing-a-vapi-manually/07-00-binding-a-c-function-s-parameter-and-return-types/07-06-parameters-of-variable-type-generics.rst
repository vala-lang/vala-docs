Parameters of Variable Type (Generics)
======================================

Vala's generics can be applied to C functions using void pointers as generic value arguments. Memory management and generics tend not to get along well, so it may be beneficial to avoid this situation where possible. In particular, generic structs that own instances of the generic can behave strangely. Also, putting owned structs in a generic collection can break.

Before starting, determine the scope of the type variable: does it apply to the method or class? Generics are paired with a delegate. Bind the delegate as follows:

.. code-block:: c

   typedef int (*foo_func)(void *a, void *b, void* context);

.. code-block:: vala

   [CCode (cname = "foo_func", simple_generics = true)]
   public delegate int FooFunc<T> (T a, T b);

Generic Methods
---------------

Frequently, a single method is the context for the generic type variable. Simply apply ``simple_generics`` to the ``CCode`` attribute:

.. code-block:: c

   void sort(void **array, int array_length, foo_func compare, void *context);

.. code-block:: vala

   [CCode (simple_generics = true)]
   public void sort<T> (T[] array, FooFunc<T> compare);

Occasionally, this is not a C function, but a function-like macro that takes the type name (e.g., ``va_arg``), in which case, set ``generic_type_pos`` to the position of the argument:

.. code-block:: c

   #define sort(array, type, compare, context) ...

.. code-block:: vala

   [CCode (generic_type_pos = 1.1)]
   public void sort<T> (T[] array, FooFunc<T> compare);

Generic Classes and Structs
---------------------------

If a data structure is container-like, then it may be possible to bind the structure using generics. However, Vala's assumptions about generic structures are rather rigid, so this may be impossible.

* Create a type variable over the class.
* Decorate all methods that use the type variable with simple_generics.
* Constructors for classes are expected to take the destructor as an argument if ``simple_generics`` is supplied. If the constructor takes no arguments, convert all constructors to static methods with ``simple_generics``.
* Verify all ownership. When Vala emits ``simple_generics`` code of an ``owned`` variable, it always passes the destructor. Frequently, C programs are written where the destructor is passed once in the constructor. In this case, set the destructor to be null, and insist that all values be unowned.


The User Pointer Case
---------------------

Often, C libraries will have a pointer for some user data associated with an object that is left entirely in the hands of the user. This is easily bound.

.. code-block:: c

   typedef struct foo Foo;
   void *foo_get_userptr(Foo*);
   void foo_set_userptr(Foo*,void*);

.. code-block:: vala

   public class Foo<T> {
       public unowned T? user_data {
           [CCode (cname = "foo_get_userptr", simple_generics = true)] get;
           [CCode (cname = "foo_set_userptr", simple_generics = true)] set;
       }
   }

The only caveat is this is rather infectious: the ``simple_generics`` attribute must be applied to all methods use of ``Foo`` in other contexts, including arrays of that object and other classes that contain that type. To avoid this, the alternate binding is:

.. code-block:: vala

   public class Foo {
      [CCode (simple_generics = true)]
      public void set_user_ptr<T> (T value);
      [CCode (simple_generics = true)]
      public T get_user_ptr<T> ();
   }

However, this scheme is less type-safe.

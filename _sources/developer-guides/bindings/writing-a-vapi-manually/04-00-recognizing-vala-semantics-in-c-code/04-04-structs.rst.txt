Structs
=======

Note that a struct on the C side can contain the Vala equivalent of instance data of an object and so be bound to a compact class in Vala. This is covered in a later section. This section covers binding C structs and C primitives to Vala structs.

A common pattern in C is a parented structure, like this:

.. code-block:: c

   typedef struct {
       int a;
       int *b;
   } foo_t;
   void foo_init(foo_t*);
   void foo_free(foo_t*);

The correct binding is:

.. code-block:: vala

   [CCode (cname = "foo_t", destroy_function = "foo_free", has_type_id = false)]
   public struct Foo {
       int a;
       int *b; // We can do better later
       [CCode (cname = "foo_init")]
       public Foo ();
   }

The great trap with this is the naming: ``foo_free`` does not free the pointer it is passed. There may be no way of knowing for sure other than reading the implementation of ``foo_free``. The full structure for ``Foo`` must be given for a ``struct``. For compact classes it may be opaque (i.e., the contents of the ``struct`` are not provided), though not necessarily.

The next example illustrates the use of an empty ``destroy_function`` and has a default value for the struct:

.. code-block:: c

   typedef struct {
       int x;
       int y;
   } bar_t;
   #define BAR_INITIALIZER {0, 1}


.. code-block:: vala

   [CCode (cname = "bar_t", destroy_function = "", default_value = "BAR_INITIALIZER", has_type_id = false)]
   public struct Bar {
       int x;
       int y;
   }

It's important to note that if a struct doesn't have a destroy function specified, Vala will generate one given there are any fields in the struct which look like they need to be deallocated, which may or may not behave correctly depending on the context. An empty ``destroy_function`` will keep the generated code correct and prevent Vala from generating a destructor.

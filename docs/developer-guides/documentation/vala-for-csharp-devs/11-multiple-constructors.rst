Multiple Constructors
=====================

C#: constructor overloading

.. code-block:: csharp

   class Foo
   {
       public Foo() { }
       public Foo(int foo) { }
       public Foo(string bar) { }
   }

   new Foo();
   new Foo(42);
   new Foo("hello");

Vala: no constructor overloading, named constructors instead

.. code-block:: vala

   class Foo : Object {
       public Foo () { }
       public Foo.with_foo (int foo) { }
       public Foo.from_bar (string bar) { }
   }
   new Foo ();
   new Foo.with_foo (42);
   new Foo.from_bar ("hello");
Type Inference
===========================

Vala supports a mechanism called type inference (implicit typing) for local variables: Local variables may be declared using the ``var`` keyword instead of the type name if the compiler can deduce (infer) the type from the initial assignment. This helps avoiding unnecessary redundancy and is especially useful for generic types. Examples:

.. code-block:: vala

    var obj = new Object ();
    var map = new HashMap<string, int> ();
    var str = "hello, world";
    var arr = new int[10];

instead of:

.. code-block:: vala

    Object obj = new Object ();
    HashMap<string, int> map = new HashMap<string, int> ();
    string str = "hello, world";
    int[] arr = new int[10];

Still, everything is statically typed.



Object Base Class
-----------------

Java: implicit inheritance from ``Object`` (``java.lang.Object``):

.. code-block:: java

    public class Foo {
        // ...
    }

Vala: no implicit inheritance from ``Object`` (``GLib.Object``):

.. code-block:: vala

    public class Foo : Object {
        // ...
    }

What happens if you don't inherit from ``Object``? Nothing terrible. These classes will be slightly more lightweight, however, they will lack some features such as property change notifications, and your objects won't have a common base class. Usually inheriting from ``Object`` is what you want.

Multiple Constructors
-------------------

Java: constructor overloading:

.. code-block:: java

    public class Foo {
        public Foo() { }
        public Foo(int foo) { }
        public Foo(String bar) { }
    }

    new Foo();
    new Foo(42);
    new Foo("hello");

Vala: named constructors instead of constructor overloading:

.. code-block:: vala

    public class Foo : Object {
        public Foo () { }
        public Foo.with_foo (int foo) { }
        public Foo.from_bar (string bar) { }
    }

    new Foo ();
    new Foo.with_foo (42);
    new Foo.from_bar ("hello");

Constructor Chaining
--------------------

Java: this():

.. code-block:: java

    class Foo {
        public Foo() {
            this("bar");
        }
        
        public Foo(string bar) {
        }
    }

Vala: this() or this.name_addition():

.. code-block:: vala

    class Foo : Object {
        public Foo () {
            this.with_bar ("bar");
        }
        
        public Foo.with_bar (string bar) {
        }
    }

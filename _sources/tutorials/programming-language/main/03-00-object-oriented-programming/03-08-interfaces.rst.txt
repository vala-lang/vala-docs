Interfaces
==========

A class in Vala may implement any number of interfaces.  Each interface is a type, much like a class, but one that cannot be instantiated. By "implementing" one or more interfaces, a class may declare that its instances are also instances of the interface, and therefore may be used in any situation where an instance of that interface is expected.

The procedure for implementing an interface is the same as for inheriting from classes with abstract methods in - if the class is to be useful it must provide implementations for all methods that are described but not yet implemented.

A simple interface definition looks like:

.. code-block:: vala

   public interface ITest : GLib.Object {
       public abstract int data_1 { get; set; }
       public abstract void method_1();
   }

This code describes an interface "``ITest``" which requires GLib.Object as parent of the implementor class and contains two members. "data_1" is a property, as described above, except that it is declared ``abstract``.  Vala will therefore not implement this property, but instead require that classes implementing this interface have a property called "data_1" that has both ``get`` and ``set`` accessors - it is required that this be ``abstract`` as an interface may not have any data members.  The second member "method_1" is a method.  Here it is declared that this method must be implemented by classes that implement this interface.

The simplest possible full implementation of this interface is:

.. code-block:: vala

   public class Test1 : GLib.Object, ITest {
       public int data_1 { get; set; }
       public void method_1() {
       }
   }

And may be used as follows:

.. code-block:: vala

   var t = new Test1();
   t.method_1();

   ITest i = t;
   i.method_1();

Defining Prerequisites
----------------------

Interfaces in Vala may not inherit from other interfaces, but they may declare other interfaces to be prerequisites, which works in roughly the same way.  For example, it may be desirable to say that any class that implements a ``List`` interface must also implement a ``Collection`` and ``Traversable`` interfaces.  The syntax for this is exactly the same as for describing interface implementation in classes:

.. code-block:: vala

   public interface List : Collection, Traversable {
   }

This definition of "List" may not be implemented in a class without "Collection" also being implemented, and so Vala enforces the following style of declaration for a class wishing to implement "List", where all implemented interfaces must be described:

.. code-block:: vala

   public class ListClass : GLib.Object, Collection, List {
   }

Vala interfaces may also have a class as a prerequisite.  If a class name is given in the list of prerequisites, the interface may only be implemented in classes that derive from that prerequisite class.  This is often used to ensure that an instance of an interface is also a GLib.Object subclass, and so the interface can be used, for example, as the type of a property.

The fact that interfaces can not inherit from other interfaces is mostly only a technical distinction - in practice Vala's system works the same as other languages in this area, but with the extra feature of prerequisite classes.

Defining default implementation in methods
------------------------------------------

There's another important difference between Vala interfaces and Java/C# interfaces: Vala interfaces may have non-abstract methods.

Vala actually allows method implementations in interfaces, then a method with a default implementation must be declared as ``virtual``. Due to this fact Vala interfaces can act as `mixins <http://en.wikipedia.org/wiki/Mixins>`_ . This is a restricted form of multiple inheritance.

.. code-block:: vala

   public interface Callable : GLib.Object {
      public abstract bool answering { get; protected set; }
      public abstract void answer ();
      public virtual bool hang ()
      {
         answering = false;
         return true;
      }
   }

Interface ``Callable`` defines an abstract property called ``answering``, where any class implementing this interface can monitor the state of a call, details about ``answer`` a call is a mautter of the implementator, but ``hang`` defines a default implementation to set ``answering`` to false when hanging a call.

.. code-block:: vala

   public class Phone : GLib.Object, Callable {
      public bool answering { get; protected set; }
      public void answer ()
      {
        /* answer code implementation */
      }

      public static void main ()
      {
         var f = new Phone ();
         if (f.hang ())
            stdout.printf("Hand done.\n");
         else
            stdout.printf("Hand Error!\n");
         stdout.printf("END\n");
      }
   }

When compiling and running, you will find that ``Phone`` class actually no implements ``Callable.hang()`` method, but it is able to use it, then the result is a message ``Hang done.``

.. code-block:: vala

   public class TechPhone : GLib.Object, Callable
   {
      public bool answering { get; protected set; }
      public void answer ()
      {
        /* answer code implementation */
      }

      public bool hang ()
      {
         answering = false;
         stdout.printf ("TechPhone.hang () implementation!");
         return false;
      }
   }

In this case ``TechPhone`` is another implementation to ``Callable``, then when ``hang()`` method is called on an instance of ``TechPhone`` it will always return ``false`` and print the message ``TechPhone.hang () implementation!``, hidding completelly ``Callable.hang()`` default implementation.

Properties
----------

An interface can define properties that must be implemented for classes. Implementator class must define a property with the same signature and access permissions to the property's ``get`` and ``set``.

As any GObject property, you can define a body to property's ``set`` and ``get`` in the implementator class, when no body is used values are set and get by default. If given, you must define a ``private`` field to store the properties values to be used outside or inside the class.

``Callable`` interface definition, defines an ``answering`` property.  In this case this interface defines a ``answering`` with a ``protected set``, allowing a read only property for any object using an instance of ``Callable``, but allows class implementors to write values to it, like ``TechPhone`` class does when implements ``hang()`` method.

Mixins and Multiple Inheritance
-------------------------------

As described above, Vala while it is backed by C and GObject, can provide a limited multiple inheritance mechanism, by adding virtual methods to Interfaces. Is possible to add some ways to define default method implementations in interface implementor class and allow derived classes to override that methods.

If you define a ``virtual`` method in an interface and implement it in a class, you can't override interface's method without leaving derived classes unable to access to interface default one. Consider following code:

.. code-block:: vala

   public interface Callable : GLib.Object {
      public abstract bool answering { get; protected set; }
      public abstract void answer ();
      public abstract bool hang ();
      public static bool default_hang (Callable call)
      {
         stdout.printf ("At Callable.hang()\n");
         call.answering = false;
         return true;
      }
   }

   public abstract class Caller : GLib.Object, Callable
   {
      public bool answering { get; protected set; }
      public void answer ()
      {
        stdout.printf ("At Caller.answer()\n");
        answering = true;
        hang ();
      }
      public virtual bool hang () { return Callable.default_hang (this); }
   }

   public class TechPhone : Caller {
       public string number { get; set; }
   }

   public class Phone : Caller {
      public override bool hang () {
      stdout.printf ("At Phone.hang()\n");
      return false;
   }

      public static void main ()
      {
         var f = (Callable) new Phone ();
         f.answer ();
         if (f.hang ())
            stdout.printf("Hand done.\n");
         else
            stdout.printf("Hand Error!\n");

         var t = (Callable) new TechPhone ();
         t.answer ();
         if (t.hang ())
            stdout.printf("Tech Hand done.\n");
         else
            stdout.printf("Tech Hand Error!\n");
         stdout.printf("END\n");
      }
   }

In this case, we have defined a ``Callable`` interface with a default implementation for ``abstract bool hang ()`` called ``default_hang``, it could be a ``static`` or ``virtual`` method. Then ``Caller`` is a base class implementing ``Callable`` for the ``TechPhone`` and ``Phone`` classes, while ``Caller``'s  ``hang ()`` method simple call ``Callable`` default implementation. ``TechPhone`` doesn't do anything and just takes ``Caller`` as base class, using the default method implementations; but ``Phone`` overrides ``Caller.hang ()`` and this makes to use its own implementation, allowing to always call it even if it is cast to ``Callable`` object.

Explicit method implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The explicit interface method implementation allows to implement two interfaces that have methods (not properties) with the same name. Example:

.. code-block:: vala

   interface Foo {
      public abstract int m();
   }

   interface Bar {
      public abstract string m();
   }

   class Cls: Foo, Bar {
      public int Foo.m() {
         return 10;
      }

      public string Bar.m() {
         sreturn "bar";
      }
   }

   void main () {
      var cls = new Cls ();
      message ("%d %s", ((Foo) cls).m(), ((Bar) cls).m());
   }

Will output 10 bar.

.. note::

   This feature has been available since Vala version 0.26.



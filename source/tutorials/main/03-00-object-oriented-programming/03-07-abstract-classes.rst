Abstract Classes
================

There is another modifier for methods, called ``abstract``.  This modifier allows you to describe a method that is not actually implemented in the class.  Instead, it must be implemented by subclasses before it can be called.  This allows you to define operations that can be called on all instances of a type, whilst ensuring that all more specific types provide their own version of the functionality.

A class containing abstract methods must be declared ``abstract`` as well.  The result of this is to prevent any instantiation of the type.

.. code-block:: vala

   public abstract class Animal : Object {

       public void eat() {
           stdout.printf("*chomp chomp*\n");
       }

       public abstract void say_hello();
   }

   public class Tiger : Animal {

       public override void say_hello() {
           stdout.printf("*roar*\n");
       }
   }

   public class Duck : Animal {

       public override void say_hello() {
           stdout.printf("*quack*\n");
       }
   }

The implementation of an abstract method must be marked with ``override``. Properties may be abstract as well.

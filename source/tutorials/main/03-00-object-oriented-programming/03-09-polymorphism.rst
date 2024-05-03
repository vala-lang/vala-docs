Polymorphism
============

*Polymorphism* describes the way in which the same object can be used as though it were more than one distinct type of thing. Several of the techniques already described here suggest how this is possible in Vala: An instance of a class may be used as in instance of a superclass, or of any implemented interfaces, without any knowledge of its actual type.

A logical extension of this power is to allow a subtype to behave differently to its parent type when addressed in exactly the same way. This is not a very easy concept to explain, so I'll begin with an example of what will happen if you do not directly aim for this goal:

.. code-block:: vala

   class SuperClass : GLib.Object {
       public void method_1() {
           stdout.printf("SuperClass.method_1()\n");
       }
   }

   class SubClass : SuperClass {
       public void method_1() {
           stdout.printf("SubClass.method_1()\n");
       }
   }

These two classes both implement a method called "method_1", and "``SubClass``" therefore contains two methods called "method_1", as it inherits one from "``SuperClass``". Each of these may be called as the following code shows:

.. code-block:: vala

   SubClass o1 = new SubClass();
   o1.method_1();
   SuperClass o2 = o1;
   o2.method_1();

This will actually result in two different methods being called.  The second line believes "o1" to be a "``SubClass``" and will call that class's version of the method.  The fourth line believes "o2" to be a "``SuperClass``" and will call that class's version of the method.

The problem this example exposes, is that any code holding a reference to "``SuperClass``" will call the methods actually described in that class, even in the actual object is of a subclass. The way to change this behaviour is using virtual methods. Consider the following rewritten version of the last example:

.. code-block:: vala

   class SuperClass : GLib.Object {
       public virtual void method_1() {
           stdout.printf("SuperClass.method_1()\n");
       }
   }

   class SubClass : SuperClass {
       public override void method_1() {
           stdout.printf("SubClass.method_1()\n");
       }
   }

When this code is used in the same way as before, "``SubClass``"'s "method_1" will be called twice. This is because we have told the system that "method_1" is a virtual method, meaning that if it is overridden in a subclass, that new version will always be executed on instances of that subclass, regardless of the knowledge of the caller.

This distinction is probably familiar to programmers of some languages, such as C++, but it is in fact the opposite of Java style languages, in which steps must be taken to prevent a method being virtual.

You will probably now also have recognised that when method is declared as ``abstract`` it must also be virtual. Otherwise, it would not be possible to execute that method given an apparent instance of the type it was declared in.  When implementing an abstract method in a subclass, you may therefore choose to  declare the implementation as ``override``, thus passing on the virtual nature of the method, and allowing subtypes to do the same if they desire.

It's also possible to implement interface methods in such a way that subclasses can change the implementation.  The process in this case is for the initial implementation to declare the method implementation to be ``virtual``, and then subclasses can override as required.

When writing a class, it is common to want to use functionality defined in a class you have inherited from. This is complicated where the method name is used more than one in the inheritance tree for your class.  For this Vala provides the ``base`` keyword. The most common case is where you have overridden a virtual method to provide extra functionality, but still need the parent class' method to be called. The following example shows this case:

.. code-block:: vala

   public override void method_name() {
       base.method_name();
       extra_task();
   }


Vala also allows properties to be virtual:

.. code-block:: vala

   class SuperClass : GLib.Object {
       public virtual string prop_1 {
           get {
               return "SuperClass.prop_1";
           }
       }
   }

   class SubClass : SuperClass {
       public override string prop_1 {
           get {
               return "SubClass.prop_1";
           }
       }
   }


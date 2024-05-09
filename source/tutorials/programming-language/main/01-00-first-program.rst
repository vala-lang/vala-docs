First Program
=============

Your First Program
------------------

Sadly predictable, but still:

.. code-block:: vala

   class Demo.HelloWorld : GLib.Object {
       public static int main(string[] args) {
           stdout.printf("Hello, World\n");
           return 0;
       }
   }

Of course, that is a Vala *Hello World* program.  I expect you can recognise some parts of it well enough, but just to be thorough I shall go through it step by step.

.. code-block:: vala

   class Demo.HelloWorld : GLib.Object {


This line identifies the beginning of a class definition.  Classes in Vala are very similar in concept to other languages.  A class is basically a type of object, of which instances can be created, all having the same properties.  The implementation of classed types is taken care of by the *gobject* library, but details of this are not important for general usage.

What is important to note is that this class is specifically described as being a subclass of *GLib.Object*.  This is because Vala allows other types of class, but in most cases, this is the sort that you want.  In fact, some language features of Vala are only allowed if your class is descended from GLib's *Object*.

Other parts of this line show namespacing and fully qualified names, although these will be explained later.

.. code-block:: vala

   public static int main(string[] args) {


This is the start of a method definition.  A method is a function related to a type of object that can be executed on an object of that type.  The static method means that the method can be called without possessing a particular instance of the type.  The fact that this method is called ``main`` and has the signature it does means that Vala will recognise it as the entry point for the program.

The *main* method doesn't have to be defined inside a class.  However, if it is defined inside a class it must be ``static``.  It doesn't matter if it's ``public`` or ``private``.  The return type may be either ``int`` or ``void``.  With a ``void`` return type the program will implicitly terminate with exit code 0.  The string array parameter holding the command line arguments is optional.

.. code-block:: vala

   stdout.printf("Hello, World\n");


*stdout* is an object in the *GLib* namespace that Vala ensures you have access to whenever required.  This line instructs Vala to execute the method called *printf* of the *stdout* object, with the hello string as an argument.  In Vala, this is always the syntax you use to call a method on an object, or to access an object's data. ``\n`` is the escape sequence for a new line.

.. code-block:: vala

   return 0;

``return`` is to return a value to the caller and terminate the execution of the *main* method which also terminates the execution of the program. The returned value of the *main* method is then taken as the exit code of the program.

The last lines simply end the definitions of the method and class.

Compile and Run
---------------

Assuming you have Vala installed, then all it takes to compile and execute this program is:

.. code-block:: console

   $ valac hello.vala
   $ ./hello

*valac* is the Vala compiler, which will compile your Vala code into a binary.  The resulting binary will have the same name as the source file and can then be directly executed on the machine. You can probably guess the output.

If you get some warnings from a C language compiler, please jump to :doc:`07-00-tools/07-01-valac` for the reason and solution.


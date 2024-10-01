First Program
=============

Your First Program
------------------

Sadly predictable, but still:

.. code-block:: vala

    void main() {
        stdout.printf("Hello, World\n");
    }

Of course, that is a Vala *Hello World* program.  I expect you can recognise some parts of it well enough, but just to be thorough I shall go through it step by step.

.. code-block:: vala

   void main() {


This is the start of a method definition.  A method is a function related to a type of object that can be executed on an object of that type.  The fact that this method is called ``main`` and has the signature it does means that Vala will recognise it as the entry point for the program. ``void`` is the return type of the method, which means that the method does not return any value.


.. code-block:: vala

   stdout.printf("Hello, World\n");


This line instructs Vala to execute the method called *printf* of the *stdout* object, with the hello string as an argument.  In Vala, this is always the syntax you use to call a method on an object, or to access an object's data. ``\n`` is the escape sequence for a new line.


---------------

there are several ways to write a ``main`` method in vala, here are the possible ones :

.. code-block:: vala
    
    void main () {
    }

    int main () {
        return 0;
    }

    int main (string[] args) {
        return 0;
    }

    void main (string[] args) {
    }

it is possible to declare your main in a class only if it is public and static.
``int`` is the return type of the main method, which means that the method returns an integer value. The integer value returned by the main method is the exit status of the program. The exit status is a value returned by a program to the operating system. The operating system can then use this value to determine whether the program executed successfully or not. A return value of 0 indicates that the program executed successfully, while a non-zero value indicates that the program did not execute successfully.

``string[] args`` is an array of strings that are passed to the program when it is executed. The first element of the array is the name of the program itself. The remaining elements are any arguments that are passed to the program when it is executed. The arguments are separated by spaces. For example, if you execute the program with the command ``./hello arg1 arg2``, then the array will contain the following elements:


.. code-block:: vala

    public class Main {
        public static void main(string[] args) {
            //...
        }
    }


Compile and Run
---------------

Assuming you have Vala installed, then all it takes to compile and execute this program is:

.. code-block:: console

   $ valac hello.vala
   $ ./hello

*valac* is the Vala compiler, which will compile your Vala code into a binary.  The resulting binary will have the same name as the source file and can then be directly executed on the machine. You can probably guess the output.

If you get some warnings from a C language compiler, please jump to :doc:`07-00-tools/07-01-valac` for the reason and solution.


Main method
===========

The work that you do in this section will be done in a new directory under your
``ValaProjects`` directory called ``MainMethods``:abbr:

1. Create the ``MainMethods`` directory under your ``ValaProjects`` directory
2. Create file called ``main.vala`` inside the ``MainMethods`` directory.

.. Reference about the original program the reader has written in the Hello World section.

In the Hello World section, you wrote the following program:

.. code-block:: vala
   :emphasize-lines: 1,3
   
    public static void main () {
        print ("Hello, world!\n");
    }

.. Talk about how the main method is the entry point of every Vala program. It's called by
.. the program automatically.

The `main` method that above is the entry point of every Vala program. It is called
by the program automatically.

.. Talk about how there are different versions of the main method that can be used and
.. explain the situations where you would use them.

Throughout this tutorial so far, we've used on version of the main method.
There are different types of main methods that give you access to additional features
that are useful for come complicated programs.

Here are some of the other main methods versions there are available:

Main method with exit code
----------------------------

.. code-block:: vala
    :emphasize-lines: 1,3

    public static int main () {
        print ("Hello, world!\n");
        return 0;
    }

If you look at the method signature in line 1, the main method has an ``int`` return
type instead of a ``dev`` return type. This means that you are required to return an
integer in this method.

In line 3, the value of ``0`` is returned. The value that is returned is an exit code.
Exit codes tell the operating system the exit status of the program.

- ``0`` means that you the program ran successfully without errors
- Any non-zero value means that there was an error with the program. The meaning of each value is dependent on the operating system you are using.

Main method with arguments
--------------------------

.. code-block:: vala

    public static void main(string[] args) {
        print (@"Arguments list length: $args.length\n");
        print ("Arguments list:\n");
        
        foreach (string arg in args) {
            print (@"$arg\n");
        }
    }

If you compile and run the program, you'll get a result that looks 
similar to this:

.. code-block:: output

    Arguments list length: 1
    Arguments list:
    ./main

However, the output can change depending on how you call the program.

The value of the argument list is determined by each space seperating string
is used when calling the program. There will always be at least one argument which
is the path to the program executable.

The following arguments are space separated strings that appear after the location of the program.

Try run the program again but append a space then ``arg2 arg3`` to the program's path.

e.g: ``./main arg2 arg3``.

The output of the program will look like this:

.. code-block:: output

    Arguments list length: 3
    Arguments list:
    ./main
    arg2
    arg3

You can use the values in the arguments list in your program to modifiy its behaviour using data passed in from the environment
it was called from.

There is also a version of the ``main`` method that allows you to return an exit code too. The following code
will produce the same output:

.. code-block:: vala

    public static int main(string[] args) {
        print (@"Arguments list length: $args.length\n");
        print ("Arguments list:\n");
        
        foreach (string arg in args) {
            print (@"$arg\n");
        }

        return 0;
    }


No main method
--------------

If you have a pretty simple program, you don't even need to write a main method block.
This code will compile and run just fine:

.. code-block:: vala

    print ("No main method block here!\n");
    print ("Hello world!\n");

The output of the program will be:

.. code-block:: output

    No main method block here!
    Hello world!

.. Lastly, show that you don't even need to write a main method block however it's still recommended that you do so since
.. this is a new feature that has been added in recent versions of Vala.

.. warning:: 
    
    In the Vala version this tutorial is for (0.56), you will receive a warning
    stating that "main blocks are experimental".

    So please use this feature with caution.
    
    
Summary
-------

Congratualations! You've now finished this chapter.

To recap, you've learned:

- Thing 1
- Thing 2
- Thing 3

-- INSERT CHAPTER END MESSAGE HERE --

Now, on to the next chapter!
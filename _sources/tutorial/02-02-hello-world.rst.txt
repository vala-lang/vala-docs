Hello World
===========

In this section, we'll:

- Explain the steps for you to create directories on your system, where you'll store the Vala programs you will be creating in this tutorial
- Help you create our first Vala program
- Teach you the essential parts that make up a Vala program
- Breifly explain how Vala relates to the C Programming Language


Setting up your directories
---------------------------

Firstly, you'll create a directory where you'll store all of your Vala projects for this tutorial.
We suggest making one in your home directory.

Open a terminal and enter the commands below to create a ``ValaProjects`` directory in your home directory and ``HelloWorld`` directory inside of the ``ValaProjects`` directory.

On Unix-based systems (Linux, macOS, \*BSD, etc.) and Powershell in Windows, enter these commands:

.. code-block:: console
   
   $ mkdir ~/ValaProjects
   $ cd ~/ValaProjects
   $ mkdir HelloWorld
   $ cd HelloWorld

If you are using CMD in Windows, enter these commands:

.. code-block:: doscon
   
   > mkdir "%USERPROFILE%\ValaProjects"
   > cd /d "%USERPROFILE%\ValaProjects"
   > mkdir HelloWorld
   > cd HelloWorld

Creating your first Vala program
--------------------------------
   
Next, create make a new Vala source file inside the ``HelloWorld`` directory called ``main.vala``. This is where you'll write the code for you first Vala program.

Now in ``main.vala``, add the following code below:

.. code-block:: vala
   :caption: main.vala - A program that prints "Hello, world!" 

   public static void main () {
       print ("Hello, world!\n");
   }

.. note::
   
   In this tutorial, Vala code will be indented with 4 spaces since all Vala code written in this tutorial will follow the `elementary coding style <https://docs.elementary.io/develop/writing-apps/code-style>`_ (unless specified otherwise).

After you've added the code above to the ``main.vala``  source file, save the file then, return to your terminal you opened earlier.

On Unix-based systems (Linux, macOS, \*BSD, etc), enter the following commands to build and run the file:

.. code-block:: console
   
   $ valac main.vala
   $ ./main

If you're using Windows, you need to replace  ``.\main.exe`` instead of ``.\main`` when entering the commands:

.. code-block:: doscon
   
   > valac main.vala
   > ./main.exe

You should see the following line added to your terminal: "Hello, world!".

You've successfully created your first Vala program. Congratulations! 

What just happened?
-------------------

Let's break down the anatomy of the program you've just created so that you can understand what just happened.

.. code-block:: vala
   :emphasize-lines: 1, 3

   public static void main () {
       print ("Hello, world!\n");
   }

The highlighted lines above define a **method** in Vala; A method is a block of code that contain code for the program to execute when called.

The ``main`` **method** in Vala is special becasue it's the first **method** that runs in a Vala program. The program automatically calls the ``main`` **method** first.
   
We'll explain ``public``, ``static`` and ``void`` in later chapters.

The curly brackets (``{}``) define the start and end of the **method** body. Our program runs the code written in each line between the curly brackets for the ``main`` **method**.

The ``main`` **method** contains the following code:

.. code-block:: vala
   :emphasize-lines: 2
   
   public static void main () {
       print ("Hello, world!\n");
   }

The highlighted line above line prints the "Hello, world!" text on the screen.

``print`` is also a method. Unlike the ``main`` method, you are calling the ``print`` method yourself.

"Hello, world!\\n" is a **string**; A **string** is a sequence of characters such as letters, numbers, symbols and spaces. We'll go into more details about strings in the next chapter. 

You passed in the "Hello, world\\n" **string** into the ``print`` method as an argument to specify the **string** we want to be displayed in the terminal; An argument is a piece of information that may be used in an program. We'll go into more detail about arguments in methods in later chapters.

However, "\\n" wasn't actually displayed when we ran the program. This is because "\\n" is a special type of character called an "escape sequence". "\\n" adds a new line to the terminal. 

If you build and run the program without "\\n", What ever is added next in the terminal will start on the same line as "Hello, world!". We'll find out more about escape sequences in later chapters.

The Vala Compiler
-----------------

.. code-block:: console
   
   $ valac main.vala

The line above is tells the Vala compiler to build the program with the code we've written in ``main.vala``.

This step is completely separate from running your code with ``./main`` or ``./main.exe``.

Once your program has been built successfully, we can run it any time without having to compile again.

The compiler program ``valac`` is fine for small projects however, once you start working on bigger, more complex projects, we'll introduce a build system that you'll work with instead of using ``valac`` directly.

The relationship between Vala and C
-----------------------------------

When you enter the command: ``valac main.vala``, ``valac`` performs the following steps:

1. Generate C Code from the Vala code we've written
2. Call the C Code compiler on installed on our system to build an binary executable from the generate C Code.

Normally, when compiling your code with ``valac``, you don't notice step 1 however, you can actually see the generated C code by adding the ``-C`` flag to ``valac`` commands.

If you run:

.. code-block:: console

   $ valac -C main.vala

Instead of an new exectuable file being created, a file called ``main.c`` will be created instead. This is the generated C code from step 1.

Details on working with C Code are out of the scope of this tutorial however, this is key to understanding how some of the language's features are possible later chapters.

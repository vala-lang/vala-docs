Variables
=========

In this section, we'll:

- Explain what a variable in Vala is
- Show you different ways of using variables

What's a variable?
------------------

A variable in Vala stores data and can be referred to using its identifier.

Here's an example of a variable below:

.. code-block:: vala
   
   string my_name = "Sara";

The line above is a variable assignment.

Let's breakdown each part of the variable assignment:

- ``string`` is the data type of the variable. The data type determines the values you are allowed to set the variable to. You used a **string** to tell the program what text to display in your terminal in your Hello World program.
- ``my_name`` is the identifier of the variable. To refer to the variable in your code, you need to use ``my_name``.
- ``"Sara"`` is the value of the variable.

Why use variables?
------------------

Some of the benefits of variables are:

- Making your code easier to read (An identifier can provide context to the value stores)
- Easily reusing the same value multiple times in your code

In the next sections of this chapter, you'll create multiple programs that use variables.

.. tip::
   
   There may be times when you don't want to or don't need to write the data type of the variable. 

   You can use the ``var`` keyword instead of the variables data type instead. When you do this, the compiler will automatically deterimine the data type of the variable for you.
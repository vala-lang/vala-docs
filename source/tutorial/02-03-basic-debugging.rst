Basic Debugging
===============

There may be moments where your code contains errors. Some of these errors will stop your code from compiling or operating correctly.

In this section, we will:

- Teach you some common types of errors you may encounter when creating Vala programs
- Provide you with tips on how to fix errors in Vala programs

Reusing your first program
--------------------------

You'll be reusing the Hello World program from our the previous section.

It looked like this:

.. code-block:: vala
   :caption: main.vala - A program that prints "Hello, world!" 

   public static void main () {
       print ("Hello, world!\n");
   }

Errors
------

You are now going to add errors to the Hello World program on purpose.

Replace the code written in ``main.vala`` with the code below:

.. code-block:: vala
   :caption: main.vala - A Hello World program with errors
   
   public static void main () {
       print (Hello, world)
   }

Now build the code with ``valac``.

You'll see the following error displayed:

.. code-block:: output
   
   main.vala:2.24-2.24: error: syntax error, following expression/statement delimiter `;' missing    
       2 |     print (Hello, world)    
         |                        ^
   Compilation failed: 1 error(s), 0 warning(s)

In Vala, a `syntax error` is when there the compiler doesn't read the a sequence of characters in our code in the order that it expected it.

We mentioned in the previous section that a semicolon (``;``) lets the compiler know when an expression has ended. The semiclolon is the "expression/statement" delimiter the syntax error is referring to.

``2.24-2.24`` refers to the location range in ``main.vala`` where the compiler spotted the error. It's in the format: ``START_LINE_NUMBER.CHARACTER_NUMBER-END_LINE_NUMBER.CHARACTER_NUMBER```.

You can use this to find help you navigate to exactly where the error occured in your code. 

.. tip::
   
   Your code editor may have features that that take you to the exact postiion in your code where, the compiler mentioned the error occured.

Add back the the semicolon to the end of the line so the compiler can read that line containing the ``print`` method:

.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       print (Hello, World);
   }

Now, try to build the Hello World program again.

.. code-block:: output
   
    main.vala:2.12-2.16: error: The name `Hello' does not exist in the context of `main'
        2 |     print (Hello, world);
          |            ^~~~~         
    main.vala:2.19-2.23: error: The name `world' does not exist in the context of `main'
        2 |     print (Hello, world);
          |                   ^~~~~  
    Compilation failed: 2 error(s), 0 warning(s)

The compiler is now able to read the line containing the ``print`` method and has now
discovered two new errors.

The speech marks (``""``) around ``Hello, world`` have been removed so, the compiler doesn't see
the string "Hello, World" anymore. Instead, it tried to find out if ``Hello`` and ``world`` have been
defined in the language or in our code anywhere but. The compiler fails to find definitions for ``Hello`` and ``world`` so the compiler displays multiple errors that that ``Hello`` and ``world`` do not exist.

You can fix this by adding back the speech marks to opening and closing speech marks to ``Hello, world`` so it looks like this: ``"Hello, world"``.

.. code-block:: vala
   :caption: main.vala

   public static void main () {
       print ("Hello, world");
   }

Now, when you try to build our code, it'll compile successfully.

However, running the code prints "Hello, world" without a new after it. Addition information added to the terminal continues right after "Hello, world".

Although the program is correct, the resulting ouptut is not what we wanted. This is a logic error.

This can be easily fixed by adding "\\n" at the end of "Hello, world" string.

.. code-block:: vala
   :caption: main.vala 
   
   public static void main () {
       print ("Hello, world\n")
   }

Now, if you compile and run the code, it prints "Hello, world" then, adds a new line.

Personalising the program
-------------------------

Now, you'll change the logic of the Hello World program so that it's unique to you.

Replace the word ""world" in the "Hello. world" string with your own name.

For somebody named "Colin", this is what their code would look like:

.. code-block:: vala
   :caption: main.vala

   public static void main () {
       print ("Hello, Colin\n");
   }

Now, if you compile and run the program, in your terminal, "Hello, ${YOUR_NAME}" will be printed.
The code block above will print: "Hello, Colin" to the terminal.

Describing what our code does
-----------------------------

Now that you've changed what our code does, you'll now explain what it does using comments.

.. code-block:: vala
   
   // In Vala, this line is a comment.

The ``//`` characters at the beginning of the line is tells the compiler that the line above is a comment.
so the compiler ignores the line when reading your code and moves on the next line.

You can use comments to describe what our code is doing. This is really helpful for:

- Explaining what the code that isn't obvious when just looking at it.
- Making easier for other people to understand what you're code is doing.
- Helping you remember what code does when reading it again after a long period of time.
- Explaining why the code was written.

Comments are one of the ways you can reduce errors in our code.

Now add a comment to your personalised Hello World program.

For somebody named "Colin", this is what their code would look like:

.. code-block:: vala
   :caption: main.vala

   // Prints the line "Hello, Colin" to the terminal."
   public static void main () {
       print ("Hello, Colin\n");
   }

In your code, you'd replace "Colin" with whatever name you used in your program.

If you compile and run the code now, nothing about how the program works will change.

Summary
-------

Congratulations! You've learned how to:

- Write your Vala program (Hello World)
- Compile a Vala program using ``valac``.
- Fix errors in your program by reading the compiler's error messages
- Add comments to your code

Now that you know how to fix errors, feel free to experiment with your Hello World program.

You've finished this chapter. In the next chapter we'll go into much more detail about 
data types such as: `int`, `string` and more, as well as teach you how to create more intresting programs using
control structures.

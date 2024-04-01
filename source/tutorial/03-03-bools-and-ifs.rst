Booleans and if-statements
==========================

In this section we'll:

- Teach you about boolean values and variables
- Introuduce a way to change the flow of a program based on a boolean value

Introudction to Booleans
------------------------

Light bulbs ultimately have two, mutually-exclusive states: ``on`` and ``off``. When a light bulb is ``on``, it has emits light. When a light bulb is ``off``, there is no light.

Sometimes, in our programs, we need to represent two mutually exclusive states. The boolean data type (``bool``) is how you we can do this.

Instead of ``on`` and ``off``, we'd use the ``true`` and ``false`` boolean values to represent two mutually-exclusive states.

We can store boolean values in variables:

.. code-block:: vala
   
   bool is_on = false;

Now, you'll write some actual code involving booleans. You'll need to create a new directory first:

1. Create a new directory called ``Booleans`` under your ``ValaProjects`` directory.
2. Create a new file called ``main.vala`` inside the ``Booleans`` directory you created.

In ``main.vala``, write the following code:

.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       print ("Hello!\n");
   }

If you compile and run the program, it will simply print "Hello!".

If-statement
------------

Let's make your program more interesting now.

Above the ``print`` method, add declare a boolean variable set to ``false``:

.. code-block:: vala
   :caption: main.vala - Boolean variable added

   public static void main () {
       bool should_print = false;
       print ("Hello!\n");
   }

We want the program above to only print "Hello" when the value of ``should_print`` is set to ``true``. You can do this by using a control statement called an ``if-statement``.

Update ``main.vala`` so that it wraps the print call with an ``if-statement``, that checks if the value of ``should_print`` is ``true``:

.. code-block:: vala
   
   public static void main () {
       bool should_print = false;

       if (should_print == true) {
          print ("Hello!\n");
       }
   }

Now compile and your code.

As you can see, nothing happens. Let's break down why:

.. code-block:: vala
   :emphasize-lines: 4, 6
   
   public static void main () {
       bool should_print = false;

       if (should_print == true) {
          print ("Hello!\n");
       }
   }

The highlighted lines are the ``if-statement``. 
``if`` is what you use to start the statement. The expression between the brackets (``()``)
evaluates a boolean value. If the evaluated boolean value is ``true``, the code between the curly braces (``{}``), will run.

Now set the ``should_print`` variable to ``true`` then compile and run the program again:


.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       bool should_print = true;

       if (should_print == true) {
           print ("Hello!\n");
       }
   }

The program above will print "Hello!".

Variable identifiers themselves also count as an expression. Let's take advantage of this to simplify our program a bit. 

Update ``main.vala`` so that the code looks like this:

.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       bool should_print = true;

       if (should_print) {
          print ("Hello!\n");
       }
   }

.. warning::
   
   For this to work effectively, you should take care in naming your variables. Name your variables semantically otherwise, your code will be harder to read than before.

   For example: if ``should_print`` was named ``first_name``, there would be two major issues:
   
   1. It's not clear that ``first_name`` is a boolean from the variable's idenitifer alone.
   2. The if statement doesn't read well: "If first name".

If-else statements
------------------

What if you wanted only wanted to run code that only runs when a variable is ``true`` and a different piece of code to run when that same variable is ``false``.

This is possible using if-else statements:

.. code-block:: vala

   bool is_on = false;

   if (is_on) {
       print ("Lights on!");
   } else {
       print ("Lights off!");
   }

Let's try this out. Modfiy ``main.vala`` to look like this:

.. code-block:: vala   
   :caption: main.vala
   
   public static void main () {
       bool should_print_hello = true;

       if (should_print_hello) {
          print ("Hello\n");
       } else {
          print ("Goodbye\n");
       }
   }

Now compile and run your code. "Hello" will be printed.

If you change the value of ``should_print_hello`` to ``false``, "Goodbye" will
be printed instead.

if-else-if statements
---------------------

We can keep adding more conditions to try using ``else if``.

Update ``main.vala`` with this code below:

.. code-block:: vala
   :caption: main.vala

   bool should_print_hello = true;
   bool should_print_name = true;

   if (should_print_hello && should_print_name) {
       print ("Hello, Vala\n");
   } else if (should_print_hello) {
       print ("Hello\n");
   } else if (should_print_name) {
       print ("Vala\n");
   } else {
       print ("Goodbye\n");
   }


The program will run the code in one of the ``if`` orr ``else if`` blocks if their conditions are met. 

If none of the conditions are met, the program will run the code in the ``else`` block.

.. note::

   ``&&`` is a conditional operator called the "Logical AND" operator
   The resulting value is ``true`` when both of the operator's (``&&``) operands are also true, otherwise, the resulting value is ``false``.

   We'll talk about conditional operators more very soon.

Discovering what the output of the program is based on the value of ``should_print_hello`` and ``should_print_name`` will be let as a challenge to you.

Conditional Operators
---------------------

Do you remember the logical AND (``&&``) operator? Well there are other operators like it. We'll show you a quick overview of them below:

.. code-block:: vala

   // Logical AND operator (&&)
   false && false; // false
   true && false // false
   false && true // false;
   true && true // true;

   // Logical OR operator (||)
   false || false; // false
   true || false // true
   false || true // true;
   true || true // true;

   // NOT operator (!)
   !false // true
   !true // false

   // Equality test (==)
   2 == 8 // false;
   2 == 2 // true;

   // Less than (<)
   4 < 2; // false; 
   2 < 4; // true;

   // Greater than (>)
   4 > 2; // true; 
   2 > 4; // false;

   // Less than or equal to (<=)
   4 <= 2; // false; 
   2 <= 4; // true;
   4 <= 4 // true

   // Greater than or equal to (>=)
   4 >= 2; // true; 
   2 >= 4; // false;
   4 >= 4 // true

As you can see, all of the operators above can be used to return a boolean value.
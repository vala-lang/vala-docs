Loops
=====

In this section we'll cover:

- While loops
- Do While Loops
- For Loops

You'll be create a new directory for the code you'll write in this section:

1. Create a directory called ``Loops`` in the ``ValaProjects`` directory.
2. Create a new file called ``main.vala`` in the the ``Loops`` directory that you created.

Introudcing the while Loop
---------------------------

Sometimes you may want to perform the same or very similiar code multiple times. One example of this is counting.

One of the ways you can do this is through using the ``while`` loop.

Add this code to your ``main.vala`` file:

.. code-block:: vala
   :caption: main.vala - Counts from 1 to 10

   public static void main () {
       bool has_counted_to_ten = false;
       int current_number = 1;
       while (has_counted_to_ten == false) {
           print ("%d\n", current_number);
           current_number = current_number + 1;
           has_counted_to_ten = current_number > 10;
       }
   }

Now, if you compile and run the program, you'll see this output:

.. code-block::
   
   1
   2
   3
   4
   5
   6
   7
   8
   9
   10

Let's break down how this works:

- The ``while`` loop takes in an boolean loop condition as its paremeter. The code inside the ``while`` block will run when that condition is ``true``.
- After each execution of the code inside the ``while`` block, if the loop condition is checked. If the condition is ``false``, the code the loop will end.

.. attention::
   
   If your loop condition is never ``false``, it will cause an infinite loop.

   This will result in varying levels of consequences, depending on what your code is doing within the loop.

   Please use loops with care. 


do-while Loop
~~~~~~~~~~~~~

For loops that you want to run at least once, you can use a do-while loop.

Modify ``main.vala`` too look like this:

.. code-block:: vala
   :caption: main.vala

   public static void main () {
       bool has_counted_to_ten = false;
       int current_number = 1;
   
       do {
           print ("%d\n", current_number);
           current_number = current_number + 1;
           has_counted_to_ten = current_number > 10;
       } while (has_counted_to_ten == false);
   }

The code above will produce the same output however, no matter what you change the value of ``current_number`` to, the value of ``current_number``will always be printed at least once. So even numbers greater than 10 (11, 20, 100) will be printed if set to ``current_number``.

For Loop
--------

The problem with the ``while`` loops are that they are error prone. We have to create our variables too keep track of the loop and to check against the end condtion.

However, if we use a ``for`` loop, a lot of the loop tracking logic and loop variables are ``for`` statement's parameter, making the code inside the loop, a lot simpler

Rewrite ``main.vala`` so that the code looks like this:

.. code-block:: vala
   :caption: main.vala

   public static void main () {
       for (int i = 0; i < 10; i++) {
           print ("%d\n", i + 1);
       }
   }

This code above also performs the same output but look at how many less lines of code it uses compared to the other loops to do the same thing.

Let's break this down too:

- The ``for`` loop's parameter combines the variable loop declaration, a loop continuation condition and code to run at the end of each loop, respectively, after each ``;``.
- Because of this, the code can just focus on the using the loop variable for printing the number in order.

Summary
-------

Congratualations! You've now finished this chapter.

To recap, you've learned:

- About variables and what they are used for
- Different types of data types like integers and boolean
- How to change the flow of programs using control statements such as: ``if`` and ``switch``.
- How to perform loops using loop statements such as ``while`` and ``for``.

The next chapter will be a project that will use some of the topics you've learned so far.

Now would be a good idea to revise and experiment with the topics we've covered in this tutorial up until now to improve your understanding with them.

Now, on to the next chapter!

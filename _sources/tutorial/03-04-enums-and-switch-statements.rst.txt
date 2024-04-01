Enums and switch statements
===========================

In this section we'll:

- Introduce the switch statement
- Introudce enum values
- Showcase how switch statements and enums work well togeter

Introducing Switch Statements
-----------------------------

In the last section, we introuduced ``if`` statements:

.. code-block:: vala
   
   bool is_on = true;
   if (is_on) {
       print ("The light bulb is on\n");
   }

However, there as you've seen with ``if`` statements, when you have several potential branches, it can become quite cumbersome to write:

.. code-block:: vala

   string lang_name = "Vala";

   print ("Programming Language Fact(s):\n\n");

   if (lang_name == "Vala") {
       print ("Vala first appeared in 2006\n");
   } else if (lang_name == "Rust") {
       print ("Rust's Mascot is a red crab\n");
   } else if (lang_name == "C++") {
       print ("First editiion of C++ was released around since 1985\n");
   } else if (lang_name == "C") {
       print ("C was created by Dennis Ritche")
   } else {
       print ("Goodbye\n");
   }

Notice that we're always checking the value of the ``lang_name`` variable with an eqality check ``lang_name == value``.

Rather than writing out the eqaulity check, for the same variable, every time, you can use a ``switch`` statement instead.

.. code-block:: vala
   
   string lang_name = "Vala";
   
   switch (lang_name) {
       case "Vala":
           print ("Vala first appeared in 2006\n");
           break;
       case "Rust":
           print ("Rust's Mascot is a red crab\n");
           break;
       case "C++":
           print ("First editiion of C++ was released around since 1985\n");
           break;
       case "C":
           print ("C was created by Dennis Ritche\n")
           break;
       default:
           print ("Goodbye\n");
           break;
   }

.. tip::
   
   The `elementary coding style <https://docs.elementary.io/develop/writing-apps/code-style>`_ recommends using a ``switch`` statement
   when checking the value of the same variable more than twice, in ``if`` statements.

``switch`` statements runs a section of code based on the value passed into it.
In this case, ``lang_name`` was passed into te ``switch`` statement so the value "Vala", will be compared against.

Each ``case`` is like an equality check for the value passed in. ``case "Vala"`` behaves similarly to ``if (lang_name == "Vala")``.
Then after the ``:`` of each ``case`` the section of code to run on the matching case is written.

To signal the end of the code to run, a ``break`` statement is used.

``default`` beahves like ``else``. It runs when no other cases match the value passed in. 

Taking Advantage of the Switch Fallthrough Behaviour
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In ``if`` statements, to run the same block of code based on a set of matching values, you would do somethhing like this:

.. code-block:: vala

   string lang_name = "Vala";
   
   if (lang_name == "Vala" || lang_name == "C") {
       print ("C was created by Dennis Ritche\n")
       print ("Vala compiles to C\n");
   }

As you can imagine, this can become pretty cumbersome to write as you add more matching values.

In ``switch`` statements, the syntax for this is much more concise, making it easier to expand the matching potential values over time:

.. code-block:: vala
   :emphasize-lines: 3-8
   
   string lang_name = "Vala";
   
   print ("Programming Language Fact(s):\n\n");

   switch (lang_name) {
       case "Vala":
       case "C":
           print ("C was created by Dennis Ritche\n")
           print ("Vala compiles to C\n");
           break;
       case "Rust":
           print ("Rust's Mascot is a red crab\n");
           break;
       case "C++":
           print ("First editiion of C++ was released around since 1985\n");
           break;
       default:
           print ("Goodbye\n");
           break;
   }

The "Vala" ``case`` has the "C" ``case`` directly under it. It runs the section of code under the "C" ``case``.
The same code would run if ``lang_name`` was set to "C" too. 

This is the the ``switch`` statement's **fallthrough** behaviour.

Enums
-----

Now, you'll write some actual code involving ``switch`` statements and value type called an Enumeration (``enum``):

First, you'll need to create a new directory for the code you'll write in this section:

1. Create a new directory called ``Switch`` under your ``ValaProjects`` directory.
2. Create a new file called ``main.vala`` inside the ``Switch`` directory you created.

In ``main.vala``, write the following code:

.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       string lang_name = "Vala";

       print ("Programming Language Fact(s):\n\n");
       
       switch (lang_name) {
           case "Vala":
           case "C":
               print ("C was created by Dennis Ritche\n");
               print ("Vala compiles to C\n");
               break;
           case "Rust":
               print ("Rust's Mascot is a red crab\n");
               break;
           case "C++":
               print ("First editiion of C++ was released around since 1985\n");
               break;
           default:
               print ("Goodbye\n");
               break;
       }
   }

Now, if you compile and run the code, it should print the following lines:

.. code-block::

   Programming Language Fact(s):

   C was created by Dennis Ritche
   Vala compiles to C

Writing your first enum
~~~~~~~~~~~~~~~~~~~~~~~

In our code, ``lang_name`` can be reduced to a specific set of related, mutually exclusive values.

We can take advantage of this by enumerating these values by creating a new ``enum``.

Add an ``enum`` declaration to the top of ``main.vala`` so that
the code looks like this below:

.. code-block:: vala
   :caption: main.vala
   :emphasize-lines: 1-6 

   public enum Language {
       VALA, // Vala
       C, // C
       RUST, // Rust
       CPP, // C++
   }
   
   public static void main () {
       string lang_name = "Vala";

       print ("Programming Language Fact(s):\n\n");
   
       switch (lang_name) {
           case "Vala":
           case "C":
               print ("C was created by Dennis Ritche\n");
               print ("Vala compiles to C\n");
               break;
           case "Rust":
               print ("Rust's Mascot is a red crab\n");
               break;
           case "C++":
               print ("First editiion of C++ was released around since 1985\n");
               break;
           default:
               print ("Goodbye\n");
               break;
       }
   }

By default, each field in the ``Language`` enum has the value of an integer number, starting from ``0`` ascending.
That is how enums are handled in the program however as humans, we can ignore that and simply take advantage of the 
fact that we can use identifiers to specify a value.

Rather than using literal values, we can use enums to specify the exactly value that we want. Enums are
checked and recognised by the compiler and they are included in autocomplete suggestions. Because of this, using enums
can reduce potential mistakes we can make in our code.

They also work well with ``switch`` statements. Update ``main.vala`` to look like this below:

.. code-block:: vala
   :caption: main.vala
   
   public enum Language {
       VALA, // Vala
       C, // C
       RUST, // Rust
       CPP, // C++
   }
   
   public static void main () {
       Language chosen_language = Language.VALA;
   
       print ("Programming Language Fact(s):\n\n");

       switch (chosen_language) {
           case Language.VALA:
           case Language.C:
               print ("C was created by Dennis Ritche\n");
               print ("Vala compiles to C\n");
               break;
           case Language.RUST:
               print ("Rust's Mascot is a red crab\n");
               break;
           case Language.CPP:
               print ("First editiion of C++ was released around since 1985\n");
               break;
           default:
               print ("Goodbye\n");
               break;
       }
   }

If you compile and run the program now, you should still get the same output:

.. code-block::

   Programming Language Fact(s):

   C was created by Dennis Ritche
   Vala compiles to C


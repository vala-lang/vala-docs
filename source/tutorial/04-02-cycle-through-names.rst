Cycle through names
====================

Add parrots
-----------

First, add an array of names for each parrot:

.. code-block:: vala
    :emphasize-lines: 2

    public static void main () {
        string[] parrot_names = {"Jurg", "Raffaele", "Dani"};

        print ("Enter your phrase: ");

        string input = stdin.read_line ();

        if (input != null) {
            print ("Your phrase: %s\n", input);
        }
    }

Now let's use the ``for`` loop to make each parrot repeat the entered phrase.

.. code-block:: vala
    :emphasize-lines: 8-14

    public static void main () {
        string[] parrot_names = {"Jurg", "Raffaele", "Dani"};

        print ("Enter your phrase: ");

        string input = stdin.read_line ();

        if (input == null) {
            return;
        }

        for (int i = 0; i < parrot_names.length; i++) {
            print (@"$(parrot_names[i]) says: $input\n");
        }
    }

.. note::

    Template strings were used inside the for loop

    Template strings allow you to print variable values in-line in a string.
    We'll cover these in more detail in a later section.

After compilng this program, for the input "It is what it is",
the following output will be displayed: 

.. code-block:: output

    Jurg says: It is what it is
    Raffaele says: It is what it is
    Dani says: It is what it is

Refactoring
-----------

The program will always loop through every parrot name. Because of this, we can
replace the ``for`` loop block with  a simpler ``foreach`` loop block:

.. code-block:: vala
    :emphasize-lines: 12-14

    public static void main () {
        string[] parrot_names = {"Jurg", "Raffaele", "Dani"};

        print ("Enter your phrase: ");

        string input = stdin.read_line ();

        if (input == null) {
            return;
        }

        foreach (string name in parrot_names) {
            print (@"$name says: $input\n");
        }
    }

Now if you compile and run this program again, you should it should work
exactly the same.

This process of improving the program's code is called `refactoring`.

Summary
-------

Congratualations! You've now finished this chapter.

To recap, you've learned:

- Thing 1
- Thing 2
- Thing 3

-- INSERT CHAPTER END MESSAGE HERE --

Now, on to the next chapter!

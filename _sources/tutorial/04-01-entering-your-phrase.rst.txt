Entering your phrase
====================

To begin, we'll start off by introduce input and ouput streams.

Introducing Input and Output Streams
------------------------------------

Each time you've used ``print()``, you've actually been printing to an output stream.
Whatever data that you send to the output stream ends up being printed to the terminal that you're running the program on.

However, if you want to enter data into the terminal that gets entered into the program,
you can use an input stream.

In the parrot program, we'll use the standard input stream to enter data into our program from our terminal.


To do this, you'll need to:

- Set the value of a ``string`` variable to to a ``stdin.read_line ()`` method call
- Check if the string is not ``null`` in case something went wrong in the process of getting data from the terminal to the program. (We'll learn more about the ``null`` later in this tutorial)
- Print the value of the string variable that stored the value of the ``stdin.read_line ()`` method call.

.. note::
   
   ``stdin.read_line ()`` reads the first line of text where data is entered only.


.. code-block:: vala
   :caption: main.vala
   
   public static void main () {
       print ("Enter your phrase: ");
   
       string input = stdin.read_line ();
   
       if (input != null) {
           print ("Your phrase: %s\n", input);
       }
   }

Now, compile and run this program.

Your terminal should display this:

.. code-block:: output
   
   Enter your phrase: 


You may even see a blinking cursor too.

At this point, you can now enter the phrase that you want to be used in the program, with your keyboard. 

In the code examples for this project, the phrase entered will be "Do Vala, do future".

After entering your phrase, the program will then: 

1. Output "Your phrase:" followed by the phrase that you just entered
2. Exit

.. code-block:: output

   Enter your phrase: Do Vala, do future
   Your phrase: Do Vala, do future

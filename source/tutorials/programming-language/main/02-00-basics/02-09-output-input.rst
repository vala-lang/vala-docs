Output to the console
-------------------------------

Stdout
------------

You already know *stdout.printf()* from the *Hello World* example.  Actually, it can take an arbitrary number of arguments of different types, whereas the first argument is a *format string*, following the same rules as `C format strings <http://en.wikipedia.org/wiki/Printf>`_. If you must output an error message you can use *stderr.printf()* instead of *stdout.printf()*.

To print a message to the console, you can use the *stdout.printf()* function or *print()* function. This function is similar to the *printf()* function in C. The *stdout.printf()* function takes a format string and a list of arguments. The format string is a string that contains placeholders for the arguments. The placeholders are replaced with the values of the arguments when the function is called. 

.. code-block:: vala

   stdout.printf("Hello, world\n");
   print("Hello, world\n");
   stdout.printf("%d %g %s\n", 42, 3.1415, "Vala");

Stderr
------------

To print an error message to the console, you can use *stderr.printf()* functions instead of *stdout.printf()* function. or you can use *printerr()* function. 

.. code-block:: vala

   stderr.printf("I'm an error message !");
   printerr("I'm an error message !");

for debugging message vala provides ``debug()``, ``message()``, ``warning()`` and ``critical()`` functions. 

.. code-block:: vala

   message("I'm a message !");
   warning("I'm a warning !");
   critical("I'm a critical message !");

You can change the format of the debug message with Log.set_default_handler() function.


Stdin
------------

To read a line from the console, you can use the *stdin.read_line()* function. This function reads a line from the console and returns it as a string.

.. code-block:: vala

    string? line;
    while ((line = stdin.read_line()) != null) {
        stdout.printf("You entered: %s\n", line);
    }

Or use *stdin.scanf()* function to read formatted input from the console.

.. code-block:: vala

    int day, month, year;
    stdout.printf("Enter your birthday (dd/mm/yyyy): ");
    stdin.scanf("%d/%d/%d", out day, out month, out year);
    stdout.printf("You were born on %d/%d/%d\n", day, month, year);


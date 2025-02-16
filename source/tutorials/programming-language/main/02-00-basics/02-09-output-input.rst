Output / Input
=================

Stdout
---------

You already know *stdout.printf()* from the *Hello World* example.  Actually, it can take an arbitrary number of arguments of different types, whereas the first argument is a *format string*, following the same rules as `C format strings <http://en.wikipedia.org/wiki/Printf>`_. If you must output an error message you can use *stderr.printf()* instead of *stdout.printf()*.

To print a message to the console, you can use the *stdout.printf()* function or *print()* function. This function is similar to the *printf()* function in C. The *stdout.printf()* function takes a format string and a list of arguments. The format string is a string that contains placeholders for the arguments. The placeholders are replaced with the values of the arguments when the function is called. 

.. code-block:: vala

   stdout.printf("Hello, world\n");
   print("Hello, world\n");
   stdout.printf("%d %g %s\n", 42, 3.1415, "Vala");

Stderr
---------

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
-------

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

.. warning::

   if you want ``stdin.scanf()`` with %s format, you must create a buffer to store the input. 

    .. code-block:: vala

        uint8 buffer[128];
        stdin.scanf("%s", out buffer);
        stdout.printf("You entered: %s\n", (string)buffer);
    
    if you don't create a buffer or too small, you will get a segmentation fault.


Opening Files
---------------

To open a file, you can use the *FileStream.open()* function. This function takes the name of the file and the mode in which you want to open the file. The mode can be one of the following:

.. code-block:: vala

    var fs = FileStream.open("toto.txt", "r");
    if (fs == null) {
        print("Cannot open file");
        return ;
    }

    string ?line = null;
    while ((line = fs.read_line()) != null) {
        print(line);
    }


.. list-table::
   :widths: 5 60 
   :header-rows: 1

   * - Mode
     - Description
   * - `r`
     - Open text file for reading. The stream is positioned at the beginning of the file.
   * - `r+`
     - Open for reading and writing. The stream is positioned at the beginning of the file.
   * - `w`
     - Truncate file to zero length or create text file for writing. The stream is positioned at the beginning of the file.
   * - `w+`
     - Open for reading and writing. The file is created if it does not exist, otherwise it is truncated. The stream is positioned at the beginning of the file.
   * - `a`
     - Open for appending (writing at end of file). The file is created if it does not exist. The stream is positioned at the end of the file.
   * - `a+`
     - Open for reading and appending (writing at end of file). The file is created if it does not exist. Output is always appended to the end of the file. POSIX is silent on what the initial read position is when using this mode. For glibc, the initial file position for reading is at the beginning of the file, but for Android/BSD/MacOS, the initial file position for reading is at the end of the file.


You can use *FileUtils.get_contents()* and *FileUtils.set_contents()* functions to read and write the content of a file.

.. code-block:: vala

    string content;
    FileUtils.get_contents("my_text.txt", out content);
    // get all content of the file

    string new_content = content.replace("a", "b");
    // replace all 'a' by 'b' and set the new content to the file
    FileUtils.set_contents("my_text.txt", new_content);

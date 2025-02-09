Console Input / Output
======================

C#

.. code-block:: csharp

   System.Console.WriteLine("Hi!");
   System.Console.Write("Please enter your name: ");
   var name = System.Console.ReadLine();
   System.Console.WriteLine("Welcome, {0}!", name);

Vala

.. code-block:: vala

   stdout.printf ("Hi!\n");
   stdout.printf ("Please enter your name: ");
   var name = stdin.read_line ();
   stdout.printf ("Welcome, %s!\n", name);

``printf`` uses the same `format specifiers <http://en.wikipedia.org/wiki/Printf>`_
as the C function.
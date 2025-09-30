List Sample
===========

A dynamic length `ArrayList <https://valadoc.org/gee-0.8/Gee.ArrayList.html>`_

.. code-block:: vala

   using Gee;

   void main () {
       var list = new ArrayList<int> ();
       list.add (1);
       list.add (2);
       list.add (5);
       list.add (4);
       list.insert (2, 3);
       list.remove_at (3);
       foreach (int i in list) {
           stdout.printf ("%d\n", i);
       }
       list[2] = 10;                       // same as list.set (2, 10)
       stdout.printf ("%d\n", list[2]);    // same as list.get (2)
   }

Compile and Run
---------------

.. code-block:: bash

   $ valac --pkg gee-0.8 gee-list.vala
   $ ./gee-list

You can use any type fitting into the size of a pointer (e.g. int, bool,
reference types) directly as generic type argument: ``bool``, ``int``, ``string``,
``MyObject``. Other types must be "boxed" by appending a question mark: ``float?``,
``double?``, ``MyStruct?``. The compiler will tell you this if necessary.
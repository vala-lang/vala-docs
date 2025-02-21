Set Sample
==========

`Sets <https://valadoc.org/gee-0.8/Gee.HashSet.html>`_ are unordered and do not
contain duplicate elements.

.. code-block:: vala

   using Gee;

   void main () {
       var my_set = new HashSet<string> ();
       my_set.add ("one");
       my_set.add ("two");
       my_set.add ("three");
       my_set.add ("two");         // will not be added because it's a duplicate
       foreach (string s in my_set) {
           stdout.printf ("%s\n", s);
       }
   }

Compile and Run
---------------

.. code-block:: bash

   $ valac --pkg gee-0.8 gee-set.vala
   $ ./gee-set
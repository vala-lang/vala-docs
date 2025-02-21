Implementing your own Iterable
==============================

You will have to implement two interfaces: `Iterable <https://valadoc.org/gee-0.8/Gee.Iterable.html>`_
with an ``iterator ()`` method and an element_type property as well as an Iterator.

.. literalinclude:: ../assets/iterable.vala
   :language: vala

Compile and Run
---------------

.. code-block:: bash

   $ valac --pkg gee-0.8 iterable.vala
   $ ./iterable

You could even add an each () method for Ruby or Groovy style iteration.

.. code-block:: vala

   public class Range : Object, Iterable<int> {

       // ... (as above)

       public delegate void RangeEachFunc (int i);

       public void each (RangeEachFunc each_func) {
           foreach (int i in this) {
               each_func (i);
           }
       }
   }

   void main () {
       // Pass an anonymous function as parameter
       new Range (10, 20).each ((i) => {
           stdout.printf ("%d\n", i);
       });
   }

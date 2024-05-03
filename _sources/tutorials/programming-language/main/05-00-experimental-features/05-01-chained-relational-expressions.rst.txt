Chained Relational Expressions
==============================

.. danger::

   Experimental Feature

This feature allows you to write complex relational expressions like

.. code-block:: vala

   if (1 < a && a < 5) {}

   if (0 < a && a < b && b < c && c < d && d < 255) {
       // do something
   }

in a more natural way:

.. code-block:: vala

   if (1 < a < 5) {}

   if (0 < a < b < c < d < 255) {
       // do something
   }


Weak References
===============

Vala's memory management is based on automatic reference counting.  Each time an object is assigned to a variable its internal reference count is increased by 1, each time a variable referencing an object goes out of scope its internal reference count is decreased by 1. If the reference count reaches 0 the object will be freed.

However, it is possible to form a reference cycle with your data structures.  For example, with a tree data structure where a child node holds a reference to its parent and vice versa, or a doubly-linked list where each element holds a reference to its predecessor and the predecessor holds a reference to its successor.

In these cases objects could keep themselves alive simply by referencing to each other, even though they should be freed. To break such a reference cycle you can use the ``weak`` modifier for one of the references:

.. code-block:: vala

   class Node {
       public weak Node prev;
       public Node next;
   }

This topic is explained in detail on this page: `Memory Management <https://wiki.gnome.org/Projects/Vala/ReferenceHandling>`_.


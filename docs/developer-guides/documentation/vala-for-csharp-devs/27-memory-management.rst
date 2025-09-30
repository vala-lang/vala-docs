Memory Management
=================

C#: Garbage collection

Vala: Automatic reference counting

This has both `advantages and disadvantages <https://en.wikipedia.org/wiki/Reference_counting#Advantages_and_disadvantages>`_.
Reference counting is deterministic, but you can form reference cycles in some
cases. In these cases you must use `weak references <https://en.wikipedia.org/wiki/Weak_reference>`_
in order to break those cycles. The Vala keyword for this is ``weak``.

See `Vala's Memory Management Explained <https://wiki.gnome.org/Projects/Vala/ReferenceHandling>`_
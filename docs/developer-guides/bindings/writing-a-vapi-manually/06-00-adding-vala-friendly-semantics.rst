Adding Vala Friendly Semantics
==============================
All bound methods should be public unless working around some awkward situation. The Vala compiler does not respect visibility in VAPI files, so defining private methods simply prevents them from appearing in Valadoc, not from being accessible.

Vala has some special method names that allow the method to be used with Vala syntax. Differences between C and Vala can be captured using the ``CCode`` attribute.

.. toctree::
   :maxdepth: 2
   :glob:

   06-00-adding-vala-friendly-semantics/*
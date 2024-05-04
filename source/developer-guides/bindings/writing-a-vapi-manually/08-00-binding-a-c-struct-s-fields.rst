Binding a C Struct's Fields
===========================

Compact classes, structs, and simple-type structs may have fields. Often, classes will be opaque; that is, there will be no information about the contents of the class. If so, skip this section. When binding fields, first check that there are no getter/setter functions of the same names (see :doc:`Properties <../06-00-adding-vala-friendly-semantics/properties>`). Often times, the details of the structure are in the header, but not intended for public consumption; avoid binding variables that should not be accessed. Consult the documentation.

.. toctree::
   :maxdepth: 2
   :glob:

   08-00-binding-a-c-struct-s-fields/*
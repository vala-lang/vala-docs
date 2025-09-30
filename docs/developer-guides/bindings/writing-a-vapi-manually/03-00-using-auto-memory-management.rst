Using Vala's Automatic Memory Management
========================================

When writing Vala code, including code using a C library, memory management is handled by the Vala compiler. There is usually no need to manually claim and free memory. When writing a binding, however, it is an important part of the process to accurately instruct the Vala compiler how to use the C library's memory management calls. This is a one time job and means anyone then using the binding can take advantage of a binding that is much easier to write code for.

Vala's memory allocation and types are a bit more involved than most languages. In Python, everything is a dynamically-typed object and it is allocated out of the ether then gets garbage collected. In C, memory allocation is largely handled by the user and types are simply descriptions of memory considered at compile time. Vala lives somewhere trying to cover all the bases at once. Importantly, the types in Vala imply something about the memory management.

There are 4 memory management schemes in Vala:

+-------------------+--------------------+--------------+---------------+
|    **Scheme**     | **Memory Manager** | **Helpers?** | **Copy Cost** |
+===================+====================+==============+===============+
| Values            | C compiler         | No           | Cheap         |
+-------------------+--------------------+--------------+---------------+
| Parented          | C compiler         | Yes          | Expensive     |
+-------------------+--------------------+--------------+---------------+
| Singly-Owned      | Heap allocator     | Yes          | Expensive     |
+-------------------+--------------------+--------------+---------------+
| Reference-Counted | Heap allocator     | Yes          | Cheap         |
+-------------------+--------------------+--------------+---------------+

.. toctree::
   :maxdepth: 2
   :glob:

   03-00-using-auto-memory-management/*
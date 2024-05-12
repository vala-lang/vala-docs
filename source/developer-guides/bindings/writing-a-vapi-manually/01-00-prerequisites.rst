Prerequisites
=============

To write the binding collect the following:

* a functional copy of the library with headers
* the documentation for the library, if such a thing exists
* the source, if possible
* examples or tutorials that you can use as tests for your binding

If the library is written in C++, you cannot bind it to Vala unless there is a separate C binding of the C++ library (e.g., LLVM).

If you are using vim, you may wish to add the following to your .vimrc:

.. code-block:: vim

   :noremap <F8> "gyiwO[CCode (cname = "<ESC>"gpa")]<ESC>

which allows you to insert an attribute to make it easier to rename a function by pressing F8 while your cursor is on the symbol.


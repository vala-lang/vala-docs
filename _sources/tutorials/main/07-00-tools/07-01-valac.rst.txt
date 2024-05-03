valac
=====

``valac`` is the Vala compiler.  It's primary function is to transform Vala code into compilable C code.

You can generally ignore warnings from the C compiler when using Vala and just need to notice the warnings from ``valac``
Vala has better information than the C compiler, so it knows certain things are valid when the C compiler has no way of knowing that.

Unfortunately we can't just add casts everywhere since there are situations where we can't generate a valid cast (and, what's more, no way to know what those situations are).

For example, compiling the :doc:`Hello World program </tutorials/main/01-00-first-program/index>` will give us some warnings because ``valac`` by default generates code which is compatible with older versions of the ``GLib``.Some methods may have been deprecated in your new version of GLib so that C language compiler will warn you.

Imagine a machine with older glib version want to run your vala program!

valac could generate C code with target GLib version:

.. code-block:: console

   $ valac --target-glib auto hello.vala # It will use the latest version of GLib which may not be compatible

The recommended approach is to just disable those warnings by passing options to the C compiler:

.. code-block:: console

   $ valac -X -w hello.vala # Generated code is compatible, ``-X`` will pass ``-w`` to C compiler to disable all warnings.

You could set a alias in your bash/zsh/fish shell.

valac can also automate the entire build and link project in simple cases:

.. code-block:: console

   $ valac -o appname --pkg gee-1.0 file_name_1.vala file_name_2.vala

The ``-o`` switch requests that an object file is created, rather than just outputting C source files.  The ``--pkg`` option says that this build needs information from the *gee-1.0* package.  You do not need to specify details about what libraries to link in, the package has this information internally.  Finally, a list of source files is given.  If you need a more complicated build process, use the ``-C`` switch to generate C files instead of a binary, and continue the process manually, or through a script.

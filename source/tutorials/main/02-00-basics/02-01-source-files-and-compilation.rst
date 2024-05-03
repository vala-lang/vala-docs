Source Files and Compilation
============================

Vala code is written in files with *.vala* extensions.  Vala does not enforce as much structure as a language like Java - there are no concepts of packages or class files in the same way.  Instead structure is defined by text inside each file, describing the logical location of the code with constructs such as namespaces.  When you want to compile Vala code, you give the compiler a list of the files required, and Vala will work out how they fit together.

The upshot of all this is that you can put as many classes or functions into a file as you want, even combining parts of different namespaces in together.  This is not necessarily a good idea.  There are certain conventions you probably want to follow.  A good example of how to structure a project in Vala is the Vala project itself.

All source files for the same package are supplied as command line parameters to the Vala compiler ``valac``, along with compiler flags.  This works similarly to how Java source code is compiled.  For example:

.. code-block:: console

   $ valac compiler.vala --pkg libvala

will produce a binary with the name *compiler* that links with the package ``libvala``. In fact, this is how the *valac* compiler is produced!

If you want the binary to have a different name or if you have passed multiple source files to the compiler you can specify the binary name explicitly with the ``-o`` switch:

.. code-block:: console

   $ valac source1.vala source2.vala -o myprogram
   $ ./myprogram


If you give *valac* the ``-C`` switch, it won't compile your program into a binary file.  Instead it will output the intermediate C code for each of your Vala source files into a corresponding C source file, in this case *source1.c* and *source2.c*. If you look at the content of these files you can see that programming a class in Vala is equivalent to the same task in C, but a whole lot more succinct.  You will also notice that this class is registered dynamically in the running system.  This is a good example of the power of the GNOME platform, but as I've said before,   you do not need to know much about this to use Vala.

If you want to have a C header file for your project you can use the ``-H`` switch:

.. code-block:: console

   $ valac hello.vala -C -H hello.h


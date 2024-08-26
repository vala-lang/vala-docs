Command Line Tool
=================

.. warning::

   The ``valadoc`` command line tool may not be bundled with your installation of the Vala.
   You will need to find a way to install it on your operating system.

Usage:

.. code-block:: console

   valadoc [OPTION...] FILE...

Essential Options
-----------------

**-o,--directory=DIRECTORY**
   Output directory of the generated documentation.

   The name ofthe directory will also be used as the package name if a package name has not been explicitly
   set and cannot be derived from any other sources

**--package-name=NAME**
   Sets the name of the package of the generated documentation.

**--package-version=VERSION**
   Sets the package version of the generated documentation.

**--force**
   Force the doumentation to be generated, even if the output directory already exists.

   As stated in the :doc:`quick start guide </developer-guides/documentation/valadoc-guide/01-00-quick-start>`,
   with this option set, generated documentation is only addd or overwritten.

**--pkg=PAKAGE...**
   Speify bindings to inlude in th documentation via their package names.

**--version**
   Display the vesrion number of the valadoc tool.

**-h, --help**
   View the list of all of the commands and options that ``valadoc`` supports.

   You'll see additional options that aren't listed on this page when you use this option.


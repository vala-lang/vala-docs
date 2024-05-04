Environment Setup
=================

Compiling from the Source Repository
------------------------------------

The `Vala README.md <https://gitlab.gnome.org/GNOME/vala/blob/master/README.md>`_ file contains full and up to date instructions on how to download and compile Vala from the git repository.


Setting up your editor
--------------------------

A :doc:`list of IDE(s) </tooling/ide-support>` with Vala support is available.

Vala support is available also for `build tools and editors <Vala/Tools#Tool_Support>`_.


Coding Style
------------

The coding style used in Vala itself seems to be a variation of the GTK+ coding style.

* Tabs rather than spaces.
* Tab width unspecified, but 4 works well.
* Hanging braces.
* Cuddled else.
* Braces necessary for single-line blocks.
* Variable and method identifiers in lowercase, words seperated by underscores.
* Type identifiers in CamelCase.
* Enum members and constants in ALL_CAPS, words seperated by underscores.
* C-style `/* comments. */`
* Hungarian notation not used.
* Variables are often declared with implicit type (i.e. `var foo = new Foo ()`).
* No line-length limit.
* No function-length limit.
* Space between method name and parameters' opening parenthesis.
* Property `get`, `set`, `default` declaration all on one line, seperated by semicolons, if default implementations are used.
* If properties have implementations, then `get {`, `set {` open new lines.
* Attributes on their own line.
* JavaDoc-style commenting on types, methods, variables.
* Header at top of file contains:

.. code-block:: vala

   /* filename.vala
    *
    * Copyright (C) 20yy-20yy  Copyright Holder <email@address>
    *
    * License text.
    *
    * Author:
    * 	Programmer Name <programmer@email>
    */

Files
-----

Vala source files are named in the GTK+ style, i.e. all lowercase, with no separators between words, in the format namespaceclassname.vala. For example, the filename for Vala.FormalParameter is valaformalparameter.vala.

For the Vala compiler and library there is only one namespace, and it is called "Vala". Don't put "using Vala;"; instead qualify the name of types you declare. For example "class Vala.FormalParameter : Symbol".


Website, Mailing List, Bug Tracker, Matrix Room
-----------------------------------------------

* `<https://vala.dev>`_
* GNOME GitLab issues - `<https://gitlab.gnome.org/GNOME/vala/issues>`_
* `Vala Matrix Room <https://matrix.to/#/#vala:gnome.org>`_

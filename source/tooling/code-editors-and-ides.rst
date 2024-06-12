Code Editors and IDEs
=====================

Text editors with additional features for handling computer code can be called "code editors". The most fully featured ones are often called "integrated development environments". There are a number of editors that can handle Vala code. Many are listed below along with a list of features they implement.

.. note::
   
   This is a list of known code editors with some form of Vala support. There may be other editors not listed here that support Vala.  

.. list-table::
   :header-rows: 1

   * - Editor
     - Syntax Highlighting
     - Code Formatting
     - Static Code Analysis
     - Auto-completion
     - Jump to Definition
     - Integrated Documentation
     - Integrated Build, Test and Debug
     - Refactoring Tools
   * - `Anjuta <https://wiki.gnome.org/Apps/Anjuta>`_
     - Yes
     - 
     - Yes
     - Yes
     -
     -
     -
     -
   * - `elementary OS Code <https://github.com/elementary/code>`_
     - Yes
     -
     -
     -
     -
     -
     -
     -
   * - `Emacs <https://www.gnu.org/software/emacs/>`_
     - Yes
     -
     -
     -
     -
     -
     -
     -
   * - `Geany <http://www.geany.org/>`_
     - Yes
     -
     -
     - Yes
     - Yes
     -
     -
     -
   * - `gedit <https://gedit-technology.github.io/apps/gedit/>`_
     - Yes
     -
     -
     -
     -
     -
     -
     -
   * - `GNOME Builder <https://apps.gnome.org/Builder/>`_
     - Yes
     - Yes
     - Yes
     - Yes
     - Yes
     - Yes
     - Yes
     -
   * - `Helix <https://helix-editor.com/>`_
     - Yes
     - Yes
     - Yes
     - Yes
     - Yes
     -
     -
     -
   * - `IntelliJ IDEA <https://www.jetbrains.com/idea/>`_
     - Yes
     -
     -
     -
     -
     -
     -
     -
   * - `medit <https://mooedit.sourceforge.net/>`_
     - Yes
     -
     -
     -
     -
     -
     -
     -
   * - `Sublime Text <https://www.sublimetext.com/>`_
     - `Yes <https://packagecontrol.io/packages/Vala-TMBundle>`_
     -
     - `Yes <https://lsp.sublimetext.i`o/language_servers/#vala>`_
     - `Yes <https://lsp.sublimetext.io/language_servers/#vala>`_
     - `Yes <https://lsp.sublimetext.io/language_servers/#vala>`_ 
     - `Yes <https://lsp.sublimetext.io/language_servers/#vala>`_
     -
     -
   * - `TextMate <https://macromates.com/>`_
     - `Yes <https://github.com/technosophos/Vala-TMBundle>`_
     -
     - `Basic <https://github.com/technosophos/Vala-TMBundle>`_ 
     -
     -
     -
     -
     -
   * - `Vim <https://wiki.gnome.org/Projects/Vala/Tools/Vim>`_
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/Vim#Syntax_Highlighting>`_
     -
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/Vim#Static_Code_Analysis>`_
     -
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/Vim#Jump_to_Definition>`_
     -
     -
     -
   * - `VS Code <https://wiki.gnome.org/Projects/Vala/Tools/VisualStudioCode>`_
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/VisualStudioCode#Syntax_Highlighting>`_
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/VisualStudioCode#Code_Formatting>`_
     - `Yes <https://github.com/vala-lang/vala-language-server>`_
     - `Yes <https://github.com/vala-lang/vala-language-server>`_
     - `Yes <https://github.com/vala-lang/vala-language-server>`_
     - `Yes <https://imgur.com/KQKhCNY>`_
     - `Yes <https://wiki.gnome.org/Projects/Vala/Tools/VisualStudioCode#Debugging>`_ (`GDB <https://wiki.gnome.org/Projects/Vala/Tools/VisualStudioCode#Debugging>`_, `Meson <https://marketplace.visualstudio.com/items?itemName=mesonbuild.mesonbuild>`_)
     -

Syntax highlighting and code formatting affect the visual display of the code in the editor. For example syntax highlighting will color keywords differently to identifiers to make it easier to read the code. Code formatting will change indentation and spacing to match a given coding style, such as inserting a space between a function name and the opening parenthesis of its arguments.

Static code analysis shows diagnostic messages in the editor about syntax errors. These are usually the same messages that appear when compiling from the command line because many editors use ``libvala`` to analyse the code.

Auto-completion and jump to definition require the editor to parse the code in the project and store the locations where identifiers are defined. Auto-completion is often triggered with the ``CTRL + SPACE`` key combination. If there is more than one possible completion a list of options will usually appear. Jump to definition is used to navigate the project and read an identifiers' related code, such as the code block of a function definition.

Integrated documentation provides documentation for symbols in the editor. The documentation is likely to be from the same sources used by `Valadoc.org <https://valadoc.org>`_.

Integrated build, test and debug is probably best understood in relation to the `Red-Green-Refactor cycle <http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html>`_ of test driven development. The editor provides a user interface to make it easy to build the project or component, then run the test suite and see the test report. Tests that are failing can be run, step by step, through a debugger to identify why the code is not working as expected.

Refactoring tools provide support for techniques like extracting repeated code into a method or renaming an identifier to make its intent clearer.

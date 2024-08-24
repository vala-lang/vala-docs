Quick Start
===========

Basic Usage
-----------

.. warning::

   The ``valadoc`` command line tool may not be bundled with your installation of the Vala. To follow this
   example, install the ``valadoc`` tool in your operating system.

First find an empty directory/create a new directory.

Then, in the directory, create a file called ``lib.vala`` with the following contents:

.. code-block:: vala

   /**
    * Make Simon say any phrase that you enter.
    *
    * Example:
    * {{{
    * public static void main (string[] args) {
    *    print (simon_says ("Learn Valadoc!"));
    * }
    * }}}
    *
    * Will output:<<BR>>
    * Simon says: "Learn Valadoc!"
    *
    * @since 1.0.0
    */
    public string simon_says (string phrase) {
        return @"Simon says: \"$(phrase)\"";
    }

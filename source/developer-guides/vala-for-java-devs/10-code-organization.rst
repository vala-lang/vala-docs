Code Organization
-----------------

Files
-----

Java:
 - one toplevel class per file
 - file name resembles class name

Vala:
 - a Vala source file may contain multiple classes
 - file name doesn't need to resemble a class name

Hierarchy
--------

Java:
 - packages, represented by directory hierarchy
 - reverse domain name scheme

.. code-block:: java

    import javax.swing.*;

    package org.foo.bar;
    // ...

Vala:
 - namespaces, not related to directory hierarchy
 - no reverse domain name scheme

.. code-block:: vala

    using Gtk;

    namespace Foo.Bar {
        // ...
    }

Vala namespaces may contain methods without classes. They are implicitly static.

Default Import
--------------

Java:
 - package ``java.lang.*`` imported by default

Vala:
 - namespace ``GLib`` imported by default

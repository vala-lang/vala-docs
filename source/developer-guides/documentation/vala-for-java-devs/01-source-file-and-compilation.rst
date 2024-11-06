Source File and Compilation
============================

Source Files
------------

Java: ``*.java``

Vala: ``*.vala``

Compilation
-----------

Java: compiled to JVM byte code (``.class`` files)

.. code-block:: bash

   $ javac SourceFile1.java SourceFile2.java

Vala: compiled to native code via C code as intermediate code

.. code-block:: bash

   $ valac source1.vala source2.vala -o program

Vala's standard object system is GObject, compiled Vala libraries are valid C libraries.

Using Libraries
---------------

Java: ``.jar`` files

.. code-block:: bash

   $ javac -classpath foo-1.0.jar;bar-3.0.jar SourceFile.java

Vala: packages (C libraries with ``.vapi`` files)

.. code-block:: bash

   $ valac --pkg foo-1.0 --pkg bar-3.0 source.vala

Java:

.. code-block:: java

   import javax.swing.*;

   package org.foo.bar;

   // ...

Vala: namespaces, not related to directory hierarchy, no reverse domain name scheme

.. code-block:: vala

   using Gtk;

   namespace Foo.Bar {
       // ...
   }

Vala namespaces may contain methods without classes. They are implicitly static.

Default Import
--------------

Java: package ``java.lang.*`` imported by default

Vala: namespace ``GLib`` imported by default

Main Entry Point
----------------

Java: ``public static void main(String[] args)``

Vala: ``static int main (string[] args)``

May be outside a class, may be private, may return ``int`` (exit code), ``args`` argument is optional

INSERT IMAGE HERE
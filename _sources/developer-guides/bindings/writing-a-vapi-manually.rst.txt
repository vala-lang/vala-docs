Writing a VAPI Manually
=======================

This document intends to be a tutorial and reference on how to write a Vala binding to an existing C library. If the library uses GLib, do not follow this document. Instead read :doc:`Generating a VAPI with GObject Introspection </developer-guides/bindings/generating-a-vapi-with-gobject-introspection>`. A library may not follow the GLib coding practices precisely, but it is better to fix the library to work with GObject Introspection than to write a manual binding.

C programmers are a rather liberal bunch; certain procedures are done in a multitude of ways depending on the mood of the programmer, whereas Vala is much more restricted. This guide cannot possibly cover all possible cases of different APIs written by C programmers. It is your job to understand the C API and present it with Vala-friendly semantics.

There is a lot of material in this document and that can make it hard to take in at first. A practical approach to working through the tutorial would be to:

1. | Bind an enum first because enums are easy to test.

   | Once your test gives the expected result you know that the build process works. This means working through the "Getting Started" section and the "Enums and Flags" sub-section. Binding an enum also introduces the idea that there isn't a straight mapping from C to Vala

2. | Bind the creation and destruction of a compact class next.

   | This means working through the "Using Vala's Automatic Memory Management" section and starting to understand that a struct in C can be bound as either a simple type, a struct or a compact class in Vala. The binding can be tested by looking at the C code produced from a single line in Vala like ``new MyBoundCompactClass ();``

3. | Bind methods of the compact class.

   | This is when your binding starts to become useful and it will also give an overview of this document. Once you have an overview the document becomes more of a reference for solving tricky function bindings

The above assumes that the library is written in an object oriented style of C. A C binding, however, is only made up of structs and functions so understanding that in enough detail is the purpose of the approach.

.. toctree::
   :glob:
   :maxdepth: 1
   :numbered:

   writing-a-vapi-manually/*

Hackers' Guide to the Vala Compiler
===================================

The goal of this document is to provide a single point of information for developers interested in improving Vala.

It is hoped that this document will encourage more Vala users to contribute to Vala by finding/fixing bugs, writing documentation, writing test-cases, and implementing new features.

In the opinion of this document's author, a quality Vala 1.0 is an important part of the future of the GNOME Platform, because it will simplify the task of creating and maintaining excellent language-neutral libraries, which are necessary for the next generation of applications.

The Vala code is fresh, and easy to read. The variable and class names are descriptive, and one often has a general feel of what the code is supposed to do, so the sparse comments are generally not a problem. However, because it is a compiler, Vala is inevitably long, and its call stack deep. This document should provide a high-level view of how Vala is put together.

This document has been ported from docbook to this wiki in order to be team-maintained and more up-to-date with latest releases of the Vala compiler.

.. toctree::
   :glob:
   :maxdepth: 1
   :numbered:

   compiler-guide/*

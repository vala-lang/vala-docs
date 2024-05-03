Main Tutorial
=============

.. note::

   Vala is an ongoing project, and its features may change so feel free to help keep the docs up-to-date.

   You can press the edit button on the top of each page.

Introduction
------------

Disclaimer: Vala is an ongoing project, and its features may change.  I will try to keep this tutorial as up to date as I can, but I'm not perfect.  Also, I can't promise that the techniques which I suggest are necessarily the best in practice, but again I will try to keep up with that sort of thing.

What is Vala?
~~~~~~~~~~~~~

Vala is a new programming language that allows modern programming techniques to be used to write applications that run on the GNOME runtime libraries, particularly GLib and GObject.  This platform has long provided a very complete programming environment, with such features as a dynamic type system and assisted memory management.  Before Vala, the only ways to program for the platform were with the machine native C API, which exposes a lot of often unwanted detail, with a high level language that has an attendant virtual machine, such as Python or the Mono C# language, or alternatively, with C++ through a wrapper library.

Vala is different from all these other techniques, as it outputs C code which can be compiled to run with no extra library support beyond the GNOME platform.  This has several consequences, but most importantly:

* Programs written in Vala should have broadly similar performance to those written directly in C, whilst being easier and faster to write and maintain.
* A Vala application can do nothing that a C equivalent cannot.  Whilst Vala introduces a lot of language features that are not available in C, these are all mapped to C constructs, although they are often ones that are difficult or too time consuming to write directly.

As such, whilst Vala is a modern language with all of the features you would expect, it gains its power from an existing platform, and must in some ways comply with the rules set down by it.

Who is this tutorial for?
~~~~~~~~~~~~~~~~~~~~~~~~~

This tutorial will not go into depth about basic programming practices.  It will only briefly explain the principles of object-oriented programming, instead focusing on how Vala applies the concepts.  As such it will be helpful if you have experience of a variety of programming languages already, although in-depth knowledge of any particular one is not required.

Vala shares a lot of syntax with C#, but I will try to avoid describing features in terms of their similarity or differences with either C# or Java, with the aim of making the tutorial more accessible.

What will be useful is a reasonable understanding of C.  Whilst this isn't needed for understanding Vala per se, it is important to realise that Vala programs are executed as C, and will often interact with C libraries.  Knowledge of C will certainly make a deeper understanding of Vala far easier to come by.

Conventions
~~~~~~~~~~~

Code will be in ``monospaced text``, commands will all be prefaced with a ``$`` prompt.  Other than that, everything should be obvious.  I tend to code very explicitly, including some information that is actually implied.  I will try to explain where some things can be omitted, but that doesn't mean that I encourage you do to this.

At some point I will add in references to the Vala documentation, but that isn't really possible yet.

.. toctree::
   :numbered:
   :maxdepth: 1
   :glob:

   *

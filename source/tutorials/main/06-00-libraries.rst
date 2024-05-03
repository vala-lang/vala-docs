Libraries
=========

At the system level, a Vala library is exactly a C library, and so the same tools are used. In order to make the process simpler, and so that the Vala compiler can understand the process there is then an extra level of Vala specific information.

A "Vala library" is therefore, the system part:

* A system library (e.g. *libgee.so*)
* A *pkg-config* entry (e.g. *gee-1.0.pc*)

Both of which are installed in the standard locations. And the Vala specific files:

* A VAPI file (e.g. *gee-1.0.vapi*)
* An optional dependency file (e.g. *gee-1.0.deps*)

These files are explained later in this section. It should be noted that the library names are the same in the Vala specific files as in the *pkg-config* files.

.. toctree::
   :glob:
   :maxdepth: 2

   06-00-libraries/*



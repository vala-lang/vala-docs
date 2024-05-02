Binding Libraries with VAPI Files
=================================

VAPI files are descriptions of the public interface of external Vala libraries. When a library is written in Vala, this file is created by the Vala compiler, and basically an amalgamation of all public definitions from all Vala source files.  For a library written in C, the VAPI file gets more complicated, particular if the naming conventions of the library do not follow the GLib convention. The VAPI file will in this case contain many annotations describing how the standardised Vala interface mangles onto the C version.

This process of creating this generally amounts to three steps,

* Running *vala-gen-introspect* to extract metadata from the C library.
* Adding extra metadata to standardise the interface or make various other changes.
* Generating a VAPI file from the above sources using *vapigen*.

Specific instructions on how to generate bindings are in the :doc:`Vala Bindings Tutorial </tutorials/bindings>`.


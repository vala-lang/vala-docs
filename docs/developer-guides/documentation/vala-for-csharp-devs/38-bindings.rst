Bindings
========

Mono: runtime bindings (`wrappers`), GAPI tools, `.sources` files with XML syntax

Vala: no runtime bindings necessary, Vala method calls are direct C function
calls, mapped by `*.vapi` (Vala API) files with Vala syntax, annotated with
attributes like ``[CCode (...)]``

On Unix systems VAPI files are usually installed in

* `/usr/share/vala/vapi/` or
* `/usr/local/share/vala/vapi/`

Using a vapi file (e.g. foo-1.0.vapi):

.. code-block:: bash

   $ valac source.vala --pkg foo-1.0

The Vala compiler will additionally look for a corresponding `pkg-config <https://www.freedesktop.org/wiki/Software/pkg-config/>`_
file (`*.pc`) with the same base name (e.g. `foo-1.0.pc`), usually located in

* `/usr/lib/pkgconfig/` or
* `/usr/local/lib/pkgconfig/`

and pass its configuration to the C compiler if existing.

VAPI files are either `auto-generated <https://wiki.gnome.org/Projects/Vala/Bindings>`_
for GObject libraries or hand-written for non-GObject libraries.
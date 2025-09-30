Code Attributes
===============

Code attributes instruct the Vala compiler details about how the code is supposed to work on the target platform.  Their syntax is ``[AttributeName]`` or ``[AttributeName(param1 = value1, param2 = value2, ...)]``.

They are mostly used for bindings in *vapi* files, ``[CCode(...)]`` being the most prominent attribute here.  Another example is the ``[DBus(...)]`` attribute for exporting remote interfaces via `D-Bus <http://www.freedesktop.org/wiki/Software/dbus>`_.


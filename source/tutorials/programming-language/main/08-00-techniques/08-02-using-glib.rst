Using GLib
==========

GLib includes a large set of utilities, including wrappers for most of the standard libc functions and more.  These tools are available on all Vala platforms, even those which are not POSIX compliant.  For a complete description of all that GLib provides, see the `GLib Reference Manual <https://docs.gtk.org/glib/>`_. That reference is related to the C API for GLib, but it is mainly very simple to work out how to translate into Vala.

The GLib functions are available in Vala through the following naming convention:

+---------------+-------------------------+
| Language      | Code                    |
+===============+=========================+
| C             | ``g_topic_foobar()``    |
+---------------+-------------------------+
| Vala          | ``GLib.Topic.foobar()`` |
+---------------+-------------------------+

**Example:**

.. code-block:: vala

   GLib.Path.get_basename()

The GLib types can be used similarly:

.. code-block:: vala

   /* Instantiate with: */
   GLib.Foo foo = new GLib.Foo();

   /* Call an object member with: */
   foo.bar();

The APIs are not identical between C and Vala, but these naming rules should mean you can find the functions you need in the GLib VAPI files shipped with Vala, and from there find the parameters. This will hopefully suffice until more Vala documentation can be generated.

File Handling
-------------

For flexible file I/O and file handling see `GIO Samples <https://wiki.gnome.org/Projects/Vala/GIOSamples>`_.

You can also use !FileUtils.get_contents to load a file into a string.

.. code-block:: vala

   string content;
   FileUtils.get_contents("file.vala", out content);


Documentation and Valadoc.org
=============================

`Valadoc.org <https://valadoc.org>`_ is often the first website a Vala developer visits when seeking how to use a binding. A new VAPI commited to `Vala Extra VAPIs <https://gitlab.gnome.org/GNOME/vala-extra-vapis>`_ can be added to Valadoc.org by adding the VAPI to the `list of downloaded packages <https://github.com/Valadoc/valadoc-org/blob/main/documentation/packages.xml>`_ at Valadoc.org and submitting a pull request to the `Valadoc.org repository <https://github.com/Valadoc/valadoc-org>`_. See the `libcolumbus pull request <https://github.com/Valadoc/valadoc-org/pull/39>`_ as an example.

Valadoc.org is frequently re-generated. When Valadoc.org is re-generated VAPIs are pulled in from ``vala-extra-vapis`` and documentation generated from them. If no documentation comments are associated with a VAPI then Valadoc.org will only show the symbols in the VAPI. 

Add a documentation comment before a symbol in the VAPI. A documentation comment is a C multiline comment with an additional asterisk:

.. code-block:: vala

   /**
    * Brief description of class Foo
    *
    * Long description of class Foo, which can include an example
    */
   [CCode (cname = "foo", ref_function = "foo_retain", unref_function = "foo_release")]
   [Compact]
   public class Foo {
       // Details of binding
   }

The comments can include additional markup. Details are at `Valadoc Comment Markup <https://valadoc.org/markup>`_.

The documentation can be generated locally to test how it will appear. First, download and build ``valadoc``:

.. code-block:: shell

   git clone git://git.gnome.org/valadoc
   cd valadoc
   ./autogen.sh
   make
   make install

Second, generate the documentation:

.. code-block:: shell

   cd my_binding_directory
   valadoc --directory docs --force --package-name mybinding mybinding.vapi

This will generate the HTML documentation in the ``docs`` directory. ``valadoc`` expects the ``docs`` directory to not exist, but ``--force`` overrides this. ``--package-name mybinding`` will create a sub-directory called ``mybinding`` in ``docs`` that contains the generated documentation for ``mybinding.vapi``.

The locally generated documentation will have the same structure as ``valadoc.org``, although the visual styling may differ.


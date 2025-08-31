ABI and API Design Choices
==========================

ABI
---

``abit-compliance-checker`` is a cross-platform tool for checking the stability
of an ABI. Supported platforms are GNU/Linux, FreeBSD, Mac OS X and MS Windows. 
See `ABI Compliance Checker <https://lvc.github.io/abi-compliance-checker/>`_ for
more details.

The tool uses debug symbols to generate an ABI profile of a shared library:

.. code-block:: console

   abi-dumper my_library.so -o ABI-0.dump -lver 0

This is then repeated for the new version of the library:

.. code-block:: console

   abi-dumper my_library.so -o ABI-1.dump -lver 1

A report is then generated with:

.. code-block:: console

   abi-compliance-checker -l my_library -old ABI-0.dump -new ABI-1.dump

The report is an HTML file showing changes in the ABI. 
An `example report for Vala <https://abi-laboratory.pro/?view=timeline&l=vala>`_ is available online.

API Design
----------

Avoid Custom Constructors
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example contains a custom constructors:

.. code-block:: vala

   public class MyClass : Object {
       private string value;   
   
       public MyClass (string contents) {
           value = contents;
       }
   } 
    
    
This will be translated to C as the function name ``my_class_new`` and can be called with a string argument to create the object.

The problem is GObject has an alternative way of creating an object. In Vala this is of the form:

.. code-block:: vala

   void main () {
       Object.new (typeof(MyClass));
   }

The Vala ``Object.new`` method is bound to GObject `g_object_new <https://docs.gtk.org/gobject/ctor.Object.new.html>`_ function in C and is often used to instantiate GObjects.
This can be from C, but also from languages using GObject introspection bindings. The problem is the construction defined Vala is not called.

Vala does have a way to run a function at instantiation time that is the use of the construct {} in the class.
See :doc:`GObject Style Construction page </tutorials/programming-language/main/03-00-object-oriented-programming/03-14-gobject-style-construction>` 
in the :doc:`Vala Main Tutorial </tutorials/programming-language/main>` in the Vala tutorial.

Avoid Using varargs
~~~~~~~~~~~~~~~~~~~

A function with a variable number of arguments is not introspectable. 
Although the GObject Introspection Repository will contain a method or function that can be called with a variable
number of arguments, the method or function will be marked as ``introspectable="0"``. This causes binding generators to
ignore the method or function. In Vala this can be overridden using ``skip = false`` in the metadata, but such 
techniques are not available in all bindings.

Avoid Using Generics
~~~~~~~~~~~~~~~~~~~~

Since GObject Introspection does not handle generics, using them in APIs is harmful, since GI will generate 3 new
parameters in the constructors of each generic class: one for the GType function, one for the duplication function and
another for the destruction. These parameters are quite complicated to handle in languages like Python or Javascript.

In addition to this, the properties that expose the generic type parameter will be exposed as several objects of the ``gpointer`` type, which makes it
even more complicated. Even generic methods like Gee's ``add ()`` will expect a ``gpointer`` in GI, so doing something like 
this in Python will result in an error, contrary to what you expect.

.. code-block:: python

   list = get_a_list_of_strings ()
   list.add ('Hi')

Further Reading
---------------

- `APIs, like diamonds, are forever <http://essentials.xebia.com/apis-are-forever/>`_ - some criteria for good API design
- `Libraries in Vala - ABI compatibility - part I <https://blog.piechotka.com.pl/2013/07/30/libraries-in-vala-abi-compatibility-part-i/>`_
- `Libraries in Vala - ABI compatibility - part II <https://blog.piechotka.com.pl/2013/12/20/libraries-in-vala-abi-compatibility-part-ii/>`_
- `Writing Bindable APIs (GObject Intropsection) <https://gi.readthedocs.io/en/latest/writingbindableapis.html>`_
- `Minimalistic example of the GLib's GBoxedType usage <https://storageapis.wordpress.com/2014/07/25/minimalistic-example-of-the-glibs-gboxedtype-usage/>`_ - explanation of basic types when used with GObject Introspection
  and how to bind structs

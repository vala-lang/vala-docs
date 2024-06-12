Vala FAQ 
========


Why have you created a whole new programming language? Why didn't you just use C++, C#, D, Java, Python,...? 
------------------------------------------------------------------------------------------------------------

The type system of GObject doesn't fit perfectly well with the type system of any existing programming language. Vala is designed for GObject, this makes it easy to develop GObject-based libraries with Vala that can be used from a variety of other languages and runtime environments just like all the other GObject-based libraries out there. Just like Qt's Meta````Object is an extension to C++ to provide signals, slots, and object properties, Vala is a modification of C# to better match the GObject type system. We want to use the same syntax as C# wherever it makes sense to keep the entry barrier low.

How can I use Vala libraries from C, C++, C#, D, Java, Python,...?
------------------------------------------------------------------

You can always use Vala libraries just like they were GObject/C libraries, they provide C header files and use GObject for all classes. In contrast to C, Vala generates `GObjectIntrospection <https://gi.readthedocs.io/en/latest/index.html>`_ metadata for you so you do not need to care about binding your libraries to any language for which gobject-introspection `support exists <https://wiki.gnome.org/action/show/Projects/GObjectIntrospection/Users>`_. 

How does the performance of Vala applications compare to other applications?
----------------------------------------------------------------------------

The performance should be pretty similar to GObject/C-based code as there is no Vala-specific runtime library/environment that needs to be loaded. The C compiler can also apply the same optimizations on Vala-generated C code and plain GObject/C code. The Vala compiler uses reference counting in more places than most GObject/C-based applications do. However, Vala allows to fine-tune that easily in performance-critical sections with the ``weak`` modifier.

Vala is quite similiar to C#. Do you plan to replace Mono?
----------------------------------------------------------

Vala wants to be a convenient tool for creating libraries which can be consumed by any programming language supported by the GNOME platform - including Mono. Vala tries to integrate, not to separate.

What does "string? foo" mean?
-----------------------------

The ?-modifier tells the vala compiler that a passed or returned value may be ``null``.

Can I use keywords as identifiers?
----------------------------------

Yes, if you prepend the identifier with an '@'.

Why do I have to inherit from GObject?
--------------------------------------

Since Vala is based on GObject it's needed to inherit almost every class from GObject. However, it's not mandatory, but if you don't inherit, you will only get a very restricted class. Unless you know what you're doing you want to inherit from GObject. The ../BasicSample shows how to achieve a full-featured class.

Can I use pointer arithmetic inside strings?
--------------------------------------------

If I write this, I get an error:

.. code-block:: vala

   string a = "baer";
   a[1] = 'e';
   stdout.printf ("%s\n", a);

A vala string is a ``char\*`` if I look at the C version. Why isn't it allowed, and what is the solution?

One reason why it's not allowed is that Vala strings are encoded in
UTF-8, which uses a variable number of bytes per character. This means
that replacing a single character as in your example might require
resizing the string, which we don't want to happen implicitly.

There are two possibilities how to modify strings in Vala. The
recommended way is to use the GLib.!StringBuilder class, which is a
binding for GString. The other possibility is to use raw pointers just
like in C, however, you have to care about encoding and memory
management yourself, then.

.. code-block:: vala

   char* str_ptr = new char[64];
   str_ptr[0] = 'e';
   string str = (string) str_ptr;
   delete str_ptr;

(`source <http://mail.gnome.org/archives/vala-list/2008-April/msg00058.html>`_)

How to test if an object is some class or subclass?
---------------------------------------------------

Use the "``is``" operator.

.. code-block:: vala

   var wi = Gtk.Button();
   if (wi is Gtk.Widget)
       stdout.printf("Is a Widget.\n");
   if (wi is Gtk.Button)
       stdout.printf("Is a Button.\n");

Works with interfaces too. 

How to force cast an object from one type to another type?
----------------------------------------------------------

Use "``(Klass) object``".

.. code-block:: vala

   Gtk.Button btn1 = (Gtk.Button) awidget;

Does Vala have a preprocessor?
------------------------------

Starting with version 0.7.0, Vala supports the preprocessing directives ``#if``, ``#elif``, ``#else``, and ``#endif``. The supported operators for conditionals are ``==``, ``!``, ``&&`` and ``||``. There is no intention to ever support macros as found in the C preprocessor.

.. code-block:: vala

   int main (string[] args) {
   #if COND
     message ("COND IS DEFINED");
   #else
     message ("COND IS NOT DEFINED");
   #endif
     return 0;
   }

You must add ``-D COND`` to the valac command line to enable conditional compilation for the above example.

For more details see `Preprocessor - Vala Reference Manual <https://gnome.pages.gitlab.gnome.org/vala/manual/preprocessor.html>`_.

What does [SimpleType] and [Compact] in bindings mean?
------------------------------------------------------

Have a look at this graphic:

.. image:: assets/vala-structs-classes.png
   :alt: Vala SimpleType and Compact explanation diagram

NOTE 1: Structs are always shallow copied before they are passed to C functions. The difference with [SimpleType] is only at the C implementation, semantics in Vala don't change. This might not be very clear in the image above.

NOTE 2: Only GObject classes have gobject propertes (introspectable at runtime). This feature is not emphasized in the above image.

How do I read from stdin?
--------------------------

Allocating space for strings to be read in can be tricky. See :doc:`developer-guides/other/input-samples/` for an example.

How do I get the GType for something?
-------------------------------------

Try the ``typeof`` operator. Fx ``typeof(string)`` is a ``G_TYPE_STRING``.

Why do static members not get initialized?
------------------------------------------

There's currently `a bug <http://bugzilla.gnome.org/show_bug.cgi?id=543189>`_ about that. Unfortunately, due to C limitations and a missing coherent design for that, it's hard to implement.

You can work around this with a dummy instantiation before first access to a static class member:

.. code-block:: vala

   class Statico : Object {
   
       public static int test_value;
   
       static construct {
           test_value = 5;
       }
   }
   
   void main () {
       new Statico ();   // dummy instantiation
       stdout.printf ("%d\n", Statico.test_value);
   }

Why can't I chain up to base constructor?
-----------------------------------------

Often external libraries do not offer functionality for ``base()`` usage. Therefore you have to use GObject-based costruction using ``Object(prop1: value1, ...)``. As an example:

.. code-block:: vala

   class MyWindow : Gtk.Window {
     public MyWindow () {
       Object (type: Gtk.WindowType.TOPLEVEL);
     }
   }

How do I convert from uint8[] (or char[]) to string and viceversa?
------------------------------------------------------------------

From uint8[] (or what else) to string it's as simple as casting to string: ``(string) array``.
From string to uint8[] array it's about accessing the data member: ``yourstr.data``.

If the uint8[] array doesn't have a terminating 0 byte at the end, you must append one before converting to a string.
Note that ``yourstr.data`` will give you an array without the terminating 0 byte, so ``(string) yourstr.data == yourstr`` is incorrect.

How do I create an array of structs?
------------------------------------

First of all, take a look to the ways structs can be created at :ref:`structs-tutorial`.

If the array is constant:

.. code-block:: vala

   const YourStruct[] s = { { value1, value2, ... }, ...};

Otherwise:

   YourStruct[] s = { YourStruct() { field1=value1, field2=value2, ... }, ...};

Alternatively, if you are the author of YourStruct (that is not external) you can provide a constructor to simplify the above expression:

.. code-block:: vala

   public struct YourStruct {
     public int field1;
     public string field2;
     ...
     public YourStruct (int field1, string field2, ...) {
       this.field1 = field1;
       this.field2 = field2;
       ...
     }
   }

Then you can create the array like this:

.. code-block:: vala

   YourStruct[] s = { YourStruct (field1, field2, ...), ...};

How do I pass user data for a callback?
---------------------------------------

Vala automatically passes user data to callbacks depending on the context. There are mainly two techniques for passing a callback. The first is by passing an instance method:

.. code-block:: vala

   the_method (some_instance.some_method);

In this case Vala will automatically pass some_instance as user data, so that when some_method is called "this" exists in the method scope.

The other way to provide custom user data is to use closures:

.. code-block:: vala

   var some_var = ...;
   the_method (() => { use some_var });

Vala automatically creates the user data with all the variables captured by the closure, so that they exist at the time when the callback is called.

I have a config.vapi binding for config.h, but it is not the first file included
--------------------------------------------------------------------------------

Vala doesn't know that your binding should be included first. However, you can tell your C compiler to include arbitrary files first by using "-include config.h" argument. With vala, you could use "vala -X '-include config.h'" to pass this argument to the C compiler.

How can I fix CC warnings?
--------------------------

Unfortunately you can't usually, and you can ignore CC warnings safely most of the time. You only want to look for Vala warnings usually.

Why don't you use .typelib instead of .gir?
-------------------------------------------

Because the .gir file contains some information that gets stripped in .typelib files.
.. todo:: 
   
   list some of these

Why should I use .vapi instead of .gir with -\-pkg?
---------------------------------------------------

The .gir files are produced by libraries, while the .vapi are produced with ``vapigen`` using the .gir plus metadata files.
These are the reasons why vala developers highly suggest using the .vapi instead of the .gir:

1. Parsing .gir files is way slower because the gir parser is not much optimized. The .vapi representation is vala code thus it doesn't need particular processing compared to the .gir. Remember that .gir is a different language that needs to be transformed into vala.
2. Parsing a .gir file does also involve parsing the dependant .gir files, which means having the necessary metadata for all the .gir files, which neither vala nor libraries distribute (not yet).
3. With a .vapi file you have a human readable representation of how vapigen interprets the .gir file plus metadata. So it serves as documentation for yourself, instead of going wild guessing the name of the symbols or whatelse.
4. You can easily compare two .vapi files for differences because a symbol is usually defined on one line, while with .gir a single symbol is defined on multiple lines.
5. A .gir file is heavy weight whereas the .vapi file is very light weight, which means it's suitable for being copied locally in your project. For example, Gtk-3.0.gir is 5 MB while gkt+-3.0.vapi is 0.4 MB.

Is having a local copy of a .vapi in my project good practice?
--------------------------------------------------------------

It isn't inherently good or bad.  There are some advantages, disadvantages, and trade-offs to having a local copy of the VAPI embedded in your codebase.  The issue is quite similar to the question of whether to include a copy of libraries you depend on in your code tree, or link to a system-wide version.

Perhaps the most significant advantage is that it is possible that the "upgraded" bindings will include a backwards-incompatible change which can break your project.  Such changes were common when Vala was younger but these days such changes are exceedingly rare, particularly for bindings distributed with Vala or generated from GObject Introspection repositories.

Probably the biggest disadvantage is that you will not automatically benefit from backwards-compatible fixes and improvements that happen in bindings over time.  It is quite common for updated bindings to fix bugs (most prominently memory leaks), and if you use a local copy of the binding you will not benefit from such changes until you update the copy of the bindings your software uses.

Of course, sometimes it isn't really feasible to depend on the system-wide binding because there isn't one installed.  While we generally prefer for Vala bindings to be distributed with the project they bind, or with Vala itself for some popular libraries, third-party bindings generally aren't installed system-wide and including a local copy is considered the preferred method of use.  For example, the `vala-extra-vapis <https://gitlab.gnome.org/GNOME/vala-extra-vapis>`_ repository (which contains many third-party bindings) is intended to be usable as a git submodule or subtree.

One more thing to consider is that using a local copy of bindings can make `<https://valadoc.org>`_ less useful. Typically, valadoc.org content tracks the latest stable version, if you're using a current Linux distribution, is likely the same version you have on your system.  If you make a local copy of the bindings you use they will often be older versions which don't match what `valadoc.org <https://valadoc.org>`_ says.

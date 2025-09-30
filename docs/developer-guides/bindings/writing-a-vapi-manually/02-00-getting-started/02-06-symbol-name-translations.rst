Symbol Name Translations
========================

Vala has symbol name translation rules from Vala to C. The default rules follow the GLib naming conventions, but for a binding the name translations can be customised with the ``lower_case_cprefix``, ``cprefix`` and ``cname`` CCode details. 

The following example illustrates the default symbol name translation rules. Vala's name translation rules apply to both Vala programs and bindings. Compile the following example program with ``valac --ccode name_conversion_example.vala`` then examine how the Vala symbol names have been translated:

.. code-block:: vala

   void main () {
       Foo.Bar a = new Foo.Bar ();
       a.test ();
       var b = Foo.Bar.UNCHANGING;
   }
   
   namespace Foo {
       [Compact]
       class Bar {
           public const int UNCHANGING = 42;
           public void test () {
           }
       }
   }

The use of the ``[Compact]`` attribute makes the C code simpler and so easier to read, but the name translation rules apply to full Vala classes as well. Here is a table that summarizes the example's translations:

+------------------------+------------------------+------------------------------------------+
|   *Vala Identifier*    |     *C Identifier*     |                 *Notes*                  |
+========================+========================+==========================================+
| ``Foo.Bar``            | ``FooBar``             | This is the data type                    |
+------------------------+------------------------+------------------------------------------+
| ``new Foo.Bar ()``     | ``foo_bar_new ()``     | This is the constructor function         |
+------------------------+------------------------+------------------------------------------+
| ``a.test ()``          | ``foo_bar_test (a)``   | This is a function acting on an instance |
+------------------------+------------------------+------------------------------------------+
| ``Foo.Bar.UNCHANGING`` | ``FOO_BAR_UNCHANGING`` | A constant defined with the type         |
+------------------------+------------------------+------------------------------------------+

When binding the library the Vala symbol names should follow the following conventions and then ``lower_case_cprefix``, ``cprefix`` and ``cname`` can be used to ensure the C symbol name matches the library:

+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
|     *Vala Semantics*      |                 *Vala Convention*                 | *Default Translation to C* | *Modify with CCode Detail* |
+===========================+===================================================+============================+============================+
| Classes                   | !TitleCase                                        |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Constants                 | UPPER_SNAKE_CASE                                  |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Delegates                 | !TitleCase                                        |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Enums and Flags           | !TitleCase                                        |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Fields                    | lower_snake_case                                  |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Methods                   | lower_snake_case                                  |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Namespaces                | !TitleCase                                        | title_case\_               | ``lower_case_cprefix``     |
|                           |                                                   |                            |                            |
|                           |                                                   | TITLE_CASE\_               | ``lower_case_cprefix``     |
|                           |                                                   |                            |                            |
|                           |                                                   | !TitleCase                 | ``cprefix``                |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Properties                | lower_snake_case                                  |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Structs                   | !TitleCase                                        |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+
| Type Variables (Generics) | T (A single uppercase letter).                    |                            |                            |
|                           | For maps, K, V are preferred for keys and values. |                            |                            |
+---------------------------+---------------------------------------------------+----------------------------+----------------------------+

Where appropriate, expand cryptic C names into more understandable Vala ones (e.g., ``Tx`` into ``Transaction``). Vala is usually much more compact than C, so we are willing to make different trade-offs and favor readability over being concise a bit more than C programmers generally do. In particular, ``var`` saves a lot of writing long type names and import helps make better use of prefixes.

Note the following:

* the use of ``cprefix`` and ``lower_case_cprefix`` with a namespace
* the priority of a class over a namespace when using ``cprefix`` and ``lower_case_cprefix``
* the use of ``cname`` with a function and constant


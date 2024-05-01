Basics
======

A simple class may be defined as follows:

.. code-block:: vala

   public class TestClass : GLib.Object {

       /* Fields */
       public int first_data = 0;
       private int second_data;

       /* Constructor */
       public TestClass() {
           this.second_data = 5;
       }

       /* Method */
       public int method_1() {
           stdout.printf("private data: %d", this.second_data);
           return this.second_data;
       }
   }

This code will define a new type (which is registered automatically with the *gobject* library's type system) that contains three members. There are two data members, the integers defined at the top, and one method called *method_1*, which returns an integer. The class declaration states that this class is a subclass of *GLib.Object*, and therefore instances of it are also *Objects*, and contain all the members of that type also. The fact that this class is descended from *Object* also means that there are special features of Vala that can be used to easily access some of *Object's* features.

This class is described as ``public`` (by default, classes are ``internal``). The implication of this is that it can referenced directly by code outside of this file - if you are a C programmer of glib/gobject, you will recognise this as being equivalent to defining the class interfaces in a header file that other code can include.

The members are also all described as either ``public`` or ``private``. The member *first_data* is ``public``, so it is visible directly to any user of the class, and can be modified without the containing instance being aware of it. The second data member is ``private``, and so can only be referenced by code belonging to this class. Vala supports four different access modifiers:

+---------------+-------------------------------------------------------------+
| ``public``    | No restrictions to access                                   |
+---------------+-------------------------------------------------------------+
| ``private``   | Access is limited to within the class/struct definition.    |
|               | This is the default if no access modifier is specified      |
+---------------+-------------------------------------------------------------+
| ``protected`` | Access is limited to within the class definition and any    |
|               | class that inherits from the class                          |
+---------------+-------------------------------------------------------------+
| ``internal``  | Access is limited exclusively to classes defined within     |
|               | the same package                                            |
+---------------+-------------------------------------------------------------+

The constructor initialises new instances of a class.  It has the same name as the class, may take zero or more arguments and is defined without return type.

The final part of this class is a method definition.  This method is to be called *method_1*, and it will return an integer.  As this method is not static, it can only be executed on an instance of this class, and may therefore access members of that instance.  It can do this through the ``this`` reference, which always points to the instance the method is being called on.  Unless there is an ambiguity, the ``this`` identifier can be omitted if wished.

You can use this new class as follows:

.. code-block:: vala

   TestClass t = new TestClass();
   t.first_data = 5;
   t.method_1();


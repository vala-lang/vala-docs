Properties
==========

It is good object oriented programming practice to hide implementation details
from the users of your classes (`information hiding principle <http://en.wikipedia.org/wiki/Information_hiding>`_), so you can later change the internals without breaking the public API.  One practice is to make fields private and provide accessor methods for getting and setting their values (getters and setters).

If you're a Java programmer you will probably think of something like this:

.. code-block:: vala

   class Person : Object {
       private int age = 32;

       public int get_age() {
           return this.age;
       }

       public void set_age(int age) {
           this.age = age;
       }
   }

This works, but Vala can do better.  The problem is that these methods are cumbersome to work with.  Let's suppose that you want to increase the age of a person by one year:

.. code-block:: vala

   var alice = new Person();
   alice.set_age(alice.get_age() + 1);

This is where properties come into play:

.. code-block:: vala

   class Person : Object {
       private int _age = 32;  // underscore prefix to avoid name clash with property

       /* Property */
       public int age {
           get { return _age; }
           set { _age = value; }
       }
   }

This syntax should be familiar to C# programmers. A property has a ``get`` and a ``set`` block for getting and setting its value. ``value`` is a keyword that represents the new value that should be assigned to the property.

Now you can access the property as if it was a public field. But behind the scenes the code in the get and set blocks is executed.

.. code-block:: vala

   var alice = new Person();
   alice.age = alice.age + 1;  // or even shorter:
   alice.age++;

If you only do the standard implementation as shown above then you can write the property even shorter:

.. code-block:: vala

   class Person : Object {
       /* Property with standard getter and setter and default value */
       public int age { get; set; default = 32; }
   }

With properties you can change the internal working of classes without changing the public API. For example:

.. code-block:: vala

   static int current_year = 2525;

   class Person : Object {
       private int year_of_birth = 2493;

       public int age {
           get { return current_year - year_of_birth; }
           set { year_of_birth = current_year - value; }
       }
   }

This time the age is calculated on the fly from the year of birth.  Note that you can do more than just simple variable access or assignment within the get and set blocks.  You could do a database access, logging, cache updates, etc.

If you want to make a property read-only for the users of the class you should make the setter private:

.. code-block:: vala

    public int age { get; private set; default = 32; }

Or, alternatively, you can leave out the set block:

.. code-block:: vala

   class Person : Object {
       private int _age = 32;

       public int age {
           get { return _age; }
       }
   }

Properties may not only have a name but also a short description (called **nick**) and a long description (called **blurb**).  You can annotate
these with a special attribute:

.. code-block:: vala

       [Description(nick = "age in years", blurb = "This is the person's age in years")]
       public int age { get; set; default = 32; }

Properties and their additional descriptions can be queried at runtime.  Some programs such as the `Glade <http://glade.gnome.org/>`_ graphical user interface designer make use of this information.  In this way Glade can present human readable descriptions for properties of GTK+ widgets.

Every instance of a class derived from ``GLib.Object`` has a signal called ``notify``.  This signal gets emitted every time a property of its object changes.  So you can connect to this signal if you're interested in change notifications in general:

.. code-block:: vala

   obj.notify.connect((s, p) => {
       stdout.printf("Property '%s' has changed!\n", p.name);
   });

``s`` is the source of the signal (``obj`` in this example), ``p`` is the property information of type **ParamSpec** for the changed property. If you're only interested in change
notifications of a single property you can use this syntax:

.. code-block:: vala

   alice.notify["age"].connect((s, p) => {
       stdout.printf("age has changed\n");
   });

Note that in this case you must use the string representation of the property name where underscores are replaced by dashes: ``my_property_name`` becomes ``"my-property-name"`` in this representation, which is the GObject property naming convention.

Change notifications can be disabled with a ``CCode`` attribute tag immediately before the declaration of the property:

.. code-block:: vala

   public class MyObject : Object {
       [CCode(notify = false)]
       // notify signal is NOT emitted upon changes in the property
       public int without_notification { get; set; }
       // notify signal is emitted upon changes in the property
       public int with_notification { get; set; }
   }

There's another type of properties called **construct properties** that are described later in the section about gobject-style construction.

Note: in case your property is type of struct, to get the property value with Object.get(), you have to declare your variable as example below

.. code-block:: vala

   struct Color
   {
       public uint32 argb;

       public Color() { argb = 0x12345678; }
   }

   class Shape: GLib.Object
   {
       public Color c { get; set; default = Color(); }
   }

   int main()
   {
       Color? c = null;
       Shape s = new Shape();
       s.get("c", out c);
   }


This way, c is an reference instead of an instance of Color on stack. What you passed into s.get() is "Color \*\*" instead of "Color \*".

Properties
==========

Default Values for Auto-Implemented Properties
----------------------------------------------

C#

.. code-block:: csharp

   class Person
   {
       public Person()
       {
           Name = "Default Name";
       }

       public string Name { get; set; }
   }

Vala

.. code-block:: vala

   class Person : Object {
       public string name { get; set; default = "Default Name"; }
   }

Setting in constructor works as well, of course.

Property Change Notifications
-----------------------------

C#: implement ``INotifyPropertyChanged``

.. code-block:: csharp

   using System.ComponentModel;

   class Person : INotifyPropertyChanged
   {
       public event PropertyChangedEventHandler PropertyChanged;
       private string name;

       public string Name
       {
           get { return name; }
           set
           {
               name = value;
               OnPropertyChanged("Name");
           }
       }

       protected void OnPropertyChanged(string name)
       {
           if (PropertyChanged != null)
           {
               PropertyChanged(this, new PropertyChangedEventArgs(name));
           }
       }

       static void Main()
       {
           var person = new Person();
           person.PropertyChanged += (sender, e) =>
           {
               System.Console.WriteLine("Property '{0}' changed", e.PropertyName);
           };
           person.Name = "Foo";
           person.Name = "Bar";
       }
   }

Vala: connect to ``notify`` signal

Every instance of a class derived from ``Object`` has a signal called notify.
This signal gets emitted every time a property of its object changes.

.. code-block:: vala

   class Person : Object {
       public string name { get; set; }
   }

   void main () {
       var person = new Person ();
       person.notify.connect ((sender, property) => {
           stdout.printf ("Property '%s' changed\n", property.name);
       });
       person.name = "Foo";
       person.name = "Bar";
   }

If you're only interested in change notifications of a single property you can
use this syntax:

.. code-block:: vala

   person.notify["name"].connect ((sender, property) => {
       stdout.printf ("name has changed\n");
   });

Note that in this case you must use the string representation of the property
name where underscores are replaced by dashes: ``my_property_name`` becomes
``"my-property-name"`` in this representation, which is the GObject property
naming convention.

Change notifications can be disabled with a ``CCode`` attribute tag immediately
before the declaration of the property:

.. code-block:: vala

   class MyObject : Object {

       // notify signal is NOT emitted upon changes in the property
       [CCode (notify = false)]
       public int without_notification { get; set; }

       // notify signal is emitted upon changes in the property
       public int with_notification { get; set; }
   }
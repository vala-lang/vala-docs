Events
======

C#: events

.. code-block:: csharp

   using System;

   delegate void SomeEventHandler(object sender, int i);

   class Foo
   {
       public event SomeEventHandler SomeEvent;

       public void RaiseSomeEvent(int i)
       {
           if (SomeEvent != null) SomeEvent(this, i);
       }
   }

   class Demo
   {
       static void OnSomeEvent(object sender, int i)
       {
           Console.WriteLine("Handler A: " + i);
       }

       static void Main()
       {
           var foo = new Foo();
           foo.SomeEvent += OnSomeEvent;
           foo.SomeEvent += (s, i) => Console.WriteLine("Handler B: " + i);
           foo.RaiseSomeEvent(42);
           foo.SomeEvent -= OnSomeEvent;
       }
   }

Vala: signals

.. code-block:: vala

   class Foo {
       public signal void some_event (int i);
   }

   class Demo {
       static void on_some_event (Foo sender, int i) {
           stdout.printf ("Handler A: %d\n", i);
       }

       static void main () {
           var foo = new Foo ();
           foo.some_event.connect (on_some_event);
           foo.some_event.connect ((s, i) => stdout.printf ("Handler B: %d\n", i));
           foo.some_event (42);
           foo.some_event.disconnect (on_some_event);
       }
   }

No extra delegate declaration, signals can be emitted directly (no null checking
necessary). Use ``.connect()`` and ``.disconnect()`` instead of ``+=`` and
``-=``. Both is possible in Vala, however ``+=`` and ``-=`` may become
deprecated for signal connection.

Signals do not support ``add {}`` and ``remove {}`` blocks.
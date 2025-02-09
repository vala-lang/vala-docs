GTK+ Demo App
=============

C#

.. code-block:: csharp

   using Gtk;

   class Demo : Window
   {
       public Demo() : base("This is a window")
       {
           SetDefaultSize(250, 200);
           SetPosition(WindowPosition.Center);

           DeleteEvent += delegate { Application.Quit(); };

           var button = new Button("Click");
           Add(button);
           ShowAll();
       }

       static void Main()
       {
           Application.Init();
           new Demo();
           Application.Run();
       }
   }

Vala

.. code-block:: vala

   using Gtk;

   class Demo : Window {

       public Demo () {
           this.title = "This is a window";
           set_default_size (250, 200);
           set_position (WindowPosition.CENTER);

           this.destroy.connect (Gtk.main_quit);

           var button = new Button.with_label ("Click");
           add (button);
           show_all ();
       }

       static void main (string[] args) {
           Gtk.init (ref args);
           new Demo ();
           Gtk.main ();
       }
   }

Vala's GTK+ API is very close to the original GTK+ API. In fact, you're using GTK+ functions directly, only with different syntax.

See `GTK+ Examples <https://docs.vala.dev/tutorials/gui-programming/gtk4-samples>`_
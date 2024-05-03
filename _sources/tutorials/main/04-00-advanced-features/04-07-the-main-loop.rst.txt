The Main Loop
=============

GLib includes a system for running an event loop, in the classes around ``MainLoop``. The purpose of this system is to allow you to write a program that waits for events and responds to them, instead of having to constantly check conditions. This is the model that GTK+ uses, so that a program can wait for user interaction without having to have any currently running code.

The following program creates and starts a ``MainLoop``, and then attaches a source of events to it. In this case the source is a simple timer, that will execute the given method after 2000ms. The method will in fact just stop the main loop, which will in this case exit the program.

.. code-block:: vala

   void main() {

       var loop = new MainLoop();
       var time = new TimeoutSource(2000);

       time.set_callback(() => {
           stdout.printf("Time!\n");
           loop.quit();
           return false;
       });

       time.attach(loop.get_context());

       loop.run();
   }

When using GTK+, a main loop will be created automatically, and will be started when you call the ``Gtk.main()`` method. This marks the point where the program is ready to run and start accepting events from the user or elsewhere. The code in GTK+ is equivalent to the short example above, and so you may add event sources in much the same way, although of course you need to use the GTK+ methods to control the main loop.

.. code-block:: vala

   void main(string[] args) {

       Gtk.init(ref args);
       var time = new TimeoutSource(2000);

       time.set_callback(() => {
           stdout.printf("Time!\n");
           Gtk.main_quit();
           return false;
       });

       time.attach(null);

       Gtk.main();
   }

A common requirement in GUI programs is to execute some code as soon as possible, but only when it will not disturb the user. For this, you use !IdleSource instances. These send events to the programs main loop, but request they only be dealt with when there is nothing more important to do.

For more information about event loops, `see the GLib and GTK+ documentation <https://docs.gtk.org/glib/main-loop.html>`_.


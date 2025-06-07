Minimal App
===========

Source Code
-----------

.. attention::

   Don't use this code for creating applications.

   Unless you are sure about what you're doing,
   follow the :doc:`Basic App Sample <basic-app>` instead.

.. code-block:: vala

   // MinimalApp.vala

   int main (string[] args) {
       Gtk.init ();

       var window = new Gtk.Window () {
           title = "Minimal GTK4 App"
       };

       var button = new Gtk.Button.with_label ("Click me!");
       button.clicked.connect (() => {
           button.label = "Thank you";
       });

       window.child = button;
       window.present ();

       while (Gtk.Window.get_toplevels ().get_n_items () > 0) {
           GLib.MainContext.@default ().iteration (true);
       }

       return 0;
   }

Compile and Run
---------------

Compile:

.. code-block:: console

   $ valac --pkg gtk4 MinimalAppSample.vala

Run:

.. code-block:: console

   $ ./MinimalAppSample.vala


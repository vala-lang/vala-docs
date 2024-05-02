D-Bus Integration
=================

`D-Bus <http://freedesktop.org/wiki/Software/dbus>`_ is tightly integrated into the language and has never been easier than with Vala.

To export a custom class as a D-Bus service you just need to annotate it with the *DBus* code attribute and register an instance of this class with your local D-Bus session.

.. code-block:: vala

   [DBus(name = "org.example.DemoService")]
   public class DemoService : Object {
       /* Private field, not exported via D-Bus */
       int counter;

       /* Public field, not exported via D-Bus */
       public int status;

       /* Public property, exported via D-Bus */
       public int something { get; set; }

       /* Public signal, exported via D-Bus
        * Can be emitted on the server side and can be connected to on the client side.
        */
       public signal void sig1();

       /* Public method, exported via D-Bus */
       public void some_method() {
           counter++;
           stdout.printf("heureka! counter = %d\n", counter);
           sig1();  // emit signal
       }

       /* Public method, exported via D-Bus and showing the sender who is
          is calling the method (not exported in the D-Bus interface) */
       public void some_method_sender(string message, GLib.BusName sender) {
           counter++;
           stdout.printf("heureka! counter = %d, '%s' message from sender %s\n",
                         counter, message, sender);
       }
   }

Register an instance of the service and start a main loop:

.. code-block:: vala

   void on_bus_aquired (DBusConnection conn) {
       try {
           // start service and register it as dbus object
           var service = new DemoService();
           conn.register_object ("/org/example/demo", service);
       } catch (IOError e) {
           stderr.printf ("Could not register service: %s\n", e.message);
       }
   }

   void main () {
       // try to register service name in session bus
       Bus.own_name (BusType.SESSION, "org.example.DemoService", /* name to register */
                     BusNameOwnerFlags.NONE, /* flags */
                     on_bus_aquired, /* callback function on registration succeeded */
                     () => {}, /* callback on name register succeeded */
                     () => stderr.printf ("Could not acquire name\n")); /*callback on name lost */

       // start main loop
       new MainLoop ().run ();
   }

You must compile this example with the *gio-2.0* package:

.. code-block:: console

   $ valac --pkg gio-2.0 dbus-demo-service.vala
   $ ./dbus-demo-service


All member names are automatically mangled from Vala's *lower_case_with_underscores* naming convention to D-Bus *CamelCase* names. The exported D-Bus interface of this example will have a property *Something*, a signal *Sig1* and a method *SomeMethod*. You can open a new terminal window and call the method from command line with:

.. code-block:: console

   $ dbus-send --type=method_call                   \
               --dest=org.example.DemoService       \
               /org/example/demo                    \
               org.example.DemoService.SomeMethod

or

.. code-block:: console

   $ dbus-send --type=method_call                   \
               --dest=org.example.DemoService       \
               /org/example/demo                    \
               org.example.DemoService.SomeMethodSender \
               string:'hello world'

You can also use a graphical D-Bus debugger like `D-Spy <https://apps.gnome.org/en-GB/Dspy/>`_ to browse your D-Bus interfaces and call methods.

Some comprehensive examples: `DBus Client Samples </developer-guides/dbus-client-samples>`_  and `DBus Server Sample </developer-guides/dbus-server-sample>`_.


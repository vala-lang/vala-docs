Type Modules
============

This example shows you how to implement a GLib.TypeModule based plugin in Vala. It also shows the usage of static construct/destruct block.

.. code-block:: vala

   // plugin.vala
   public class MyClass : Object
   {
           static construct
           {
                   message("MyClass init");
           }

           static ~MyClass()
           {
                   message("MyClass deinit");
           }
   }

   [ModuleInit]
   Type plugin_init(GLib.TypeModule type_modul)
   {
           return typeof(MyClass);
   }


.. code-block:: vala

   // loader.vala
   class MyModule : TypeModule
   {
         [CCode (has_target = false)]
         private delegate Type PluginInitFunc(TypeModule module);

         private GLib.Module module = null;

         private string name = null;

         public MyModule(string name)
         {
                  this.name = name;
         }

         public override bool load()
         {
                  string path = Module.build_path(null, name);
                  module = Module.open(path, GLib.ModuleFlags.BIND_LAZY);
                  if(null == module) {
                           error("Module not found");
                  }

                  void * plugin_init = null;
                  if(! module.symbol("plugin_init", out plugin_init)) {
                           error("No such symbol");
                  }

                  ((PluginInitFunc) plugin_init)(this);

                  return true;
         }

         public override void unload()
         {
                  module = null;

                  message("Library unloaded");
         }
   }

   // Never unref instance of GTypeModule
   // https://web.archive.org/web/20111109085729/http://www.lanedo.com/~mitch/module-system-talk-guadec-2006/Module-System-Talk-Guadec-2006.pdf
   static TypeModule module = null;

   int main()
   {
         module = new MyModule("plugin");
         module.load();

         var o = GLib.Object.new(Type.from_name("MyClass"));

         // free last instance, plugin unload
         o = null;

         return 0;
   }

**Build**:

.. code-block:: console

   $ valac -o loader loader.vala --pkg=gmodule-2.0
   $ valac --ccode plugin.vala
   $ gcc -fPIC -shared -o libplugin.so plugin.c $(pkg-config --libs --cflags gobject-2.0 gmodule-2.0)

**Run**:

.. code-block:: console

   $ LD_LIBRARY_PATH=$PWD ./loader

Which should output something like this:

.. code-block:: output

   ** Message: plugin.vala:5: MyClass init
   ** Message: plugin.vala:10: MyClass deinit
   ** Message: loader.vala:37: Library unloaded

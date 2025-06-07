ListView with CheckButtons
==========================

Source Code
-----------

.. code-block:: vala

   // ListViewCheckButtons.vala

   public class Item : GLib.Object {
       public string name { get; set; }
       public bool checked { get; set; }
   
       public Item (string name, bool checked) {
           Object (
               name: name,
               checked: checked
           );
       }
   }
   
   public class ListViewCheckButtonsSample : Gtk.Application {
       public ListViewCheckButtonsSample () {
           Object (application_id: "com.example.ListViewCheckButtonsSample");
       }
   
       public override void activate () {
           var window = new Gtk.ApplicationWindow (this) {
               title = "ListView CheckButtons Sample",
               default_width = 280,
               default_height = 200
           };
   
           var items = new GLib.ListStore(typeof (Item));
           var selection_model = new Gtk.SingleSelection (items) {
               autoselect = true
           };
   
           items.append (new Item ("Item 1", true));
           items.append (new Item ("Item 2", false));
   
           var list_view_factory = new Gtk.SignalListItemFactory ();
           list_view_factory.setup.connect (on_list_view_setup);
           list_view_factory.bind.connect (on_list_view_bind);
   
           var list_view = new Gtk.ListView (selection_model, list_view_factory);
   
           window.child = list_view;
           window.present ();
       }
   
       private void on_list_view_setup (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
           var vbox = new Gtk.Box (Gtk.Orientation.HORIZONTAL, 0);
           var checkbox = new Gtk.CheckButton ();
           var name_label = new Gtk.Label ("");
           name_label.halign = Gtk.Align.START;
   
           vbox.append (checkbox);
           vbox.append (name_label);
           ((Gtk.ListItem) list_item_obj).child = vbox;
       }
   
       private void on_list_view_bind (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
           var list_item = (Gtk.ListItem) list_item_obj;
           var item_data = (Item) list_item.item;
           var vbox = (Gtk.Box) list_item.child;
           var checkbox = (Gtk.CheckButton) vbox.get_first_child ();
           var name_label = (Gtk.Label) checkbox.get_next_sibling ();
   
           checkbox.active = item_data.checked;
           name_label.label = item_data.name;
       }
   
       public static int main (string[] args) {
           var app = new ListViewCheckButtonsSample ();
           return app.run (args);
       }
   }


Compile and Run
---------------

Compile:

.. code-block:: console

   $ valac --pkg gtk4 ListViewCheckButtons.vala

Run:

.. code-block:: console

   $ ./ListViewCheckButtons.vala


# Entry Completion with Two Cells

## Source Code

```vala
// EntryCompletionTwoCells.vala

public class EntryCompletionTwoCellsSample : Gtk.Application {
    public EntryCompletionTwoCellsSample () {
        Object (application_id: "com.example.EntryCompletionTwoCellsSample");
    }

    public override void activate () {
        // Prepare Gtk.Window
        var window = new Gtk.ApplicationWindow (this) {
            title = "Entry Completion - Two Cells",
            default_width = 350,
            default_height = 70,
        };

        // The Entry
        var entry = new Gtk.Entry () {
            placeholder_text = "Enter a Location",
        };

        // The EntryCompletion
        Gtk.EntryCompletion completion = new Gtk.EntryCompletion ();
        entry.set_completion (completion);

        // Create, fill & register a Gtk.ListStore
        Gtk.ListStore list_store = new Gtk.ListStore (2, typeof (string), typeof (string));
        completion.set_model (list_store);
        completion.set_text_column (0);

        var cell = new Gtk.CellRendererText ();
        completion.pack_start (cell, false);
        completion.add_attribute (cell, "text", 1);

        Gtk.TreeIter iter;

        list_store.append (out iter);
        list_store.set (iter, 0, "Burgenland", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Berlin", 1, "Germany");
        list_store.append (out iter);
        list_store.set (iter, 0, "Lower Austria", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Upper Austria", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Salzburg", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Styria", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Tehran", 1, "Iran");
        list_store.append (out iter);
        list_store.set (iter, 0, "Vorarlberg", 1, "Austria");
        list_store.append (out iter);
        list_store.set (iter, 0, "Vienna", 1, "Austria");

        window.child = entry;
        window.present ();
    }

    public static int main (string[] args) {
        var app = new EntryCompletionTwoCellsSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 EntryCompletionTwoCells.vala
```

Run:

```shell
./EntryCompletionTwoCells.vala
```

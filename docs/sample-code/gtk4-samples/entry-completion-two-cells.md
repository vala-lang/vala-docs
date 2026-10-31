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

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

`Gtk.ListStore` and the cell renderer can't be described in Blueprint, so the model
is still filled in Vala. Blueprint declares the window, the entry and the completion.

### Source Code

::: code-group

```blueprint [entry-completion-two-cells.blp]
using Gtk 4.0;

template $EntryCompletionTwoCellsWindow: ApplicationWindow {
  title: "Entry Completion - Two Cells";
  default-width: 350;
  default-height: 70;

  child: Entry {
    placeholder-text: "Enter a Location";

    completion: EntryCompletion completion {};
  };
}
```

```vala [EntryCompletionTwoCellsBlueprint.vala]
// EntryCompletionTwoCellsBlueprint.vala

[GtkTemplate (ui = "/com/example/EntryCompletionTwoCellsSample/entry-completion-two-cells.ui")]
public class EntryCompletionTwoCellsWindow : Gtk.ApplicationWindow {
    [GtkChild]
    private unowned Gtk.EntryCompletion completion;

    public EntryCompletionTwoCellsWindow (Gtk.Application app) {
        Object (application: app);
    }

    construct {
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
    }
}

public class EntryCompletionTwoCellsSample : Gtk.Application {
    public EntryCompletionTwoCellsSample () {
        Object (application_id: "com.example.EntryCompletionTwoCellsSample");
    }

    public override void activate () {
        new EntryCompletionTwoCellsWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new EntryCompletionTwoCellsSample ();
        return app.run (args);
    }
}
```

```xml [entry-completion-two-cells.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/EntryCompletionTwoCellsSample">
    <file>entry-completion-two-cells.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile entry-completion-two-cells.blp --output entry-completion-two-cells.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources entry-completion-two-cells.gresource.xml --target=entry-completion-two-cells.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources entry-completion-two-cells.gresource.xml EntryCompletionTwoCellsBlueprint.vala entry-completion-two-cells.gresource.c
```

Run:

```shell
./EntryCompletionTwoCellsBlueprint
```

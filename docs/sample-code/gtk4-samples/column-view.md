# ColumnView

## Source Code

```vala
// ColumnView.vala

public class Account : GLib.Object {
    public string name { get; set; }
    public string account_type { get; set; }
    public string balance { get; set; }

    public Account (string name, string account_type, string balance) {
        Object (
            name: name,
            account_type: account_type,
            balance: balance
        );
    }
}

public class ColumnViewSample : Gtk.Application {
    public ColumnViewSample () {
        Object (application_id: "com.example.ColumnViewSample");
    }

    public override void activate () {
        var window = new Gtk.ApplicationWindow (this) {
            title = "ColumnView Sample",
            default_width = 375,
            default_height = 150
        };

        var accounts = new GLib.ListStore (typeof (Account));
        var selection_model = new Gtk.SingleSelection (accounts) {
            autoselect = true
        };

        accounts.append (new Account ("Visa", "Card", "102.10"));
        accounts.append (new Account ("Mastercard", "Card", "10.20"));

        var name_column_factory = new Gtk.SignalListItemFactory ();
        name_column_factory.setup.connect (on_name_column_setup);
        name_column_factory.bind.connect (on_name_column_bind);

        var account_type_column_factory = new Gtk.SignalListItemFactory ();
        account_type_column_factory.setup.connect (on_account_type_column_setup);
        account_type_column_factory.bind.connect (on_account_type_column_bind);

        var balance_column_factory = new Gtk.SignalListItemFactory ();
        balance_column_factory.setup.connect (on_balance_column_setup);
        balance_column_factory.bind.connect (on_balance_column_bind);

        var name_column = new Gtk.ColumnViewColumn ("Account Name", name_column_factory);
        name_column.expand = true;

        var account_type_column = new Gtk.ColumnViewColumn ("Type", account_type_column_factory);

        var balance_column = new Gtk.ColumnViewColumn ("Balance", balance_column_factory);
        balance_column.expand = true;

        var column_view = new Gtk.ColumnView (selection_model);
        column_view.append_column (name_column);
        column_view.append_column (account_type_column);
        column_view.append_column (balance_column);

        window.child = column_view;
        window.present ();
    }

    private void on_name_column_setup (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var label = new Gtk.Label ("");
        label.halign = Gtk.Align.START;
        ((Gtk.ListItem) list_item_obj).child = label;
    }

    private void on_name_column_bind (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var list_item = (Gtk.ListItem) list_item_obj;
        var item_data = (Account) list_item.item ;
        var label = (Gtk.Label) list_item.child;
        label.label = item_data.name;
    }

    private void on_account_type_column_setup (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var label = new Gtk.Label ("");
        label.halign = Gtk.Align.START;
        ((Gtk.ListItem) list_item_obj).child = label;
    }

    private void on_account_type_column_bind (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var list_item = (Gtk.ListItem) list_item_obj;
        var item_data = (Account) list_item.item;
        var label = (Gtk.Label) list_item.child;
        label.label = item_data.account_type;
    }

    private void on_balance_column_setup (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var label = new Gtk.Label ("");
        label.halign = Gtk.Align.START;
        ((Gtk.ListItem) list_item_obj).child = label;
    }

    private void on_balance_column_bind (Gtk.SignalListItemFactory factory, GLib.Object list_item_obj) {
        var list_item = (Gtk.ListItem) list_item_obj;
        var item_data = (Account) list_item.item;
        var label = (Gtk.Label) list_item.child;
        label.label = item_data.balance;
    }

    public static int main (string[] args) {
        var app = new ColumnViewSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 ColumnView.vala
```

Run:

```shell
./ColumnView.vala
```

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

The item layouts are defined in Blueprint using `BuilderListItemFactory`, so the
Vala setup and bind handlers are no longer needed.

### Source Code

::: code-group

```blueprint [column-view.blp]
using Gtk 4.0;

template $ColumnViewWindow: ApplicationWindow {
  title: "ColumnView Sample";
  default-width: 375;
  default-height: 150;

  child: ColumnView {
    model: SingleSelection selection_model {
      autoselect: true;
    };

    ColumnViewColumn {
      title: "Account Name";
      expand: true;
      factory: BuilderListItemFactory {
        template ListItem {
          child: Label {
            halign: start;
            label: bind template.item as <$Account>.name;
          };
        }
      };
    }

    ColumnViewColumn {
      title: "Type";

      factory: BuilderListItemFactory {
        template ListItem {
          child: Label {
            halign: start;
            label: bind template.item as <$Account>.account_type;
          };
        }
      };
    }

    ColumnViewColumn {
      title: "Balance";
      expand: true;
      factory: BuilderListItemFactory {
        template ListItem {
          child: Label {
            halign: start;
            label: bind template.item as <$Account>.balance;
          };
        }
      };
    }
  };
}
```

```vala [ColumnViewBlueprint.vala]
// ColumnViewBlueprint.vala

public class Account : GLib.Object {
    public string name { get; set; }
    public string account_type { get; set; }
    public string balance { get; set; }

    public Account (string name, string account_type, string balance) {
        Object (
            name: name,
            account_type: account_type,
            balance: balance
        );
    }
}

[GtkTemplate (ui = "/com/example/ColumnViewSample/column-view.ui")]
public class ColumnViewWindow : Gtk.ApplicationWindow {
    [GtkChild]
    private unowned Gtk.SingleSelection selection_model;

    public ColumnViewWindow (Gtk.Application app) {
        Object (application: app);
    }

    construct {
        var accounts = new GLib.ListStore (typeof (Account));

        accounts.append (new Account ("Visa", "Card", "102.10"));
        accounts.append (new Account ("Mastercard", "Card", "10.20"));

        selection_model.model = accounts;
    }
}

public class ColumnViewSample : Gtk.Application {
    public ColumnViewSample () {
        Object (application_id: "com.example.ColumnViewSample");
    }

    public override void activate () {
        new ColumnViewWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new ColumnViewSample ();
        return app.run (args);
    }
}
```

```xml [column-view.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/ColumnViewSample">
    <file>column-view.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile column-view.blp --output column-view.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources column-view.gresource.xml --target=column-view.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources column-view.gresource.xml ColumnViewBlueprint.vala column-view.gresource.c
```

Run:

```shell
./ColumnViewBlueprint
```

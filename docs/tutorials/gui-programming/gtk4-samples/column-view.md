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

        var accounts = new GLib.ListStore(typeof (Account));
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
        column_view.append_column(name_column);
        column_view.append_column(account_type_column);
        column_view.append_column(balance_column);

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

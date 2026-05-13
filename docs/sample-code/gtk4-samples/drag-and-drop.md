# Drag and Drop

Based on Drag and Drop Demo from [GNOME Workbench](https://apps.gnome.org/en-GB//Workbench/).

## Source Code

```vala
// drag-and-drop.vala
public class DragAndDropSample : Gtk.Application {
    private Gtk.ApplicationWindow window;

    public DragAndDropSample () {
        Object (application_id: "com.example.DragAndDropSample");
    }

    public override void activate () {
        this.window = new Gtk.ApplicationWindow (this) {
            title = "Drag and Drop Sample",
            default_width = 400,
            default_height = 300
        };

        Gtk.ListBoxRow[] list_box_rows = create_list_box_rows ();

        var list = new Gtk.ListBox ();
        list.add_css_class ("boxed-list");
        for (int i = 0; i < list_box_rows.length; i++) {
            list.append (list_box_rows[i]);
        }

        var drop_target = new Gtk.DropTarget (typeof (Gtk.ListBoxRow), Gdk.DragAction.MOVE);
        list.add_controller (drop_target);

        for (int i = 0; list.get_row_at_index (i) != null; i++) {
            var row = list.get_row_at_index (i) as Gtk.ListBoxRow;

            double drag_x = 0.0;
            double drag_y = 0.0;

            var drop_controller = new Gtk.DropControllerMotion ();
            var drag_source = new Gtk.DragSource () {
                actions = Gdk.DragAction.MOVE
            };

            row.add_controller (drag_source);
            row.add_controller (drop_controller);

            // Drag handling
            drag_source.prepare.connect ((x, y) => {
                drag_x = x;
                drag_y = y;

                Value value = Value (typeof (Gtk.ListBoxRow));
                value.set_object (row);

                return new Gdk.ContentProvider.for_value (value);
            });

            // Update row visuals during DnD operation
            drop_controller.enter.connect (() => list.drag_highlight_row (row));
            drop_controller.leave.connect (() => list.drag_unhighlight_row ());
        }

        // Drop Handling
        drop_target.drop.connect ((drop, value, x, y) => {
            var value_row = value.get_object () as Gtk.ListBoxRow? ;
            Gtk.ListBoxRow? target_row = list.get_row_at_y ((int) y);
            // If value or the target row is null, do not accept the drop
            if (value_row == null || target_row == null) {
                return false;
            }

            int target_index = target_row.get_index ();

            list.remove (value_row);
            list.insert (value_row, target_index);
            target_row.set_state_flags (Gtk.StateFlags.NORMAL, true);

            return true;
        });

        var scroll_view = new Gtk.ScrolledWindow () {
            hscrollbar_policy = Gtk.PolicyType.AUTOMATIC,
            vscrollbar_policy = Gtk.PolicyType.AUTOMATIC,
            vexpand = true,
            valign = Gtk.Align.FILL,
            child = list,
        };

        var link_button = new Gtk.LinkButton.with_label (
            "https://docs.gtk.org/gtk4/drag-and-drop.html",
            "API Reference"
        );

        link_button.margin_top = 24;

        var vbox = new Gtk.Box (Gtk.Orientation.VERTICAL, 0);
        vbox.append (scroll_view);
        vbox.append (link_button);

        this.window.child = vbox;
        this.window.present ();
    }

    private Gtk.ListBoxRow[] create_list_box_rows () {
        const int NUM_OF_ROWS = 5;
        Gtk.ListBoxRow[] list_box_rows = new Gtk.ListBoxRow[NUM_OF_ROWS];
        for (int i = 0; i < NUM_OF_ROWS; i++) {
            var label = new Gtk.Label (@"Row $(i + 1)");
            var row = new Gtk.ListBoxRow ();
            row.child = label;
            list_box_rows[i] = row;
        }

        return list_box_rows;
    }

    public static int main (string[] args) {
        var app = new DragAndDropSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```sh
valac --pkg gtk4 drag-and-drop.vala
```

Run:

```
./drag-and-drop
```
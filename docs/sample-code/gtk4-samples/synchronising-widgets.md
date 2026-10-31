# Synchronising Widgets

## Source Code

```vala
// SyncingWidgets.vala

public class SyncSample : Gtk.Application {
    private Gtk.SpinButton spin_box;
    private Gtk.Scale slider;

    public SyncSample () {
        Object (application_id: "com.example.SyncSample");
    }

    public override void activate () {
        var window = new Gtk.ApplicationWindow (this) {
            title = "Enter your age",
            default_width = 300,
            default_height = 20,
        };

        this.spin_box = new Gtk.SpinButton.with_range (0, 130, 1);
        this.slider = new Gtk.Scale.with_range (Gtk.Orientation.HORIZONTAL, 0, 130, 1);

        this.spin_box.adjustment.value_changed.connect (() => {
            slider.adjustment.value = spin_box.adjustment.value;
        });

        this.slider.adjustment.value_changed.connect (() => {
            spin_box.adjustment.value = slider.adjustment.value;
        });

        var hbox = new Gtk.Box (Gtk.Orientation.HORIZONTAL, 5);
        hbox.homogeneous = true;
        hbox.append (spin_box);
        hbox.append (slider);

        window.child = hbox;
        window.present ();
    }

    public static int main (string[] args) {
        var app = new SyncSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 SyncingWidgets.vala
```

Run:

```shell
./SyncingWidgets.vala
```

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

The `bind ... bidirectional` expression keeps both widgets in sync, so no
Vala signal handlers are needed.

### Source Code

::: code-group

```blueprint [syncing-widgets.blp]
using Gtk 4.0;

template $SyncWindow: ApplicationWindow {
  title: "Enter your age";
  default-width: 300;
  default-height: 20;

  child: Box {
    orientation: horizontal;
    spacing: 5;
    homogeneous: true;

    SpinButton {
      adjustment: Adjustment spin_box_adjustment {
        upper: 130;
        step-increment: 1;
      };
    }

    Scale {
      orientation: horizontal;

      adjustment: Adjustment {
        upper: 130;
        step-increment: 1;
        value: bind spin_box_adjustment.value bidirectional;
      };
    }
  };
}
```

```vala [SyncingWidgetsBlueprint.vala]
// SyncingWidgetsBlueprint.vala

[GtkTemplate (ui = "/com/example/SyncSample/syncing-widgets.ui")]
public class SyncWindow : Gtk.ApplicationWindow {
    public SyncWindow (Gtk.Application app) {
        Object (application: app);
    }
}

public class SyncSample : Gtk.Application {
    public SyncSample () {
        Object (application_id: "com.example.SyncSample");
    }

    public override void activate () {
        new SyncWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new SyncSample ();
        return app.run (args);
    }
}
```

```xml [syncing-widgets.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/SyncSample">
    <file>syncing-widgets.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile syncing-widgets.blp --output syncing-widgets.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources syncing-widgets.gresource.xml --target=syncing-widgets.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources syncing-widgets.gresource.xml SyncingWidgetsBlueprint.vala syncing-widgets.gresource.c
```

Run:

```shell
./SyncingWidgetsBlueprint
```

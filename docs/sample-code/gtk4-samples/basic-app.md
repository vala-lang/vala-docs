# Basic App

## Source Code

```vala
// BasicApp.vala

public class BasicAppSample : Gtk.Application {
    public BasicAppSample () {
        Object (application_id: "com.example.BasicAppSample");
    }

    public override void activate () {
        var window = new Gtk.ApplicationWindow (this) {
            title = "Basic GTK4 App"
        };

        var button = new Gtk.Button.with_label ("Click me!");
        button.clicked.connect (() => {
            button.label = "Thank you";
        });

        window.child = button;
        window.present ();
    }

    public static int main (string[] args) {
        var app = new BasicAppSample ();
        return app.run (args);
    }
}
```

## Compile and Run

Compile:

```shell
valac --pkg gtk4 BasicAppSample.vala
```

Run:

```shell
./BasicAppSample.vala
```

## Blueprint Version

The same sample, with the UI described in
[Blueprint](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/) instead of
being built in code.

### Source Code

::: code-group

```blueprint [basic-app.blp]
using Gtk 4.0;

template $BasicAppWindow: ApplicationWindow {
  title: "Basic GTK4 App";

  child: Button button {
    label: "Click me!";
    clicked => $on_button_clicked();
  };
}
```

```vala [BasicAppBlueprint.vala]
// BasicAppBlueprint.vala

[GtkTemplate (ui = "/com/example/BasicAppSample/basic-app.ui")]
public class BasicAppWindow : Gtk.ApplicationWindow {
    [GtkChild]
    private unowned Gtk.Button button;

    public BasicAppWindow (Gtk.Application app) {
        Object (application: app);
    }

    [GtkCallback]
    private void on_button_clicked () {
        button.label = "Thank you";
    }
}

public class BasicAppSample : Gtk.Application {
    public BasicAppSample () {
        Object (application_id: "com.example.BasicAppSample");
    }

    public override void activate () {
        new BasicAppWindow (this).present ();
    }

    public static int main (string[] args) {
        var app = new BasicAppSample ();
        return app.run (args);
    }
}
```

```xml [basic-app.gresource.xml]
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/com/example/BasicAppSample">
    <file>basic-app.ui</file>
  </gresource>
</gresources>
```

:::

### Compile and Run

Install [blueprint-compiler](https://gnome.pages.gitlab.gnome.org/blueprint-compiler/setup.html),
then compile the Blueprint file into a UI file:

```shell
blueprint-compiler compile basic-app.blp --output basic-app.ui
```

Compile the UI file into a resource:

```shell
glib-compile-resources basic-app.gresource.xml --target=basic-app.gresource.c --generate-source
```

Compile:

```shell
valac --pkg gtk4 --gresources basic-app.gresource.xml BasicAppBlueprint.vala basic-app.gresource.c
```

Run:

```shell
./BasicAppBlueprint
```

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

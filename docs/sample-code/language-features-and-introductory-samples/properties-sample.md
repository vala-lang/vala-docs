# Properties Sample

GObject-style properties: automatic properties, custom getters and setters, the
`notify` signal, and construction-time property blocks.

Adapted from the archived
[Properties Example](https://wiki.gnome.org/Projects/Vala/PropertiesSample) page.

See [Language Features and Introductory Samples](../language-features-and-introductory-samples) for the full set.

## Properties and `notify`

```vala
public class PropertyDemo : Object {

    private string _name;
    private string _read_only;

    public string automatic { get; set; }

    public string name {
        get { return _name; }
        set { _name = value; }
    }

    public string read_only {
        get { return _read_only; }
    }

    public PropertyDemo (string name) {
        this.automatic = "InitialAutomatic";
        _name = name;
        _read_only = "InitialReadOnly";
    }
}

void main () {
    var demo = new PropertyDemo ("InitialName");

    // Every class derived from Object has a 'notify' signal that is emitted
    // when a property changes
    demo.notify.connect ((s, p) => {
        stdout.printf ("property '%s' has changed!\n", p.name);
    });

    demo.automatic = "TheNewAutomatic";
    demo.name = "TheNewName";

    // The following would be rejected:
    // demo.read_only = "TheNewReadOnly";

    stdout.printf ("automatic: %s\n", demo.automatic);
    stdout.printf ("name: %s\n", demo.name);
    stdout.printf ("read_only: %s\n", demo.read_only);
}
```

### Compile and run

```shell
valac prop_sample.vala
./prop_sample
```

## GObject-style construction steps

```vala
public class MyProperty : Object {

    private static uint step = 0;

    private int _c_g_s_prop;
    private int _c_o_prop;
    private int _g_s_prop;

    public int construct_only_prop {
        construct {
            stdout.printf ("---- Step %u: construct_only ----\n", step);
            stdout.printf ("construct_only (before): %d\n", _c_o_prop);
            _c_o_prop = value;
            stdout.printf ("construct_only (after): %d\n\n", _c_o_prop);
            step++;
        }
        get {
            return _c_o_prop;
        }
    }

    public int construct_get_set_prop {
        construct set {
            stdout.printf ("---- Step %u: construct_get_set ----\n", step);
            stdout.printf ("construct_get_set (before): %d\n", _c_g_s_prop);
            _c_g_s_prop = value;
            stdout.printf ("construct_get_set (after): %d\n\n", _c_g_s_prop);
            step++;
        }
        get {
            return _c_g_s_prop;
        }
    }

    public int get_set_prop {
        set {
            stdout.printf ("---- Step %u: get_set ----\n", step);
            stdout.printf ("get_set_prop (before): %d\n", _g_s_prop);
            _g_s_prop = value;
            stdout.printf ("get_set_prop (after): %d\n\n", _g_s_prop);
            step++;
        }
        get {
            return _g_s_prop;
        }
    }

    public MyProperty (int a, int b, int c) {
        Object (construct_only_prop: a, construct_get_set_prop: b);
        this.get_set_prop = c;
    }

    construct {
        stdout.printf ("++++++++++ construct block +++++++++++++++\n\n");
        this.get_set_prop = 5;
        stdout.printf ("++++++++++ end of construct block ++++++++\n\n");
    }
}

void main () {
    stdout.printf ("===== Construction process: MyProperty (1, 2, 3) ====\n\n");
    var demo = new MyProperty (1, 2, 3);
    stdout.printf ("===== End of construction process ===================\n\n");
    demo.construct_get_set_prop = 222;
    demo.get_set_prop = 333;
}
```

### Compile and run

```shell
valac prop_construction.vala
./prop_construction
```

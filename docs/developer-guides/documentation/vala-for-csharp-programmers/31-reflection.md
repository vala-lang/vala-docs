# Reflection

Reflection support in Vala is limited. Vala provides run-time type
information for its data types (`is` operator, `foo.get_type ()`,
dynamic casting via `as` operator). For example, you can get the names
of types, of signals and properties of a class and of enum values.

```vala
class Foo : Object {
    public int hello { get; set; }
    public int world { get; set; }
    public int foo_bar { get; set; }

    public signal void action ();
    public signal void more_action ();
}

enum Bar {
    FEE, FIE, FOE, FUM
}

void main () {

    /* Getting type information */
    Type type = typeof (Foo);
    stdout.printf ("%s\n", type.name ());

    /* Instantiation from type */
    Foo foo = (Foo) Object.new (type);

    /* list properties of a class */
    var obj_class = (ObjectClass) typeof (Foo).class_ref ();
    var properties = obj_class.list_properties ();
    foreach (var prop in properties) {
        stdout.printf ("%s\n", prop.name);
    }

    /* enum value as string */
    var enum_class = (EnumClass) typeof (Bar).class_ref ();
    string name = enum_class.get_value (Bar.FEE).value_name;
    stdout.printf ("Enum value as string: %s\n", name);

    /* list signals of a class */
    uint[] ids = Signal.list_ids (typeof (Foo));
    foreach (uint id in ids) {
        stdout.printf ("%s\n", Signal.name (id));
    }
}
```

Libraries built with
[GObjectIntrospection](https://gi.readthedocs.io/en/latest/) support can
be fully introspected.

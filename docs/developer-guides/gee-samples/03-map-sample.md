# Map Example

[Maps](https://valadoc.org/gee-0.8/Gee.HashMap.html) work like a
dictionary. They store key - value pairs.

```vala
using Gee;

void main () {

    var map = new HashMap<string, int> ();

    // Setting values
    map.set ("one", 1);
    map.set ("two", 2);
    map.set ("three", 3);
    map["four"] = 4;            // same as map.set ("four", 4)
    map["five"] = 5;

    // Getting values
    int a = map.get ("four");
    int b = map["four"];        // same as map.get ("four")
    assert (a == b);

    // Iteration

    stdout.printf ("Iterating over entries\n");
    foreach (var entry in map.entries) {
        stdout.printf ("%s => %d\n", entry.key, entry.value);
    }

    stdout.printf ("Iterating over keys only\n");
    foreach (string key in map.keys) {
        stdout.printf ("%s\n", key);
    }

    stdout.printf ("Iterating over values only\n");
    foreach (int value in map.values) {
        stdout.printf ("%d\n", value);
    }

    stdout.printf ("Iterating via 'for' statement\n");
    var it = map.map_iterator ();
    for (var has_next = it.next (); has_next; has_next = it.next ()) {
        stdout.printf ("%d\n", it.get_value ());
    }
}
```

## Compile and Run

```shell
valac --pkg gee-0.8 gee-map.vala
./gee-map
```

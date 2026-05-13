# GLib Collections Sample

These examples use [`GLib.List`](https://valadoc.org/glib-2.0/GLib.List.html) and
[`GLib.HashTable`](https://valadoc.org/glib-2.0/GLib.HashTable.html). For richer generic containers
(sets, multimaps, orderings), see [Vala collections: libgee](../basics/gee-samples).

## List example

Save as `list.vala`:

```vala
int main (string[] args) {
    var list = new List<string> ();
    list.append ("one");
    list.append ("two");
    list.append ("three");

    stdout.printf ("list.length () = %u\n", list.length ());

    // Traditional iteration
    for (int i = 0; i < list.length (); i++) {
        stdout.printf ("%s\n", list.nth_data (i));
    }

    // Comfortable iteration
    foreach (string element in list) {
        stdout.printf ("%s\n", element);
    }

    return 0;
}
```

### Compile and run

```shell
valac list.vala
./list
```

## Hash table example

Save as `hashmap.vala`:

```vala
int main (string[] args) {
    var hash = new HashTable<string, string> (str_hash, str_equal);
    hash.insert ("1", "one");
    hash.insert ("2", "two");

    foreach (string key in hash.get_keys ()) {
        stdout.printf ("%s => %s\n", key, hash.lookup (key));
    }

    return 0;
}
```

### Compile and run

```shell
valac hashmap.vala
./hashmap
```

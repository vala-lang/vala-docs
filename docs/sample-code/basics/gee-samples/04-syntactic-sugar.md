# Syntactic Sugar

There's syntactic sugar for testing if a collection contains an
element:

```vala
if ("three" in my_set) {    // same as my_set.contains ("three")
    stdout.printf ("heureka\n");
}
```

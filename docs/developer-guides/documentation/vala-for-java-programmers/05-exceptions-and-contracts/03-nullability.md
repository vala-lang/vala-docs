# 5.3. Nullability

In Vala you must mark reference type parameters of methods as nullable with a question mark (`?`) if it should be allowed to pass `null`, e.g.

```vala
void my_method (Object? a, Object b) { }

void main () {
    my_method (null, new Object ());  // allowed (first argument may be null)
    my_method (null, null);          // not allowed (second argument must not be null)
}
```

This is checked both at run-time and partially at compile time and helps preventing null pointer dereferencing.

You can enable (experimental) strict nullability checking with `--enable-experimental-non-null`. Then Vala will check all reference type variables at compile time, not only method arguments. For example, this example won't compile with strict nullability checking enabled:

```vala
void main () {
    string? a = "hello";
    string b = a;        // Error: 'a' could be null and 'b' is not nullable
}
```

However, if you cast the nullable variable into a non-nullable variable with `(!)` it will compile:

```vala
void main () {
    string? a = "hello";
    string b = (!) a;
}
```

There are experiments with non-null types (via `@NonNull` annotations) for Java as well, e.g. [JACK](http://homepages.ecs.vuw.ac.nz/~djp/JACK/) and [JastAdd](http://jastadd.org/jastadd-tutorial-examples/non-null-types-for-java).

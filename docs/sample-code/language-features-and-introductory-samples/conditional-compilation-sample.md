# Conditional Compilation Sample

Vala supports compile-time conditionals with `#if` / `#elif` / `#else` / `#endif`.
This is **not** a full C-style macro preprocessor: it only selects code at
compile time based on symbols defined with `valac -D`. 

Adapted from the archived
[Conditional Compilation Sample](https://wiki.gnome.org/Projects/Vala/ConditionalCompilationSample) page.

See [Language Features and Introductory Samples](../language-features-and-introductory-samples) for the full set.

```vala
void main () {

#if ( FOOBAR || FOO || BAR ) && (FOOBAR == FOO && FOO == BAR)
    message ("FOOBAR == FOO == BAR");
#endif

#if ! NOFOO && (FOOBAR || (FOO && BAR))
    message ("FOOBAR");
#elif FOO && ! NOFOO
    message ("FOO");
#elif BAR && ! NOFOO
    message ("BAR");
#elif NOFOO
#if FOOBAR || (FOO && BAR)
    message ("NOFOO FOOBAR");
#else
    message ("NOFOO");
#endif
#else
    message ("Nothing relevant defined");
#endif

}
```

## Compile and run

Try different `-D` combinations:

```shell
valac -D FOOBAR conditional-compilation.vala
./conditional-compilation

valac -D FOO -D BAR conditional-compilation.vala
./conditional-compilation

valac -D FOO -D BAR -D FOOBAR -D NOFOO conditional-compilation.vala
./conditional-compilation
```

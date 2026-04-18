# Character Sample

This sample shows how to walk a Unicode string with `get_next_char`, obtain each
`unichar`, and inspect its [`UnicodeType`](https://valadoc.org/glib-2.0/GLib.UnicodeType.html).

Adapted from the archived
[Vala Character Sample](https://wiki.gnome.org/Projects/Vala/CharacterSample) page. 

See [Language Features and Introductory Samples](../language-features-and-introductory-samples) for the full set.

```vala
void main () {
    string s = "1234567890 ١٢٣٤٥٦٧٨٩۰ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz أبتةثجحخدذرزسشصضطظعغفقكلمنهوي";
    unichar c;
    for (int i = 0; s.get_next_char (ref i, out c);) {
        UnicodeType type = c.type ();
        stdout.printf ("'%s' is ", c.to_string ());
        switch (type) {
        case UnicodeType.UPPERCASE_LETTER:
            stdout.printf ("UPPERCASE_LETTER\n");
            break;
        case UnicodeType.LOWERCASE_LETTER:
            stdout.printf ("LOWERCASE_LETTER\n");
            break;
        case UnicodeType.OTHER_LETTER:
            stdout.printf ("OTHER_LETTER\n");
            break;
        case UnicodeType.DECIMAL_NUMBER:
            stdout.printf ("DECIMAL_NUMBER\n");
            break;
        case UnicodeType.SPACE_SEPARATOR:
            stdout.printf ("SPACE_SEPARATOR\n");
            break;
        default:
            break;
        }
    }
}
```

### Compile and run

```shell
valac character.vala
./character
```

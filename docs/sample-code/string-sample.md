# String Sample

Adapted from the archived [Vala String Sample](https://wiki.gnome.org/Projects/Vala/StringSample) page.

See [Language Features and Introductory Samples](language-features-and-introductory-samples) for the full set.

<<< @/sample-code/assets/string-sample.vala

## Compile and run

```shell
valac string-sample.vala
./string-sample
```

## String length and UTF-8

Before Vala 0.11, `.length` was the number of Unicode code points and `.size()` was the length in bytes. Starting with Vala 0.11, `.length` is the length in bytes and indexing is byte-based. Strings remain UTF-8; indices, offsets, and lengths use UTF-8 code units (bytes), which matches many other string APIs and helps performance while still supporting Unicode text.

```vala
string dessert = "crème brûlée";
assert (dessert.length == 15);
uint8 a_byte = dessert[3];
assert (a_byte == 0xA8);
```

::: tip C# and Java

Java’s `String.length` and .NET’s `String.Length` count UTF-16 code units (often two bytes per unit). Vala counts UTF-8 code units (bytes). A string can therefore have different numeric “lengths” across these platforms for the same text.

:::

## UTF-8 character iteration

Because UTF-8 is variable-length, characters are not random-access by index. Avoid inefficient patterns such as:

```vala
string str = "吃饭了";
for (int i = 0; i < str.char_count (); i++) {
    str.get_char (str.index_of_nth_char (i));
}
```

Prefer `get_next_char`, which advances a byte offset and yields each `unichar`:

```vala
unichar c;
for (int i = 0; str.get_next_char (ref i, out c);) {
    stdout.printf ("%d, %s\n", i, c.to_string ());
}
```

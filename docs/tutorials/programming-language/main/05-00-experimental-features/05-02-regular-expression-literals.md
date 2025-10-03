# 5.2. Regular Expression Literals

::: danger Danger

Experimental Feature
:::

[Regular expressions](http://www.regular-expressions.info/) are a
powerful technique for pattern matching in strings. Vala has
experimental support for regular expression literals (`/regex/`).
Example:

```vala
string email = "tux@kernel.org";
if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.match(email)) {
    stdout.printf("Valid email address\n");
}
```

The trailing *i* makes the expression case insensitive. You can store a
regular expression in a variable of type *Regex*:

```vala
Regex regex = /foo/;
```

A example of regular expression replacement:

```vala
var r = /(foo|bar|cow)/;
var o = r.replace ("this foo is great", -1, 0, "thing");
print ("%s\n", o);
```

The following trailing characters can be used:

-   *i*, letters in the pattern match both upper- and lowercase letters
-   *m*, the "start of line" and "end of line" constructs match
    immediately following or immediately before any newline in the
    string, respectively, as well as at the very start and end.
-   *s*, a dot metacharater *.* in the pattern matches all characters,
    including newlines. Without it, newlines are excluded.
-   *x*, whitespace data characters in the pattern are totally ignored
    except when escaped or inside a character class.
-   *o*, request JIT compilation of a regular expression. It allows to
    execute this regex much faster at the cost of extra time taken to
    compile it. This option is most benificial, when the same compiled
    pattern is used for matching several times.

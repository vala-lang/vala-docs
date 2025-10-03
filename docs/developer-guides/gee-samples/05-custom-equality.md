# Customizing the equality function

[ArrayList](https://valadoc.org/gee-0.8/Gee.ArrayList.html) supports the
`contains (G item)` its equality function can be customized by providing
an implementation of `EqualDataFunc`.

```vala
bool same_book (Book a, Book b) {
    return a.isbn == b.isbn;
}

var books = new Gee.ArrayList<Book> ((EqualDataFunc) same_book);
```

Other [delegates](https://valadoc.org/gee-0.8/Gee.Functions.html) such
as `CompareDataFunc` and `HashDataFunc` apply to other Collections.

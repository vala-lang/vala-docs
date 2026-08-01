# 2.9. The Version Attribute

Vala symbol's can be annotated with the `[Version]` attribute. This
allows a symbol to be marked as experimental, deprecated and to indicate
version information. For example:

```vala
namespace Test {
    [Version (experimental = true)]
    public void test_function_1 ();

    [Version (deprecated = true)]
    public void test_function_2 ();

    [Version (deprecated_since = "2.0")]
    public void test_function_3 ();

    [Version (deprecated = true, deprecated_since = "2.0", replacement = "test_function_5", since = "1.0")]
    public void test_function_4 ();

    [Version (since = "1.0")]
    public void test_function_5 ();
}
```

# 6.7. Native Methods

Java: `native` keyword, JNI

Vala: all method calls are "native" calls. Bind C functions quickly with `extern` keyword or write a `.vapi` file. Use `CCode` attribute to specify the original function name (only if it differs from the Vala name)

```vala
public class MainClass : Object {

    [CCode (cname = "SampleMethod")]
    public static extern int sample_method (int x);

    static void main () {
        stdout.printf ("sample_method () returns %d\n", sample_method (5));
    }
}
```

Pass library name to the compiler with `-X -l...` (with `-X` meaning the next option is passed through to the C compiler)

```bash
valac demo.vala -X -lfoo
```

You can also pass a C source file containing the external method to the Vala compiler. This allows for mixed Vala and C source code projects.

```bash
valac demo.vala foo.c
```

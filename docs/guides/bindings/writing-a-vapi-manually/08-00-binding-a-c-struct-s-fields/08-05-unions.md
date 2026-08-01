# 8.5. Unions

Vala doesn't understand unions, but the names within the union can be
held as part of the cname.

```c
typedef struct {
    bool which_one;
    union {
        double d;
        int i;
    } data;
} foo_t;
```

```vala
public struct Foo {
    public bool which_one;
    [CCode (cname = "data.d")]
    public double data_d;
    [CCode (cname = "data.i")]
    public int data_i;
}
```

# 10.1. Array Lengths

Sometimes functions which return an array include lengths, but not the
way Vala expects. The two most common are:

```c
int get_array(foo**out_array_p);

struct {
foo *data;
int size;
} array_with_length;
void get_data(array_with_length *output);
```

which can be bound as:

```vala
[CCode (cname = "get_array")]
private int _get_array ([CCode (array_length = false)] out foo[] a);
[CCode (cname = "vala_get_array")]
public foo[] get_array () {
    foo[] temp;
    var len = _get_array (out temp);
    temp.length = len;
    return (owned) temp;
}

[CCode (cname = "array_with_length", destroy_function = "")]
private struct array_with_length {
    [CCode (array_length_name = "size")]
    foo[] data;
}
[CCode (cname = "get_data")]
private void _get_data (out array_with_length a);
[CCode (cname = "vala_get_data")]
public foo[] get_data () {
    array_with_length temp;
    _get_data (out temp);
    return (owned) a.data;
}
```

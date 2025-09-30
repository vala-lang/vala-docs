# 10.2. Dependently Typed Ownership

A function may take ownership of an object conditionally. This can be
true depending on parameters or return value. In the case of parameters,
the function can be bound as such:

```c
void somefunc(foo *data, bool free_when_done);
```

```vala
[CCode (cname = "somefunc")]
private _somefunc(Foo data, bool free_when_done);
[CCode (cname = "")]
private _sink_foo (owned Foo foo);
[CCode (cname = "vala_somefunc")]
public somefunc (Foo data) {
    _somefunc(data, false);
}
[CCode (cname = "vala_somefunc_owned")]
public somefunc_owned (owned Foo data) {
    _somefunc (data, true);
    _sink_foo ((owned) foo);
}
```

This is more awkward when the return code is the source of the dependent
typing. One option is as follows:

```c
/* foo is freed if return value is 3. */
int awkward(foo*);
```

```vala
[CCode (cname = "")]
private void _sink_foo (owned Foo f);
[CCode (cname = "awkward")]
private int _awkward (Foo f);
[CCode (cname = "vala_awkward")]
public int awkward (ref Foo f) {
    var ret = _awkward (f);
    if (ret == 3)
        _sink_foo ((owned)f);
    return ret;
}
```

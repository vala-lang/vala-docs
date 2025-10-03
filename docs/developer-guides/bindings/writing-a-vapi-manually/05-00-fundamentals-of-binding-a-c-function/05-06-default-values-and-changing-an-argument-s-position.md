# 5.6. Default Values and Changing an Argument's Position

Since C does not have default parameters, there are sometimes duplicate
C functions to act in this way:

```c
int foo_compute(Foo *f, int base_height);
int foo_compute_ex(Foo *f, int base_height, Table *t, struct opts *opts);
```

Since Vala does have default parameters, it may be beneficial to only
bind the extended version, but only if the default values are unlikely
to change. This is generally true in where the documentation reads "set
to null to determine automatically". If unsure, it is best to bind both.

```vala
[CCode (cname = "foo_compute_ex")]
public compute (int base_height, Table t = null, opts? opts = null);
```

# 5.3. Nullability

For most types, appending a question mark allows the type to be null.
Generally, C programmers do a lousy job of conveying whether a
particular parameter may be null. For any type which is, underneath, a
pointer (arrays, compact classes, arrays, and delegates) nullability
does not change the C type. That is, if `Foo` is a class, then `Foo foo`
and `Foo? foo` have the same C signature. For simple types, enums, and
flags, adding nullability lifts the type to a pointer. That is `bool b`
has the C type `gboolean b` and `bool? b` has the C type `gboolean *b`.
Parented structs are a special case. When passed as parameters, they are
always passed as a pointer, so nullability makes only a semantic
difference; when return values, nullability changes the behaviour, as
discussed below.

Vala always assume an out parameter can be null. For example:

```vala
public delegate void ComputeFunc (int x);
public void get_compute_func (double epsilon, out ComputeFunc func);

ComputeFunc f;
get_compute_func (3.14158, out f);
f (3); // f should never be a null pointer.
get_compute_func (2.72, null); // This is perfectly okay according to Vala.
```

It's important to note that nullability refers to the type of the
parameter, not the parameter handling. Many C libraries do not check
that an out parameter is not null before accessing it, resulting in a
segmentation fault. There is no syntax in Vala to prevent this.

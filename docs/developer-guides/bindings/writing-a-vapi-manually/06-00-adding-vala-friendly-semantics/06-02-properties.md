# 6.2. Properties

Vala allows compact classes to have properties, which are syntactic
sugar for get and set method pairs. Often C objects with opaque
implementations will provide a collection of functions to query state
about the instance. These can be converted to properties given the
following:

-   The `get` method has the signature `T get (I self)` and the set
    method has the signature `void set (I self, T val)`. They need not
    actually occur in pairs.
-   The `get` method does not have side effects that are not obvious to
    the user.
-   The `get` method is cheap to call.
-   The `set` method does not have error information being returned.

Unlike most return types, the return of a get method is assumed to be
unowned unless explicitly `owned`.

Consider:

```c
typedef struct foo Foo;
int foo_item_count(Foo f);
int foo_max_items(Foo f);
void foo_set_max_items(Foo f);
```

```vala
public class Foo {
    public int item_count {
        [CCode (cname = "foo_item_count")] get;
    }
    public int max_items {
        [CCode (cname = "foo_max_items")] get;
        [CCode (cname = "foo_set_max_items")] set;
    }
}
```

All the usual `CCode` attributes may be applied to `get;` and `set;` and
`owned` may be applied to change the default ownership of `get;`. Note
that changing the ownership of the property is the wrong thing to do
unless the instance doesn't actually own the value provided to it by
`set;`.

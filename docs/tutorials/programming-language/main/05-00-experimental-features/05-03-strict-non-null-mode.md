# 5.3. Strict Non-Null Mode

::: danger Danger

Experimental Feature
:::

If you compile your code with `--enable-experimental-non-null` the Vala
compiler will run in strict non-null type checking mode and consider
*every* type to be not nullable by default unless it is explicitly
declared nullable by marking it with a question mark:

```vala
Object o1 = new Object ();     // not nullable
Object? o2 = new Object ();    // nullable
```

The compiler will perform a static compile-time analysis to ensure that
no nullable reference is assigned to a non-nullable reference, e.g. this
won't be possible:

```vala
o1 = o2;
```

*o2* could be *null* and *o1* was declared non-nullable, so this
assignment is forbidden. However, you can override this behaviour with
an explicit non-null cast if you're sure that *o2* is not *null*:

```vala
o1 = (!) o2;
```

The strict non-null mode helps in avoiding unwanted *null* dereferencing
errors. This feature would come to full potential if the nullability of
all return types in bindings was marked correctly, which is currently
not always the case.

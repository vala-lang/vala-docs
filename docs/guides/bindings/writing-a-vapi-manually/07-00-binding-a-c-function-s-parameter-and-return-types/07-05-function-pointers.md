# 7.5. Function Pointers

Function pointers in C are bound as delegates in Vala. A delegate is a
type that declares the function signature a function pointer should
have. A function pointer can also have an associated data parameter
called a target.

For delegates without targets, they can simply be treated as simple
types.

For targeted delegates, the target must be included. Vala, by default,
assumes this will be after the function pointer itself, but this can be
adjusted with the `delegate_target_pos`. The position where the target
is received is defined in the delegate's definition; not the calling
function.

A delegate with a target cannot be trivially duplicated, since the
target must also be duplicated. Thus, targeted delegates are treated
much like singly-owned classes, which can be reassigned, but not
multiply referenced.

If the method is going to retain a reference to the delegate, then it
needs a helper function to destroy the delegate after it has finished.
This position is after the target, but can be set with the
`delegate_target_destroy_notify_pos`.

If a delegate is being returned, which is rather rare, the target and
destroy notifier are assumed to be out parameters.

```c
typedef void (*foo_func)(int x, void *context);

void call_foo(foo_func f, void *context);
void call_foo_later(foo_func f, void *context, void(*free_context)(void*));
foo_func get_foo(void **context);
foo_func make_foo(void **context, void(**free_context)(void*));
```

```vala
[CCode (cname = "foo_func", has_target = true)]
public delegate void FooFunc (int x);

public void call_foo (FooFunc f);
public void call_foo_later (owned FooFunc f);
public unowned FooFunc get_foo ();
public FooFunc make_foo ();
```

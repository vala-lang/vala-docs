# 4.7. Delegates

C permits the definition of function pointers, which are pointers to
code matching a certain signature that may be executed. The major
problem with this is that it does not pass information from the caller,
through the library, to the callback. In other languages, a closure is
an encapsulation of code and state. C programmers sometimes emulate this
behaviour by passing a void pointer of "user data" or "context" that
acts as the state portion of the closure.

Vala supports both of these modes: a delegate may be targeted (i.e., a
closure) or targetless (i.e., a function pointer). This is controlled by
the has_target value, which defaults to true. The position of the target
is assumed to be the last value in the argument list, which is typically
where most C programs put it, though they occasionally place it first.

```c
typedef int(*compute_func)(int a, int b);
typedef double(*analyze_func)(int a, int b, void *userdata);
```

```vala
[CCode (cname = "compute_func", has_target = false)]
public delegate int ComputeFunc (int a, int b);
[CCode (cname = "analyze_func")]
public delegate double AnalyzeFunc (int a, int b);
```

If the position of the context is not the last parameter, set the CCode
attribute, `delegate_target_pos`, as per
[Changing the Position of Parameters](../05-00-fundamentals-of-binding-a-c-function/05-05-changing-the-position-of-generated-arguments).

It is common for C programmers not to create a `typedef` for a function
pointer, instead opting to include it directly. Create a delegate and do
not set the `cname`. If possible, contribute a patch to the library to
create a `typedef`.

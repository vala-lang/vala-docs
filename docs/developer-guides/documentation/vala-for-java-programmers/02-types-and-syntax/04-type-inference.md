# 2.4. Type Inference

Vala supports a mechanism called type inference (implicit typing) for
local variables: local variables may be declared using the `var` keyword
instead of the type name if the compiler can deduce (infer) the type
from the initial assignment. This helps avoiding unnecessary redundancy
and is especially useful for generic types. Examples:

```vala
var obj = new Object ();
var map = new HashMap<string, int> ();
var str = "hello, world";
var arr = new int[10];
```

instead of:

```vala
Object obj = new Object ();
HashMap<string, int> map = new HashMap<string, int> ();
string str = "hello, world";
int[] arr = new int[10];
```

Still, everything is statically typed.

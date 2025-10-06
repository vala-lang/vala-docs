# 5.10. Methods that Change the Instance Reference

Sometimes methods return a new pointer to the instance (think realloc).
Declare the function in the VAPI returns void and add the attribute
`ReturnsModifiedPointer`.

```c
typedef struct table Table;
Table *table_grow(Table *t, size_t object_count);
```

```vala
[Compact]
[CCode (cname = "Table")]
public class Table {
    [ReturnsModifiedPointer]
    public void grow (size_t object_count);
}
```

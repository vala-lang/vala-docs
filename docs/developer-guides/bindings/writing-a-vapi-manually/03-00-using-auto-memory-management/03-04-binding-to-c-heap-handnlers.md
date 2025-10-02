# 3.4. Binding to C Heap Handlers

One of the unique features of Vala is to have both singly-owned
instances and reference-counted instances. Reference-counted instances
can be stored in new locations and memory management done by counting
the number of references; destruction of the instance is done when there
are no more references to that instance. Singly-owned instances have a
single authoritative reference and, when that reference is destroyed,
the instance is destroyed. Reference-counted objects can thus be
"copied" by increasing the reference count while singly-owned instances
cannot be copied without duplicating the actual data in them, if that is
even possible.

While this is primarily a concern for objects, all instances in Vala
must subscribe to one of these memory management schemes. Different
types of objects can follow different schemes and some types can
subscribe to different schemes depending on subtle differences in
declaration.

| **Vala Type**                   | **Scheme**        | **C Type**                                   | **Memory Management Binding Needed?**        |
|---------------------------------|-------------------|----------------------------------------------|----------------------------------------------|
| Enum and Flag                   | Value             | int                                          | No                                           |
| Delegate `(has_target = false)` | Value             | Function Pointer                             | No                                           |
| Delegate `(has_target = true)`  | Value             | Function Pointer and Void Pointer            | No                                           |
| Delegate `(has_target = true)`  | Singly-Owned      | Function Pointer and Void Pointer            | Yes, use `free_function`                     |
| Simple-Type Struct              | Value             | Various Basic Types or a Struct              | No                                           |
| Struct                          | Value             | Struct, but passed as a Pointer to a Struct  | No                                           |
| Struct                          | Parented          | Struct, but passed as a Pointer to a Struct  | Yes, use `destroy_function`                  |
| Compact Class                   | Singly-Owned      | Pointer to a Struct                          | Yes, use `free_function`                     |
| Compact Class                   | Reference-Counted | Pointer to a Struct                          | Yes, use `ref_function` and `unref_function` |
| Pointer                         | Value             | Pointer to Contents                          | No                                           |
| Array                           | Singly-Owned      | Pointer to Element Type (and Integer Length) | Yes, use `free_function`                     |

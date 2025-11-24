# 3.3. Destruction

Although Vala manages the memory for you, you might need to add your own
destructor if you choose to do manual memory management with pointers
(more on that later) or if you have to release other resources. The
syntax is the same as in C# and C++:

```vala
class Demo : Object {
    ~Demo () {
        stdout.printf ("in destructor");
    }
}
```

Since Vala's memory management is based on 
[reference counting](https://en.wikipedia.org/wiki/Reference_counting) instead
of [tracing garbage collection](https://en.wikipedia.org/wiki/Tracing_garbage_collection),
destructors are deterministic and can
be used to implement the [RAII](http://en.wikipedia.org/wiki/RAII)
pattern for resource management (closing streams, database connections,
...).

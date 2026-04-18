# 3. Using Vala's Automatic Memory Management

When writing Vala code, including code using a C library, memory
management is handled by the Vala compiler. There is usually no need to
manually claim and free memory. When writing a binding, however, it is
an important part of the process to accurately instruct the Vala
compiler how to use the C library's memory management calls. This is a
one-time job and means anyone then using the binding can take advantage
of a binding that is much easier to write code for.

Vala's memory allocation and types are a bit more involved than most
languages. In Python, everything is a dynamically-typed object, and it is
allocated out of the ether then gets garbage collected. In C, memory
allocation is largely handled by the user and types are simply
descriptions of memory considered at compile time. Vala lives somewhere
trying to cover all the bases at once. Importantly, the types in Vala
imply something about the memory management.

There are 4 memory management schemes in Vala:

| **Scheme**        | **Memory Manager** | **Helpers?** | **Copy Cost** |
|-------------------|--------------------|--------------|---------------|
| Values            | C compiler         | No           | Cheap         |
| Parented          | C compiler         | Yes          | Expensive     |
| Singly-Owned      | Heap allocator     | Yes          | Expensive     |
| Reference-Counted | Heap allocator     | Yes          | Cheap         |

<ul class="section-toc">
<li><a href="03-00-using-auto-memory-management/03-01-pointers-in-c">3.1. Pointers in C (or what all these *'s mean)</a></li>
<li><a href="03-00-using-auto-memory-management/03-02-constants-the-stack-and-the-heap-in-c">3.2. Constants, the Stack and the Heap in C</a></li>
<li><a href="03-00-using-auto-memory-management/03-03-the-concept-of-ownership-in-vala">3.3. The Concept of &quot;Ownership&quot; in Vala</a></li>
<li><a href="03-00-using-auto-memory-management/03-04-binding-to-c-heap-handnlers">3.4. Binding to C Heap Handlers</a></li>
</ul>

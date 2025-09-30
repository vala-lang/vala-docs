Constants, the Stack and the Heap in C
======================================

Data in C can be allocated using a mechanism that stops it from being changed during the running of the program. These are known as constants. Data can also be allocated using two other schemes: the stack and the heap. These three schemes need to be understood when writing a binding. The main reason is so heap memory is allocated and deallocated properly by Vala code when using the binding, but also to make sure the binding doesn't apply heap rules to the other two schemes.

To better understand these three schemes it is helpful to analyse how they handle memory in four stages:

1. Declaration
2. Allocation
3. Initialization
4. Deallocation

Declaration informs the compiler of how much memory will be needed. For example ``uint8`` lets the compiler know at least 8 bits (a byte) is needed, or ``double`` will likely require more memory than ``float``. The exact size of each type is platform dependent and will be resolved by the compiler.

Allocation is the process of exclusively reserving an area of memory. Where the memory is allocated from is based on the memory scheme. 

Once the memory has been allocated the memory needs to be initialized to the required value. For example ``int a = 128;`` will set the memory reserved for an ``int`` to the value of ``128``.

Deallocating the memory means it can be used again by other parts of the program.

+--------------+-----------------+----------------+--------------------+------------------+
|              | **Declaration** | **Allocation** | **Initialization** | **Deallocation** |
+==============+=================+================+====================+==================+
| **Constant** | Compile time    | Compiler       | Compile time       | Program exit     |
+--------------+-----------------+----------------+--------------------+------------------+
| **Stack**    | Compile time    | Compiler       | Run time           | Compiler         |
+--------------+-----------------+----------------+--------------------+------------------+
| **Heap**     | Compile time    | Coder          | Run time           | Coder            |
+--------------+-----------------+----------------+--------------------+------------------+

The C compiler does some memory management. This happens when items are placed on the stack or inside another structure: the compiler creates the space needed to hold these objects. Otherwise, ``malloc`` and ``free`` are used to allocate space from the heap. If any instance contains references to other instances, helper functions are needed to do the allocate and deallocate those references.


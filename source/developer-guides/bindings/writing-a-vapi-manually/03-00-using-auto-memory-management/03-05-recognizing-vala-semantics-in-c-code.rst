= Recognizing Vala Semantics in C Code =
An important difference between C and Vala is that Vala is more semantically expressive. For instance, in C `char*` can mean several things. It could be a string, an array, a pointer to a single character, an out parameter returning a character, a pointer to a character that will be modified by the routine. It is also completely unclear if this pointer can be null. Vala expresses these differences syntactically, so writing the binding requires understanding the intent of the original code.

It is easiest to start by looking through the header files and determining all the important types to be bound. For each one, find any allocation functions, copy functions and cleanup functions. From these, the right binding strategy can be inferred.

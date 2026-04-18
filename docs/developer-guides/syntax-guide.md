# Syntax Guide

Original Source: [Vala Syntax Guide](https://wiki.gnome.org/Projects/Vala/Syntax)

The syntax of Vala is similar to C#, modified to better fit the GObject type system. Vala supports modern language features as the following:

- OOP (classes, abstract classes, mixin interfaces, type polymorphism)
- Namespaces
- Delegates
- Properties
- Signals
- Property change notifications
- Foreach
- Lambda expressions / Closures
- Type inference for local variables
- Generics
- Non-null types
- Assisted memory management (automatic reference counting)
- Deterministic destructors (suitable for RAII)
- Exception handling (checked exceptions)
- Asynchronous methods (coroutines)
- Preconditions and postconditions (contract programming)
- Run-time type information
- Named constructors
- Verbatim strings and string templates
- Array and string slicing
- Conditional compilation
- Dynamic and static D-Bus support
- C# like syntax
- C ABI compatibility
- Experimental:
  - Chained relational expressions
  - Regular expression literals
  - Main blocks

## Keywords

- Selection: `if, else, switch, case, default`
- Iteration: `do, while, for, foreach, in`
- Jumping: `break, continue, return`
- Exception Handling: `try, catch, finally, throw`
- Synchronization: `lock, unlock`
- Type Declaration: `class, interface, struct, enum, delegate, errordomain`
- Type Modifiers: `const, weak, unowned, dynamic`
- Modifiers: `abstract, virtual, override, signal, extern, static, async, inline, new, sealed, partial`
- Access Modifiers: `public, private, protected, internal`
- Method Parameters: `out, ref`
- Method Contract Keywords: `throws, requires, ensures`
- Namespaces: `namespace, using`
- Operator Keywords: `as, is, in, new, delete, sizeof, typeof`
- Access Keywords: `this, base`
- Literal Keywords: `null, true, false`
- Property Context: `get, set, construct, default, value`
- Construction Blocks: `construct, static construct, class construct`
- Other: `void, var, yield, global, owned, with`

## Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Bitwise: `~`, `&`, `|`, `^`, `<<`, `>>`
- Relational: `<`, `>`, `<=`, `>=`
- Equality: `==`, `!=`
- Logic: `!`, `&&`, `||`
- Assignment: `=`, `+=`, `-=`, `*=` , `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`
- Increment, Decrement: `++`, `--`
- Pointer: `&`, `*`, `->`, `delete`
- Conditional: `?:`
- Null-Coalescing: `??`
- String Concatenation: `+`
- Method Invocation: `()`
- Member Access: `.`
- Index: `[]`
- Slice: `[:]`
- Lambda: `=>`
- Casting: `(`_Type_`)`, `(!)`, `as`
- Type Checking: `is`
- Ownership Transfer: `(owned)`
- Namespace Alias Qualifier: `::` (currently only with `global`)
- Other: `new`, `sizeof`, `typeof`, `in`
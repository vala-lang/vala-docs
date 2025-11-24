# 2.2. Syntax Overview

Vala's syntax is an amalgam heavily based on C#'s. As a result, most
of this will be familiar to programmers who know any C-like language,
and in light of this I have kept things brief.

Scope is defined using braces. An object or reference is only valid
between a left brace `{` and a right brace `}` in which it is defined in.
These are also the delimiters used to define
classes, methods, code blocks, etc., so they automatically have their own
scope. Vala is not strict about where variables are declared.

An identifier is defined by its type and a name.

```vala
int c;
```
`c` is an integer using the primitive type `int`. In the case of value types this also creates an
object of the given type. For reference types these just define a new reference that doesn't 
initially point to anything. Types will be covered in more detail in [Data Types](02-04-data-types).

Identifier names may be any combination of english alphabet letters,
underscores, and digits. However, to define or refer to an identifier
with a name that either starts with a digit or is a keyword, you must
prefix it with the `@` character. This character is not considered a
part of the name. For example, you can name a method `foreach` by
writing `@foreach` even though this is a reserved Vala keyword. You can
omit the `@` character when it can be unambiguously interpreted as an
identifier name, such as in `foo.foreach()`.

Reference types are instantiated using the `new` operator and the name
of a construction method, which is usually just the name of the type.

```vala
Object o = new Object()
```
This creates a new `Object` and makes `o` a reference to it.

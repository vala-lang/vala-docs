# 2. Environment Setup

## 2.1. Compiling from the Source Repository

The [Vala README.md](https://gitlab.gnome.org/GNOME/vala/blob/master/README.md)
file contains full and up to date instructions on how to download and
compile Vala from the git repository.

## 2.2. Setting up your editor

A [list of IDE(s)](../../tooling/code-editors-and-ides) with Vala support is available.

Vala support is available also for [build tools and editors](../../tooling/build-systems).

## 2.3. Files

Vala source files are named in the GTK+ style, i.e. all lowercase, with
no separators between words, in the format namespaceclassname.vala. For
example, the filename for Vala.FormalParameter is
valaformalparameter.vala.

For the Vala compiler and library there is only one namespace, and it is
called "Vala". Don't put "using Vala;"; instead qualify the name of
types you declare. For example "class Vala.FormalParameter : Symbol".

## 2.4. Coding Style

The coding style used in Vala itself seems to be a variation of the GTK+
coding style.

-   Tabs rather than spaces.
-   Tab width unspecified, but 4 works well.
-   Hanging braces.
-   Cuddled else.
-   Braces necessary for single-line blocks.
-   Variable and method identifiers in lowercase, words seperated by
    underscores.
-   Type identifiers in CamelCase.
-   Enum members and constants in ALL_CAPS, words seperated by
    underscores.
-   C-style _/* comments. */_
-   Hungarian notation not used.
-   Variables are often declared with implicit type (i.e. _var foo = new Foo ()_).
-   No line-length limit.
-   No function-length limit.
-   Space between method name and parameters' opening parenthesis.
-   Property _get_, _set_, _default_
    declaration all on one line, seperated by semicolons, if default
    implementations are used.
-   If properties have implementations, then _get {_, _set {_ open new lines.
-   Attributes on their own line.
-   JavaDoc-style commenting on types, methods, variables.
-   Header at top of file contains:

```vala
/* filename.vala
 *
 * Copyright (C) 20yy-20yy  Copyright Holder <email@address>
 *
 * License text.
 *
 * Author:
 *   Programmer Name <programmer@email>
 */
```

# 3.4. Symbol Resolution

Vala.SymbolResolver is a CodeVisitor that exchanges Vala.UnresolvedTypes
in the parse tree with Vala.DataTypes and links Vala.NamespaceReferences
with the correct namespace symbol. Additionally, it checks base types
for classes so that classes don't inherit from multiple classes or
themselves, and likewise it checks that interfaces don't need to
implement themselves.

## 3.4.1. Data Types

Every expression has a static type. This is computed by the semantic
analyzer. Vala.DataType is called a "type reference" because it
contains a reference to a Vala.Typesymbol (a class, interface, etc.) as
well as information about the expression's type, e.g., if it can be null,
or, if it's an out parameter.

::: info TODO
expand this section
:::

## 3.4.2. Symbols

A Vala.Symbol is a specialization of Vala.CodeNode. All symbols except
for the root symbol are contained within another's scope. Types have
scope and variables have scope. For types and variables, scope
determines their accessibility, subject to access modifiers. For
variables, scope also determines their lifetime. As the code tree is
traversed, SymbolResolver keeps track of the current scope. For example,
when a class is visited, current_scope is set to that class's scope.

When the parser parses a type, e.g., in the statement Gtk.Window
main_window, the type Gtk.Window is initially a Vala.UnresolvedType. In
visit_data_type (), the UnresolvedType code node asks its parent to
replace it with a new Vala.DataType created with resolve_type ().

UnresolvedTypes have UnresolvedSymbols. resolve_type () uses
resolve_symbol () to find the Typesymbol referred to, and then wraps it
in a new DataType object.

resolve_symbol () is a recursive method which looks up an unresolved
symbol's name in the current scope and returns the corresponding
Typesymbol. The base case is when the UnresolvedSymbol has no
qualifiers, e.g. Window. The recursive case is when the symbol looks
like Gtk.Window or Gtk.Orientation.HORIZONTAL. In
Vala.Parser.parse_symbol_name (), the symbol is built inside-out, so
Gtk.Orientation.HORIZONTAL is parsed as:

```vala
(UnresolvedSymbol
    (UnresolvedSymbol
        (UnresolvedSymbol(null, "Gtk"),
         "Orientation"),
     "HORIZONTAL")
```

This is inside-out because Orientation is the parent scope of
HORIZONTAL, but Orientation is the child node of HORIZONTAL.

In the base case, the symbol's name is looked up in current_scope. If
the symbol is not found there, then the scope of all imported namespaces
is searched. If more than one imported namespace contains the symbol, an
"ambiguous reference" error will be reported.

In the recursive case, resolve_symbol () is called on the child node to
give a parent scope, in which the symbol is looked up.

One last function of SymbolResolver is in visit_variable_declarator () -
to mark a variable type reference as "nullable" if the variable's
type is a class, interface, array or error (reference type). This is
used later by Vala.NullChecker.

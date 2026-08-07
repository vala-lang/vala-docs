# 3.3. Symbol Resolution

`Vala.SymbolResolver` (`vala/valasymbolresolver.vala`) is a `CodeVisitor`
that exchanges `Vala.UnresolvedType` (`vala/valaunresolvedtype.vala`)
nodes in the parse tree with `Vala.DataType` (`vala/valadatatype.vala`)
nodes and links `Vala.NamespaceReference` nodes with the correct
namespace symbol. Additionally, it checks base types for classes so
that classes don't inherit from multiple classes or themselves, and
likewise it checks that interfaces don't need to implement themselves.

## 3.3.1. Data Types

Every expression has a static type. This is represented by `Vala.DataType`.

`Vala.DataType` is called a "type reference" because because it contains a reference to a `Vala.TypeSymbol` (`vala/valatypesymbol.vala`) (a class, interface, etc.) as well as information about the expression's type, e.g., if it can be `null`,
or, if it's an `out` parameter.

Type references are first discovered by the `Vala.Parser`.

Then `Vala.SymbolResolver` will resolve the type references for symbols.

Later on in the compilation process, the semantic analyzer (`Vala.SemanticAnalyzer`) will compute expressions, using the type references found in the previous steps of the compilation process, to ensure that the expressions are typed correctly.

## 3.3.2. Symbols

A `Vala.Symbol` (`vala/valasymbol.vala`) is a specialization of
`Vala.CodeNode` (`vala/valacodenode.vala`). All symbols except
for the root symbol are contained within another's scope. Types have
scope and variables have scope. For types and variables, scope
determines their accessibility, subject to access modifiers. For
variables, scope also determines their lifetime. As the code tree is
traversed, `SymbolResolver` keeps track of the current scope. For example,
when a class is visited, `current_scope` is set to that class's scope.

When the parser parses a type, e.g., in the statement `Gtk.Window main_window`, the type `Gtk.Window` is initially a `Vala.UnresolvedType`. In
`visit_data_type ()`, the `UnresolvedType` code node asks its parent to
replace it with a new `Vala.DataType` created with `resolve_type ()`.

`UnresolvedType` nodes have `UnresolvedSymbol` children. `resolve_type ()` uses
`resolve_symbol ()` to find the `TypeSymbol` referred to, and then wraps it
in a new `DataType` object.

`resolve_symbol ()` is a recursive method which looks up an unresolved
symbol's name in the current scope and returns the corresponding
`TypeSymbol`. The base case is when the `UnresolvedSymbol` has no
qualifiers, e.g. `Window`. The recursive case is when the symbol looks
like `Gtk.Window` or `Gtk.Orientation.HORIZONTAL`. In
`Vala.Parser.parse_symbol_name ()`, the symbol is built inside-out, so
`Gtk.Orientation.HORIZONTAL` is parsed as:

```vala
(UnresolvedSymbol
    (UnresolvedSymbol
        (UnresolvedSymbol (null, "Gtk"),
         "Orientation"),
     "HORIZONTAL")
```

This is inside-out because Orientation is the parent scope of
HORIZONTAL, but Orientation is the child node of HORIZONTAL.

In the base case, the symbol's name is looked up in `current_scope`. If
the symbol is not found there, then the scope of all imported namespaces
is searched. If more than one imported namespace contains the symbol, an
"ambiguous reference" error will be reported.

In the recursive case, `resolve_symbol ()` is called on the child node to
give a parent scope, in which the symbol is looked up.

One last function of `SymbolResolver` is in `visit_variable_declarator ()` -
to mark a variable type reference as "nullable" if the variable's
type is a class, interface, array or error (reference type). This is
used later by `Vala.NullChecker`.

## 3.3.3. Attributes

Symbol Resolution runs before there is any dedicated attribute processing
step (there isn't one - see
[3.2.5. Attributes](./03-02-parser#3-2-5-attributes) for why), so where
`Vala.SymbolResolver` needs to know something an attribute encodes, it reads
it straight off the symbol with `Vala.CodeNode.has_attribute ()`. This is
called out in a comment in `get_type_for_struct ()`
(`vala/valasymbolresolver.vala`):

```vala
// attributes are not processed yet, access them directly
if (base_struct.has_attribute ("BooleanType")) {
    return new BooleanType (st, source_reference);
} else if (base_struct.has_attribute ("IntegerType")) {
    return new IntegerType (st, null, null, source_reference);
} else if (base_struct.has_attribute ("FloatingType")) {
    return new FloatingType (st, source_reference);
} else {
    return new StructValueType (st, source_reference);
}
```

This decides what kind of `Vala.DataType` a struct resolves to as a value
type. A struct declared with `[BooleanType]`, `[IntegerType]` or
`[FloatingType]` (used for structs that bind to C's primitive types, such as
`bool`, `int` or `double`) resolves to the matching built-in `DataType`
instead of the default `Vala.StructValueType`.

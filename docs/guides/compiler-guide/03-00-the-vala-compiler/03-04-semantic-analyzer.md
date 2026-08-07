# 3.4. Semantic Analyzer

`Vala.SemanticAnalyzer` (`vala/valasemanticanalyzer.vala`) is a `CodeVisitor` that looks up the symbols that have been, parsed and checks if the symbols are being used correctly.

This includes:
- Verifying that for each symbol type, the syntax is being followed
- The rules of how each symbol can be used is being followed

The key method to look at is `Vala.SemanticAnalyzer.analyze ()`

## 3.4.1 How The Built-in Symbol Types Are Looked Up

Initially symbol types are looked up from the `Vala.CodeContext` (`vala/valacodecontext.vala`) `root` (`Vala.Namespace`, `vala/valanamespace.vala`).

In `Vala.Compiler` (`compiler/valacompiler.vala`) for the `run()` method, for each source filename given to the compiler, the `Vala.CodeContext.add_source_file_name ()` is called (unless the compiler is run with the Fast VAPIs feature enabled).

On each call to the `add_source_file_name ()` method on `Vala.CodeContext`, a default namespace `using` directive is added to the `Vala.SourceFile` (`vala/valasourcefile.vala`) object representing each source file.

The default namespace that gets added depends on the `profile` option set when the compiler is executed:
- `gobject` (default): `using GLib;`
- `posix`: `using Posix;`

This provides the implementation of the built-in types of the language. 

The implementation of each type are then added to the namespace scope which is then looked up when the `Vala.SemanticAnalyzer.analyze()` method is called.

## 3.4.2 How Each Symbol in the Symbol Tree Is Checked

After looking up the built-in symbol types, in `Vala.SemanticAnalyzer.analyze ()`, the method then continues on by calling `Vala.CodeNode.check ()` (`vala/valacodenode.vala`) on the namespaces in the code context root.

After, `CodeContext.accept ()` is called with the semantic instance and the code visitor recursively goes through the entire symbol tree to ensure that all the symbols are being used correctly.

Also, `Vala.SemanticAnalyzer` contains methods and static functions that are used as shared reusable logic across the symbol tree of ensuring that symbol's are being used correctly. For example `Vala.SemanticAnalyzer.check_arguments ()` checks the arguments of an expression, ensuring that the correct amount of arguments are being used.

## 3.4.3 Error Handling

If while checking the symbols, any errors have been reported, after the semantic analyzer has finishing checking through the entire symbol tree, the compiler program will exit early instead of proceeding with the Flow Analyzer.

## 3.4.4. Attributes

Semantic analysis is where most attribute-driven validation happens, since
this is the stage that walks every symbol and calls `Vala.CodeNode.check ()`
on it. There's no separate step for this - the same attribute accessors
described in [3.2.5. Attributes](./03-02-parser#3-2-5-attributes) are simply
called from inside `check ()` and from computed properties that `check ()`
relies on.

A few examples:

- `Vala.Class.check ()` (`vala/valaclass.vala`) reads `has_attribute ("Compact")`
  directly to reject a `[Compact]` class inheriting from a non-compact base
  class, reporting `` Compact class `%s' cannot inherit from non-compact class
  `%s' ``.
- `Vala.Class.is_compact` and the equivalent properties on `Vala.Struct`
  (`vala/valastruct.vala`) for `SimpleType`, `BooleanType`, `IntegerType` and
  `FloatingType` are backed by `has_attribute ()`, computed once and cached on
  first access.
- `Vala.SemanticAnalyzer` (`vala/valasemanticanalyzer.vala`) reaches into
  individual `CCode` arguments in its own helper methods while deciding how a
  symbol must be treated - for example `is_gobject_property ()` reads
  `array_length`, `array_null_terminated` and `delegate_target` to work out
  whether a property can be exposed as a GObject property, and
  `is_gobject_property_type ()` reads `has_type_id` to work out whether a
  struct type qualifies.

### 3.4.4.1. Version and Deprecation Checks

`[Version]` (and its deprecated predecessors `[Deprecated]`/`[Experimental]`)
are checked by a dedicated helper class, `Vala.VersionAttribute`
(`vala/valaversionattribute.vala`), rather than being read directly. Every
`Vala.Symbol` lazily creates and caches one through its `version` property
(`vala/valasymbol.vala`), and that object is what reads the `since`,
`replacement`, `deprecated`, `deprecated_since`, `experimental` and
`experimental_until` arguments.

Its `check ()` method is called wherever a symbol is *used*, rather than once
for the whole file - from `Vala.MemberAccess` (`vala/valamemberaccess.vala`),
`Vala.ObjectCreationExpression`, `Vala.Field`, `Vala.Parameter`,
`Vala.LocalVariable` and `Vala.Class`. This is why a deprecation or
experimental-API warning is reported once per call site or reference, not
once globally for the declaration.


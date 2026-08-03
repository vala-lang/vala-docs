# 3.4. Semantic Analyzer

`Vala.SemanticAnalyzer` is a `CodeVisitor` that looks up the symbols that have been, parsed and checks if the symbols are being used correctly.

This includes:
- Verifying that for each symbol type, the syntax is being followed
- The rules of how each symbol can be used is being followed

The key method to look at is `Vala.SemanticAnalyzer.analyze ()`

## 3.4.1 How The Built-in Symbol Types Are Looked Up

Initially symbol types are looked up from the `Vala.CodeContext` `root` (`Vala.Namespace`).

In `Vala.Compiler` for the `run()` method, for each source filename given to the compiler, the `Vala.CodeContext.add_source_file_name ()` is called (unless the compiler is run with the Fast VAPIs feature enabled).

On each call to the `add_source_file_name ()` method on `Vala.CodeContext`, a default namespace `using` directive is added to the `Vala.SourceFile` object representing each source file.

The default namespace that gets added depends on the `profile` option set when the compiler is executed:
- `gobject` (default): `using GLib;`
- `posix`: `using Posix;`

This provides the implementation of the built-in types of the language. 

The implementation of each type are then added to the namespace scope which is then looked up when the `Vala.SemanticAnalyzer.analyze()` method is called.

## 3.4.2 How Each Symbol in the Symbol Tree Is Checked

After looking up the built-in symbol types, in `Vala.SemanticAnalyzer.analyze ()`, the method then continues on by calling `Vala.CodeNode.check ()` on the namespaces in the code context root.

After, `CodeContext.accept ()` is called with the semantic instance and the code visitor recursively goes through the entire symbol tree to ensure that all the symbols are being used correctly.

Also, `Vala.SemanticAnalyzer` contains methods and static functions that are used as shared reusable logic across the symbol tree of ensuring that symbol's are being used correctly. For example `Vala.SemanticAnalyzer.check_arguments ()` checks the arguments of an expression, ensuring that the correct amount of arguments are being used.

## 3.4.3 Error Handling

If while checking the symbols, any errors have been reported, after the semantic analyzer has finishing checking through the entire symbol tree, the compiler program will exit early instead of proceeding with the Flow Analyzer.


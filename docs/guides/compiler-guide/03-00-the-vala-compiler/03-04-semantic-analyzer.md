# 3.4. Semantic Analyzer

`Vala.SemanticAnalyzer` is a `CodeVisitor` that looks up the symbols that have been, parsed and checks if the symbols are being used correctly.

This includes:
- Verifying that for each symbol type, the syntax is being followed
- The rules of how each symbol can be used is being followed

## How The Built-in Symbol Types Are Looked Up

Initially symbol types are looked up from the `Vala.CodeContext` `root` (`Vala.Namespace`).

In `Vala.Compiler` for the `run()` method, for each source filename given to the compiler, the `Vala.CodeContext.add_source_file_name ()` is called (unless the compiler is run with the Fast VAPIs feature enabled).

On each call to the `add_source_file_name ()` method on `Vala.CodeContext`, a default namespace `using` directive is added to the `Vala.SourceFile` object representing each source file.

The default namespace that gets added depends on the `profile` option set when the compiler is executed:
- `gobject` (default): `using GLib;`
- `posix`: `using Posix;`

This provides the implementation of the built-in types of the language. 

The implementation of each type are then added to the namespace scope which is then looked up when the `Vala.SemanticAnalyzer.analyze()` method is called.

<!-- TODO: Create sections about how the actual analysis process (going through each code node in the code context, looking up symbols in each code node, then ensuring that they are being used correctly) -->

<!-- How does it work? -->

<!-- Key aspects, key classes around  it etc. -->

## Error Handling

<!-- Explain how errors are reported and handled. For instance, if there are any errors that come up, the compiler returns early from checking the code context and doesn't proceed to the flow analyzer stage for that source file -->

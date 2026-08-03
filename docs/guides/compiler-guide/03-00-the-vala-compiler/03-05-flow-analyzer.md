# 3.5. Flow Analyzer

`Vala.FlowAnalyzer` is a `CodeVisitor` that checks that checks for the validity of the control flow logic of the source code.

This is focused on whether the rules of the different blocks and control flow blocks (if-statements, switch statements etc.) are being followed correctly in the source code. As well as providing warnings about potential unexpected behaviour like a local variable being declared but never used in a block.

## How It Works

In `Vala.FlowAnalyzer.analyze ()`, the flow analyzer loops through each source file available in the `Vala.CodeContext` calls `Vala.SourceFile.accept ()` on each of them, recursively going through the symbol tree to builds a control flow graph.

Like in `Vala.Parser` there are `vist_` method overrides. These overrides contain the logic for checking the validity of the control flow related code between blocks, control flow blocks and related statements.

## Error Handling

If any errors have been reported, after the flow analyzer has finishing building a control flow graph, the compiler program will exit early and not proceed to the next stage.

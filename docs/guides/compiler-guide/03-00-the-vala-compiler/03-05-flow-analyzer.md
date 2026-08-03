# 3.5. Flow Analyzer

<!-- What is it? -->

<!-- What does it do? -->

`Vala.FlowAnalyzer` is a `CodeVisitor` that checks that checks for the validity of the control flow logic of the source code.

This is focused on whether the rules of the different variety of code blocks in the logic are being followed correctly in the source code.

## How It Works

In `Vala.FlowAnalyzer.analyze ()`, the flow analyzer loops through each source file available in the `Vala.CodeContext` calls `Vala.SourceFile.accept ()` on each of them, recursively going through the symbol tree to builds a control flow graph.


## Error Handling

<!-- Talk about Error Handling -->



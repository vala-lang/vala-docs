# 3.5. Flow Analyzer

`Vala.FlowAnalyzer` (`vala/valaflowanalyzer.vala`) is a `CodeVisitor` that checks that checks for the validity of the control flow logic of the source code.

This is focused on whether the rules of the different blocks and control flow blocks (if-statements, switch statements etc.) are being followed correctly in the source code. As well as providing warnings about potential unexpected behaviour like a local variable being declared but never used in a block.

## 3.5.1 How It Works

In `Vala.FlowAnalyzer.analyze ()`, the flow analyzer loops through each source file available in the `Vala.CodeContext` (`vala/valacodecontext.vala`) calls `Vala.SourceFile.accept ()` (`vala/valasourcefile.vala`) on each of them, recursively going through the symbol tree to builds a control flow graph.

Like in `Vala.Parser` there are `vist_` method overrides. These overrides contain the logic for checking the validity of the control flow related code between blocks, control flow blocks and related statements.

## 3.5.2 Error Handling

If any errors have been reported, after the flow analyzer has finishing building a control flow graph, the compiler program will exit early and not proceed to the next stage.

## 3.5.3. Attributes

`Vala.FlowAnalyzer` (`vala/valaflowanalyzer.vala`) reads a couple of
attributes directly, the same way described in
[3.2.5. Attributes](./03-02-parser#3-2-5-attributes):

- `visit_method ()` skips its "Method `%s' never used" warning for an
  internal method on a type with `[DBus]` when
  `get_attribute_bool ("DBus", "visible", true)` is true, since a visible
  D-Bus method can be called externally even though nothing in the Vala code
  calls it.
- `NoReturn` is checked when analyzing a method call statement: if the method
  being called has `has_attribute ("NoReturn")`, everything after that call
  is marked unreachable, the same way it would be after a `return` or `throw`.

### 3.5.3.1. Warning About Unused Attributes

Because nothing interprets attributes centrally, an attribute that no stage of
the compiler ever reads would otherwise be silently ignored - including one
whose name is simply misspelled. `Vala.UsedAttr` (`vala/valausedattr.vala`)
exists to catch that case. It's the one code visitor left in the compiler that
is dedicated to attributes, though it only checks that attribute names (and
their arguments) are recognized - it doesn't interpret what they mean.

It holds a `marked` map of every attribute name valac knows, along with the
argument names each one accepts, populated from a `valac_default_attrs` list in
the same file (see
[3.2.5.3. Attributes Recognized by Vala](./03-02-parser#3-2-5-3-attributes-recognized-by-vala)
for what that list contains). `Vala.CodeContext` (`vala/valacodecontext.vala`)
constructs one as its `used_attr` property, and `Vala.CodeContext.check ()`
calls `check_unused ()` on it as the final step - after the semantic analyzer
and the flow analyzer have both run, and only if neither reported errors. The
visitor then walks the symbol tree and, for every attribute it finds that
isn't in the map, reports:

```
Attribute `Foo' never used
```

with the same check applied to individual arguments of a recognized attribute.
This is a warning rather than an error, so an unknown attribute does not stop
compilation.

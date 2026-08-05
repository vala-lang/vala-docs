# 3.6. C Code Generation

In the previous Vala compiler steps, we verified that the validity of the Vala code. Now the compiler is ready to generate C code from the Vala source code.

In the `Vala.Compiler.run ()` method, the compiler will eventually call `Vala.CodeContext.codegen.emit ()` which starts the C code generation process.

## Deciding which Vala.CodeGenerator instance type to use

<!-- Vala.CodeContext.codegen is a property for an instance of Vala.CodeGenerator. The object type is different based on the compiler profile that the user set. GObject -> GDBusServerModule. Otherwise, the type is CCodeDelegateModule -->

## How the code generation works

<!-- Go into detail about Vala.CodeGenerator and Vala.CCodeBaseModule -->

<!-- The Vala code generator types use inheritance to stack code generation logic between subclasses, expanding on the method overrides of parent classes. For example: Vala.GDBusServerModule is the subclass of Vala.GDBusClientModule. Eventually in the inheritance tree we'll get to Vala.GDBusModule which is a subclass of Vala.GVariantModule. So be aware that these code generation classes aren't being subclassed because they are an extension of their parent in some a logic way that would mirror real life. -->

<!-- Then show how inheritance tree of GDBusServerModule so the reader has a visual understanding of the Vala.CodeGenerator inheritance -->

## Error Handling

<!-- Explain how errors are handled in code generation -->
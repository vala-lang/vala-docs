# 3.6. C Code Generation

In the previous Vala compiler steps, we verified that the validity of the Vala code. Now the compiler is ready to generate C code from the Vala source code.

In the `Vala.Compiler.run ()` (`compiler/valacompiler.vala`) method, the compiler will eventually call `Vala.CodeContext.codegen.emit ()` (`vala/valacodecontext.vala`) which starts the C code generation process.


## 3.6.1 How The Code Generation Works

### 3.6.1.1 Deciding which Vala.CodeGenerator instance type to use

Vala.CodeContext.codegen is a property for an instance of `Vala.CodeGenerator` (`vala/valacodegenerator.vala`). The object type is different based on the compiler profile that the user set:

- GObject profile: `GDBusServerModule` (`codegen/valagdbusservermodule.vala`).
- Otherwise: `CCodeDelegateModule` (`codegen/valaccodedelegatemodule.vala`)

### 3.6.1.2 Modules Pattern with C Code Generator

`Vala.CodeGenerator` is an abstract class that is a code visitor for generating code. This is the base class for code generators in the compiler, it contains abstract methods to be overriden by subclasses that help wit hthe code generation process too.

The actual code generation logic is contained in its subclasses. The direct subclass of `Vala.CodeGenerator` is `Vala.CCodeBaseModule` (`codegen/valaccodebasemodule.vala`). Which actually overrides the `Vala.CodeVisitor` methods.

`Vala.CCodeBaseModule` contains the logic that provides the base functionality for generating C code from Vala code.

Inheritance is used to stack code generation functionality between subclasses, expanding on the method overrides of parent classes. are modules that provide functionality for the code generation process.

`Vala.CCodeBaseModule` is a module that provides base functionality for the code generation process. For additional functionality, `Vala.CCodeStructModule` (`codegen/valaccodestructmodule.vala`) extends the `Vala.CCodeBaseModule` class, however the module specifically handles how C structs should be generated from Vala code. We keep stacking functionality using modules in the inheritance tree until we've reached the desired amount of functionality. That's where the instance types based on the profiles come in. They've implemented an appropriate amount of functionality to be able to generate code for those profiles.

::: info Note
All of the code generation modules (e.g. `CCodeArrayModule`, `CCodeAssignmentModule`, `GAsyncModule`, `GObjectModule`, and others) live in the `codegen` directory, following the `vala<class-name-lowercase>.vala` naming convention.
:::

However, as more features are added to the language, the inhertiance trees for the code generation classes `Vala.CodeGenerator` classes may grow further. Or a slightly different inheritance tree may be created for new profile, with modules that are specific for that new profile.

Here's the object hiearchy graph for the `Vala.GDBusServerModule` class:

<!-- Then show how inheritance tree of GDBusServerModule so the reader has a visual understanding of the Vala.CodeGenerator inheritance -->

![Vala.GDBusServerModule Object Hierarchy Graph](assets/vala-gdbus-server-module.png)

# 3.7. C Code Compilation and Linking

At this stage, the Vala compiler using the C compiler on the system to compile the generated C code.

Then quits.

If the `ccode` flag is set to true then the compiler will stop after generating the C Code.

## 3.7.1 How It Works

An instance of the `Vala.CCodeCompiler` class is created.

It's used as an interface for the C Compiler.

Then, the C Compiler command is retreived using the `CC` environment variable.

Lastly, `Vala.CCodeCompiler` is called, with the code context, retrieved C Compliler command and optional C Compiler options passed in via the `Xcc` flag.

If the compilation operation is successful, there will be either object code files or binaries depending on the options passed into the compilers.

## 3.7.2 C Code Compiler Interface

<!-- Talk about what `Vala.CCodeCompiler` class and explain how the `Vala.CCodeCompiler.compile ()` method works in detail -->
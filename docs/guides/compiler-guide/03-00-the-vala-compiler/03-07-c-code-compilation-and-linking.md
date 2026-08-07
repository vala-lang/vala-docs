# 3.7. C Code Compilation and Linking

At this stage, the Vala compiler using the C compiler on the system to compile the generated C code.

Then quits.

If the `ccode` flag is set to true then the compiler will stop after generating the C Code.

In `Vala.Complier.run ()` (`compiler/valacompiler.vala`), `Vala.CCodeCompiler.compile ()` triggers the compilation progress then, the Vala compiler quits.

## 3.7.1 How It Works

An instance of the `Vala.CCodeCompiler` (`codegen/valaccodecompiler.vala`) class is created.

It's used as an interface for the C Compiler.

Then, the C Compiler command is retreived using the value from the `cc` option passed to the compile, the `CC` environment variable or will just use the `cc` command as a fallback. 

Lastly, `Vala.CCodeCompiler` is called, with the code context, retrieved C Compliler command and optional C Compiler options passed in via the `Xcc` flag.

If the compilation operation is successful, there will be either object code files or binaries depending on the options passed into the compilers.

## 3.7.2 C Code Compiler Interface

`Vala.CCodeCompiler` (`codegen/valaccodecompiler.vala`) has one method (`compile ()`) which handles the compilation process.

Ultimately, what's going on in `Vala.CCodeCompiler.compile ()` is that it's building the compile command string that will compile and link (depending on options used) the C Code.

### 3.7.2.1 Obtaining pkg-config Compile Flags

At first, it a space-separated string all of the packages from the code context, this include packages that were explicitly defined in the Vala compiler command flags.

If the profile set in the compiler was the G object one, then the `gobject–2.0` package name will also be included in the string.

The space-separated string is then used to obtain compile flags from pkg-config for the packages, using a `pkg-config` command. This is done by calling the `Vala.CodeContext.pkg_config_compile_flags ()` (`vala/valacodecontext.vala`) method.

The command that for returning the package compile flags will look something like this: `pkg-config pkg_1 pkg_2 pkg_3 --libs --cflags` (which would return the compile flags for pkg_1, pkg_2 and pkg_3).

### 3.7.2.2 Adding Source Files

Source files are obtained from the the code context and each filename is added to compile command string.

The source files are obtained using `Vala.CodeContext.get_source_files ()` and `Vala.CodeContext.get_c_source_files ()` (both in `vala/valacodecontext.vala`).

We only are interested in the non-package source files when getting the source files from `Vala.CodeContext.get_source_files ()` so the other we filter for them using the file type:

```vala
/* we're only interested in non-pkg source files */
var source_files = context.get_source_files ();
foreach (SourceFile file in source_files) {
	if (file.file_type == SourceFileType.SOURCE) {
		cmdline += " " + Shell.quote (file.get_csource_filename ());
	}
}
```




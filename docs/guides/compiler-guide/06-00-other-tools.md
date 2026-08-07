# 6. Other Tools

## 6.1. vapigen

`vapigen` is a tool to make bindings. It creates VAPI files from a library's metadata and any extra information required.

The entry point is `Vala.VAPIGen.main ()` (`vapigen/valavapigen.vala`), which parses the command line options (such as `--library`, `--pkg`, `--vapidir`, `--girdir` and `--metadatadir`) then creates a `Vala.VAPIGen` instance and calls `Vala.VAPIGen.run ()`.

### 6.1.1. How It Works

#### 6.1.1.1. Setting Up the Code Context

A new `Vala.CodeContext` (`vala/valacodecontext.vala`) is created and pushed onto the context stack. The `vapidir`, `girdir` and `metadatadir` directories passed on the command line are assigned to it, and the target profile is set to `Profile.GOBJECT`, which makes the standard GObject packages available unless `--nostdpkg` is given.

#### 6.1.1.2. Loading Packages

Package dependencies are loaded from `.deps` files:

- For every source ending in `.gi`, a matching `.deps` file (same name, `.deps` extension) is loaded via `Vala.CodeContext.add_packages_from_file ()`.
- A `.deps` file named after the `--library` option is also loaded, since `--library` is required for a GIR-based binding.
- Any packages passed with `--pkg` are added individually with `Vala.CodeContext.add_external_package ()`.

#### 6.1.1.3. Adding Source Files

Each file passed on the command line is added to the code context as a `Vala.SourceFile` with the type `SourceFileType.PACKAGE`, via `Vala.CodeContext.add_source_file ()`. Sources that do not exist on disk are reported as errors.

#### 6.1.1.4. Parsing

The source files are handed to three parsers in turn, in the following order:

1. `Vala.Parser` (`vala/valaparser.vala`) parses any `.vapi` files among the sources.
2. `Vala.GirParser` (`vala/valagirparser.vala`) parses `.gir` files, applying any matching `.metadata` files found via the `metadatadir` paths.
3. `Vala.GIdlParser` (`vapigen/valagidlparser.vala`) parses the legacy `.gi` format.

After each parsing stage, `vapigen` bails out early if the code context has recorded any errors.

#### 6.1.1.5. Semantic Check

`Vala.CodeContext.check ()` runs semantic analysis over everything that has been parsed so far, resolving symbols and validating the resulting tree, in the same way the compiler does when building a program.

#### 6.1.1.6. Writing the VAPI File

Only the source files that were explicitly passed on the command line are marked as `SourceFileType.SOURCE`; everything else (external packages) stays excluded from the output. A `Vala.CodeWriter` (`vala/valacodewriter.vala`) is created with the `CodeWriterType.VAPIGEN` mode, which writes out a `.vapi` file named after the `--library` option (optionally placed in the directory given by `--directory`).

If the resulting library name does not match the `pkg-config` package name declared by a `.gir` source, a warning is emitted.

## 6.2. vala-gen-introspect

`vala-gen-introspect` is a tool for extracting metainformation about GObject based libraries. Nowadays, the preferred method is to use GObject Introspection instead, as `vapigen` can use GIR files directly.


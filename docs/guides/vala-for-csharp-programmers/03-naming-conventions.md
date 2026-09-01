# Naming Conventions

C#

-   classes, structs, delegate types: `CamelCase`
-   methods, properties, events: `CamelCase`
-   local variables, fields: `mixedCamelCase` (sometimes `lower_case`)
-   constants, enum values: `CamelCase`

Vala

-   classes, structs, delegate types: `CamelCase`
-   methods, properties, signals: `lower_case`
-   local variables, fields: `lower_case`
-   constants, enum values: `UPPER_CASE`

Unlike C#, Vala does not require file names to match a type they
contain, and the compiler does not enforce a file naming convention.
Community projects vary - some use `PascalCase` file names matching the
class they define (e.g. `MyClass.vala`), others use `kebab-case` (e.g.
`my-class.vala`). See the
[Source Files and Compilation](/tutorials/main/02-00-basics/02-01-source-files-and-compilation#file-naming)
guide for more detail.

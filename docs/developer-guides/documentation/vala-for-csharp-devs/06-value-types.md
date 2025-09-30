# Value Types

-   sizes of standard types (`int`, `long`, ...) are architecture
    dependent
-   additional Vala types `int8`, `int16`, `int32`, `int64` (signed),
    `uint8`, `uint16`, `uint32`, `uint64` (unsigned) with architecture
    independent guaranteed sizes
-   no `byte`, `sbyte` (use `uint8`, `int8` instead)
-   no `decimal`
-   C# `char` is UCS-2, not Vala's `char`, but similar to Vala\'s UCS-4
    `unichar`

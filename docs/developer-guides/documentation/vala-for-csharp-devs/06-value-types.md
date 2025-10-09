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

## Numeric Suffixes

Both Vala and C# support numeric suffixes and are case-insensitive. The following suffixes are supported in Vala:

**Integer Suffixes**

| Suffix | Type   |
|--------|--------|
|        | int    |
| u      | uint   |
| l      | long   |
| ll     | int64  |
| ul     | ulong  |
| ull    | uint64 |

**Floating-point Suffixes**

| Suffix | Type   |
|--------|--------|
|        | double |
| f      | float  |
| d      | double |

Differences between Vala and C#:
- Vala does not support the `m` suffix, which represents the decimal type
- Vala does not support rearranging the order of the suffix `ul` to be `lu`
- Vala does not infer the type of `l` to be either `long` or `ulong`
- Vala does not infer the type of `u` to be either `uint` or `ulong`
- Vala does not infer the type of suffixless numbers.
- C# does not have the `ull` or `ll` suffixes.
# 4.6. Functions

These are functions that work alone and can be used without needing
previous calls to other functions. This is a simple example of the Posix
VAPI file for the `sync` system call:

```vala
[CCode (cname = "sync")]
void sync();
```

The ccode attribute, `cname`, specifies the C name to use. This avoids
`valac` appending the current namespace to the function name, ensuring
that a call to `Posix.sync()` in vala will map to a call to `sync()` in
C, and not to `posix_sync()`.

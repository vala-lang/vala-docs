# 4.3. Simple Type Structs

C libraries often define new types for numeric handles, sizes and
offsets. To translate these to a VAPI file, just use the `SimpleType`
attribute with a struct and inherit from the same simple type in the C
header.

An example:

```c
typedef uint32_t people_inside;
```

would be defined in the VAPI file as:

```vala
[SimpleType]
[CCode (cname = "people_inside", has_type_id = false)]
public struct PeopleInside : uint32 {
}
```

When inheriting from an existing type, all the methods will be carried
forward. For sizes and offsets, this is probably desirable; for handles,
it is probably not. For example, a UNIX file descriptor is stored in an
integer, but adding or multiplying two file handles has no sense. In
this case, it is preferable not to inherit from a numeric type and add
the attribute `IntegerType (rank=X)` so the Vala compiler can
automatically cast a type into an integer of an appropriate size when
needed (e.g., initialising from an integral constant).

An example from XCB:

```c
typedef uint32_t xcb_atom_t;
```

would be defined in the VAPI file as:

```vala
[SimpleType]
[IntegerType (rank = 9)] 
[CCode (cname ="xcb_atom_t", has_type_id = false)] 
public struct AtomT {
    //...
}
```

The ranks for the common types, as defined in the *glib-2.0.vapi* and
*posix.vapi* files, are:

| **Rank** | **Types in glib-2.0**          | **Other Use**                                                                                                                                                                                                                    |
|----------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1        | gint8<br/>gfloat               |                                                                                                                                                                                                                                  |
| 2        | gchar<br/>gdouble              |                                                                                                                                                                                                                                  |
| 3        | guchar<br/>guint8              | Posix.cc_t                                                                                                                                                                                                                       |
| 4        | gshort<br/>gint16              |                                                                                                                                                                                                                                  |
| 5        | gushort<br/>guint16            |                                                                                                                                                                                                                                  |
| 6        | gint<br/>gint32                | Posix.pid_t                                                                                                                                                                                                                      |
| 7        | guint<br/>guint32<br/>gunichar | Posix.speed_t<br/>Posix.tcflag_t                                                                                                                                                                                                 |
| 8        | glong<br/>gssize<br/>time_t    | Posix.clock_t                                                                                                                                                                                                                    |
| 9        | gulong<br/>gsize               | Posix.nfds_t<br/>Posix.key_t<br/>Posix.fsblkcnt_t<br/>Posix.fsfilcnt_t<br/>Posix.off_t<br/>Posix.uid_t<br/>Posix.gid_t<br/>Posix.mode_t<br/>Posix.dev_t<br/>Posix.ino_t<br/>Posix.nlink_t<br/>Posix.blksize_t<br/>Posix.blkcnt_t |
| 10       | gint64                         |                                                                                                                                                                                                                                  |
| 11       | guint64                        |                                                                                                                                                                                                                                  |

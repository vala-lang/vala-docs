Simple Type Structs
===================

C libraries often define new types for numeric handles, sizes and offsets. To translate these to a VAPI file, just use the ``SimpleType`` attribute with a struct and inherit from the same simple type in the C header.

An example:

.. code-block:: c

   typedef uint32_t people_inside;

would be defined in the VAPI file as:

.. code-block:: vala

   [SimpleType]
   [CCode (cname = "people_inside", has_type_id = false)]
   public struct PeopleInside : uint32 {
   }


When inheriting from an existing type, all the methods will be carried forward. For sizes and offsets, this is probably desirable; for handles, it is probably not. For example, a UNIX file descriptor is stored in an integer, but adding or multiplying two file handles has no sense. In this case, it is preferable not to inherit from a numeric type and add the attribute ``IntegerType (rank=X)`` so the Vala compiler can automatically cast a type into an integer of an appropriate size when needed (e.g., initialising from an integral constant).

An example from XCB:

.. code-block:: c

   typedef uint32_t xcb_atom_t;

would be defined in the VAPI file as:

.. code-block: vala

    [SimpleType]
    [IntegerType (rank = 9)]
    [CCode (cname = "xcb_atom_t", has_type_id = false)]
    public struct AtomT {
    }


The ranks for the common types, as defined in the *glib-2.0.vapi* and *posix.vapi* files, are:

+----------+-----------------------+------------------+
| **Rank** | **Types in glib-2.0** |  **Other Use**   |
+==========+=======================+==================+
| 1        | gint8                 |                  |
|          |                       |                  |
|          | gfloat                |                  |
+----------+-----------------------+------------------+
| 2        | gchar                 |                  |
|          |                       |                  |
|          | gdouble               |                  |
+----------+-----------------------+------------------+
| 3        | guchar                | Posix.cc_t       |
|          |                       |                  |
|          | guint8                |                  |
+----------+-----------------------+------------------+
| 4        | gshort                |                  |
|          |                       |                  |
|          | gint16                |                  |
+----------+-----------------------+------------------+
| 5        | gushort               |                  |
|          |                       |                  |
|          | guint16               |                  |
+----------+-----------------------+------------------+
| 6        | gint                  | Posixpid_t       |
|          |                       |                  |
|          | gint32                |                  |
+----------+-----------------------+------------------+
| 7        | guint                 | Posix.speed_t    |
|          |                       |                  |
|          | guint32               | Posix.tcflag_t   |
|          |                       |                  |
|          | gunichar              |                  |
+----------+-----------------------+------------------+
| 8        | glong                 | Posix.clock_t    |
|          |                       |                  |
|          | gssize                |                  |
|          |                       |                  |
|          | time_t                |                  |
+----------+-----------------------+------------------+
| 9        | gulong                | Posix.nfds_t     |
|          |                       |                  |
|          | gsize                 | Posix.key_t      |
|          |                       |                  |
|          |                       | Posix.fsblkcnt_t |
|          |                       |                  |
|          |                       | Posix.fsfilcnt_t |
|          |                       |                  |
|          |                       | Posix.off_t      |
|          |                       |                  |
|          |                       | Posix.uid_t      |
|          |                       |                  |
|          |                       | Posix.gid_t      |
|          |                       |                  |
|          |                       | Posix.mode_t     |
|          |                       |                  |
|          |                       | Posix.dev_t      |
|          |                       |                  |
|          |                       | Posix.ino_t      |
|          |                       |                  |
|          |                       | Posix.nlink_t    |
|          |                       |                  |
|          |                       | Posix.blksize_t  |
|          |                       |                  |
|          |                       | Posix.blkcnt_t   |
+----------+-----------------------+------------------+
| 10       | gint64                |                  |
+----------+-----------------------+------------------+
| 11       | guint64               |                  |
+----------+-----------------------+------------------+


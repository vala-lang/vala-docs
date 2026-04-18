# 4.13. Non-Object classes

Classes defined as not being descended from *GLib.Object* are treated as
a special case. They are derived directly from GLib's type system and
therefore much lighter in weight. In a more recent Vala compiler, one
can also implement interfaces, signals and properties with these
classes.

One obvious case of using these non-*Object* classes stays in the GLib
bindings. Because GLib is at a lower level than GObject, most classes
defined in the binding are of this kind. Also, as mentioned before, the
lighter weight of non-object classes make them useful in many practical
situations (e.g., the Vala compiler itself). However, the detailed usage
of non-*Object* classes are outside the scope of this tutorial. Be aware
that these classes are fundamentally different from structs.

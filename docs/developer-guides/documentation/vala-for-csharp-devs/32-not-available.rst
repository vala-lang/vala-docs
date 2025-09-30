Not Available
=============

* No LINQ (not planned for 1.0, maybe later) there are some [`https://gitlab.com/kosmospredanie/gpseq <https://gitlab.com/kosmospredanie/gpseq>`_]
* No operator overloading (`vala-list <https://mail.gnome.org/archives/vala-list/2008-July/msg00007.html>`_)
* No method or constructor overloading (use different method names / named constructors instead, as described above)
* No extension methods
* No constraints on generic type parameters (i.e. no ``where``)
* No generic delegates
* No conversion operators (i.e. no ``explicit`` and ``implicit``)
* No ``partial`` classes and methods
* No ``sealed`` classes (`planned <https://mail.gnome.org/archives/vala-list/2009-September/msg00325.html>`_)
* No static classes (use nested namespaces instead. Vala supports namespace methods, they are implicitly static)
* No ``goto``, no labeled statements
* No constructor initializers
* No bounds checking for arrays (optional support planned)
* No ``checked``, ``unchecked``, ``fixed``, ``stackalloc``, ``readonly``
# 9. Extra Hints

You can bind a method multiple times. In particular, constructors that
take a parent object often make sense as both constructors in the child
and methods of the parent instance.

Sometimes, _cname = "void"_ for a class can get around bad
typedefs, but never for delegates as casting a void pointer to a
function pointer is not legal C.

Feel free to add useful methods to the class definition if they make
something more Vala-like.

Static Methods
==============

Enums, flags, simple types, structs and classes can contain functions. When the Vala compiler generates the C function call the data structure will be included as the first argument. To prevent the automatic generation of the argument use the ``static`` keyword with the function definition in the VAPI.

Binding static methods is, in fact, simpler than binding member methods, as there is no instance. Care should be taken to organise static methods into logical places: some should be in the containing namespace and some should be in the type definition. In general, methods that produce instances of the type (i.e., things that act like constructors that might fail) belong in the type definition.


# 8. Binding a C Struct's Fields

Compact classes, structs, and simple-type structs may have fields.
Often, classes will be opaque; that is, there will be no information
about the contents of the class. If so, skip this section. When binding
fields, first check that there are no getter/setter functions of the
same names (see
[Properties](06-00-adding-vala-friendly-semantics/06-02-properties)). 
Often times, the details of the structure are in the
header, but not intended for public consumption; avoid binding variables
that should not be accessed. Consult the documentation.

#### [8.1. Structs](08-00-binding-a-c-struct-s-fields/08-01-structs)
#### [8.2. Pointers to Structs](08-00-binding-a-c-struct-s-fields/08-02-pointers-to-structs)
#### [8.3. Arrays](08-00-binding-a-c-struct-s-fields/08-03-arrays)
#### [8.4. Function Pointers](08-00-binding-a-c-struct-s-fields/08-04-function-pointers)
#### [8.5. Unions](08-00-binding-a-c-struct-s-fields/08-05-unions)
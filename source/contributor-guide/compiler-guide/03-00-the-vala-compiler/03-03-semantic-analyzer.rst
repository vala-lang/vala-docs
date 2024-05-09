Semantic Analyzer
=================

Attribute Processing
--------------------

Vala.Attributes are code tree nodes and have a name and a possibly empty list of key-value arguments. Some types of code tree nodes have as children a list of Attributes. The attribute processor's purpose is to interpret the attributes which were parsed into the code tree.

Later in the compilation, the results of attribute processing will be used, for example the CCode cname attribute affects what function names are used in emitted C code.

All attributes except for Conditional are handled from Vala.AttributeProcessor. I don't know where and how conditional is handled, but there is a function ignore_node() in Vala.CodeContext.

Vala.AttributeProcessor is a CodeVisitor which simply calls the process_attributes() method on every namespace, class, struct, interface, enum, method, constructor, parameter, property, delegate, constant, field, and signal that it visits.

Inside the process_attributes() method of each of these objects, a series of string comparisons will be made to parse the attributes. If the attribute is called "CCode", then the process_ccode_attributes() function will be called to parse the key-value pairs supplied.

.. todo::

   fixme: mention Vala.Parser.set_attributes()

Attributes Recognized by Vala

All Vala.Symbol (class, constant, delegate, enum, enum value, errordomain, field, interface, method, property, signal, struct):

* Deprecated
  
  * since

Vala.Namespace

* CCode

Vala.Class

* CCode
* DBus
* Compact
* Immutable
* ErrorBase

Vala.Struct

* CCode
* SimpleType
* IntegerType
* FloatingType
* BooleanType
* Immutable

Vala.Interface

* CCode
* DBus

Vala.Enum

* CCode
* Flags

Vala.Method

* CCode
* DBus
* ReturnsModifiedPointer
* FloatingReference
* NoWrapper
* NoReturn
* ModuleInit

Vala.CreationMethod
  *Same as Vala.Method - this class inherits from Method*

Vala.FormalParameter

* CCode

Vala.Property

* CCode
* DBus
* NoAccessorMethod
* Description

  * nick
  * blurb

Vala.PropertyAccessor

* CCode

Vala.Delegate

* CCode

Vala.Constant

* CCode

Vala.Field

* CCode

Vala.Signal

* DBus
* Signal
* HasEmitter

Object Oriented Programming
===========================

Although Vala doesn't force you to work with objects, some features are not available any other way. As such, you will certainly want to program in an object-oriented style most of the time. As with most current languages, in order to define your own object types, you write a class definition.

A class definition states what data each object of its type has, what other object types it can hold references to, and what methods can be executed on it.  The definition can include a name of another class which the new one should be a subclass of.  An instance of a class is also an instance of all it's class's super classes, as it inherits from them all their methods and data, although it may not be able to access all of this itself.  A class may also implement any number of interfaces, which are sets of method definitions that must be implemented by the class - an instance of a class is also an instance of each interface implemented by its class or super classes.

Classes in Vala may also have "static" members.  This modifier allows either data or methods to be defined as belonging to the class as a whole, rather than to a specific instance of it.  Such members can be accessed without possessing an instance of the class.

.. toctree::
   :maxdepth: 1

   03-01-basics
   03-02-construction
   03-03-destruction
   03-04-signals
   03-05-properties


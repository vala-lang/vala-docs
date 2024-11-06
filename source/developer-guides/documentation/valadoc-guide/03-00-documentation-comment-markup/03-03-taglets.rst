Taglets
=======

Taglets are used to refer to other symbols 
and add metadata to symbols when generating documentation.

There are two types of taglets:

- Inline Taglets
- Block Taglets

Inline Taglets
--------------

Inline Taglets are used in descriptions.

**{@inheritDoc}**
   Used to directly inherit descriptions from the parent symbol

**{@link [node]}**
   Used to link to another symbol. ``[node]`` is the fully qualified name of the
   symbol you want to link to. e.g. ``{@link GLib.Action}``.

Block Taglets
-------------

Block taglets are used at the end of each documentation comment.

**@deprecated [version]**
   Show that a symbol has been deprecated. ``[version]`` refers to a version number
   e.g. ``@deprecated 8.0.0``.

**@see [node-name]**
   List a symbol to view.

**@param [parameter-name] [description]**
   Add description about a parameter used in a symbol.
   Usage: ``@param is_editable Determines if description can be changed``

**@since [version]**
   Specify which version a symbol became available.
   Usage: ``@since 3.1.0``

**@return [description]**
   Add description of result of data returned from a symbol.

**@throws [type-name] [description]**
   Specify an error that could get thrown through the usage of a symbol

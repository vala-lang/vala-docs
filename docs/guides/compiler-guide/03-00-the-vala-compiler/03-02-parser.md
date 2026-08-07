# 3.2. Parser

The parser reads Vala and VAPI code and outputs an AST. In the eyes of
the parser, Vala and VAPI are the same thing. The difference to us is
that VAPI files never have method definitions, but the parser will read
pretty much everything as long as it seems syntactically correct. Most
errors are caught later by the **Semantic Analyzer**.

::: info Note

Before 0.3.1, Vala's parser was the classic flex scanner and Bison LALR
parser combination. But as of [Commit eba85a](http://git.gnome.org/browse/vala/commit/?id=eba85accb7d719808c26d2624ed04d81c4b7c3ab),
the parser is a hand-crafted recursive descent parser. The parser is in
`vala/valaparser.vala` and its lexer is in `vala/valascanner.vala`.
:::

The entry point of the parser is `Vala.Parser.parse ()`. This method is
called by `Vala.Compiler.run ()` (`compiler/valacompiler.vala`).
`Vala.Parser` is an implementation of `Vala.CodeVisitor`
(`vala/valacodevisitor.vala`) for source files.

## 3.2.1. Visitors and Ping Pong

`CodeVisitor` is an abstract base class which provides 75 empty virtual
methods for each kind of code node. A class which inherits `CodeVisitor`
is supposed to do some kind of processing of the code tree. Here are all
the `CodeVisitor` classes in Vala:

::: info Note
All of these classes are found in the `vala` directory, following the
`vala<class-name-lowercase>.vala` naming convention (e.g.
`Vala.SemanticAnalyzer` is in `vala/valasemanticanalyzer.vala`), with
one exception: `Vala.GIdlParser` is in `vapigen/valagidlparser.vala`.
:::

```vala
public abstract class Vala.CodeVisitor
public class Vala.CodeGenerator : CodeVisitor
public class Vala.CodeWriter : CodeVisitor
public class Vala.FlowAnalyzer : CodeVisitor
public class Vala.GenieParser : CodeVisitor
public class Vala.GirParser : CodeVisitor
public class Vala.GIdlParser : CodeVisitor
public class Vala.Parser : CodeVisitor
public class Vala.SemanticAnalyzer : CodeVisitor
public class Vala.SymbolResolver : CodeVisitor
```

`CodeVisitor` works closely with the different `Vala.CodeNode` classes to
traverse the code tree. Here are all the code node types in Vala grouped
by superclass:

```vala
public abstract class Vala.CodeNode

public class Vala.Attribute : CodeNode
public class Vala.CatchClause : CodeNode
public abstract class Vala.DataType : CodeNode
public abstract class Vala.Expression : CodeNode
public class Vala.MemberInitializer : CodeNode
public interface Vala.Statement : CodeNode
public class Vala.SwitchLabel : CodeNode
public abstract class Vala.Symbol : CodeNode
public class Vala.UsingDirective : CodeNode
```

::: info Note
All of the `CodeNode` classes below (data types, expressions, literals,
statements, symbols, members, and type symbols) are also found in the
`vala` directory, using the same `vala<class-name-lowercase>.vala`
naming convention.
:::

Data types:

```vala
public class Vala.CType : DataType
public class Vala.DelegateType : DataType
public class Vala.FieldPrototype : DataType
public class Vala.GenericType : DataType
public class Vala.InvalidType : DataType
public class Vala.MethodType : DataType
public class Vala.PointerType : DataType
public abstract class Vala.ReferenceType : DataType
public class Vala.SignalType : DataType
public class Vala.UnresolvedType : DataType
public abstract class Vala.ValueType : DataType
public class Vala.VoidType : DataType
```

Reference data types:

```vala
public class Vala.ArrayType : ReferenceType
public class Vala.ClassType : ReferenceType
public class Vala.ErrorType : ReferenceType
public class Vala.InterfaceType : ReferenceType
public class Vala.NullType : ReferenceType
public class Vala.ObjectType : ReferenceType
```

Value data types:

```vala
public class Vala.BooleanType : ValueType
public class Vala.EnumValueType : ValueType
public class Vala.FloatingType : ValueType
public class Vala.IntegerType : ValueType
public class Vala.StructValueType : ValueType
```

Expressions:

```vala
public class Vala.AddressofExpression : Expression
public class Vala.ArrayCreationExpression : Expression
public class Vala.Assignment : Expression
public class Vala.BaseAccess : Expression
public class Vala.BinaryExpression : Expression
public class Vala.CastExpression : Expression
public class Vala.ConditionalExpression : Expression
public class Vala.ElementAccess : Expression
public class Vala.InitializerList : Expression
public class Vala.LambdaExpression : Expression
public abstract class Vala.Literal : Expression
public class Vala.MemberAccess : Expression
public class Vala.MethodCall : Expression
public class Vala.NamedArgument : Expression
public class Vala.ObjectCreationExpression : Expression
public class Vala.PointerIndirection : Expression
public class Vala.PostfixExpression : Expression
public class Vala.ReferenceTransferExpression : Expression
public class Vala.SizeofExpression : Expression
public class Vala.SliceExpression : Expression
public class Vala.Template : Expression
public class Vala.Tuple : Expression
public class Vala.TypeCheck : Expression
public class Vala.TypeofExpression : Expression
public class Vala.UnaryExpression : Expression
```

Literal expressions:

```vala
public class Vala.BooleanLiteral : Literal
public class Vala.CharacterLiteral : Literal
public class Vala.IntegerLiteral : Literal
public class Vala.ListLiteral : Literal
public class Vala.MapLiteral : Literal
public class Vala.NullLiteral : Literal
public class Vala.RealLiteral : Literal
public class Vala.RegexLiteral : Literal
public class Vala.SetLiteral : Literal
public class Vala.StringLiteral : Literal
```

Statements:

```vala
public class Vala.BreakStatement : CodeNode, Statement
public class Vala.ContinueStatement : CodeNode, Statement
public class Vala.DeclarationStatement : CodeNode, Statement
public class Vala.DeleteStatement : CodeNode, Statement
public class Vala.DoStatement : CodeNode, Statement
public class Vala.EmptyStatement : CodeNode, Statement
public class Vala.ExpressionStatement : CodeNode, Statement
public class Vala.ForStatement : CodeNode, Statement
public class Vala.IfStatement : CodeNode, Statement
public class Vala.LockStatement : CodeNode, Statement
public class Vala.Loop : CodeNode, Statement
public class Vala.ReturnStatement : CodeNode, Statement
public class Vala.StatementList : CodeNode, Statement
public class Vala.SwitchStatement : CodeNode, Statement
public class Vala.ThrowStatement : CodeNode, Statement
public class Vala.TryStatement : CodeNode, Statement
public class Vala.UnlockStatement : CodeNode, Statement
public class Vala.WhileStatement : CodeNode, Statement
public class Vala.YieldStatement : CodeNode, Statement
```

Symbols:

```vala
public class Vala.Block : Symbol, Statement
public class Vala.Constructor : Symbol
public class Vala.Destructor : Symbol
public class Vala.EnumValue : Symbol
public class Vala.FormalParameter : Symbol
public class Vala.LocalVariable : Symbol
public abstract class Vala.Member : Symbol
public class Vala.Namespace : Symbol
public class Vala.PropertyAccessor : Symbol
public class Vala.TypeParameter : Symbol
public abstract class Vala.TypeSymbol : Symbol
public class Vala.UnresolvedSymbol : Symbol
```

Members:

```vala
public interface Vala.Lockable

public class Vala.Constant : Member, Lockable
public class Vala.Field : Member, Lockable
public class Vala.Method : Member
public class Vala.Property : Member, Lockable
public class Vala.Signal : Member, Lockable
```

Type symbols:

```vala
public class Vala.Delegate : TypeSymbol
public class Vala.Enum : TypeSymbol
public class Vala.ErrorCode : TypeSymbol
public class Vala.ErrorDomain : TypeSymbol
public abstract class Vala.ObjectTypeSymbol : TypeSymbol
public class Vala.Struct : TypeSymbol
```

Last but not least:

```vala
public class Vala.Comment
public class Vala.Scope
public class Vala.SourceFile
public class Vala.SourceReference
```

The `SourceFile` class is an exception when visiting nodes, because it's
not a `CodeNode` but there is a `visit_source_file` in the `CodeVisitor`.

All `CodeNode`s except the root have a non-null parent `CodeNode`. Some
specializations of `CodeNode` may have children. The type and number of
children are declared in the specialized class.

The two important methods in a `CodeNode` (`vala/valacodenode.vala`) are
`accept` and `accept_children`. The `accept ()` method lets the node
declare to the `CodeVisitor` what it is, so the `CodeVisitor` can act on
it. For example, `Vala.Struct.accept ()` (`vala/valastruct.vala`):

```vala
public override void accept (CodeVisitor visitor) {
     visitor.visit_struct (this); /* I am a struct! */
}
```

The `accept_children ()` method lets the node accept all of its children so
they can declare themselves to the `CodeVisitor`. This is the recursive
part of the traversal. For example, a `Struct` code node has a list of
base types, type parameters, fields, constants, and methods.
`Vala.Struct.accept_children ()` accepts all of these.

```vala
public override void accept_children (CodeVisitor visitor) {
    if (base_type != null) {
         base_type.accept (visitor);
    }

    foreach (TypeParameter p in type_parameters) {
         p.accept (visitor);
    }

    foreach (Field f in fields) {
         f.accept (visitor);
    }

    foreach (Constant c in constants) {
         c.accept (visitor);
    }

    foreach (Method m in methods) {
         m.accept (visitor);
    }

    foreach (Property prop in properties) {
         prop.accept (visitor);
    }
}
```

As you can see, the `CodeVisitor` is repeatedly asked to visit different
code nodes. It can do whatever analysis is necessary and then traverse
deeper into the code tree. This is what a hypothetical implementation of
`XmlGenerator.visit_struct ()` might look like:

```vala
public override void visit_struct (Struct st) {
    /* Do some processing of this struct. */
    stdout.printf ("<vala:struct name=\"%s\">\n", st.name);

    /* recurse through struct's children */
    st.accept_children (this);

    /* Do some more processing of the struct, now that its
      * children have been accepted. */
    stdout.printf ("</vala:struct>\n");
}
```

The `visit_` methods of a `CodeVisitor` needn't call
`CodeNode.accept_children ()`, if it isn't necessary to traverse the whole
depth of the code tree. It also isn't necessary to write `visit_`
methods for every kind of code node, because empty implementations are
already provided in `CodeVisitor`.

What does this have to do with ping pong? Well, the flow of control
bounces between the `CodeVisitor` and the `CodeNode`s: `accept`, `visit`,
`accept`, `visit`, … When you navigate the code you will probably find
yourself bouncing between different classes.

## 3.2.2. Back to the Parser

`Vala.Parser` is a highly specialized `CodeVisitor` - the only type of code
node it visits is a `Vala.SourceFile`. However, the `Parser` calls back to
the context and uses it to create code nodes (mentioned before), then
adds these code nodes into the context's root code node.

## 3.2.3. Error Handling

Every `parse_` function can throw a `ParseError`.

When an error with the parsing has been detected either of the following can happen:

- `Vala.Parser.report_parse_error` method is called - The error is printed to the console and the error count in the context is incremented by 1
- A `ParseError` is thrown, which will be pasesd up the call stack until a `parse_` function catches the error, possibly calling the `Vala.Parser.report_parse_error` method.

## 3.2.4. Grammar of Vala (BNF Notation)

This grammar is hand-generated from `Vala.Parser`. Sometimes the structure
of this grammar diverges slightly from the code, for example optional
non-terminal symbols. However, the non-terminal symbol names usually
match a `parse_` method in `Vala.Parser`.

More literal-specific grammar at
[https://gnome.pages.gitlab.gnome.org/vala/manual/index.html](https://gnome.pages.gitlab.gnome.org/vala/manual/index.html)

```bnf
// parse_file
input ::= using_directive* namespace_member*

// parse_using_directives
using_directive ::= "using" symbol [ "," symbol ]* ";"

// parse_symbol_name
symbol ::= symbol_part [ "." symbol_part ]*

symbol_part ::= ( "global::" identifier ) | identifier

namespace_member ::= [ attributes ]
                     ( namespace_declaration |
                       class_declaration |
                       interface_declaration |
                       struct_declaration |
                       enum_declaration |
                       errordomain_declaration |
                       method_declaration |
                       field_declaration |
                       constant_declaration )

attributes ::= attribute*

attribute ::= "[" identifier [ attribute_arguments ] "]"

attribute_arguments ::= "(" attribute_argument [ "," attribute_argument ]* ")"

attribute_argument ::= identifier "=" expression

expression ::= lambda_expression | ( conditional_expression [ assignment_operator expression ] )

// get_assignment_operator plus >>=
assignment_operator ::= "=" | "+=" | "-=" | "|=" | "&=" | "^=" | "/=" | "*=" | "%=" | "<<=" | ">>="

conditional_expression ::= coalescing_expression [ "?" expression ":" expression ]

coalescing_expression ::= conditional_or_expression [ "??" coalescing_expression ]

conditional_or_expression ::= conditional_and_expression [ "||" conditional_and_expression ]

conditional_and_expression ::= in_expression [ "&&" in_expression ]

in_expression ::= inclusive_or_expression [ "in" inclusive_or_expression ]

inclusive_or_expression ::= exclusive_or_expression [ "|" exclusive_or_expression ]

exclusive_or_expression ::= and_expression [ "^" and_expression ]

and_expression ::= equality_expression [ "&" equality_expression ]

equality_expression ::= relational_expression [ ( "==" | "!=" ) relational_expression ]*

relational_expression ::= shift_expression [ ( "<" | "<=" | ">" | ">=" ) shift_expression ) |
                                             ( "is" type ) | ( "as" type ) ]*

// parse_type
type ::= ( "void" [ "*" ]* ) | ( [ "dynamic" ] [ "unowned" ] symbol [ type_arguments ] [ "*" ]* [ "?" ] array_type* )

// parse_type can_weak
type_weak ::= ( "void" [ "*" ]* ) | ( [ "dynamic" ] [ "unowned" | "weak" ] symbol [ type_arguments ] [ "*" ]* [ "?" ] array_type* )

array_type ::= "[" array_size "]" [ "?" ]

shift_expression ::= additive_expression [ ( "<<" | ">>" ) additive_expression ]*

additive_expression ::= multiplicative_expression [ ( "+" | "-" ) multiplicative_expression ]*

multiplicative_expression ::= unary_expression [ ( "*" | "/" | "%" ) unary_expression ]*

unary_expression ::= ( unary_operator unary_expression ) |
                     ( "(" ( "owned" | "void" | "dynamic" | "!" | type ) ")" unary_expression ) | 
                     primary_expression

// get_unary_operator
unary_operator ::= "+" | "-" | "!" | "~" | "++" | "--" | "*" | "&" | "(owned)" | "(void)" | "(dynamic)" | "(!)"

primary_expression ::= ( literal | initializer | tuple | template | open_regex_literal | this_access | base_access |
                       object_or_array_creation_expression | yield_expression | sizeof_expression | typeof_expression |
                       simple_name )
                       [ member_access | pointer_member_access | method_call | element_access |
                         post_increment_expression | post_decrement_expression ]*

literal ::= "true" | "false" | "null" | integer_literal | real_literal | character_literal | regex_literal |
            string_literal | template_string_literal | verbatim_string_literal

initializer ::= "{" argument [ "," argument ]* "}"

// parse_argument_list
arguments ::= argument [ "," argument ]*

argument ::= "ref" expression | "out" expression | expression | identifier [ ":" expression ]

tuple ::= "(" expression [ "," expression ]* ")"

template ::= '@"' [ expression "," ]* '"'

// parse_regex_literal
open_regex_literal ::= "/" literal

this_access ::= "this"

base_access ::= "base"

object_or_array_creation_expression ::= "new" member ( object_creation_expression | array_creation_expression )

object_creation_expression ::= "(" [ arguments ] ")" [ object_initializer ]

object_initializer ::= "{" member_initializer [ "," member_initializer ] "}"

member_initializer ::= identifier "=" expression

array_creation_expression ::= [ "[" "]" ]* [ "[" [ array_size ] "]" ] [ initializer ]

array_size ::= expression [ "," expression ]*

// parse_member_name
member ::= member_part [ "." member_part ]*

member_part ::= ( "global::" identifier || identifier ) [ type_arguments ]

// parse_type_argument_list
type_arguments ::= "<" type [ "," type ]* ">"

yield_expression ::= "yield" [ base_access "." ] member method_call

method_call ::= "(" [ arguments ] ")" [ object_initializer ]

sizeof_expression ::= "sizeof" "(" type ")"

typeof_expression ::= "typeof" "(" type ")"

simple_name ::= ( "global::" identifier | identifier ) [ type_arguments ]

lambda_expression ::= lambda_expression_params "=>" lambda_expression_body

lambda_expression_params ::= identifier | ( "(" [ identifier [ "," identifier ]* ] ")" )

lambda_expression_body ::= expression | block

member_declaration_modifiers ::= member_declaration_modifier [ " " member_declaration_modifier ]*
member_declaration_modifier ::= "async" | "class" | "extern" | "inline" | "static" | "abstract" | "virtual" | "override" | "new"

constructor_declaration ::= [ constructor_declaration_modifiers ] "construct" block

constructor_declaration_modifiers ::= constructor_declaration_modifier [ " " constructor_declaration_modifier ]*
constructor_declaration_modifier ::= "async" | "class" | "extern" | "inline" | "static" | "abstract" | "virtual" | "override"

destructor_declaration ::= [ constructor_declaration_modifiers ] "~" "(" ")" block

class_declaration ::= [ access_modifier ] [ type_declaration_modifiers ] "class" symbol [ type_arguments ]
                      [ ":" base_types ] "{" class_member* "}"

base_types ::= type [ "," type ]*

class_member ::= [ attributes ]
                 ( class_declaration |
                   struct_declaration |
                   enum_declaration |
                   delegate_declaration |
                   method_declaration |
                   signal_declaration |
                   field_declaration |
                   constant_declaration |
                   property_declaration |
                   constructor_declaration |
                   destructor_declaration )

access_modifier ::= "private" "protected" "internal" "public"

type_declaration_modifiers ::= type_declaration_modifier [ " " type_declaration_modifier ]*
type_declaration_modifier ::= "abstract" | "extern" | "static"

enum_declaration ::= [ access_modifier ] [ type_declaration_modifiers ] "enum" symbol
                     "{" enumvalues [ ";" [ method_declaration | constant_declaration ]* ] "}"

enumvalues ::= enumvalue [ "," enumvalue ]*
enumvalue ::= [ attributes ] identifier [ "=" expression ]

errordomain_declaration ::= [ access_modifier ] [ type_declaration_modifiers ] "errordomain" symbol
                            "{" errorcodes [ ";" method_declaration* ] "}"

errorcodes ::= errorcode [ "," errorcode ]*
errorcode ::= [ attributes ] identifier [ "=" expression ]

interface_declaration ::= [ access_modifier ] [ type_declaration_modifiers ] "interface" symbol [ type_parameters ]
                          [ ":" base_types ] "{" interface_member* "}"

// parse_type_parameter_list
type_parameters ::= "<" identifier [ "," identifier ]* ">"

interface_member ::= [ attributes ]
                     ( class_declaration |
                       struct_declaration |
                       enum_declaration |
                       delegate_declaration |
                       method_declaration |
                       signal_declaration |
                       field_declaration |
                       constant_declaration |
                       property_declaration )

namespace_declaration ::= "namespace" symbol "{" using_directive* namespace_member* "}"

struct_declaration ::= [ access_modifier ] [ type_declaration_modifiers ] "struct" symbol
                       [ ":" base_types ] "{" struct_member* "}"

struct_member ::= [ attributes ] ( method_declaration | field_declaration | constant_declaration | property_declaration )

creation_method_declaration ::= [ access_modifier ] [ constructor_declaration_modifiers ] symbol
                                "(" [ parameters ] ")" [ throws ] [ requires ] [ ensures ] ( ";" | block )

parameters ::= parameter [ "," parameter ]*

parameter ::= [ attributes ] ( "..." | ( [ "params" ] [ "out" | "ref" ] type identifier [ "=" expression ] ) )

throws ::= "throws" type [ "," type ]*

requires ::= "requires" "(" expression ")" [ requires ]

ensures ::= "ensures" "(" expression ")" [ ensures ]

delegate_declaration ::= [ access_modifier ] [ delegate_declaration_modifiers ] type symbol [ type_parameters ]
                         "(" [ parameters ] ")" [ throws ] ";"

delegate_declaration_modifiers ::= delegate_declaration_modifier [ " " delegate_declaration_modifier ]*
delegate_declaration_modifier ::= "async" | "class" | "extern" | "inline" | "abstract" | "virtual" | "override"

signal_declaration ::= [ access_modifier ] [ signal_declaration_modifiers ] "signal" type identifier
                       "(" [ parameters ] ")" ( ";" | block )

signal_declaration_modifiers ::= signal_declaration_modifier [ " " signal_declaration_modifier ]*
signal_declaration_modifier ::= "async" | "extern" | "inline" | "abstract" | "virtual" | "override" | "new"

method_declaration ::= [ access_modifier ] [ member_declaration_modifier ] type identifier [ type_parameters ]
                       "(" [ parameters ] ")" [ throws ] [ requires ] [ ensures ] ( ";" | block )

constant_declaration ::= [ access_modifier ] [ member_declaration_modifiers ] "const" type identifier [ inline_array_type ]
                         [ "=" expression ] ";"

inline_array_type ::= "[" integer_literal "]"

field_declaration ::= [ access_modifier ] [ member_declaration_modifiers ] type_weak identifier [ "=" expression ] ";"

property_declaration ::= [ access_modifier ] [ property_declaration_modifiers ] type_weak identifier
                         "{" property_declaration_part* "}"

property_declaration_part ::= ( "default" "=" expression ";" ) | property_accessor

property_accessor ::= [ attributes ] [ access_modifier ] ( property_get_accessor | property_set_construct_accessor )

property_get_accessor ::= "get" ( ";" | block )

property_set_construct_accessor ::= ( "set" "construct" | "construct" "set" ) ( ";" | block )

property_declaration_modifiers ::= property_declaration_modifier [ " " property_declaration_modifier ]*
property_declaration_modifier ::= "class" | "static" | "extern" | "inline" | "abstract" | "virtual" | "override" | "new"

block ::= "{" statement* "}"

// parse_statements
statement ::= block | ";" | if_statement | switch_statement | while_statement | for_statement | foreach_statement |
              break_statement | continue_statement | return_statement | yield_statement | throw_statement |
              try_statement | lock_statement | delete_statement | local_variable_declarations | expression_statement

if_statement ::= "if" "(" expression ")" embedded_statement [ "else" embedded_statement ]

embedded_statement ::= block | embedded_statement_without_block

embedded_statement_without_block ::= ";" | if_statement | switch_statement | while_statement | for_statement |
                                     foreach_statement | break_statement | continue_statement | return_statement |
                                     yield_statement | throw_statement | try_statement | lock_statement | delete_statement |
                                     expression_statement

switch_statement ::= "switch" "(" expression ")" "{" switch_section* "}"

switch_section ::= ( "case" | "default" ) expression ":"

while_statement ::= "while" "(" expression ")" embedded_statement

do_statement ::= "do" embedded_statement "while" "(" expression ")" ";"

for_statement ::= "for" "(" [ for_initializer ] ";" [ expression ] ";" [ for_iterator ] ")" embedded_statement

for_initializer ::= local_variable_declarations | ( statement_expression [ "," statement_expression ]* )

for_iterator ::= statement_expression [ "," statement_expression ]*

statement_expression ::= expression

foreach_statement ::= "foreach" "(" ( "var" | type) identifier "in" expression ")" embedded_statement

break_statement ::= "break" ";"

continue_statement ::= "continue" ";"

return_statement ::= "return" [ expression ] ";"

yield_statement ::= "yield" [ expression_statement | "return" expression ] ";"

throw_statement ::= "throw" expression ";"

try_statement ::= "try" block catch_clause* [ finally_clause ]

catch_clause ::= "catch" [ "(" type_weak identifier ")" ] block

finally_clause ::= "finally" block

lock_statement ::= "lock" "(" expression ")" embedded_statement

delete_statement ::= "delete" expression ";"

local_variable_declarations ::= ( "var" | type ) local_variable_declaration [ "," local_variable_declaration ]*

local_variable_declartion ::= local_tuple_declaration | local_variable

local_tuple_declaration ::= "(" identifier [ "," identifier ]* ")" "=" expression

local_variable ::= identifier [ inline_array_type ] [ "=" expression ]

expression_statement ::= statement_expression ";"
```

## 3.2.5. Attributes

### 3.2.5.1. What the Parser Does With Attributes

An attribute in Vala source code is written as `[Name (key = value, ...)]` in
front of a declaration. `Vala.Parser.parse_attributes ()`
(`vala/valaparser.vala`) reads that syntax and turns each one into a
`Vala.Attribute` node (`vala/valaattribute.vala`), which holds nothing more than
a name and a map of argument names to their values as strings. The argument map
may be empty, as in `[Compact]`.

The parsed attributes are attached to the declaration they belong to by
`Vala.Parser.set_attributes ()`, which is called from most `parse_` methods -
namespaces, classes, structs, interfaces, enums (and enum values), error
domains, methods, properties (and their accessors), signals, delegates, fields,
constants and parameters all take attributes. `set_attributes ()` appends each
`Vala.Attribute` onto the target code node's `attributes` list, first checking
`Vala.CodeNode.has_attribute ()` and reporting a `duplicate attribute` error if
the same attribute name is applied twice to the same node.

That is the full extent of what happens at parse time. The parser does not
interpret what any attribute *means* - it only converts attribute syntax into
data hanging off the code tree.

The one exception is the `Vala.Attribute` constructor itself, which does a
small piece of immediate interpretation as each attribute node is built: if the
attribute is named `Deprecated` or `Experimental` - both superseded by
`[Version (...)]`, see [3.4.4](./03-04-semantic-analyzer#3-4-4-attributes) -
it calls `Report.deprecated ()` right away.

### 3.2.5.2. Attributes Are Read On Demand, Not Processed In One Pass

There is no attribute processing stage, and no single code visitor that walks
the tree interpreting attributes as a batch. Instead, each later stage of the
compiler pulls out the specific attribute values it cares about, at the point
where it needs them, through generic accessor methods defined on
`Vala.CodeNode` (`vala/valacodenode.vala`):

- `get_attribute ()` and `has_attribute ()`
- `has_attribute_argument ()`
- `get_attribute_string ()`, `get_attribute_integer ()`,
  `get_attribute_double ()` and `get_attribute_bool ()`, each of which takes a
  default value to fall back on when the attribute or argument is absent
- matching `set_attribute*` methods, used by code that constructs symbols
  programmatically rather than from Vala source

These simply look up the raw `Vala.Attribute` in the node's `attributes` list
and read the requested argument out of its string map. Because interpretation is
decentralized like this, the meaning of an attribute lives with the code that
acts on it, and the same node can be asked about different attributes by
different stages. `Vala.SymbolResolver` (`vala/valasymbolresolver.vala`) even
says as much in a comment above one of its own attribute reads:
`// attributes are not processed yet, access them directly`.

Each of the following stages of the compiler has its own "Attributes" section
describing what it reads and why, since which attributes matter - and what
they're used for - changes from one stage to the next:

- [3.3.3. Attributes](./03-03-symbol-resolution#3-3-3-attributes) - Symbol Resolution
- [3.4.4. Attributes](./03-04-semantic-analyzer#3-4-4-attributes) - Semantic Analyzer
- [3.5.3. Attributes](./03-05-flow-analyzer#3-5-3-attributes) - Flow Analyzer
- [3.6.2. Attributes](./03-06-c-code-generation#3-6-2-attributes) - C Code Generation
- [6.1.2. Attributes](../06-00-other-tools#6-1-2-attributes) - vapigen

### 3.2.5.3. Attributes Recognized by Vala

The `valac_default_attrs` list in `vala/valausedattr.vala` is the authoritative
record of what the compiler accepts, since it is exactly what `Vala.UsedAttr`
checks source attributes against. Grouped by rough purpose, it currently covers:

**C binding**

-   `CCode` - by far the largest, with around seventy arguments controlling how
    a symbol maps onto C, among them `cname`, `cprefix`, `cheader_filename`,
    `type_id`, `type_cname`, `ref_function`, `unref_function`, `copy_function`,
    `free_function`, `array_length`, `array_null_terminated`, `delegate_target`,
    `has_target`, `has_type_id`, `has_construct_function`, `instance_pos`,
    `finish_name`, `scope` and `notify`. The
    [manual VAPI writing guide](../../bindings/writing-a-vapi-manually/02-00-getting-started/02-03-the-ccode-attribute)
    covers these in detail.

**Versioning**

-   `Version` - `since`, `replacement`, `deprecated`, `deprecated_since`,
    `experimental`, `experimental_until`
-   `Deprecated` (`since`, `replacement`), `Experimental` and `NoArrayLength` -
    all superseded, and warned about as described above

**Type and class semantics**

-   `Compact` (`opaque`), `Immutable`, `SingleInstance`, `Flags`, `ErrorBase`
-   `SimpleType`, `BooleanType`, `PointerType`,
    `IntegerType` (`rank`, `min`, `max`, `signed`, `width`),
    `FloatingType` (`rank`, `decimal`, `width`)

**Method behaviour**

-   `NoWrapper`, `NoThrow`, `NoReturn`, `DestroysInstance`,
    `ReturnsModifiedPointer`, `Assert`, `ModuleInit`, `Profile`, `Diagnostics`
-   `Print`, `PrintfFormat`, `ScanfFormat`, `FormatArg`

**Properties, accessors and signals**

-   `NoAccessorMethod`, `ConcreteAccessor`, `GenericAccessors`, `HasEmitter`
-   `Description` - `nick`, `blurb`
-   `Signal` - `detailed`, `run`, `no_recurse`, `action`, `no_hooks`

**Integration with other systems**

-   `DBus` - `name`, `no_reply`, `result`, `use_string_marshalling`, `value`,
    `signature`, `visible`, `timeout`
-   `GIR` - `fullname`, `name`, `visible`
-   `GtkChild` (`name`, `internal`), `GtkTemplate` (`ui`), `GtkCallback` (`name`)
-   `Source` - `filename`, `line`, `column`

Which of these are meaningful on a given declaration depends on the attribute:
`Compact` only means something on a class, `Flags` only on an enum, and so on.
`Vala.UsedAttr` checks only that an attribute and its arguments are known to the
compiler at all, not that they were applied to a declaration that can use them.


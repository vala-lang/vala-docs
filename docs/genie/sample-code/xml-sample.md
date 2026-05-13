# XML sample (libxml2)

Examples for parsing and producing XML with the `libxml2` binding, adapted
from the archived GNOME Wiki page
[Projects/Genie/XmlSample](https://wiki.gnome.org/Projects/Genie/XmlSample).

The libxml2 binding uses pointers and manual memory management in places. This
page adjusts the archived **child-node walk** so siblings are visited in order
(the wiki text used a broken `while` condition). The `print_indent` helper uses
a distinct local name for the padding string so it does not shadow the `indent`
counter.

## Parse and dump sample

Save as `xmlsample.gs`.

```genie
// libxml2: parsing, building, and walking XML documents.

uses
	Xml

class XmlSample

	indent : int = 0

	def private print_indent (node : string, content : string, token : char = '+')
		pad : string = string.nfill (this.indent * 2, ' ')
		stdout.printf ("%s%c%s: %s\n", pad, token, node, content)

	def parse_file (path : string)
		doc : Xml.Doc* = Parser.parse_file (path)
		if doc is null
			stderr.printf ("File %s not found or permissions missing", path)
			return

		root : Xml.Node* = doc->get_root_element ()
		if root is null
			delete doc
			stderr.printf ("The xml file '%s' is empty", path)
			return

		print_indent ("XML document", path, '-')
		print_indent ("Root node", root->name)

		parse_node (root)

		delete doc

	def private parse_node (node : Xml.Node*)
		this.indent++
		iter : Xml.Node* = node->children
		while iter is not null
			if iter->type is not ElementType.ELEMENT_NODE
				iter = iter->next
				continue

			node_name : string = iter->name
			node_content : string = iter->get_content ()
			print_indent (node_name, node_content)

			parse_properties (iter)

			parse_node (iter)

			iter = iter->next

		this.indent--

	def private parse_properties (node : Xml.Node*)
		p : Xml.Attr* = node->properties
		while p is not null
			attr_name : string = p->name
			attr_content : string = p->children->content
			print_indent (attr_name, attr_content, '|')
			p = p->next

	def static create_simple_xml () : string
		doc : Xml.Doc* = new Xml.Doc ("1.0")

		ns : Xml.Ns* = new Xml.Ns (null, "", "foo")
		ns->type = Xml.ElementType.ELEMENT_NODE
		root : Xml.Node* = new Xml.Node (ns, "simple")
		doc->set_root_element (root)

		root->new_prop ("property", "value")

		subnode : Xml.Node* = root->new_text_child (ns, "subnode", "")
		subnode->new_text_child (ns, "textchild", "another text")
		subnode->new_prop ("subprop", "escaping \" and  < and >")

		comment : Xml.Node* = new Xml.Node.comment ("This is a comment")
		root->add_child (comment)

		xmlstr : string
		doc->dump_memory (out xmlstr)

		delete doc
		return xmlstr

init
	if args.length < 2
		stderr.printf ("Argument required!\n")
		return

	Parser.init ()

	simple_xml : string = XmlSample.create_simple_xml ()
	stdout.printf ("Simple XML is:\n%s\n", simple_xml)

	var sample = new XmlSample ()
	sample.parse_file (args[1])

	Parser.cleanup ()

	return
```

### Compile and run

Pass any small XML file as the first argument (after the program name).

```shell
valac --pkg libxml-2.0 xmlsample.gs
./xmlsample yourfile.xml
```

## Xml.TextWriter example

Save as `xmlwriter.gs`.

```genie
uses
	Xml

init
	var writer = new Xml.TextWriter.filename ("test.xml")
	writer.set_indent (true)
	writer.set_indent_string ("\t")

	writer.start_document ()
	writer.start_element ("root_element")

	writer.start_attribute ("base64attribute")
	writer.write_base64 ("test", 0, 4)
	writer.end_attribute ()

	writer.write_attribute ("alpha", "abcdef..")

	writer.write_element ("element", "content")
	writer.write_element_ns ("ns", "elementWithNS", "http://www.example.org/test/ns", "contentNS")

	writer.write_comment ("My comment!")
	writer.format_element_ns ("ns", "elementWithFormattedContent", "http://www.example.org/test/ns", "One: %d", 10)

	writer.start_element ("cdataContent")
	writer.start_cdata ()
	writer.format_string ("%s beer on the wall..", "One")
	writer.end_cdata ()
	writer.end_element ()

	writer.end_element ()
	writer.end_document ()

	writer.flush ()
```

### Compile and run

```shell
valac --pkg libxml-2.0 xmlwriter.gs
./xmlwriter
```

The wiki showed the following `test.xml` output (indentation may match your
`set_indent_string`):

```xml
<?xml version="1.0"?>
<root_element base64attribute="dGVzdA==" alpha="abcdef..">
	<element>content</element>
	<ns:elementWithNS xmlns:ns="http://www.example.org/test/ns">contentNS</ns:elementWithNS>
	<!--My comment!-->
	<ns:elementWithFormattedContent xmlns:ns="http://www.example.org/test/ns">One: 10</ns:elementWithFormattedContent>
	<cdataContent><![CDATA[One beer on the wall..]]></cdataContent>
</root_element>
```

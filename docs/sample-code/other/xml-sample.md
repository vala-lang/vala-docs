# XML sample (libxml2)

Examples for parsing, building, and streaming XML with the `libxml2` binding, adapted from the archived GNOME Wiki page [Projects/Vala/XmlSample](https://wiki.gnome.org/Projects/Vala/XmlSample).

The libxml2 binding uses pointers and manual memory management in places. The **child walk** below visits element siblings in document order (the archived wiki used a `for` loop whose `continue` path skipped `iter = iter->next`, which mis-ordered output). The `print_indent` helper uses a separate local name for the padding string so it does not shadow the `indent` counter.

## Parse and build sample

```vala
using Xml;

class XmlSample {

    int indent = 0;

    void print_indent (string node, string content, char token = '+') {
        string pad = string.nfill (this.indent * 2, ' ');
        stdout.printf ("%s%c%s: %s\n", pad, token, node, content);
    }

    public void parse_file (string path) {
        Xml.Doc* doc = Parser.parse_file (path);
        if (doc == null) {
            stderr.printf ("File %s not found or permissions missing\n", path);
            return;
        }

        Xml.Node* root = doc->get_root_element ();
        if (root == null) {
            delete doc;
            stderr.printf ("The xml file '%s' is empty\n", path);
            return;
        }

        print_indent ("XML document", path, '-');
        print_indent ("Root node", root->name);

        parse_node (root);

        delete doc;
    }

    void parse_node (Xml.Node* node) {
        this.indent++;
        Xml.Node* iter = node->children;
        while (iter != null) {
            if (iter->type != ElementType.ELEMENT_NODE) {
                iter = iter->next;
                continue;
            }

            string node_name = iter->name;
            string node_content = iter->get_content ();
            print_indent (node_name, node_content);

            parse_properties (iter);
            parse_node (iter);

            iter = iter->next;
        }
        this.indent--;
    }

    void parse_properties (Xml.Node* node) {
        for (Xml.Attr* prop = node->properties; prop != null; prop = prop->next) {
            string attr_name = prop->name;
            string attr_content = prop->children->content;
            print_indent (attr_name, attr_content, '|');
        }
    }

    public static string create_simple_xml () {
        Xml.Doc* doc = new Xml.Doc ("1.0");

        Xml.Ns* ns = new Xml.Ns (null, "", "foo");
        ns->type = Xml.ElementType.ELEMENT_NODE;
        Xml.Node* root = new Xml.Node (ns, "simple");
        doc->set_root_element (root);

        root->new_prop ("property", "value");

        Xml.Node* subnode = root->new_text_child (ns, "subnode", "");
        subnode->new_text_child (ns, "textchild", "another text");
        subnode->new_prop ("subprop", "escaping \" and  < and >");

        Xml.Node* comment = new Xml.Node.comment ("This is a comment");
        root->add_child (comment);

        string xmlstr;
        doc->dump_memory (out xmlstr);

        delete doc;
        return xmlstr;
    }
}

int main (string[] args) {
    if (args.length < 2) {
        stderr.printf ("Usage: %s <file.xml>\n", args[0]);
        return 1;
    }

    Parser.init ();

    string simple_xml = XmlSample.create_simple_xml ();
    stdout.printf ("Simple XML is:\n%s\n", simple_xml);

    var sample = new XmlSample ();
    sample.parse_file (args[1]);

    Parser.cleanup ();
    return 0;
}
```

## Compile and Run

```shell
valac --pkg libxml-2.0 xmlsample.vala
./xmlsample sample.xml
```

## `xmlTextWriter` example

```vala
void main () {
    var writer = new Xml.TextWriter.filename ("test.xml");
    writer.set_indent (true);
    writer.set_indent_string ("\t");

    writer.start_document ();
    writer.start_element ("root_element");

    writer.start_attribute ("base64attribute");
    writer.write_base64 ("test", 0, 4);
    writer.end_attribute ();

    writer.write_attribute ("alpha", "abcdef..");

    writer.write_element ("element", "content");
    writer.write_element_ns ("ns", "elementWithNS", "http://www.example.org/test/ns", "contentNS");

    writer.write_comment ("My comment!");
    writer.format_element_ns ("ns", "elementWithFormattedContent", "http://www.example.org/test/ns", "One: %d", 10);

    writer.start_element ("cdataContent");
    writer.start_cdata ();
    writer.format_string ("%s beer on the wall..", "One");
    writer.end_cdata ();
    writer.end_element ();

    writer.end_element ();
    writer.end_document ();

    writer.flush ();
}
```

## Compile and Run

```shell
valac --pkg libxml-2.0 xml-writer.vala
./xml-writer
```

This writes `test.xml` in the current directory.

## XPath evaluation

This example follows the structure of the wiki page but adds null checks before reading attributes.

```vala
using Xml.XPath;
using Xml;

int main (string[] args) {
    Parser.init ();
    string path = args.length > 1 ? args[1] : "example.xml";

    Xml.Doc* doc = Parser.parse_file (path);
    if (doc == null) {
        stderr.printf ("failed to read %s\n", path);
        return 1;
    }

    var ctx = new Context (doc);
    if (ctx == null) {
        stderr.printf ("failed to create XPath context\n");
        delete doc;
        return 1;
    }

    Xml.XPath.Object* obj = ctx.eval_expression ("/Example/Objects/Pet");
    if (obj == null || obj->nodesetval == null || obj->nodesetval->item (0) == null) {
        stderr.printf ("XPath did not match the expected node\n");
        delete obj;
        delete doc;
        return 1;
    }

    Xml.Node* node = obj->nodesetval->item (0);
    stdout.printf ("Matched element: %s\n", node->name);

    for (Xml.Attr* attr = node->properties; attr != null; attr = attr->next) {
        stdout.printf ("Attribute: name=%s value=%s\n", attr->name, attr->children->content);
    }

    delete obj;
    delete doc;
    Parser.cleanup ();
    return 0;
}
```

## Compile and Run

```shell
valac --pkg libxml-2.0 xpathsample.vala
./xpathsample example.xml
```

Use an XML file whose structure matches the expression (for example `/Example/Objects/Pet`).

## `xmlTextReader` streaming parse

A straight translation of [reader1.c](https://gitlab.gnome.org/GNOME/libxml2/-/blob/master/example/reader1.c) ideas; ensure you call `Parser.cleanup ()` when finished.

```vala
using Xml;

static void process_node (Xml.TextReader reader) {
    unowned string? name = reader.const_name ();
    if (name == null) {
        name = "--";
    }
    unowned string? val = reader.const_value ();

    stdout.printf ("%d %d %s %d %d",
        reader.depth (),
        reader.node_type (),
        name,
        reader.is_empty_element (),
        reader.has_value ());
    if (val == null) {
        stdout.printf ("\n");
    } else if (val.length > 40) {
        stdout.printf (" %.40s...\n", val);
    } else {
        stdout.printf (" %s\n", val);
    }
}

static void stream_file (string uri) {
    var reader = new Xml.TextReader.filename (uri);
    if (reader == null) {
        stderr.printf ("Unable to open %s\n", uri);
        return;
    }
    int ret = reader.read ();
    while (ret == 1) {
        process_node (reader);
        ret = reader.read ();
    }
    if (ret != 0) {
        stderr.printf ("%s : failed to parse\n", uri);
    }
}

int main (string[] args) {
    if (args.length != 2) {
        stderr.printf ("Usage: %s <file.xml>\n", args[0]);
        return 1;
    }
    stream_file (args[1]);
    Parser.cleanup ();
    return 0;
}
```

## Compile and Run

```shell
valac --pkg libxml-2.0 reader1.vala
./reader1 sample.xml
```

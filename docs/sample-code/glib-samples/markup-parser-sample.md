# Markup Parser Sample (Simple XML)

This sample uses [`GLib.MarkupParseContext`](https://valadoc.org/glib-2.0/GLib.MarkupParseContext.html)
with a [`GLib.MarkupParser`](https://valadoc.org/glib-2.0/GLib.MarkupParser.html) callback table to
walk a small XML fragment. GLib’s markup parser implements a strict subset of XML (see the GLib documentation for [“Simple XML Subset Parser”](https://docs.gtk.org/glib/markup.html)).

Save as `markup-parser.vala`:

```vala
class TestParser : Object {

    const MarkupParser parser = {
        start, // when an element opens
        end,   // when an element closes
        text,  // when text is found
        null,  // when comments are found
        null   // when errors occur
    };

    MarkupParseContext context;

    int depth = 0; // used to indent the output

    construct {
        context = new MarkupParseContext (
            parser, // the structure with the callbacks
            0,      // MarkupParseFlags
            this,   // extra argument for the callbacks, methods in this case
            destroy // when the parsing ends
        );
    }

    void print_indent () {
        for (var i = 0; i < depth; i++) {
            print ("\t");
        }
    }

    void destroy () {
        print ("Releasing any allocated resource\n");
    }

    public bool parse (string content) throws MarkupError {
        return context.parse (content, -1);
    }

    void start (MarkupParseContext context, string name,
                string[] attr_names, string[] attr_values) throws MarkupError {
        print_indent ();
        print ("begin %s {", name);
        for (int i = 0; i < attr_names.length; i++) {
            print ("%s: %s", attr_names[i], attr_values[i]);
        }
        print ("}\n");
        depth++;
    }

    void end (MarkupParseContext context, string name) throws MarkupError {
        depth--;
        print_indent ();
        print ("end %s\n", name);
    }

    void text (MarkupParseContext context,
               string text, size_t text_len) throws MarkupError {
        print_indent ();
        print ("text '%s'\n", text);
    }
}

void main () {
    var parser = new TestParser ();
    string data = "<elm1 attrib ='hello'><elm2/><elm3>muhehehe</elm3></elm1>";
    try {
        parser.parse (data);
    } catch (Error e) {
        print ("%s\n", e.message);
    }
}
```

## Compile and run

```shell
valac markup-parser.vala
./markup-parser
```

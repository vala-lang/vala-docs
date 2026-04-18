# Generating a VAPI with GObject Introspection

## Introduction

Vala is designed to use existing libraries that have a C ABI
(Application Binary Interface) without the need for runtime bindings. A
Vala program requires a Vala API file (`.vapi`) at compile-time for each
library used. A VAPI file contains declarations for a library's
classes, methods, etc. in Vala syntax and how to translate them to C.

The `vapigen` tool is used to generate a VAPI file from a GIR (GObject
Introspection Repository) file. `vapigen` is usually included with
`valac` by the distributions or a separate Vala tools/development
package.

The binding generation follows several steps:

-   get the library's GIR file
-   use `vapigen` to generate the VAPI binding from the GIR file
-   tweak the binding generation with metadata and custom code

Also read the
[Upstream Guide](upstream-guide) for details about adding VAPI generation to a projects'
build system. This includes Autotools integration.

For libraries without annotations for GObject introspection see
[Writing a VAPI Manually](writing-a-vapi-manually).

To use the binding at compile time you will still need the C headers and
library installed.

## GObject Introspection Repository Files

This section explains how a GIR file is created. This is useful when
fixing VAPI generation because it is better to fix the GObject
introspection annotations in the source file. Then all bindings can
benefit from the fix.

There is also some background information on typelib files and other
languages that produce C ABI compatible libraries. This helps put the
Vala binding generation process in a wider context.

If a library generates a GIR file it can usually be obtained from your
distribution as part of the development files for the library.

### Source Code Annotations and g-ir-scanner

A GIR file is an XML file that describes the objects, structures,
constants, enumerations and functions of a library's public interface.

The public interface is identified with the use of documentation
comments. The comments are in GTK-Doc format. Here is an example from
[gtkbutton.c](https://gitlab.gnome.org/GNOME/gtk/blob/gtk-3-22/gtk/gtkbutton.c)
of the GTK+ graphical user interface library, version 3.22. The GObject
introspection annotations are between the parentheses in the comments:

```c
/**
 * gtk_button_new_from_icon_name:
 * @icon_name: (nullable): an icon name or %NULL
 * @size: (type int): an icon size (#GtkIconSize)
 *
 * Creates a new button containing an icon from the current icon theme.
 *
 * If the icon name isn’t known, a “broken image” icon will be
 * displayed instead. If the current icon theme is changed, the icon
 * will be updated appropriately.
 *
 * This function is a convenience wrapper around gtk_button_new() and
 * gtk_button_set_image().
 *
 * Returns: a new #GtkButton displaying the themed icon
 *
 * Since: 3.10
 */
GtkWidget*
gtk_button_new_from_icon_name (const gchar *icon_name,
                GtkIconSize  size)
{
  GtkWidget *button;
  GtkWidget *image;

  image = gtk_image_new_from_icon_name (icon_name, size);
  button =  g_object_new (GTK_TYPE_BUTTON,
           "image", image,
           NULL);

  return button;
}
```

In this example the parameter, `icon_name`, has been annotated as
nullable. For more details and a list of the annotations read
[GObject-Introspection Annotations](https://gi.readthedocs.io/en/latest/annotations/giannotations.html).

The program `g-ir-scanner` is used to read the C source files and
generate the GIR. This is how `gtk_button_new_from_icon_name` looks in
the Gtk-3.0.gir file:

```xml
<constructor name="new_from_icon_name"
           c:identifier="gtk_button_new_from_icon_name"
           version="3.10">
<doc xml:space="preserve">Creates a new button containing an icon from the current icon theme.

If the icon name isn't known, a “broken image” icon will be
displayed instead. If the current icon theme is changed, the icon
will be updated appropriately.

This function is a convenience wrapper around gtk_button_new () and
gtk_button_set_image ().</doc>
<return-value transfer-ownership="none">
  <doc xml:space="preserve">a new #GtkButton displaying the themed icon</doc>
  <type name="Widget" c:type="GtkWidget*"/>
</return-value>
<parameters>
  <parameter name="icon_name"
             transfer-ownership="none"
             nullable="1"
             allow-none="1">
    <doc xml:space="preserve">an icon name or %NULL</doc>
    <type name="utf8" c:type="const gchar*"/>
  </parameter>
  <parameter name="size" transfer-ownership="none">
    <doc xml:space="preserve">an icon size (#GtkIconSize)</doc>
    <type name="gint" c:type="GtkIconSize"/>
  </parameter>
</parameters>
</constructor>
```

Note that the `icon_name` parameter has `nullable="1"`. The
documentation comments are also included in the GIR and these can be
used by Valadoc to create documentation for the interface. For example
here is the
[Button.from_icon_name](https://valadoc.org/gtk+-3.0/Gtk.Button.Button.from_icon_name.html)
documentation at Valadoc.org.

For completeness this next sample shows how `Button.from_icon_name`
appears in the gtk+-3.0.vapi:

```vala
[CCode (cheader_filename = "gtk/gtk.h", type_id = "gtk_button_get_type ()")]
public class Button : Gtk.Bin, Atk.Implementor, Gtk.Actionable, Gtk.Activatable, Gtk.Buildable {
 [CCode (has_construct_function = false, type = "GtkWidget*")]
 [Version (since = "3.10")]
 public Button.from_icon_name (string? icon_name, [CCode (type = "GtkIconSize")] Gtk.IconSize size = Gtk.IconSize.BUTTON);
}
```

The VAPI has `icon_name` correctly marked as nullable.

For more details on GObject introspection read
<https://gi.readthedocs.io/en/latest/>.

### Typelib Files and libgirepository

You may come across documentation about generating a GIR from a typelib
file, but GIR files generated in this way will have lost relevant
information and lead to an awkward binding with Vala.

### Other Languages that Support the C ABI

At present GObject introspection only works with annotations of C code.
Other languages, however, can compile libraries that maintain the C ABI.
For example Go has the `-buildmode=c-shared` option. This tutorial,
[Calling Go Functions from Other Languages](https://medium.com/learning-the-go-programming-language/calling-go-functions-from-other-languages-4c7d8bcc69bf)
explains more about Go's `c-shared` build mode. Rust also can produce C
ABI compatible code with the `extern` keyword and `#[no_mangle]`. See
the 'Calling Rust code from C' section of [FFI - The Rust Programming Language](https://doc.rust-lang.org/book/first-edition/ffi.html). GIR
files can be used to create bindings for many languages, including
Python, Lua, Javascript and Haskell. If Go or Rust or any other language
that can compile code to the C ABI can also produce GIR files then it
may be possible to automatically generate bindings using existing
generators like `vapigen`.

## Generating the VAPI File

To convert the `.gir` file into a Vala API file use:

```shell
vapigen --library poppler-glib poppler-glib/poppler-glib.gir
```

If you are updating an officially maintained vala binding in the source
code tree, you can go in the vapi directory and run:

```shell
../vapigen/vapigen --library clutter-gtk-1.0 --vapidir=. --metadatadir=packages/clutter-gtk-1.0/ packages/clutter-gtk-1.0/clutter-gtk-1.0.gir
```

or just:

```shell
make clutter-gtk-1.0
```

Do not forget to include the packages needed by the library. If the
library uses GTK+ and GConf, use:

```shell
vapigen --pkg gtk+-2.0 --pkg gconf-2.0 --library [...]
```

Otherwise, you'll get errors like that, or an incomplete binding:

```shell
error: The type name ``GLib.tkWidget' could not be found
```

## Fixing VAPI Generation with Metadata

Sometimes it is necessary to fix up the generated VAPI file; for
instance, `vapigen` might not identify `out` or `ref` parameters, or
identify structures that should generally be put on the stack instead of
allocated, and passed by reference to methods.

Instead of updating the VAPI file, and keeping it updated with every
upstream API change, `vapigen` output can be tweaked with a `.metadata`
file. For instance, in *poppler-glib* the *poppler_page_get_size*
function has two out parameters, *width* and *height*; in order to
create a valid Vala signature in our VAPI file, we need to add these
lines inside the `poppler-glib.metadata` file:

```xml
poppler_page_get_size.width is_out="1"
poppler_page_get_size.height is_out="1"
```

Which translates to: "the *width* parameter of *poppler_page_get_size*
is an out parameter" and "the *height* parameter of
*poppler_page_get_size* is an out parameter".

Metadata files must have the same base name as the GIR, but instead of a
`gir` extension they use `metadata`.

To get vapigen to pick up your metadata file, you must provide the name
of the directory to look for it in:

```shell
vapigen \
    --library foo \
    --pkg bar-1.0 \
    --metadatadir ./metadata/ \
    Foo-1.0.gir
```

GObject Introspection and Vala support different things. Sometimes one
not supporting something the other does is a bug, sometimes it is that
one has made certain assumptions about APIs that the other does not. If
there is a problem generating the VAPI then it is best to work through
the problem in this order:

1.  Check the C source for missing GObject Introspection annotations,
    e.g. null
2.  Check the arguments to `g-ir-scanner`, e.g. C header files
3.  Add metadata for `vapigen`

For detailed information on the features and syntax of metadata files,
see the Vala Manual section on [GIR metadata format](https://gnome.pages.gitlab.gnome.org/vala/manual/gir-metadata-format.html).

## C Headers

Most libraries tend to install one header file, which will then include
any additional headers. If the VAPI does not have the correct header
filename then the best fix is to amened the generation process of the
GIR. To include a C header filename in a GIR `g-ir-scanner` has the
`--c-include` option. For example:

```shell
g-ir-scanner --c-include=example/example.h project_source.c
```

`vapigen` will then use this filename from the GIR.

Some libraries need multiple header files in the VAPI. Using
`--c-include` multiple times will allow these to be included in the GIR
and so included in the VAPI.

If it is not possible to amend the GIR generation then the header can be
included using `vapigen` and metadata. This can be done for a namespace
or for a type. For example:

```xml
PnpIds cheader_filename="libgnome-desktop/gnome-pnp-ids.h"
```

### Duplicate Symbols

The single most common error seen the first time one tries to generate a
VAPI is one about duplicate symbols. Vala has a single scope for
methods, virtual methods, signals, and properties. Assuming that the
signatures match, vapigen will automatically combine several of these
into a single entity--the most extreme example of this is probably a
virtual signal, which can combine a signal, virtual method, and method
in one item. For example, GIO has the following in GLib.Application:

```vala
[HasEmitter]
public virtual signal void activate ();
```

That said, some conflicts cannot be resolved automatically by vapigen
and will require some metadata. The most common conflict is when a
method, virtual method, or signal disagrees with another method, virtual
method, or signal with the same name regarding arguments or return
values. For example,
[ClutterActor](https://developer-old.gnome.org/clutter/stable/ClutterActor.html)
has an [event signal](https://developer-old.gnome.org/clutter/stable/ClutterActor.html#ClutterActor-event),
which takes a single argument: a
[ClutterEvent](http://developer-old.gnome.org/clutter/stable/clutter-Events.html#ClutterEvent)
instance. It also has an [event method](http://developer-old.gnome.org/clutter/stable/ClutterActor.html#clutter-actor-event)
which takes two arguments: a ClutterEvent instance and a boolean. In
this case, we resolve the conflict by renaming the method to
"emit_event":

```xml
Actor.event#method name="emit_event"
```

Another common problem is when a symbol of a subclass has the same name
as that of a base class but the signatures do not match. Depending on
the situation, you can rename or skip one of the symbols (usually in the
subclass).

### Nested Namespaces

GIR does not support nested namespaces ([bug #660879](https://bugzilla.gnome.org/show_bug.cgi?id=660879)), but Vala
does. If you prefer, you can just ignore this Vala feature, but some
bindings can be quite a bit cleaner if we make use of it.

A good example of nested namespaces in Vala is moving the hundreds of
keysmys in Clutter into a Clutter.Key namespace, allowing us to use
Clutter.Key.Right instead of Clutter.KEY_Right. This is accomplished
with a single line of metadata:

```xml
KEY_* skip=false name="KEY_(.+)" parent="Clutter.Key"
```

We can also use the same technique to group similar functions together,
like for the
[GContentType](http://developer-old.gnome.org/gio/stable/gio-GContentType.html)
family in GIO:

```xml
content_type_* parent="GLib.ContentType" name="content_type_(.*)"
```

### Nullability of Return Values

GIR assumes all pointer return values are nullable ("allow-none" in
G-I terminology) and does not provide a way to override this assumption
([bug #660879](https://bugzilla.gnome.org/show_bug.cgi?id=660879)).
Vala, on the other hand, assumes return values are not nullable unless
otherwise specified, and comparing a non-nullable value to
null (e.g., to check for validity) will cause a warning. Luckily, making
a value nullable is easy to do from a metadata file, as you can see from
this example (for
[clutter_actor_get_parent](http://developer-old.gnome.org/clutter/stable/ClutterActor.html#clutter-actor-get-parent)):

```xml
Actor.get_parent nullable
```

### Variadic Functions

GObject introspection does not currently support variadic methods. It
actually generates all the information Vala needs to do so, but it will
mark the function as introspectable="0", which is the same that
happens when you add a "skip" annotation to the method. Therefore, in
order to expose these functions in Vala, we need a simple annotation to
un-skip the symbol. For example, this is how
[clutter_actor_animate](http://developer-old.gnome.org/clutter/stable/clutter-Implicit-Animations.html#clutter-actor-animate)
is exposed from metadata:

```xml
Actor.animate skip=false
```

### Ownership of Struct Fields

GObject introspection does not currently offer a way to specify whether
or not fields contain an owned reference. It is therefore impossible for
Vala to know whether or not it should ref or copy a value being assigned
to this field. Again, this is easy to fix with metadata... using
[GDBusAnnotationInfo](http://developer.gnome.org/gio/stable/gio-D-Bus-Introspection-Data.html#GDBusAnnotationInfo-struct)
as an example:

```xml
DBusAnnotationInfo.*#field unowned=false
```

### Virtual Methods Without Invokers

Some libraries contain virtual methods without emitters, which GObject
introspection does not currently offer a way to annotate ([bug #730480](https://bugzilla.gnome.org/show_bug.cgi?id=730480)). Fixing
these basically means adding any information that would normally go in
annotations to the metadata.

### Abstract/Virtual Distinction

Vala distinguishes between abstract and virtual methods (virtual methods
do not need to be implemented by a class which implements the interface
whereas abstract methods do require an implementation) while GIR does
not. In order to mark a method as virtual instead of abstract, you could
do something like this (from
[gtk_source_completion_proposal_equal](http://developer-old.gnome.org/gtksourceview/stable/GtkSourceCompletionProposal.html#gtk-source-completion-proposal-equal)):

```xml
CompletionProposal.equal#virtual_method virtual
```

### Generic Types

GObject Introspection only supports a few different generic types, and
that support is hard-coded and cannot currently be extended to other
types which should be generic ([bug #639908](https://bugzilla.gnome.org/show_bug.cgi?id=639908)). For
example,
[GDataList](http://developer-old.gnome.org/glib/unstable/glib-Keyed-Data-Lists.html)
is a generic in Vala but is not supported as such by GObject
Introspection, so the following is necessary for
[soup_form_encode_datalist](http://developer.gnome.org/libsoup/stable/libsoup-2.4-HTML-Form-Support.html#soup-form-encode-datalist):

```xml
form_encode_datalist.form_data_set type_arguments="string"
```

### GClosure Types

GIR does not provide a way to annotate the type of a callback ([bug #636812](https://bugzilla.gnome.org/show_bug.cgi?id=636812)) contained
in a
[GClosure](http://developer-old.gnome.org/gobject/stable/gobject-Closures.html).
Although this is not an error which will cause bindings to not be
generated, the result is an API that is extremely difficult to use
correctly. For example, you can provide the delegate type of
[clutter_binding_pool_install_closure](http://developer-old.gnome.org/clutter/stable/clutter-Key-Bindings.html#clutter-binding-pool-install-closure)
from the metadata:

```xml
BindingPool.install_closure.closure type="owned BindingActionFunc"
```

### Inheritance

GObject Introspection currently only handles inheritance for
GObject-derived types ([bug #560692](https://bugzilla.gnome.org/show_bug.cgi?id=560692)). To get
around it in metadata you can use "base_type":

```xml
Buffer base_type="Gst.MiniObject"
```

### Asynchronous Finish Functions

GObject Introspection does not currently offer a way to annotate the
relationship between an async function and its corresponding finish
function ([bug #623635](https://bugzilla.gnome.org/show_bug.cgi?id=623635)). By default,
Vala will look for a function with the same base name, but a "_finish"
suffix, but you can point it to other functions in metadata using
"finish_name":

```xml
Service.lookupv finish_name="secret_service_lookup_finish"
```

### Macros

Since GObject Introspection is focused primarily on runtime bindings for
languages such as Python and JavaScript, it ignores preprocessor macros.
Although this decision makes sense for them (you can't dlsym(3) a
macro), Vala is capable of utilizing macros. However, since no
information on macros is included in the GIR the only way to expose
macros is by adding them to a *-custom.vala file.

## Fixing VAPI Generation with Custom Vala Code

Remember that thing about the world not being perfect? Well, a metadata
file isn't always enough either. Sometimes you'll need the ability to
inject custom Vala code into your VAPI. Technically, this file can have
any name and there can be more than one per package, but the convention
is to use the same file name and directory as the GIR followed by
"-custom.vala". For instance, our Foo-1.0.gir might have a
corresponding metadata file named Foo-1.0-custom.vala. Once you have
your custom Vala file, simply include it in the argument list you pass
to `vapigen`:

```shell
vapigen \
    --library foo-1.0 \
    --pkg bar-1.0 \
    --metadatadir ./metadata/ \
    Foo-1.0.gir \
    Foo-1.0-custom.vala
```

### No Generic Methods

Vala supports generic methods, such as
[g_object_get](http://developer.gnome.org/gobject/stable/gobject-The-Base-Object-Type.html#g-object-get),
while GObject Introspection does not. Unfortunately, metadata alone
cannot currently resolve this issue--you will need to skip the method
in metadata and recreate it in custom.vala.

## A Note on the Deprecated GIDL Method

The traditional approach was to use
[vala-gen-introspect](https://wiki.gnome.org/Projects/Vala/Bindings/GI)
to generate `.gi` files. Then use `vapigen` to generate the VAPI. This
method is now deprecated.

For the maintenance of existing bindings see the Vala Manual 
[GIDL metadata format](https://gnome.pages.gitlab.gnome.org/vala/manual/gidl-metadata-format.html).
This metadata format was used to control the generation of the VAPI from
a `.gi` file.

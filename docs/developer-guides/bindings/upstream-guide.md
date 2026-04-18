# Why Distribute Bindings Upstream

While a number of bindings for third-party libraries are maintained as
part of Vala itself, this is not the recommended method for providing
Vala bindings. When possible, projects are encouraged to distribute
their own Vala bindings. Doing so provides a number of advantages to
both you and your users, including:

## Catch errors earlier

In order to find problems with most GObject Introspection bindings you
must actually write code to test that code path. Since vapigen generates
a VAPI for an entire API ahead of time it will help you detect many
common problems, such as mismatched methods and virtual methods.
Furthermore, since VAPIs are much easier to read than GIR XML, taking a
quick look at the generated VAPI when changing API can help you spot
bugs before they even make it into your repository.

## Annotation bugs get fixed quicker

Vala users will often find bugs which aren't actually specific to the
Vala bindings, but rather exist in any GObject Introspection consumer.
Distributing bindings with your library means you will receive bug
reports about such issues sooner.

## Matching the version of the installed software

When bindings are distributed with Vala, or externally, it's unlikely
the version of your software the bindings are targeted at is the same as
the version that is actually installed. Bindings which are targeted at
an older release may not expose features present in the newer version,
and bindings targeted at a newer release may result in C compiler
errors.

## Higher quality bindings

You know your library better than the Vala developers do, and you can
make sure your APIs look and behave as you intended.

## API documentation

We provide documentation for many libraries that ship a VAPI on
[Valadoc.org](https://www.valadoc.org/).

**But...**

## Why not use GObject Introspection directly?

Sometimes it can, but we generally discourage it for several reasons.
Obviously, you'll no longer receive the benefits mentioned in the
preceding section, but there are also several problems that occur for
people attempting to consume your API in Vala.

Using a GIRs directly tends to cause people to use other GIRs directly,
either on accident or because they believe there is nothing wrong with
doing so, but even if your GIR doesn't require any metadata others
likely will. For example, if your GIR includes Gio-2.0 and the user
doesn't pass --pkg gio-2.0, the GIR for GIO will be included
automatically by the compiler instead of the VAPI. GIO is one of those
libraries which does require metadata, and valac will exit with an
error. These issues can be circumvented by passing the appropriate flags
to valac, although this can be a bit confusing for users who expect
valac automatically handle dependencies for them.

GObject Introspection also allows for some things which Vala does not,
which is where the real problems begin. These issues can cause errors
from Vala's GIR parser (like the ones mentioned earlier from GIO),
resulting in your GIR being useless to valac. The classic example of
this is duplicate symbols; GObject Introspection allows for methods,
virtual methods, and signals with the same name but different signatures
to coexist, whereas Vala does not.

In general, Vala allows for much more API to be exposed than what
GObject Introspection allows for, including generics (other than the
ones built into glib), variadic arguments, default values, non-GObject
inheritance, and much more. Not distributing a VAPI can deprive Vala
consumers of many extremely interesting features.

Those libraries who choose not to distribute a VAPI are likely to end up
eventually shipping a GIR which causes errors for Vala, breaking working
applications.

## I Don't Know Anything About Vala (or Vala Bindings)

Don't worry about it. The people who maintain Vala are happy to help
maintain bindings distributed upstream. After all, it isn't really any
more effort to fix something in your repository than in Vala's. Just
drop by the [Vala Matrix Room](https://matrix.to/#/#vala:gnome.org).

## How Vala Bindings Work

Vala bindings tend to be much smaller, and simpler, than those for
traditional languages such as Python, PHP, and even C++. This is because
instead of creating functions which will convert between the C API you
want to use and the data structures used natively by your language of
choice Vala simply uses the C API directly.

The names of Vala bindings correspond to
[pkg-config](http://www.freedesktop.org/wiki/Software/pkg-config) files,
which allows valac to build and link software without any information
other than the code to compile and a list of packages to use. All (one
or two) of the files which should be distributed are simply the
pkg-config name and an extension.

The only required file is a VAPI, which tells valac how to map Vala code
to C. Sometimes these files are handwritten, but where [GObject Introspection](https://gi.readthedocs.io/en/latest/index.html) support
is available the bindings can be automatically generated from a GIR. For
examples of VAPI files, please see [the bindings distributed with Vala](http://git.gnome.org/browse/vala/tree/vapi).

The only other file that should be distributed is a _deps_
file, which lists _pkg-config_ names of any dependencies
exposed in the public API. Although not technically required, this file
helps avoid confusing errors about undefined symbols.

There are three methods for creating a VAPI, one of which (generation
from GIDL) is deprecated and shall not be described in this document.
The easy way to generate a VAPI is by using vapigen to create one from a
GObject Introspection Repository (GIR). When that is not possible, you
can always write the VAPI by hand.

## Generating a VAPI from GObject Introspection

If your library is based on GObject, you will probably want to use
[GObject Introspection](https://gi.readthedocs.io/en/latest/index.html).
Besides being the easiest way to get Vala bindings, you also get
bindings for a growing number of other languages and most of the
maintenance burden is shared.

### Generating a GIR

The first step to generating Vala bindings from a GIR is to make sure
you have a GIR. A GIR can be generated from source code using
_g-ir-scanner_. Documentation for 
[integration with autotools is available](https://gi.readthedocs.io/en/latest/buildsystems/autotoolsintegration.html)

The GObject introspection team provides lots of information on 
[GObject Introspection](https://gi.readthedocs.io/en/latest/index.html) which
will not be repeated here.

### Generating a VAPI from a GIR

Once you have a GIR, you can get to work on generating a VAPI, which
means executing vapigen. If the pkg-config name of your library were
"foo-1.0", it would look something like this:

```shell
vapigen \
    --library foo-1.0 \
    Foo-1.0.gir
```

You will most likely also need to provide a list of dependencies to
vapigen:

```shell
vapigen \
    --library foo-1.0 \
    --pkg bar-1.0 \
    Foo-1.0.gir
```

The VAPI generation process may require some further tweaking. This is
done with a _.metadata_ file passed to
_vapigen_. Sometimes custom Vala code also needs to be
passed. See
[Generating a VAPI with GObject Introspection](generating-a-vapi-with-gobject-introspection)` for more details.

### Autotools Integration

Since version 0.16, Vala has provided autotools integration for vapigen
similar to what GI provides for g-ir-scanner in the form of an autoconf
macro and a Makefile. In order to avoid introducing a hard dependency to
your project, it is recommended you copy the
[vapigen.m4](https://gitlab.gnome.org/GNOME/vala/-/blob/master/vapigen/vapigen.m4)
file into your macro directory (usually a m4/ folder in the top level
of your project). The macro has the following signature:

```shell
VAPIGEN_CHECK([VERSION], [API_VERSION], [FOUND-INTROSPECTION], [DEFAULT])
```

All four arguments are optional.

VERSION

>   Require the specified version of vapigen in order for the test to
    pass. You can use this to make sure vapigen is as recent as you need
    it to be.

API_VERSION

>   Limit matches to the specified API version. This will cause the
    version specific vapidir to be used as the default installation
    location. You should not set this argument unless your vapi only
    works with a specific version of Vala.

FOUND-INTROSPECTION

>   Used to explicitly specify that GObject introspection support was
    found. Generally, you should omit this argument unless you are not
    using the GOBJECT_INTROSPECTION_CHECK macro from GI.

DEFAULT

>   The default value of the argument (yes, no, or auto). The default value of default is auto.

This macro will define three variables for you to use in your automake
files:

VAPIGEN

>   Path to the vapigen executable

VAPIGEN_VAPIDIR

>   The location to install your bindings to

VAPIGEN_MAKEFILE

>   The location of a Makefile you can include to help you generate the
    VAPI

At this point, you can include
[Makefile.vapigen](https://gitlab.gnome.org/GNOME/vala/-/blob/master/vapigen/Makefile.vapigen)
to help you easily generate your VAPI. This should be done conditionally
based on the ENABLE_VAPIGEN conditional:

```make
if ENABLE_VAPIGEN
-include $(VAPIGEN_MAKEFILE)
endif
```

The Makefile will make use of several variables which you should
populate:

VAPIGEN_FILES

>   A list of VAPIs to generate

DEPS / VAPIGEN_DEPS

>   List of dependencies. Usually these are pkg-config names so the
    VAPIs are used, but it is technically possible to use a raw GIR
    here, so long as no metadata is required to generate a VAPI from
    that GIR. Corresponds to the --pkg arguments.

METADATADIRS / VAPIGEN_METADATADIRS

>   List of directories containing the metadata files. Corresponds to
    the --metadatadir arguments.

VAPIDIRS / VAPIGEN_VAPIDIRS

>   List of directories to look for VAPI dependencies. Corresponds to
    the --vapidir arguments.

GIRDIRS / VAPIGEN_GIRDIRS

>   List of directories to look for GIR dependencies. Corresponds to the
    --girdir arguments. Note that this only specifies where vapigen
    will look for dependencies, not for the source files (i.e., files
    listed in *_FILES).

FILES

>   The GIR file to generate the VAPI from

To use our "Foo" example from earlier:

```make
if ENABLE_VAPIGEN
-include $(VAPIGEN_MAKEFILE)

foo-1.0.vapi: Foo-1.0.gir Foo-1.0-custom.vala foo-1.0.deps

VAPIGEN_VAPIS = foo-1.0.vapi

foo_1_0_vapi_DEPS = foo-1.0
foo_1_0_vapi_METADATADIRS = $(srcdir)
foo_1_0_vapi_FILES = Foo-1.0.gir Foo-1.0-custom.vala

vapidir = $(datadir)/vala/vapi
vapi_DATA = $(VAPIGEN_VAPIS) $(VAPIGEN_VAPIS:.vapi=.deps)

EXTRA_DIST += Foo-1.0.metadata foo-1.0.deps Foo-1.0-custom.vala
endif
```

## Writing a VAPI By Hand

If GObject Introspection support isn't an option for you, you can still
write a VAPI by hand. The process isn't as easy as generating one from
a GIR, but it is surprisingly easy for people who are already familiar
with Vala. The syntax is the same as for Vala, but values and method
bodies are omitted, and annotations (especially CCode annotations) are
much more common. For a guide on how to convert a non-GLib C API to a
Vala binding, see
[Writing a VAPI Manually](writing-a-vapi-manually).

### Namespaces

VAPIs should enclose their API in a namespace. The namespace need not be
unique but generally are. Nested namespaces can be used to further group
similar functionality if desired.

### Data Types

The first step in writing a VAPI by hand is figuring out to represent
your types in Vala. There is a graphic in the FAQ (under the
[What does \[SimpleType\] and \[Compact\] in bindings mean?](../../faq#what-does-simpletype-and-compact-in-bindings-mean) question) which provides a good idea of when you should use
which types.
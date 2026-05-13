# Genie sample code

These pages host the Genie examples that were listed on the GNOME Wiki under
[Projects/Genie/Examples](https://wiki.gnome.org/Projects/Genie/Examples). The
original wiki is retired; the sources here are taken from the wiki archive and
adapted only where noted (for example clearer tree walks or compile filenames).
Each page is self-contained: you can copy a fenced block into a `.gs` file and
compile it. **Genie requires tab characters for indentation**; the fenced
sources here use tabs so they work with `valac` after copy-paste.

::: warning Legacy APIs
Several samples target **GTK+ 2**, **GTK+ 3**, **libsoup 2.4**, or older
`pkg-config` names. They are useful for learning Genie syntax and patterns, but
expect to adjust packages and APIs for a current desktop or distribution.
:::

## Samples

- [Basic samples](basic-samples) — hello world, I/O, math, arguments, files,
  processes, minimal GObject class.
- [Advanced sample](advanced-sample) — custom `event` and a number-guessing
  game.
- [Cairo sample](cairo-sample) — GTK drawing with Cairo, plus a GTK+ 2 shaped
  clock window.
- [Curses sample](curses-sample) — minimal ncurses program.
- [GIO networking sample](gio-networking-sample) — small threaded TCP HTTP
  server.
- [LibSoup sample](libsoup-sample) — tiny `Soup.Server` with HTML and XML
  routes.
- [XML sample (libxml2)](xml-sample) — parse, build in memory, and
  `Xml.TextWriter` output.

## See also

- [Introduction to Genie](../introduction) — tutorial in this documentation.
- [Tutorials, Blogs and Code Examples](../resources) — more external links.
- [Vala sample code](/sample-code/) — many related patterns in Vala syntax.

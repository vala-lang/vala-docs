# Genie Programming Language

Genie is a programming language in the same vein as [Vala](https://vala.dev).
It allows for a more modern, indentation-based programming style while being
able to effortlessly create and use [GObjects](https://docs.gtk.org/gobject/)
natively. Like Vala, Genie produces C code that compiles to executable
binaries, so programs written in Genie have performance and resource usage
similar to those written directly in Vala and C.

Genie shares the Vala compiler (`valac`); a `.gs` file simply uses a different
parser. As a result, Vala and Genie code can be freely mixed in the same
project.

<ul class="section-toc">
  <li><a href="introduction">Introduction to Genie</a> — language overview, syntax, and tutorial (multiple chapters)</li>
  <li><a href="/genie/sample-code/">Sample code</a> — full Genie sources (basic I/O, Cairo, GIO, LibSoup, XML, and more)</li>
  <li><a href="developing-genie">Developing Genie</a> - how to contribute to the Genie scanner and parser</li>
  <li><a href="resources">Tutorials, Blogs and Code Examples</a> - external Genie learning resources and projects</li>
</ul>

## External Resources

- [Valadoc.org](https://valadoc.org) - API reference for the GLib, GObject and other bindings used by Genie
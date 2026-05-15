# Bindings

A Vala binding maps Vala syntax to the C code used in a library. It is often a single Vala API file (`.vapi`), but can also include a dependencies file (`.deps`).

## Sources Of Bindings

### Upstream Projects

The first source of bindings is from upstream projects. If a project uses GLib with GObjects then a Vala binding can be generated automatically as part of the build process.

The resulting VAPI file can be distributed with the project and ensures it is the most compatible with the project.

For projects not using GObjects a manually written VAPI can be distributed. See [Why Distribute Bindings Upstream](bindings/upstream-guide) for details on using either process in an upstream project.

### Distributed with Vala

The Vala project also includes a large number of bindings for projects that do not distribute the VAPI files.

You can check them out in the `vapi` directory in the Vala compiler's repository: [https://gitlab.gnome.org/GNOME/vala/-/tree/main/vapi](https://gitlab.gnome.org/GNOME/vala/-/tree/main/vapi)

### Other notable sources

- [vala-girs](https://github.com/nemequ/vala-girs) — GIR packages and
    related bindings metadata
-   [vala-extra-vapis](https://gitlab.gnome.org/GNOME/vala-extra-vapis) — Additional VAPI files maintained with by the GNOME Vala project that aren't distributed with Vala

### Writing your own VAPI files

You can also write your own `.vapi` files or use a custom `.vapi` file that someone else has written.

Check out the contents of the guide below to see how to do so.

## How to use VAPI files that aren't distributed with projects

When `.vapi` aren't distributed for a package you want to use, you can download or write your own `.vapi` file and compile your program with it by using the `--vapidir` option in `valac`.

For example:

```sh
valac --vapidir=/path/to/vapi --pkg pkg_name main.vala
```

Typically you would set `--vapidir` to local directory called `vapi` in your project. For example:

```sh
valac --vapidir=./vapi --pkg pkg_name main.vala
```


## Contents

<ul class="section-toc">
	<li><a href="bindings/generating-a-vapi-with-gobject-introspection">Generating a VAPI with GObject Introspection</a></li>
	<li><a href="bindings/upstream-guide">Why Distribute Bindings Upstream</a></li>
	<li><a href="bindings/writing-a-vapi-manually">Writing a VAPI Manually</a></li>
</ul>

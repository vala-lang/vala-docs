# Language Server Protocol Support

The Language Server Protocol was originally developed by Microsoft for
Visual Studio Code, but clients have now been developed for many other
editors.

Currently there are two active developing implementations of a language
server for Vala:

-   [Vala Language Server](https://github.com/vala-lang/vala-language-server) -
    designed for any editor that supports LSP, including VSCode, vim,
    and GNOME Builder. Fully compatible with Meson and
    `compile_commands.json`. Has diagnostics, robust completion,
    signature help, document outlining, workspace symbols search,
    support for finding references, and more. Has packages available in
    a number of distributions, including Ubuntu, Fedora, Arch, and
    Alpine Linux. See the README for more information.
-   [GVls (GNOME Vala Language Server)](https://gitlab.gnome.org/esodan/gvls) - Supports Meson
    introspection provided by Clients or auto-detected. Supports
    diagnostics, completion, signature help, document's symbols,
    workspace symbols, find symbols, documentation. Server supports
    stdio and internet connection, from clients. Provides a fast LSP
    Client supporting connection using stdio and internet connections.

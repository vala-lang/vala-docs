# Syntax Support

-   [GtkSourceView](https://wiki.gnome.org/Projects/GtkSourceView)
    extends the GtkTextView widget to provide syntax highlighting for
    applications using GTK+, this includes the elementary OS Code, gedit
    and GNOME Builder editors. Syntax highlighting for each language is
    through a `.lang` file. GtkSourceView has both a [Vala lang file](https://gitlab.gnome.org/browse/gtksourceview/tree/data/language-specs/vala.lang)
    and a [Genie lang file](https://gitlab.gnome.org/browse/gtksourceview/tree/data/language-specs/genie.lang)
-   Although [TextMate](http://macromates.com/) is a macOS editor, its
    language bundles can be imported into many other editors, for
    example: [Visual Studio Code](https://code.visualstudio.com/docs/extensions/yocode),
    [Sublime Text](http://docs.sublimetext.info/en/latest/extensibility/syntaxdefs.html),
    the [JetBrains IntelliJ collection of editors](https://plugins.jetbrains.com/plugin/7221-textmate-bundles-support),
    [Atom](https://flight-manual.atom.io/hacking-atom/sections/converting-from-textmate/),
    [Ace web editor](https://ace.c9.io/) and
    [Linuguist](https://github.com/github/linguist/blob/master/CONTRIBUTING.md),
    used for GitHub syntax highlighting. A [Vala TextMate bundle](https://github.com/technosophos/Vala-TMBundle) does already
    exist. To understand more about how to write a language bundle read
    [TextMate Language Grammars](https://manual.macromates.com/en/language_grammars),
    [TextMate Scope Selectors](https://manual.macromates.com/en/scope_selectors.html%7C),
    [Writing a TextMate Grammar: Some Lessons Learned](https://www.apeth.com/nonblog/stories/textmatebundle.html)
    and [Notes on how to create a Language Grammar](https://benparizek.com/notebook/notes-on-how-to-create-a-language-grammar-and-custom-theme-for-a-textmate-bundle)
-   [GNU source-highlight](http://www.gnu.org/software/src-highlite/)
-   [highlight.js](http://github.com/isagalaev/highlight.js) - Client
    side syntax highlighter (JS+HTML)
-   [MoinMoin Wiki](https://wiki.gnome.org/Projects/Vala/MoinMoin)
    parser.
-   [Pygments](http://pygments.org/) has a lexer since version 1.1.
-   [Tree-Sitter by Prince781](https://github.com/vala-lang/tree-sitter-vala)

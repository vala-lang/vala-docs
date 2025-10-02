
export default {
    // site-level options
    lang: 'en-US',
    license: 'CC-BY-SA-4.0',
    title: 'Vala Documentation',
    description: 'Official documentation for the Vala programming language',
    head: [
      [
          'link',
          {
              rel: 'icon',
              href: '/assets/favicon.png'
          }
      ]
    ],
    locales: {
        root: {
            label: 'English',
            lang: 'en'
        }
    },
    themeConfig: {
        // theme-level options
        logo: '/assets/logo.png',
        socialLinks: [
            {
                icon: 'github', link: 'https://github.com/vala-lang/vala-docs'
            }
        ],
        lastUpdated: true,
        editLink: {
            pattern: 'https://github.com/vala-lang/vala-docs/edit/main/docs/:path',
        },
        search: {
            provider: 'local'
        },
        sidebar: [
            {
                items: [
                    {
                        text: 'Home',
                        link: '/'
                    },
                    {
                        text: 'About',
                        link: '/about'
                    },
                    {
                        text: 'Installation Guide',
                        link: '/installation-guide'
                    },
                    {
                        text: 'Tutorials',
                        link: '/tutorials',
                        collapsed: true,
                        items: [
                            {
                                text: 'GUI Programming',
                                link: '/tutorials/gui-programming',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'GTK4 Samples',
                                        link: '/tutorials/gui-programming/gtk4-samples',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: 'Minimal App',
                                                link: '/tutorials/gui-programming/gtk4-samples/minimal-app'
                                            },
                                            {
                                                text: 'Basic App',
                                                link: '/tutorials/gui-programming/gtk4-samples/basic-app'
                                            },
                                            {
                                                text: 'Synchronising Widgets',
                                                link: '/tutorials/gui-programming/gtk4-samples/synchronising-widgets'
                                            },
                                            {
                                                text: 'Text File Viewer',
                                                link: '/tutorials/gui-programming/gtk4-samples/text-file-viewer'
                                            },
                                            {
                                                text: 'ListView',
                                                link: '/tutorials/gui-programming/gtk4-samples/list-view'
                                            },
                                            {
                                                text: 'ListView with CheckButtons',
                                                link: '/tutorials/gui-programming/gtk4-samples/list-view-check-buttons'
                                            },
                                            {
                                                text: 'ColumnView',
                                                link: '/tutorials/gui-programming/gtk4-samples/column-view'
                                            },
                                            {
                                                text: 'Clipboard',
                                                link: '/tutorials/gui-programming/gtk4-samples/clipboard'
                                            },
                                            {
                                                text: 'Entry Completion with Two Cells',
                                                link: '/tutorials/gui-programming/gtk4-samples/entry-completion-two-cells'
                                            },
                                        ]
                                    },
                                    {
                                        text: 'GNOME Developer Documentation - Tutorials',
                                        link: 'https://developer.gnome.org/documentation/tutorials.html'
                                    },
                                    {
                                        text: 'elementary OS - Writing Apps',
                                        link: 'https://docs.elementary.io/develop/writing-apps/the-basic-setup'
                                    }
                                ]
                            },
                            {
                                text: 'Programming Language',
                                link: '/tutorials/programming-language',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'Main Tutorial',
                                        link: '/tutorials/programming-language/main',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: '1. First Program',
                                                link: '/tutorials/programming-language/main/01-00-first-program'
                                            },
                                            {
                                                text: '2. Basics',
                                                link: '/tutorials/programming-language/main/02-00-basics',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '2.1. Source Files and Compilation',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-01-source-files-and-compilation'
                                                    },
                                                    {
                                                        text: '2.2. Syntax Overview',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-02-syntax-overview'
                                                    },
                                                    {
                                                        text: '2.3. Comments',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-03-comments'
                                                    },
                                                    {
                                                        text: '2.4. Data Types',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-04-data-types'
                                                    },
                                                    {
                                                        text: '2.5. Operators',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-05-operators'
                                                    },
                                                    {
                                                        text: '2.6. Control Structures',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-06-control-structures'
                                                    },
                                                    {
                                                        text: '2.7. Language Elements',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-07-language-elements'
                                                    },
                                                    {
                                                        text: '2.8. Code Attributes',
                                                        link: '/tutorials/programming-language/main/02-00-basics/02-08-code-attributes'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '3. Object Oriented Programming',
                                                link: '/tutorials/programming-language/main/03-00-object-oriented-programming',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '3.1. Basics',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-01-basics'
                                                    },
                                                    {
                                                        text: '3.2. Construction',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-02-construction'
                                                    },
                                                    {
                                                        text: '3.3. Destruction',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-03-destruction'
                                                    },
                                                    {
                                                        text: '3.4. Signals',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-04-signals'
                                                    },
                                                    {
                                                        text: '3.5. Properties',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-05-properties'
                                                    },
                                                    {
                                                        text: '3.6. Inheritance',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-06-inheritance'
                                                    },
                                                    {
                                                        text: '3.7. Abstract Classes',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-07-abstract-classes'
                                                    },
                                                    {
                                                        text: '3.8. Interfaces',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-08-interfaces'
                                                    },
                                                    {
                                                        text: '3.9. Polymorphism',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-09-polymorphism'
                                                    },
                                                    {
                                                        text: '3.10. Method Hiding',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-10-method-hiding'
                                                    },
                                                    {
                                                        text: '3.11. Run-Time Type Information',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-11-run-time-type-information'
                                                    },
                                                    {
                                                        text: '3.12. Dynamic Type Casting',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-12-dynamic-type-casting'
                                                    },
                                                    {
                                                        text: '3.13. Generics',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-13-generics'
                                                    },
                                                    {
                                                        text: '3.14. GObject-Style Construction',
                                                        link: '/tutorials/programming-language/main/03-00-object-oriented-programming/03-14-gobject-style-construction'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '4. Advanced Features',
                                                link: '/tutorials/programming-language/main/04-00-advanced-features',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '4.1. Assertions and Contract Programming',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-01-assertions-and-contract-programming'
                                                    },
                                                    {
                                                        text: '4.2. Error Handling',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-02-error-handling'
                                                    },
                                                    {
                                                        text: '4.3. Parameter Directions',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-03-parameter-directions'
                                                    },
                                                    {
                                                        text: '4.4. Collections',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-04-collections'
                                                    },
                                                    {
                                                        text: '4.5. Methods with Syntax Support',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-05-methods-with-syntax-support'
                                                    },
                                                    {
                                                        text: '4.6. Multi-Threading',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-06-multi-threading'
                                                    },
                                                    {
                                                        text: '4.7. The Main Loop',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-07-the-main-loop'
                                                    },
                                                    {
                                                        text: '4.8. Asynchronous Methods',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-08-asynchronous-methods'
                                                    },
                                                    {
                                                        text: '4.9. Weak References',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-09-weak-references'
                                                    },
                                                    {
                                                        text: '4.10. Ownership',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-10-ownership'
                                                    },
                                                    {
                                                        text: '4.11. Variable-Length Argument Lists',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-11-variable-length-argument-lists'
                                                    },
                                                    {
                                                        text: '4.12. Pointers',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-12-pointers'
                                                    },
                                                    {
                                                        text: '4.13. Non-Object Classes',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-13-non-object-classes'
                                                    },
                                                    {
                                                        text: '4.14. D-Bus Integration',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-14-d-bus-integration'
                                                    },
                                                    {
                                                        text: '4.15. Profiles',
                                                        link: '/tutorials/programming-language/main/04-00-advanced-features/04-15-profiles'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '5. Experimental Features',
                                                link: '/tutorials/programming-language/main/05-00-experimental-features',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '5.1. Chained Relational Expressions',
                                                        link: '/tutorials/programming-language/main/05-00-experimental-features/05-01-chained-relational-expressions'
                                                    },
                                                    {
                                                        text: '5.2. Regular Expression Literals',
                                                        link: '/tutorials/programming-language/main/05-00-experimental-features/05-02-regular-expression-literals'
                                                    },
                                                    {
                                                        text: '5.3. Strict Non-Null Mode',
                                                        link: '/tutorials/programming-language/main/05-00-experimental-features/05-03-strict-non-null-mode'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '6. Libraries',
                                                link: '/tutorials/programming-language/main/06-00-libraries',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '6.1. Using Libraries',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-01-using-libraries'
                                                    },
                                                    {
                                                        text: '6.2. Creating a Library',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-02-creating-a-library'
                                                    },
                                                    {
                                                        text: '6.3. Binding Libraries with VAPI Files',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-03-binding-libraries-with-vapi-files'
                                                    },
                                                    {
                                                        text: '6.4. ABI and API Design Choices',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-04-abi-and-api-design-choices'
                                                    },
                                                    {
                                                        text: '6.5. Binding to Vala Libraries from Other Languages',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages'
                                                    },
                                                    {
                                                        text: '6.6. Using Autotools',
                                                        link: '/tutorials/programming-language/main/06-00-libraries/06-06-using-autotools'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '7. Tools',
                                                link: '/tutorials/programming-language/main/07-00-tools',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '7.1. valac',
                                                        link: '/tutorials/programming-language/main/07-00-tools/07-01-valac'
                                                    },
                                                    {
                                                        text: '7.2. valadoc',
                                                        link: '/tutorials/programming-language/main/07-00-tools/07-02-valadoc'
                                                    },
                                                    {
                                                        text: '7.3. vapigen',
                                                        link: '/tutorials/programming-language/main/07-00-tools/07-03-vapigen'
                                                    },
                                                    {
                                                        text: '7.4. vala-gen-introspect',
                                                        link: '/tutorials/programming-language/main/07-00-tools/07-04-vala-gen-introspect'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '8. Techniques',
                                                link: '/tutorials/programming-language/main/08-00-techniques',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '8.1. Debugging',
                                                        link: '/tutorials/programming-language/main/08-00-techniques/08-01-debugging'
                                                    },
                                                    {
                                                        text: '8.2. Using GLib',
                                                        link: '/tutorials/programming-language/main/08-00-techniques/08-02-using-glib'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'Tooling',
                        link: '/tooling',
                        collapsed: true,
                        items: [
                            {
                                text: 'Build Systems',
                                link: '/tooling/build-systems'
                            },
                            {
                                text: 'Code Editors and IDEs',
                                link: '/tooling/code-editors-and-ides'
                            },
                            {
                                text: 'Language Server Protocol Support',
                                link: '/tooling/language-server-protocol-support'
                            },
                            {
                                text: 'Other Tools',
                                link: '/tooling/other-tools'
                            },
                            {
                                text: 'Syntax Support',
                                link: '/tooling/syntax-support'
                            }
                        ]
                    },
                    {
                        text: 'Contributor Guide',
                        link: '/contributor-guide',
                        collapsed: true,
                        items: [
                            {
                                text: 'Compiler Guide',
                                link: '/contributor-guide/compiler-guide',
                                collapsed: true,
                                items: [
                                    {
                                        text: '1. Project Information',
                                        link: '/contributor-guide/compiler-guide/01-00-project-information'
                                    },
                                    {
                                        text: '2. Environment Setup',
                                        link: '/contributor-guide/compiler-guide/02-00-environment-setup'
                                    },
                                    {
                                        text: '3. The Vala Compiler',
                                        link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: '3.1. Vala in a Nutshell',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-01-vala-in-a-nutshell'
                                            },
                                            {
                                                text: '3.2. Parser',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-02-parser'
                                            },
                                            {
                                                text: '3.3. Semantic Analyzer',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-03-semantic-analyzer'
                                            },
                                            {
                                                text: '3.4. Symbol Resolution',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-04-symbol-resolution'
                                            },
                                            {
                                                text: '3.5. Flow Analyzer',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-05-flow-analyzer'
                                            },
                                            {
                                                text: '3.6. C Code Generation',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-06-c-code-generation'
                                            },
                                            {
                                                text: '3.7. C Code Compilation and Linking',
                                                link: '/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-07-c-code-compilation-and-linking'
                                            }
                                        ]
                                    },
                                    {
                                        text: '4. Vala Bindings - VAPI',
                                        link: '/contributor-guide/compiler-guide/04-00-vala-bindings-vapi'
                                    },
                                    {
                                        text: '5. libgee Internal',
                                        link: '/contributor-guide/compiler-guide/05-00-internal-libgee'
                                    },
                                    {
                                        text: '6. Other Tools',
                                        link: '/contributor-guide/compiler-guide/06-00-other-tools'
                                    },
                                    {
                                        text: '7. Testing',
                                        link: '/contributor-guide/compiler-guide/07-00-testing'
                                    },
                                    {
                                        text: '8. Documentation',
                                        link: '/contributor-guide/compiler-guide/08-00-documentation'
                                    },
                                    {
                                        text: '9. Build System',
                                        link: '/contributor-guide/compiler-guide/09-00-build-system'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'Developer Guides',
                        link: '/developer-guides',
                        collapsed: true,
                        items: [
                            {
                                text: 'Bindings',
                                link: '/developer-guides/bindings',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'Generating a VAPI with GObject Introspection',
                                        link: '/developer-guides/bindings/generating-a-vapi-with-gobject-introspection',
                                    },
                                    {
                                        text: 'Why Distribute Bindings Upstream',
                                        link: '/developer-guides/bindings/upstream-guide'
                                    },
                                    {
                                        text: 'Writing a VAPI Manually',
                                        link: '/developer-guides/bindings/writing-a-vapi-manually',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: '1. Prerequisites',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/01-00-prerequisites'
                                            },
                                            {
                                                text: '2. Getting Started',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '2.1. The VAPI File',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-01-the-vapi-file'
                                                    },
                                                    {
                                                        text: '2.2. Attribution and License',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-02-attribution-and-license'
                                                    },
                                                    {
                                                        text: '2.3. The CCode Attribute',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-03-the-ccode-attribute'
                                                    },
                                                    {
                                                        text: '2.4. Create a Root Namespace',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-04-create-a-root-namespace'
                                                    },
                                                    {
                                                        text: '2.5. Include the C Header Files',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-05-include-the-c-header-files'
                                                    },
                                                    {
                                                        text: '2.6. Symbol Name Translations',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-06-symbol-name-translations'
                                                    },
                                                    {
                                                        text: '2.7. Code Formatting Conventions',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-07-code-formatting-conventions'
                                                    },
                                                    {
                                                        text: '2.8. Documentation and Valadoc.org',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-08-documentation-and-valadoc-org'
                                                    },
                                                    {
                                                        text: '2.9. The Version Attribute',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-09-the-version-attribute'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '3. Using Vala\'s Automatic Memory Management',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '3.1. Pointers in C (or what all these *\'s mean)',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-01-pointers-in-c'
                                                    },
                                                    {
                                                        text: '3.2. Constants, the Stack and the Heap in C',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-02-constants-the-stack-and-the-heap-in-c'
                                                    },
                                                    {
                                                        text: '3.3. The Concept of "Ownership" in Vala',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-03-the-concept-of-ownership-in-vala'
                                                    },
                                                    {
                                                        text: '3.4. Binding to C Heap Handlers',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-04-binding-to-c-heap-handnlers'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '4. Recognizing Vala Semantics in C Code',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '4.1. Constants',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-01-constants'
                                                    },
                                                    {
                                                        text: '4.2. Enums and Flags',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-02-enums-and-flags'
                                                    },
                                                    {
                                                        text: '4.3. Simple Type Structs',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-03-simple-type-structs'
                                                    },
                                                    {
                                                        text: '4.4. Structs',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-04-structs'
                                                    },
                                                    {
                                                        text: '4.5. Compact Classes',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-05-compact-classes'
                                                    },
                                                    {
                                                        text: '4.6. Functions',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-06-functions'
                                                    },
                                                    {
                                                        text: '4.7. Delegates',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-07-delegates'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '5. Fundamentals of Binding a C Function',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '5.1. Out and Reference Parameters and Return Values',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-01-out-and-reference-parameters-and-return-values'
                                                    },
                                                    {
                                                        text: '5.2. Ownership',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-02-ownership'
                                                    },
                                                    {
                                                        text: '5.3. Nullability',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-03-nullability'
                                                    },
                                                    {
                                                        text: '5.4. Static Methods',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-04-static-methods'
                                                    },
                                                    {
                                                        text: '5.5. Changing the Position of Generated Arguments',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-05-changing-the-position-of-generated-arguments'
                                                    },
                                                    {
                                                        text: '5.6. Default Values and Changing an Argument\'s Position',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-06-default-values-and-changing-an-argument-s-position'
                                                    },
                                                    {
                                                        text: '5.7. Adapting a Signature with a Vala Wrapper',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-07-adapting-a-signature-with-a-vala-wrapper'
                                                    },
                                                    {
                                                        text: '5.8. Variadic Arguments (a.k.a. "...")',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-08-variadic-arguments'
                                                    },
                                                    {
                                                        text: '5.9. Functions that Do Not Return',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-09-functions-that-do-not-return'
                                                    },
                                                    {
                                                        text: '5.10. Methods that Change the Instance Reference',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-10-methods-that-change-the-instance-reference'
                                                    },
                                                    {
                                                        text: '5.11. Methods that Destroy the Instance Reference',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-11-methods-that-destroy-the-instance-reference'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '6. Adding Vala Friendly Semantics',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '6.1. to_string () Methods',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-01-to-string-methods'
                                                    },
                                                    {
                                                        text: '6.2. Properties',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-02-properties'
                                                    },
                                                    {
                                                        text: '6.3. Collections',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-03-collections'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '7. Binding a C Function\'s Parameter and Return Types',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '7.1. Basic Types',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-01-basic-types'
                                                    },
                                                    {
                                                        text: '7.2. Structs',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-02-structs'
                                                    },
                                                    {
                                                        text: '7.3. Arrays',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-03-arrays'
                                                    },
                                                    {
                                                        text: '7.4. Strings and Buffers',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-04-strings-and-buffers'
                                                    },
                                                    {
                                                        text: '7.5. Function Pointers',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-05-function-pointers'
                                                    },
                                                    {
                                                        text: '7.6. Parameters of Variable Type (Generics)',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-06-parameters-of-variable-type-generics'
                                                    },
                                                    {
                                                        text: '7.7. Pointers',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-07-pointers'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '8. Binding a C Struct\'s Fields',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '8.1. Structs',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-01-structs'
                                                    },
                                                    {
                                                        text: '8.2. Pointers to Structs',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-02-pointers-to-structs'
                                                    },
                                                    {
                                                        text: '8.3. Arrays',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-03-arrays'
                                                    },
                                                    {
                                                        text: '8.4. Function Pointers',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-04-function-pointers'
                                                    },
                                                    {
                                                        text: '8.5. Unions',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-05-unions'
                                                    }
                                                ]
                                            },
                                            {
                                                text: '9. Extra Hints',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/09-00-extra-hints'
                                            },
                                            {
                                                text: '10. Awkward Situations',
                                                link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '10.1. Array Lengths',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-01-array-lengths'
                                                    },
                                                    {
                                                        text: '10.2. Dependently Typed Ownership',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-02-dependently-typed-ownership'
                                                    },
                                                    {
                                                        text: '10.3. Member Length',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-03-member-length'
                                                    },
                                                    {
                                                        text: '10.4. Owned Array of Unowned Objects',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-04-owned-array-of-unowned-objects'
                                                    },
                                                    {
                                                        text: '10.5. Shared Context Delegates',
                                                        link: '/developer-guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-05-shared-context-delgates'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'Design Patterns',
                                link: '/developer-guides/design-patterns',
                                collapsed: true,
                                items: [
                                    {
                                        text: '1. Creational Design Patterns',
                                        link: '/developer-guides/design-patterns/01-00-creational-design-patterns'
                                    },
                                    {
                                        text: '2. Structural Design Patterns',
                                        link: '/developer-guides/design-patterns/02-00-structural-design-patterns'
                                    },
                                    {
                                        text: '3. Behavioral Design Patterns',
                                        link: '/developer-guides/design-patterns/03-00-behavioral-design-patterns'
                                    },
                                    {
                                        text: '4. 🚦 Wrap Up Folks',
                                        link: '/developer-guides/design-patterns/04-00-wrap-up'
                                    }
                                ]
                            },
                            {
                                text: 'Documentation',
                                link: '/developer-guides/documentation',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'Vala for C# Programmers',
                                        link: '/developer-guides/documentation/vala-for-csharp-devs',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: 'Source Files',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/01-sources-files'
                                            },
                                            {
                                                text: 'Compilation',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/02-compilation'
                                            },
                                            {
                                                text: 'Naming Conventions',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/03-naming-conventions'
                                            },
                                            {
                                                text: 'Main Entry Point',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/04-main-entry-point'
                                            },
                                            {
                                                text: 'System Namespace',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/05-system-namespace'
                                            },
                                            {
                                                text: 'Value Types',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/06-value-types'
                                            },
                                            {
                                                text: 'Verbatim String Literals',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/07-verbatim-string-literals'
                                            },
                                            {
                                                text: 'Documentation Comments',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/08-documentation-comments'
                                            },
                                            {
                                                text: 'Object Base Class',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/09-object-base-class'
                                            },
                                            {
                                                text: 'Method Overloading',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/10-method-overloading'
                                            },
                                            {
                                                text: 'Multiple Constructors',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/11-multiple-constructors'
                                            },
                                            {
                                                text: 'Constructor Chaining',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/12-constructor-chaining'
                                            },
                                            {
                                                text: 'Delegates / Lambdas',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/13-delegates-lambdas'
                                            },
                                            {
                                                text: 'Events',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/14-events'
                                            },
                                            {
                                                text: 'Interfaces',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/15-interfaces'
                                            },
                                            {
                                                text: 'Enums',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/16-enums'
                                            },
                                            {
                                                text: 'Struct Initialization',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/17-struct-initialization'
                                            },
                                            {
                                                text: 'Multi-dimensional Arrays',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/18-multi-dimensional-arrays'
                                            },
                                            {
                                                text: 'Nullable Types',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/19-nullable-types'
                                            },
                                            {
                                                text: 'Code Attributes',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/20-code-attributes'
                                            },
                                            {
                                                text: 'Properties',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/21-properties'
                                            },
                                            {
                                                text: 'Exceptions',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/22-exceptions'
                                            },
                                            {
                                                text: 'Argument Checking',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/23-argument-checking'
                                            },
                                            {
                                                text: 'Unsafe Code and Pointers',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/24-unsafe-code-and-pointers'
                                            },
                                            {
                                                text: 'Conditional Compilation Directives',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/25-conditional-compilation-directives'
                                            },
                                            {
                                                text: 'Resource Disposing',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/26-resource-disposing'
                                            },
                                            {
                                                text: 'Memory Management',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/27-memory-management'
                                            },
                                            {
                                                text: 'Asynchronous Calls',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/28-asynchronous-calls'
                                            },
                                            {
                                                text: 'Static Constructors',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/29-static-constructors'
                                            },
                                            {
                                                text: 'External Methods',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/30-external-methods'
                                            },
                                            {
                                                text: 'Reflection',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/31-reflection'
                                            },
                                            {
                                                text: 'Not Available',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/32-not-available'
                                            },
                                            {
                                                text: 'Collections',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/33-collections'
                                            },
                                            {
                                                text: 'Indexers',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/34-indexers'
                                            },
                                            {
                                                text: 'IO, Network Sockets',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/35-io-network-sockets'
                                            },
                                            {
                                                text: 'Console Input / Output',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/36-console-input-output'
                                            },
                                            {
                                                text: 'GTK+ Demo App',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/37-gtk-demo-app'
                                            },
                                            {
                                                text: 'Bindings',
                                                link: '/developer-guides/documentation/vala-for-csharp-devs/38-bindings'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Valadoc Guide',
                                        link: '/developer-guides/documentation/valadoc-guide',
                                        collapsed: true,
                                        items: [
                                            {
                                                text: '1. Quick Start',
                                                link: '/developer-guides/documentation/valadoc-guide/01-00-quick-start'
                                            },
                                            {
                                                text: '2. Command Line Tool',
                                                link: '/developer-guides/documentation/valadoc-guide/02-00-command-line-tool'
                                            },
                                            {
                                                text: '3. Documentation Comment Markup',
                                                link: '/developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup',
                                                collapsed: true,
                                                items: [
                                                    {
                                                        text: '3.1.1. Brief Description',
                                                        link: '/developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-01-brief-description'
                                                    },
                                                    {
                                                        text: '3.1.2. Formatting',
                                                        link: '/developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-02-formatting'
                                                    },
                                                    {
                                                        text: '3.1.3. Taglets',
                                                        link: '/developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-03-taglets'
                                                    },
                                                    {
                                                        text: '3.1.4. Contributing to Valadoc',
                                                        link: '/developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-04-contributing-to-valadoc'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'Vala Collections: libgee',
                                link: '/developer-guides/gee-samples',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'List Sample',
                                        link: '/developer-guides/gee-samples/01-list-sample'
                                    },
                                    {
                                        text: 'Set Sample',
                                        link: '/developer-guides/gee-samples/02-set-sample'
                                    },
                                    {
                                        text: 'Map Example',
                                        link: '/developer-guides/gee-samples/03-map-sample'
                                    },
                                    {
                                        text: 'Syntactic Sugar',
                                        link: '/developer-guides/gee-samples/04-syntactic-sugar'
                                    },
                                    {
                                        text: 'Customizing the equality function',
                                        link: '/developer-guides/gee-samples/05-custom-equality'
                                    }
                                ]
                            },
                            {
                                text: 'Plugins',
                                collapsed: true,
                                link: '/developer-guides/plugins',
                                items: [
                                    {
                                        text: 'Type Modules',
                                        link: '/developer-guides/plugins/01-type-modules'
                                    },
                                    {
                                        text: 'Libpeas',
                                        link: '/developer-guides/plugins/02-libpeas'
                                    }
                                ]
                            },
                            {
                                text: 'String Sample',
                                link: '/developer-guides/string-sample'
                            }
                        ]
                    },
                    {
                        text: 'FAQ',
                        link: '/faq'
                    }
                ]
            }
        ],
    }
}

export const sidebar = {
            '/contributor-guide/': [
                {
                    text: "Contributor Guide",
                    link: "/contributor-guide/",
                    items: [
                        {
                            text: "Compiler Guide",
                            link: "/contributor-guide/compiler-guide",
                            items: [
                                {
                                    text: "1. Project Information",
                                    link: "/contributor-guide/compiler-guide/01-00-project-information",
                                },
                                {
                                    text: "2. Environment Setup",
                                    link: "/contributor-guide/compiler-guide/02-00-environment-setup",
                                },
                                {
                                    text: "3. The Vala Compiler",
                                    link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler",
                                    items: [
                                        {
                                            text: "3.1. Vala in a Nutshell",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-01-vala-in-a-nutshell",
                                        },
                                        {
                                            text: "3.2. Parser",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-02-parser",
                                        },
                                        {
                                            text: "3.3. Symbol Resolution",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-03-symbol-resolution",
                                        },
                                        {
                                            text: "3.4. Semantic Analyzer",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-04-semantic-analyzer",
                                        },
                                        {
                                            text: "3.5. Flow Analyzer",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-05-flow-analyzer",
                                        },
                                        {
                                            text: "3.6. C Code Generation",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-06-c-code-generation",
                                        },
                                        {
                                            text: "3.7. C Code Compilation and Linking",
                                            link: "/contributor-guide/compiler-guide/03-00-the-vala-compiler/03-07-c-code-compilation-and-linking",
                                        },
                                    ],
                                },
                                {
                                    text: "4. Vala Bindings - VAPI",
                                    link: "/contributor-guide/compiler-guide/04-00-vala-bindings-vapi",
                                },
                                {
                                    text: "5. Internal libgee",
                                    link: "/contributor-guide/compiler-guide/05-00-internal-libgee",
                                },
                                {
                                    text: "6. Other Tools",
                                    link: "/contributor-guide/compiler-guide/06-00-other-tools",
                                },
                                {
                                    text: "7. Testing",
                                    link: "/contributor-guide/compiler-guide/07-00-testing",
                                },
                                {
                                    text: "8. Documentation",
                                    link: "/contributor-guide/compiler-guide/08-00-documentation",
                                },
                                {
                                    text: "9. Build System",
                                    link: "/contributor-guide/compiler-guide/09-00-build-system",
                                },
                            ],
                        },
                    ],
                },
            ],
            '/guides/': [
                {
                    text: "Guides",
                    link: "/guides/",
                    items: [
                        {
                            text: "Bindings",
                            link: "/guides/bindings",
                            items: [
                                {
                                    text: "Generating a VAPI with GObject Introspection",
                                    link: "/guides/bindings/generating-a-vapi-with-gobject-introspection",
                                },
                                {
                                    text: "Why Distribute Bindings Upstream",
                                    link: "/guides/bindings/upstream-guide",
                                },
                                {
                                    text: "Writing a VAPI Manually",
                                    link: "/guides/bindings/writing-a-vapi-manually",
                                    items: [
                                        {
                                            text: "1. Prerequisites",
                                            link: "/guides/bindings/writing-a-vapi-manually/01-00-prerequisites",
                                        },
                                        {
                                            text: "2. Getting Started",
                                            link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started",
                                            items: [
                                                {
                                                    text: "2.1. The VAPI File",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-01-the-vapi-file",
                                                },
                                                {
                                                    text: "2.2. Attribution and License",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-02-attribution-and-license",
                                                },
                                                {
                                                    text: "2.3. The CCode Attribute",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-03-the-ccode-attribute",
                                                },
                                                {
                                                    text: "2.4. Create a Root Namespace",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-04-create-a-root-namespace",
                                                },
                                                {
                                                    text: "2.5. Include the C Header Files",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-05-include-the-c-header-files",
                                                },
                                                {
                                                    text: "2.6. Symbol Name Translations",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-06-symbol-name-translations",
                                                },
                                                {
                                                    text: "2.7. Code Formatting Conventions",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-07-code-formatting-conventions",
                                                },
                                                {
                                                    text: "2.8. Documentation and Valadoc.org",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-08-documentation-and-valadoc-org",
                                                },
                                                {
                                                    text: "2.9. The Version Attribute",
                                                    link: "/guides/bindings/writing-a-vapi-manually/02-00-getting-started/02-09-the-version-attribute",
                                                },
                                            ],
                                        },
                                        {
                                            text: "3. Using Vala's Automatic Memory Management",
                                            link: "/guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management",
                                            items: [
                                                {
                                                    text: "3.1. Pointers in C (or what all these *'s mean)",
                                                    link: "/guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-01-pointers-in-c",
                                                },
                                                {
                                                    text: "3.2. Constants, the Stack and the Heap in C",
                                                    link: "/guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-02-constants-the-stack-and-the-heap-in-c",
                                                },
                                                {
                                                    text: '3.3. The Concept of "Ownership" in Vala',
                                                    link: "/guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-03-the-concept-of-ownership-in-vala",
                                                },
                                                {
                                                    text: "3.4. Binding to C Heap Handlers",
                                                    link: "/guides/bindings/writing-a-vapi-manually/03-00-using-auto-memory-management/03-04-binding-to-c-heap-handnlers",
                                                },
                                            ],
                                        },
                                        {
                                            text: "4. Recognizing Vala Semantics in C Code",
                                            link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code",
                                            items: [
                                                {
                                                    text: "4.1. Constants",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-01-constants",
                                                },
                                                {
                                                    text: "4.2. Enums and Flags",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-02-enums-and-flags",
                                                },
                                                {
                                                    text: "4.3. Simple Type Structs",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-03-simple-type-structs",
                                                },
                                                {
                                                    text: "4.4. Structs",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-04-structs",
                                                },
                                                {
                                                    text: "4.5. Compact Classes",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-05-compact-classes",
                                                },
                                                {
                                                    text: "4.6. Functions",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-06-functions",
                                                },
                                                {
                                                    text: "4.7. Delegates",
                                                    link: "/guides/bindings/writing-a-vapi-manually/04-00-recognizing-vala-semantics-in-c-code/04-07-delegates",
                                                },
                                            ],
                                        },
                                        {
                                            text: "5. Fundamentals of Binding a C Function",
                                            link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function",
                                            items: [
                                                {
                                                    text: "5.1. Out and Reference Parameters and Return Values",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-01-out-and-reference-parameters-and-return-values",
                                                },
                                                {
                                                    text: "5.2. Ownership",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-02-ownership",
                                                },
                                                {
                                                    text: "5.3. Nullability",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-03-nullability",
                                                },
                                                {
                                                    text: "5.4. Static Methods",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-04-static-methods",
                                                },
                                                {
                                                    text: "5.5. Changing the Position of Generated Arguments",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-05-changing-the-position-of-generated-arguments",
                                                },
                                                {
                                                    text: "5.6. Default Values and Changing an Argument's Position",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-06-default-values-and-changing-an-argument-s-position",
                                                },
                                                {
                                                    text: "5.7. Adapting a Signature with a Vala Wrapper",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-07-adapting-a-signature-with-a-vala-wrapper",
                                                },
                                                {
                                                    text: '5.8. Variadic Arguments (a.k.a. "...")',
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-08-variadic-arguments",
                                                },
                                                {
                                                    text: "5.9. Functions that Do Not Return",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-09-functions-that-do-not-return",
                                                },
                                                {
                                                    text: "5.10. Methods that Change the Instance Reference",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-10-methods-that-change-the-instance-reference",
                                                },
                                                {
                                                    text: "5.11. Methods that Destroy the Instance Reference",
                                                    link: "/guides/bindings/writing-a-vapi-manually/05-00-fundamentals-of-binding-a-c-function/05-11-methods-that-destroy-the-instance-reference",
                                                },
                                            ],
                                        },
                                        {
                                            text: "6. Adding Vala Friendly Semantics",
                                            link: "/guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics",
                                            items: [
                                                {
                                                    text: "6.1. to_string () Methods",
                                                    link: "/guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-01-to-string-methods",
                                                },
                                                {
                                                    text: "6.2. Properties",
                                                    link: "/guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-02-properties",
                                                },
                                                {
                                                    text: "6.3. Collections",
                                                    link: "/guides/bindings/writing-a-vapi-manually/06-00-adding-vala-friendly-semantics/06-03-collections",
                                                },
                                            ],
                                        },
                                        {
                                            text: "7. Binding a C Function's Parameter and Return Types",
                                            link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types",
                                            items: [
                                                {
                                                    text: "7.1. Basic Types",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-01-basic-types",
                                                },
                                                {
                                                    text: "7.2. Structs",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-02-structs",
                                                },
                                                {
                                                    text: "7.3. Arrays",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-03-arrays",
                                                },
                                                {
                                                    text: "7.4. Strings and Buffers",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-04-strings-and-buffers",
                                                },
                                                {
                                                    text: "7.5. Function Pointers",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-05-function-pointers",
                                                },
                                                {
                                                    text: "7.6. Parameters of Variable Type (Generics)",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-06-parameters-of-variable-type-generics",
                                                },
                                                {
                                                    text: "7.7. Pointers",
                                                    link: "/guides/bindings/writing-a-vapi-manually/07-00-binding-a-c-function-s-parameter-and-return-types/07-07-pointers",
                                                },
                                            ],
                                        },
                                        {
                                            text: "8. Binding a C Struct's Fields",
                                            link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields",
                                            items: [
                                                {
                                                    text: "8.1. Structs",
                                                    link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-01-structs",
                                                },
                                                {
                                                    text: "8.2. Pointers to Structs",
                                                    link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-02-pointers-to-structs",
                                                },
                                                {
                                                    text: "8.3. Arrays",
                                                    link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-03-arrays",
                                                },
                                                {
                                                    text: "8.4. Function Pointers",
                                                    link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-04-function-pointers",
                                                },
                                                {
                                                    text: "8.5. Unions",
                                                    link: "/guides/bindings/writing-a-vapi-manually/08-00-binding-a-c-struct-s-fields/08-05-unions",
                                                },
                                            ],
                                        },
                                        {
                                            text: "9. Extra Hints",
                                            link: "/guides/bindings/writing-a-vapi-manually/09-00-extra-hints",
                                        },
                                        {
                                            text: "10. Awkward Situations",
                                            link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations",
                                            items: [
                                                {
                                                    text: "10.1. Array Lengths",
                                                    link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-01-array-lengths",
                                                },
                                                {
                                                    text: "10.2. Dependently Typed Ownership",
                                                    link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-02-dependently-typed-ownership",
                                                },
                                                {
                                                    text: "10.3. Member Length",
                                                    link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-03-member-length",
                                                },
                                                {
                                                    text: "10.4. Owned Array of Unowned Objects",
                                                    link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-04-owned-array-of-unowned-objects",
                                                },
                                                {
                                                    text: "10.5. Shared Context Delegates",
                                                    link: "/guides/bindings/writing-a-vapi-manually/10-00-awkward-situations/10-05-shared-context-delgates",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "Design Patterns",
                            link: "/guides/design-patterns",
                            items: [
                                {
                                    text: "1. Creational Design Patterns",
                                    link: "/guides/design-patterns/01-00-creational-design-patterns",
                                },
                                {
                                    text: "2. Structural Design Patterns",
                                    link: "/guides/design-patterns/02-00-structural-design-patterns",
                                },
                                {
                                    text: "3. Behavioral Design Patterns",
                                    link: "/guides/design-patterns/03-00-behavioral-design-patterns",
                                },
                                {
                                    text: "4. 🚦 Wrap Up Folks",
                                    link: "/guides/design-patterns/04-00-wrap-up",
                                },
                            ],
                        },
                        {
                            text: "Memory Management",
                            link: "/guides/memory-management",
                        },
                        {
                            text: "Vala on Windows",
                            link: "/guides/vala-on-windows",
                        },
                        {
                            text: "Documentation",
                            link: "/guides/documentation",
                            items: [
                                {
                                    text: "Valadoc Guide",
                                    link: "/guides/documentation/valadoc-guide",
                                    items: [
                                        {
                                            text: "1. Quick Start",
                                            link: "/guides/documentation/valadoc-guide/01-00-quick-start",
                                        },
                                        {
                                            text: "2. Command Line Tool",
                                            link: "/guides/documentation/valadoc-guide/02-00-command-line-tool",
                                        },
                                        {
                                            text: "3. Documentation Comment Markup",
                                            link: "/guides/documentation/valadoc-guide/03-00-documentation-comment-markup",
                                            items: [
                                                {
                                                    text: "3.1.1. Brief Description",
                                                    link: "/guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-01-brief-description",
                                                },
                                                {
                                                    text: "3.1.2. Formatting",
                                                    link: "/guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-02-formatting",
                                                },
                                                {
                                                    text: "3.1.3. Taglets",
                                                    link: "/guides/documentation/valadoc-guide/03-00-documentation-comment-markup/03-03-taglets",
                                                },
                                            ],
                                        },
                                        {
                                            text: "4. Contributing to Valadoc",
                                            link: "/guides/documentation/valadoc-guide/04-00-contributing-to-valadoc",
                                        },
                                    ],
                                },
                                {
                                    text: "Vala for C# Programmers",
                                    link: "/guides/documentation/vala-for-csharp-programmers",
                                    items: [
                                        {
                                            text: "Source Files",
                                            link: "/guides/documentation/vala-for-csharp-programmers/01-sources-files",
                                        },
                                        {
                                            text: "Compilation",
                                            link: "/guides/documentation/vala-for-csharp-programmers/02-compilation",
                                        },
                                        {
                                            text: "Naming Conventions",
                                            link: "/guides/documentation/vala-for-csharp-programmers/03-naming-conventions",
                                        },
                                        {
                                            text: "Main Entry Point",
                                            link: "/guides/documentation/vala-for-csharp-programmers/04-main-entry-point",
                                        },
                                        {
                                            text: "System Namespace",
                                            link: "/guides/documentation/vala-for-csharp-programmers/05-system-namespace",
                                        },
                                        {
                                            text: "Value Types",
                                            link: "/guides/documentation/vala-for-csharp-programmers/06-value-types",
                                        },
                                        {
                                            text: "Verbatim String Literals",
                                            link: "/guides/documentation/vala-for-csharp-programmers/07-verbatim-string-literals",
                                        },
                                        {
                                            text: "Documentation Comments",
                                            link: "/guides/documentation/vala-for-csharp-programmers/08-documentation-comments",
                                        },
                                        {
                                            text: "Object Base Class",
                                            link: "/guides/documentation/vala-for-csharp-programmers/09-object-base-class",
                                        },
                                        {
                                            text: "Method Overloading",
                                            link: "/guides/documentation/vala-for-csharp-programmers/10-method-overloading",
                                        },
                                        {
                                            text: "Multiple Constructors",
                                            link: "/guides/documentation/vala-for-csharp-programmers/11-multiple-constructors",
                                        },
                                        {
                                            text: "Constructor Chaining",
                                            link: "/guides/documentation/vala-for-csharp-programmers/12-constructor-chaining",
                                        },
                                        {
                                            text: "Delegates / Lambdas",
                                            link: "/guides/documentation/vala-for-csharp-programmers/13-delegates-lambdas",
                                        },
                                        {
                                            text: "Events",
                                            link: "/guides/documentation/vala-for-csharp-programmers/14-events",
                                        },
                                        {
                                            text: "Interfaces",
                                            link: "/guides/documentation/vala-for-csharp-programmers/15-interfaces",
                                        },
                                        {
                                            text: "Enums",
                                            link: "/guides/documentation/vala-for-csharp-programmers/16-enums",
                                        },
                                        {
                                            text: "Struct Initialization",
                                            link: "/guides/documentation/vala-for-csharp-programmers/17-struct-initialization",
                                        },
                                        {
                                            text: "Multi-dimensional Arrays",
                                            link: "/guides/documentation/vala-for-csharp-programmers/18-multi-dimensional-arrays",
                                        },
                                        {
                                            text: "Nullable Types",
                                            link: "/guides/documentation/vala-for-csharp-programmers/19-nullable-types",
                                        },
                                        {
                                            text: "Code Attributes",
                                            link: "/guides/documentation/vala-for-csharp-programmers/20-code-attributes",
                                        },
                                        {
                                            text: "Properties",
                                            link: "/guides/documentation/vala-for-csharp-programmers/21-properties",
                                        },
                                        {
                                            text: "Exceptions",
                                            link: "/guides/documentation/vala-for-csharp-programmers/22-exceptions",
                                        },
                                        {
                                            text: "Argument Checking",
                                            link: "/guides/documentation/vala-for-csharp-programmers/23-argument-checking",
                                        },
                                        {
                                            text: "Unsafe Code and Pointers",
                                            link: "/guides/documentation/vala-for-csharp-programmers/24-unsafe-code-and-pointers",
                                        },
                                        {
                                            text: "Conditional Compilation Directives",
                                            link: "/guides/documentation/vala-for-csharp-programmers/25-conditional-compilation-directives",
                                        },
                                        {
                                            text: "Resource Disposing",
                                            link: "/guides/documentation/vala-for-csharp-programmers/26-resource-disposing",
                                        },
                                        {
                                            text: "Memory Management",
                                            link: "/guides/documentation/vala-for-csharp-programmers/27-memory-management",
                                        },
                                        {
                                            text: "Asynchronous Calls",
                                            link: "/guides/documentation/vala-for-csharp-programmers/28-asynchronous-calls",
                                        },
                                        {
                                            text: "Static Constructors",
                                            link: "/guides/documentation/vala-for-csharp-programmers/29-static-constructors",
                                        },
                                        {
                                            text: "External Methods",
                                            link: "/guides/documentation/vala-for-csharp-programmers/30-external-methods",
                                        },
                                        {
                                            text: "Reflection",
                                            link: "/guides/documentation/vala-for-csharp-programmers/31-reflection",
                                        },
                                        {
                                            text: "Not Available",
                                            link: "/guides/documentation/vala-for-csharp-programmers/32-not-available",
                                        },
                                        {
                                            text: "Collections",
                                            link: "/guides/documentation/vala-for-csharp-programmers/33-collections",
                                        },
                                        {
                                            text: "Indexers",
                                            link: "/guides/documentation/vala-for-csharp-programmers/34-indexers",
                                        },
                                        {
                                            text: "IO, Network Sockets",
                                            link: "/guides/documentation/vala-for-csharp-programmers/35-io-network-sockets",
                                        },
                                        {
                                            text: "Console Input / Output",
                                            link: "/guides/documentation/vala-for-csharp-programmers/36-console-input-output",
                                        },
                                        {
                                            text: "GTK+ Demo App",
                                            link: "/guides/documentation/vala-for-csharp-programmers/37-gtk-demo-app",
                                        },
                                        {
                                            text: "Bindings",
                                            link: "/guides/documentation/vala-for-csharp-programmers/38-bindings",
                                        },
                                    ],
                                },
                                {
                                    text: "Vala for Java Programmers",
                                    link: "/guides/documentation/vala-for-java-programmers",
                                    items: [
                                        {
                                            text: "1. Project Setup and Toolchain",
                                            link: "/guides/documentation/vala-for-java-programmers/01-project-setup",
                                            items: [
                                                {
                                                    text: "1.1. Source Files",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/01-source-files",
                                                },
                                                {
                                                    text: "1.2. Compilation",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/02-compilation",
                                                },
                                                {
                                                    text: "1.3. Using Libraries",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/03-using-libraries",
                                                },
                                                {
                                                    text: "1.4. Naming Conventions",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/04-naming-conventions",
                                                },
                                                {
                                                    text: "1.5. Code Organization",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/05-code-organization",
                                                },
                                                {
                                                    text: "1.6. Main Entry Point",
                                                    link: "/guides/documentation/vala-for-java-programmers/01-project-setup/06-main-entry-point",
                                                },
                                            ],
                                        },
                                        {
                                            text: "2. Types and Core Syntax",
                                            link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax",
                                            items: [
                                                {
                                                    text: "2.1. Basic Types",
                                                    link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax/01-basic-types",
                                                },
                                                {
                                                    text: "2.2. Strings",
                                                    link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax/02-strings",
                                                },
                                                {
                                                    text: "2.3. Arrays",
                                                    link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax/03-arrays",
                                                },
                                                {
                                                    text: "2.4. Type Inference",
                                                    link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax/04-type-inference",
                                                },
                                                {
                                                    text: "2.5. Foreach",
                                                    link: "/guides/documentation/vala-for-java-programmers/02-types-and-syntax/05-foreach",
                                                },
                                            ],
                                        },
                                        {
                                            text: "3. Object-Oriented Programming",
                                            link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming",
                                            items: [
                                                {
                                                    text: "3.1. Inheritance",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/01-inheritance",
                                                },
                                                {
                                                    text: "3.2. Object Base Class",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/02-object-base-class",
                                                },
                                                {
                                                    text: "3.3. Method Overloading",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/03-method-overloading",
                                                },
                                                {
                                                    text: "3.4. Multiple Constructors",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/04-multiple-constructors",
                                                },
                                                {
                                                    text: "3.5. Constructor Chaining",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/05-constructor-chaining",
                                                },
                                                {
                                                    text: "3.6. Overriding",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/06-overriding",
                                                },
                                                {
                                                    text: "3.7. Access Modifiers",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/07-access-modifiers",
                                                },
                                                {
                                                    text: "3.8. Interfaces",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/08-interfaces",
                                                },
                                                {
                                                    text: "3.9. Enums",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/09-enums",
                                                },
                                                {
                                                    text: "3.10. Run-Time Type Information",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/10-run-time-type-information",
                                                },
                                                {
                                                    text: "3.11. Object Destruction",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/11-object-destruction",
                                                },
                                                {
                                                    text: "3.12. Annotations",
                                                    link: "/guides/documentation/vala-for-java-programmers/03-object-oriented-programming/12-annotations",
                                                },
                                            ],
                                        },
                                        {
                                            text: "4. Properties, Events, and Delegates",
                                            link: "/guides/documentation/vala-for-java-programmers/04-properties-events-delegates",
                                            items: [
                                                {
                                                    text: "4.1. Properties",
                                                    link: "/guides/documentation/vala-for-java-programmers/04-properties-events-delegates/01-properties",
                                                },
                                                {
                                                    text: "4.2. Delegates and Closures",
                                                    link: "/guides/documentation/vala-for-java-programmers/04-properties-events-delegates/02-delegates-closures",
                                                },
                                                {
                                                    text: "4.3. Notification",
                                                    link: "/guides/documentation/vala-for-java-programmers/04-properties-events-delegates/03-notification",
                                                },
                                                {
                                                    text: "4.4. Property Change Notification",
                                                    link: "/guides/documentation/vala-for-java-programmers/04-properties-events-delegates/04-property-change-notification",
                                                },
                                            ],
                                        },
                                        {
                                            text: "5. Exceptions and API Contracts",
                                            link: "/guides/documentation/vala-for-java-programmers/05-exceptions-and-contracts",
                                            items: [
                                                {
                                                    text: "5.1. Exceptions",
                                                    link: "/guides/documentation/vala-for-java-programmers/05-exceptions-and-contracts/01-exceptions",
                                                },
                                                {
                                                    text: "5.2. Parameter Directions",
                                                    link: "/guides/documentation/vala-for-java-programmers/05-exceptions-and-contracts/02-parameter-directions",
                                                },
                                                {
                                                    text: "5.3. Nullability",
                                                    link: "/guides/documentation/vala-for-java-programmers/05-exceptions-and-contracts/03-nullability",
                                                },
                                                {
                                                    text: "5.4. Argument Checking",
                                                    link: "/guides/documentation/vala-for-java-programmers/05-exceptions-and-contracts/04-argument-checking",
                                                },
                                            ],
                                        },
                                        {
                                            text: "6. Advanced Language and Runtime",
                                            link: "/guides/documentation/vala-for-java-programmers/06-advanced-language",
                                            items: [
                                                {
                                                    text: "6.1. Structs",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/01-structs",
                                                },
                                                {
                                                    text: "6.2. Synchronizing",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/02-synchronizing",
                                                },
                                                {
                                                    text: "6.3. Conditional Compilation",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/03-conditional-compilation",
                                                },
                                                {
                                                    text: "6.4. Memory Management",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/04-memory-management",
                                                },
                                                {
                                                    text: "6.5. Static Initialization",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/05-static-initialization",
                                                },
                                                {
                                                    text: "6.6. Varargs",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/06-varargs",
                                                },
                                                {
                                                    text: "6.7. Native Methods",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/07-native-methods",
                                                },
                                                {
                                                    text: "6.8. Not Available",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/08-not-available",
                                                },
                                                {
                                                    text: "6.9. Features Not Covered in This Tutorial",
                                                    link: "/guides/documentation/vala-for-java-programmers/06-advanced-language/09-features-not-covered",
                                                },
                                            ],
                                        },
                                        {
                                            text: "7. Collections and I/O",
                                            link: "/guides/documentation/vala-for-java-programmers/07-collections-and-io",
                                            items: [
                                                {
                                                    text: "7.1. Collections",
                                                    link: "/guides/documentation/vala-for-java-programmers/07-collections-and-io/01-collections",
                                                },
                                                {
                                                    text: "7.2. IO, Network Sockets",
                                                    link: "/guides/documentation/vala-for-java-programmers/07-collections-and-io/02-io-network-sockets",
                                                },
                                                {
                                                    text: "7.3. Console Input / Output",
                                                    link: "/guides/documentation/vala-for-java-programmers/07-collections-and-io/03-console-input-output",
                                                },
                                            ],
                                        },
                                        {
                                            text: "8. From Swing to GTK+",
                                            link: "/guides/documentation/vala-for-java-programmers/08-swing-to-gtk",
                                            items: [
                                                {
                                                    text: "8.1. From Swing to GTK+",
                                                    link: "/guides/documentation/vala-for-java-programmers/08-swing-to-gtk/01-from-swing-to-gtk",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "Plugins",
                            link: "/guides/plugins",
                            items: [
                                {
                                    text: "Type Modules",
                                    link: "/guides/plugins/01-type-modules",
                                },
                                {
                                    text: "Libpeas",
                                    link: "/guides/plugins/02-libpeas",
                                },
                            ],
                        },
                        {
                            text: "Syntax Guide",
                            link: "/guides/syntax-guide",
                        },
                    ],
                },
            ],
            '/sample-code/': [
                {
                    text: "Sample Code",
                    link: "/sample-code/",
                    items: [
                        {
                            text: "Language Features and Introductory Samples",
                            link: "/sample-code/language-features-and-introductory-samples",
                            items: [
                                {
                                    text: "Basic Samples",
                                    link: "/sample-code/language-features-and-introductory-samples/basic-samples",
                                },
                                {
                                    text: "Intermediate Samples",
                                    link: "/sample-code/language-features-and-introductory-samples/intermediate-samples",
                                },
                                {
                                    text: "String Sample",
                                    link: "/sample-code/string-sample",
                                },
                                {
                                    text: "Character Sample",
                                    link: "/sample-code/language-features-and-introductory-samples/character-sample",
                                },
                                {
                                    text: "Signals and Callbacks",
                                    link: "/sample-code/signals-and-callbacks",
                                },
                                {
                                    text: "Properties Sample",
                                    link: "/sample-code/language-features-and-introductory-samples/properties-sample",
                                },
                                {
                                    text: "Conditional Compilation Sample",
                                    link: "/sample-code/language-features-and-introductory-samples/conditional-compilation-sample",
                                },
                            ],
                        },
                        {
                            text: "Basics: Collections, Files, I/O, Networking, IPC",
                            link: "/sample-code/basics",
                            items: [
                                {
                                    text: "Vala Collections: libgee",
                                    link: "/sample-code/basics/gee-samples",
                                    items: [
                                        {
                                            text: "List Sample",
                                            link: "/sample-code/basics/gee-samples/01-list-sample",
                                        },
                                        {
                                            text: "Set Sample",
                                            link: "/sample-code/basics/gee-samples/02-set-sample",
                                        },
                                        {
                                            text: "Map Example",
                                            link: "/sample-code/basics/gee-samples/03-map-sample",
                                        },
                                        {
                                            text: "Syntactic Sugar",
                                            link: "/sample-code/basics/gee-samples/04-syntactic-sugar",
                                        },
                                        {
                                            text: "Customizing the equality function",
                                            link: "/sample-code/basics/gee-samples/05-custom-equality",
                                        },
                                        {
                                            text: "Iterable Sample",
                                            link: "/sample-code/basics/gee-samples/06-iterable-sample",
                                        },
                                    ],
                                },
                                {
                                    text: "GIO Samples",
                                    link: "/sample-code/basics/gio-samples",
                                },
                                {
                                    text: "GIO Compression Sample",
                                    link: "/sample-code/basics/gio-compression-sample",
                                },
                                {
                                    text: "GIO Settings Sample",
                                    link: "/sample-code/basics/gio-settings-sample",
                                },
                                {
                                    text: "GIO Networking Sample",
                                    link: "/sample-code/basics/gio-networking-sample",
                                },
                                {
                                    text: "Libsoup Samples",
                                    link: "/sample-code/basics/soup-samples",
                                },
                                {
                                    text: "D-Bus Basic (GDBus) Samples",
                                    link: "/sample-code/basics/dbus-basic-samples",
                                },
                                {
                                    text: "D-Bus Client Examples",
                                    link: "/sample-code/basics/dbus-client-samples",
                                },
                                {
                                    text: "Async Method Samples",
                                    link: "/sample-code/basics/async-samples",
                                },
                            ],
                        },
                        {
                            text: "GLib Samples",
                            link: "/sample-code/glib-samples",
                            items: [
                                {
                                    text: "Date and Time Sample",
                                    link: "/sample-code/glib-samples/date-time-sample",
                                },
                                {
                                    text: "IO Channels Sample",
                                    link: "/sample-code/glib-samples/io-channels-sample",
                                },
                                {
                                    text: "GLib Collections Sample",
                                    link: "/sample-code/glib-samples/collections-sample",
                                },
                                {
                                    text: "Markup Parser Sample (Simple XML)",
                                    link: "/sample-code/glib-samples/markup-parser-sample",
                                },
                                {
                                    text: "Plugin Sample (GModule)",
                                    link: "/sample-code/glib-samples/plugin-sample",
                                },
                                {
                                    text: "GValue Sample",
                                    link: "/sample-code/glib-samples/value-sample",
                                },
                                {
                                    text: "TypeModule Sample",
                                    link: "/sample-code/glib-samples/type-module-sample",
                                },
                                {
                                    text: "Testing Samples",
                                    link: "/sample-code/glib-samples/testing-samples",
                                },
                                {
                                    text: "Threading Samples",
                                    link: "/sample-code/glib-samples/threading-samples",
                                },
                            ],
                        },
                        {
                            text: "Database samples",
                            link: "/sample-code/databases/",
                            items: [
                                {
                                    text: "SQLite (sqlite3)",
                                    link: "/sample-code/databases/sqlite-sample",
                                },
                                {
                                    text: "PostgreSQL (libpq)",
                                    link: "/sample-code/databases/postgresql-sample",
                                },
                                {
                                    text: "GNOME Data Access (Libgda)",
                                    link: "/sample-code/databases/gda-sample",
                                },
                            ],
                        },
                        {
                            text: "Multimedia and Graphics Samples",
                            link: "/sample-code/multimedia-and-graphics/",
                            items: [
                                {
                                    text: "GStreamer",
                                    link: "/sample-code/multimedia-and-graphics/gstreamer-sample",
                                },
                                {
                                    text: "Cairo",
                                    link: "/sample-code/multimedia-and-graphics/cairo-sample",
                                },
                                {
                                    text: "Pango and Cairo",
                                    link: "/sample-code/multimedia-and-graphics/pango-cairo-sample",
                                },
                                {
                                    text: "Poppler (PDF)",
                                    link: "/sample-code/multimedia-and-graphics/poppler-sample",
                                },
                                {
                                    text: "SDL",
                                    link: "/sample-code/multimedia-and-graphics/sdl-sample",
                                },
                                {
                                    text: "OpenGL",
                                    link: "/sample-code/multimedia-and-graphics/opengl-samples",
                                },
                                {
                                    text: "PulseAudio",
                                    link: "/sample-code/multimedia-and-graphics/pulseaudio-sample",
                                },
                            ],
                        },
                        {
                            text: "GTK4 Samples",
                            link: "/sample-code/gtk4-samples",
                            items: [
                                {
                                    text: "Minimal App",
                                    link: "/sample-code/gtk4-samples/minimal-app",
                                },
                                {
                                    text: "Basic App",
                                    link: "/sample-code/gtk4-samples/basic-app",
                                },
                                {
                                    text: "Synchronising Widgets",
                                    link: "/sample-code/gtk4-samples/synchronising-widgets",
                                },
                                {
                                    text: "Text File Viewer",
                                    link: "/sample-code/gtk4-samples/text-file-viewer",
                                },
                                {
                                    text: "ListView",
                                    link: "/sample-code/gtk4-samples/list-view",
                                },
                                {
                                    text: "ListView with CheckButtons",
                                    link: "/sample-code/gtk4-samples/list-view-check-buttons",
                                },
                                {
                                    text: "ColumnView",
                                    link: "/sample-code/gtk4-samples/column-view",
                                },
                                {
                                    text: "Clipboard",
                                    link: "/sample-code/gtk4-samples/clipboard",
                                },
                                {
                                    text: "Entry Completion with Two Cells",
                                    link: "/sample-code/gtk4-samples/entry-completion-two-cells",
                                },
                                {
                                    text: "Drag and Drop",
                                    link: "/sample-code/gtk4-samples/drag-and-drop",
                                },
                            ],
                        },
                        {
                            text: "Other samples",
                            link: "/sample-code/other/",
                            items: [
                                {
                                    text: "Curses (ncurses)",
                                    link: "/sample-code/other/curses-sample",
                                },
                                {
                                    text: "GSF (ZIP)",
                                    link: "/sample-code/other/gsf-sample",
                                },
                                {
                                    text: "GSL",
                                    link: "/sample-code/other/gsl-samples",
                                },
                                {
                                    text: "Input",
                                    link: "/sample-code/other/input-samples",
                                },
                                {
                                    text: "Interfaces implemented in C",
                                    link: "/sample-code/other/interfaces-implemented-in-c",
                                },
                                {
                                    text: "Loudmouth (XMPP)",
                                    link: "/sample-code/other/loudmouth-sample",
                                },
                                {
                                    text: "Lua embedding",
                                    link: "/sample-code/other/lua-sample",
                                },
                                {
                                    text: "NTP client (Posix UDP)",
                                    link: "/sample-code/other/ntp-client-sample",
                                },
                                {
                                    text: "Weather HTTP client (GIO)",
                                    link: "/sample-code/other/weather-http-client-sample",
                                },
                                {
                                    text: "TIFF",
                                    link: "/sample-code/other/tiff-sample",
                                },
                                {
                                    text: "USB (libusb)",
                                    link: "/sample-code/other/usb-sample",
                                },
                                {
                                    text: "XML (libxml2)",
                                    link: "/sample-code/other/xml-sample",
                                },
                                {
                                    text: "JSON (json-glib)",
                                    link: "/sample-code/other/json-sample",
                                },
                                {
                                    text: "Shared library and introspection",
                                    link: "/sample-code/other/shared-library-introspection",
                                },
                                {
                                    text: "Windows cross-build",
                                    link: "/sample-code/other/win32-cross-build",
                                },
                                {
                                    text: "GUPnP",
                                    link: "/sample-code/other/gupnp-sample",
                                },
                            ],
                        },
                    ],
                },
            ],
            '/genie/': [
                {
                    text: "Genie",
                    link: "/genie/",
                    items: [
                        {
                            text: "Introduction to Genie",
                            link: "/genie/introduction",
                            items: [
                                {
                                    text: "1. Compiling and C",
                                    link: "/genie/introduction/01-compiling",
                                },
                                {
                                    text: "2. Language basics",
                                    link: "/genie/introduction/02-language-basics",
                                },
                                {
                                    text: "3. Types, functions, and errors",
                                    link: "/genie/introduction/03-types-functions-and-errors",
                                },
                                {
                                    text: "4. Objects",
                                    link: "/genie/introduction/04-objects",
                                },
                                {
                                    text: "5. Collections and C interoperability",
                                    link: "/genie/introduction/05-collections-and-interop",
                                },
                                {
                                    text: "6. Concurrency, IPC, and system interfaces",
                                    link: "/genie/introduction/06-concurrency-and-systems",
                                },
                                {
                                    text: "7. Advanced topics",
                                    link: "/genie/introduction/07-advanced",
                                },
                            ],
                        },
                        {
                            text: "Sample code",
                            link: "/genie/sample-code/",
                            items: [
                                {
                                    text: "Basic samples",
                                    link: "/genie/sample-code/basic-samples",
                                },
                                {
                                    text: "Advanced sample",
                                    link: "/genie/sample-code/advanced-sample",
                                },
                                {
                                    text: "Cairo sample",
                                    link: "/genie/sample-code/cairo-sample",
                                },
                                {
                                    text: "Curses sample",
                                    link: "/genie/sample-code/curses-sample",
                                },
                                {
                                    text: "GIO networking sample",
                                    link: "/genie/sample-code/gio-networking-sample",
                                },
                                {
                                    text: "LibSoup sample",
                                    link: "/genie/sample-code/libsoup-sample",
                                },
                                {
                                    text: "XML sample",
                                    link: "/genie/sample-code/xml-sample",
                                },
                            ],
                        },
                        {
                            text: "Developing Genie",
                            link: "/genie/developing-genie",
                        },
                        {
                            text: "Tutorials, Blogs and Code Examples",
                            link: "/genie/resources",
                        },
                    ],
                },
            ],
            '/': [
                {
                    text: "FAQ",
                    link: "/faq",
                },
            ],
            '/tutorials/': [
                {
                    text: "Tutorials",
                    items: [
                        {
                            text: "Programming Language",
                            items: [
                                {
                                    text: "Main Tutorial",
                                    collapsed: false,
                                    link: "/tutorials/main",
                                    items: [
                                    {
                                        text: "1. First Program",
                                        link: "/tutorials/main/01-00-first-program",
                                    },
                                    {
                                        text: "2. Basics",
                                        link: "/tutorials/main/02-00-basics",
                                        items: [
                                            {
                                                text: "2.1. Source Files and Compilation",
                                                link: "/tutorials/main/02-00-basics/02-01-source-files-and-compilation",
                                            },
                                            {
                                                text: "2.2. Syntax Overview",
                                                link: "/tutorials/main/02-00-basics/02-02-syntax-overview",
                                            },
                                            {
                                                text: "2.3. Comments",
                                                link: "/tutorials/main/02-00-basics/02-03-comments",
                                            },
                                            {
                                                text: "2.4. Data Types",
                                                link: "/tutorials/main/02-00-basics/02-04-data-types",
                                            },
                                            {
                                                text: "2.5. Operators",
                                                link: "/tutorials/main/02-00-basics/02-05-operators",
                                            },
                                            {
                                                text: "2.6. Control Structures",
                                                link: "/tutorials/main/02-00-basics/02-06-control-structures",
                                            },
                                            {
                                                text: "2.7. Language Elements",
                                                link: "/tutorials/main/02-00-basics/02-07-language-elements",
                                            },
                                            {
                                                text: "2.8. Code Attributes",
                                                link: "/tutorials/main/02-00-basics/02-08-code-attributes",
                                            },
                                            {
                                                text: "2.9. Input / Output",
                                                link: "/tutorials/main/02-00-basics/02-09-input-output",
                                            },
                                        ],
                                    },
                                    {
                                        text: "3. Object Oriented Programming",
                                        link: "/tutorials/main/03-00-object-oriented-programming",
                                        items: [
                                            {
                                                text: "3.1. Basics",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-01-basics",
                                            },
                                            {
                                                text: "3.2. Construction",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-02-construction",
                                            },
                                            {
                                                text: "3.3. Destruction",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-03-destruction",
                                            },
                                            {
                                                text: "3.4. Signals",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-04-signals",
                                            },
                                            {
                                                text: "3.5. Properties",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-05-properties",
                                            },
                                            {
                                                text: "3.6. Inheritance",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-06-inheritance",
                                            },
                                            {
                                                text: "3.7. Abstract Classes",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-07-abstract-classes",
                                            },
                                            {
                                                text: "3.8. Interfaces",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-08-interfaces",
                                            },
                                            {
                                                text: "3.9. Polymorphism",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-09-polymorphism",
                                            },
                                            {
                                                text: "3.10. Method Hiding",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-10-method-hiding",
                                            },
                                            {
                                                text: "3.11. Run-Time Type Information",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-11-run-time-type-information",
                                            },
                                            {
                                                text: "3.12. Dynamic Type Casting",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-12-dynamic-type-casting",
                                            },
                                            {
                                                text: "3.13. Generics",
                                                link: "/tutorials/main/03-00-object-oriented-programming/03-13-generics",
                                            },
                                        ],
                                    },
                                    {
                                        text: "4. Advanced Features",
                                        link: "/tutorials/main/04-00-advanced-features",
                                        items: [
                                            {
                                                text: "4.1. Assertions and Contract Programming",
                                                link: "/tutorials/main/04-00-advanced-features/04-01-assertions-and-contract-programming",
                                            },
                                            {
                                                text: "4.2. Error Handling",
                                                link: "/tutorials/main/04-00-advanced-features/04-02-error-handling",
                                            },
                                            {
                                                text: "4.3. Parameter Directions",
                                                link: "/tutorials/main/04-00-advanced-features/04-03-parameter-directions",
                                            },
                                            {
                                                text: "4.4. Collections",
                                                link: "/tutorials/main/04-00-advanced-features/04-04-collections",
                                            },
                                            {
                                                text: "4.5. Methods with Syntax Support",
                                                link: "/tutorials/main/04-00-advanced-features/04-05-methods-with-syntax-support",
                                            },
                                            {
                                                text: "4.6. Multi-Threading",
                                                link: "/tutorials/main/04-00-advanced-features/04-06-multi-threading",
                                            },
                                            {
                                                text: "4.7. The Main Loop",
                                                link: "/tutorials/main/04-00-advanced-features/04-07-the-main-loop",
                                            },
                                            {
                                                text: "4.8. Asynchronous Methods",
                                                link: "/tutorials/main/04-00-advanced-features/04-08-asynchronous-methods",
                                            },
                                            {
                                                text: "4.9. Weak References",
                                                link: "/tutorials/main/04-00-advanced-features/04-09-weak-references",
                                            },
                                            {
                                                text: "4.10. Ownership",
                                                link: "/tutorials/main/04-00-advanced-features/04-10-ownership",
                                            },
                                            {
                                                text: "4.11. Variable-Length Argument Lists",
                                                link: "/tutorials/main/04-00-advanced-features/04-11-variable-length-argument-lists",
                                            },
                                            {
                                                text: "4.12. Pointers",
                                                link: "/tutorials/main/04-00-advanced-features/04-12-pointers",
                                            },
                                            {
                                                text: "4.13. Non-Object Classes",
                                                link: "/tutorials/main/04-00-advanced-features/04-13-non-object-classes",
                                            },
                                            {
                                                text: "4.14. D-Bus Integration",
                                                link: "/tutorials/main/04-00-advanced-features/04-14-d-bus-integration",
                                            },
                                            {
                                                text: "4.15. Profiles",
                                                link: "/tutorials/main/04-00-advanced-features/04-15-profiles",
                                            },
                                        ],
                                    },
                                    {
                                        text: "5. Experimental Features",
                                        link: "/tutorials/main/05-00-experimental-features",
                                        items: [
                                            {
                                                text: "5.1. Chained Relational Expressions",
                                                link: "/tutorials/main/05-00-experimental-features/05-01-chained-relational-expressions",
                                            },
                                            {
                                                text: "5.2. Regular Expression Literals",
                                                link: "/tutorials/main/05-00-experimental-features/05-02-regular-expression-literals",
                                            },
                                            {
                                                text: "5.3. Strict Non-Null Mode",
                                                link: "/tutorials/main/05-00-experimental-features/05-03-strict-non-null-mode",
                                            },
                                            {
                                                text: "5.4. With Statement",
                                                link: "/tutorials/main/05-00-experimental-features/05-04-with-statement",
                                            },
                                        ],
                                    },
                                    {
                                        text: "6. Libraries",
                                        link: "/tutorials/main/06-00-libraries",
                                        items: [
                                            {
                                                text: "6.1. Using Libraries",
                                                link: "/tutorials/main/06-00-libraries/06-01-using-libraries",
                                            },
                                            {
                                                text: "6.2. Creating a Library",
                                                link: "/tutorials/main/06-00-libraries/06-02-creating-a-library",
                                            },
                                            {
                                                text: "6.3. Binding Libraries with VAPI Files",
                                                link: "/tutorials/main/06-00-libraries/06-03-binding-libraries-with-vapi-files",
                                            },
                                            {
                                                text: "6.4. ABI and API Design Choices",
                                                link: "/tutorials/main/06-00-libraries/06-04-abi-and-api-design-choices",
                                            },
                                            {
                                                text: "6.5. Binding to Vala Libraries from Other Languages",
                                                link: "/tutorials/main/06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages",
                                            },
                                            {
                                                text: "6.6. Using Autotools",
                                                link: "/tutorials/main/06-00-libraries/06-06-using-autotools",
                                            },
                                        ],
                                    },
                                    {
                                        text: "7. Tools",
                                        link: "/tutorials/main/07-00-tools",
                                        items: [
                                            {
                                                text: "7.1. valac",
                                                link: "/tutorials/main/07-00-tools/07-01-valac",
                                            },
                                            {
                                                text: "7.2. valadoc",
                                                link: "/tutorials/main/07-00-tools/07-02-valadoc",
                                            },
                                            {
                                                text: "7.3. vapigen",
                                                link: "/tutorials/main/07-00-tools/07-03-vapigen",
                                            },
                                            {
                                                text: "7.4. vala-gen-introspect",
                                                link: "/tutorials/main/07-00-tools/07-04-vala-gen-introspect",
                                            },
                                        ],
                                    },
                                    {
                                        text: "8. Techniques",
                                        link: "/tutorials/main/08-00-techniques",
                                        items: [
                                            {
                                                text: "8.1. Debugging",
                                                link: "/tutorials/main/08-00-techniques/08-01-debugging",
                                            },
                                            {
                                                text: "8.2. Using GLib",
                                                link: "/tutorials/main/08-00-techniques/08-02-using-glib",
                                            },
                                            {
                                                text: "8.3. Unit Testing",
                                                link: "/tutorials/main/08-00-techniques/08-03-unit-testing",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                        },
                        {
                            text: "GUI Programming",
                            items: [
                                {
                                    text: "GNOME Developer Documentation - Tutorials",
                                    link: "https://developer.gnome.org/documentation/tutorials.html",
                                },
                                {
                                    text: "elementary OS - Writing Apps",
                                    link: "https://docs.elementary.io/develop/writing-apps/the-basic-setup",
                                },
                            ],
                        },
                    ],
                },
            ],
            '/tooling/': [
                {
                    text: "Tooling",
                    items: [
                        {
                            text: "Build Systems",
                            link: "/tooling/build-systems",
                        },
                        {
                            text: "Code Editors and IDEs",
                            link: "/tooling/code-editors-and-ides",
                        },
                        {
                            text: "Language Server Protocol Support",
                            link: "/tooling/language-server-protocol-support",
                        },
                        {
                            text: "Other Tools",
                            link: "/tooling/other-tools",
                        },
                        {
                            text: "Syntax Support",
                            link: "/tooling/syntax-support",
                        },
                    ],
                },
            ]
};

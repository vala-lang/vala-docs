# 6. Libraries

At the system level, a Vala library is exactly a C library, and so the
same tools are used. In order to make the process simpler, and so that
the Vala compiler can understand the process there is then an extra
level of Vala specific information.

A "Vala library" is therefore, the system part:

-   A system library (e.g. *libgee.so*)
-   A *pkg-config* entry (e.g. *gee-0.8.pc*)

Both of which are installed in the standard locations. And the Vala
specific files:

-   A VAPI file (e.g. *gee-0.8.vapi*)
-   An optional dependency file (e.g. *gee-0.8.deps*)

These files are explained later in this section. It should be noted that
the library names are the same in the Vala specific files as in the
*pkg-config* files.

#### [6.1. Using Libraries](06-00-libraries/06-01-using-libraries)
#### [6.2. Creating a Library](06-00-libraries/06-02-creating-a-library)
- [6.2.1. Compilation and linking using Command Line](06-00-libraries/06-02-creating-a-library#_6-2-1-compilation-and-linking-using-command-line)

#### [6.3. Binding Libraries with VAPI Files](06-00-libraries/06-03-binding-libraries-with-vapi-files)
#### [6.4. ABI and API Design Choices](06-00-libraries/06-04-abi-and-api-design-choices)
- [6.4.1. ABI](06-00-libraries/06-04-abi-and-api-design-choices#_6-4-1-abi)
- [6.4.2. API Design](06-00-libraries/06-04-abi-and-api-design-choices#_6-4-2-api-design)
- [6.4.3. Further Reading](06-00-libraries/06-04-abi-and-api-design-choices#_6-4-3-further-reading)

#### [6.5. Binding to Vala Libraries from Other Languages](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages)
- [6.5.1. Haskell](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-1-haskell)
- [6.5.2. JavaScript](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-2-javascript)
- [6.5.3. Lua](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-3-lua)
- [6.5.4. Perl](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-4-perl)
- [6.5.5. Python](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-5-python)
- [6.5.6. Rust](06-00-libraries/06-05-binding-to-vala-libraries-from-other-languages#_6-5-6-rust)

#### [6.6. Using Autotools](06-00-libraries/06-06-using-autotools)
- [6.6.1. Example](06-00-libraries/06-06-using-autotools#_6-6-1-example)
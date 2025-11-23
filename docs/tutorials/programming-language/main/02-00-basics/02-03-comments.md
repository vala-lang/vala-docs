# 2.3. Comments

Vala allows comments in code in different ways. 

These are handled in the same way as in most other languages and so need
little explanation.

**Single-line Comments**
```vala
// Continues to the end of the line
```

**Block Comments**
```vala
/* Comment lasts between delimiters */

/* 
 * Comments can span multiple lines
 */
```

**Documentation Comments**
```vala
/** Comment lasts between delimiters */

/** 
 * Comments can span multiple lines
 */
```

Documentation comments are not special to the Vala compiler, but a
documentation generation tool like
[Valadoc](../../../../developer-guides/documentation/valadoc-guide) will recognise them.

More information on documentation comments can be found in the developer guide section titled
[Documentation Comment Markup](../../../../developer-guides/documentation/valadoc-guide/03-00-documentation-comment-markup).

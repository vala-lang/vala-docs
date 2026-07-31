# 4. Recognizing Vala Semantics in C Code

An important difference between C and Vala is that Vala is more
semantically expressive. For instance, in C _char*_ can
mean several things. It could be a string, an array, a pointer to a
single character, an out parameter returning a character, a pointer to a
character that will be modified by the routine. It is also completely
unclear if this pointer can be null. Vala expresses these differences
syntactically, so writing the binding requires understanding the intent
of the original code.

It is easiest to start by looking through the header files and
determining all the important types to be bound. For each one, find any
allocation functions, copy functions and cleanup functions. From these,
the right binding strategy can be inferred.

<ul class="section-toc">
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-01-constants">4.1. Constants</a>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-02-enums-and-flags">4.2. Enums and Flags</a>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-03-simple-type-structs">4.3. Simple Type Structs</a>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-04-structs">4.4. Structs</a>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-05-compact-classes">4.5. Compact Classes</a>
    <ul class="section-toc section-toc-sub">
      <li><a href="04-00-recognizing-vala-semantics-in-c-code/04-05-compact-classes#_4-5-1-singly-owned-classes">4.5.1. Singly-Owned Classes</a></li>
      <li><a href="04-00-recognizing-vala-semantics-in-c-code/04-05-compact-classes#_4-5-2-reference-counted-classes">4.5.2. Reference-Counted Classes</a></li>
    </ul>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-06-functions">4.6. Functions</a>
  </li>
  <li>
    <a href="04-00-recognizing-vala-semantics-in-c-code/04-07-delegates">4.7. Delegates</a>
  </li>
</ul>

# 6. Adding Vala Friendly Semantics

All bound methods should be public unless working around some awkward
situation. The Vala compiler does not respect visibility in VAPI files,
so defining private methods simply prevents them from appearing in
Valadoc, not from being accessible.

Vala has some special method names that allow the method to be used with
Vala syntax. Differences between C and Vala can be captured using the
`CCode` attribute.

<ul class="section-toc">
<li><a href="06-00-adding-vala-friendly-semantics/06-01-to-string-methods">6.1. to_string () Methods</a></li>
<li><a href="06-00-adding-vala-friendly-semantics/06-02-properties">6.2. Properties</a></li>
<li><a href="06-00-adding-vala-friendly-semantics/06-03-collections">6.3. Collections</a></li>
</ul>

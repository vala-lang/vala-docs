Adapting a Signature with a Vala Wrapper
========================================

It is possible to adapt an existing function signature by using a wrapper function written in Vala. This can be used to make the signature more Vala friendly.

This is usually done by making the C binding ``private`` and making the wrapper call the ``private`` method. The wrapper is also written in the VAPI file.

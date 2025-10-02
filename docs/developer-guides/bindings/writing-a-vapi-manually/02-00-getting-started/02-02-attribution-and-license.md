# 2.2. Attribution and License

To distribute the VAPI through one of the main repositories a copyright
notice will be required. It may be easier to deal with this formality at
the start of writing the binding.

The copyright notice should include an attribution and a copy of the
license. The attribution is your name along with your email address.
This identifies you as the author of the VAPI and a point of contact in
the very unlikely event a third party is identified as using the binding
in breach of the license. Free software and open source licenses allow
the VAPI file to be copied as long as the terms of the license are met.
The license should be the same as the library's license. This ensures
compatibility between the binding and the library.

The copyright notice should be between multi-line comments, not
documentation comments:

```vala
/*
 * Copyright (c) 2016 My Name <my_email@my_address.com>
 * 
 * This library is free software...[or whichever license is used by the library]
 *
 */
```

Documentation comments have an additional asterisk at the beginning,
`/**`, and would be picked up by `valadoc`. The use of `valadoc` is
covered later.

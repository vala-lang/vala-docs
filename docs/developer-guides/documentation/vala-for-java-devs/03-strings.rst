Strings
========

+------------------+---------------------------+
| Java             | Vala                      |
+==================+===========================+
| Data type: String| Data type: string (lower  |
|                  | case)                     |
+------------------+---------------------------+
| Equality test:   | Equality test:            |
| str1.equals(str2)| str1 == str2              |
+------------------+---------------------------+

String comparisons compare content, not reference. You can compare strings lexicographically with ``<``, ``>``, ``<=``, ``>=`` etc. Strings can be used with switch.

Vala strings are UTF-8 encoded.

Vala supports verbatim strings: ``"""..."""``

.. code-block:: vala

   string verbatim = """Verbatim strings don't evaluate escape sequences 
   like \n, \t, ... and may span multiple lines. 
   The line breaks are part of the string. 
   You can use quotation marks (") and backslashes (\) 
   inside a verbatim string without escaping them.""";

Vala supports string templates: ``@"..."``. String templates may contain expressions, prefixed by a ``$`` sign.

.. code-block:: vala

   string name = "John";
   stdout.printf (@"Welcome, $name!");
   stdout.printf (@"3 + 2 = $(3 + 2)");
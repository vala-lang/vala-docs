Formatting
==========

Vala's documentation comment formatting syntax is inspired by wiki markup (`wikitext <https://en.wikipedia.org/wiki/Help:Wikitext>`_).

Linebreaks and paragraphs
-------------------------

Example:

.. code-block:: vala

   /**
    * First paragraph,
    * still the first paragraph
    *
    * Second paragraph, first line,<<BR>>
    * second paragraph, second line
    */

Output:

First paragraph, still the first paragraph

Second paragraph, first line,
second paragraph, second line

Text Highlighting
-----------------

Example:

.. code-block:: vala

   /**
    * ''bold'' //italic// __underlined__ ``block quote``,
    * ''//__bold italic underlined__//''
    */

Output:

..
   Workaround for restructredText not supporting comments

.. raw:: html

   <strong>bold</strong>
   <em>italic</em>
   <span class="underline">underlined</span>
   <code class="docutils literal notranslate">
     <span class="pre">block</span>
     <span class="pre">quote</span>
   </code>
   <span>,</span>

   <strong>
     <em>
       <span class="underline">bold italic underlined</span>
     </em>
   </strong>



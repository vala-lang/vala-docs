Formatting
==========

Vala's documentation comment formatting syntax is inspired by wiki markup (`wikitext <https://en.wikipedia.org/wiki/Help:Wikitext>`_).

.. note::
   
   This website's own styling may affect some of the outputs.

   In reality the outputs may look slightly different. This page gives
   you an idea of the expected output.

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

Lists
-----

Two spaces are required after new lines

Example:

.. code-block:: vala

   /**
    * short description
    *
    *  1. numbered list
    *  1. numbered list
    *  1. numbered list
    *
    *  # numbered list
    *  # numbered list
    *  # numbered list
    *
    *  i. numbered list
    *  i. numbered list
    *  i. numbered list
    *
    *  I. numbered list
    *  I. numbered list
    *  I. numbered list
    *
    *  a. alphabetical list
    *  a. alphabetical list
    *  a. alphabetical list
    *
    *  A. alphabetical list
    *  A. alphabetical list
    *  A. alphabetical list
    *
    *  * dotted list
    *  * dotted list
    *  * dotted list
    *
    *  A. alphabetical list
    *    a. alphabetical list
    *    a. alphabetical list
    *  A. alphabetical list
    *    a. alphabetical list
    *    a. alphabetical list
    *  A. alphabetical list
    */

Output:

short description

1. numbered list
2. numbered list
3. numbered list

1. numbered list
2. numbered list
3. numbered list

i. numbered list
ii. numbered list
iii. numbered list

I. numbered list
II. numbered list
III. numbered list

a. numbered list
b. numbered list
c. numbered list

A. alphabetical list
B. alphabetical list
C. alphabetical list

* dotted list
* dotted list
* dotted list

A. alphabetical list

   a. alphabetical list
   b. alphabetical list

B. alphabetical list

   a. alphabetical list
   b. alphabetical list

C. alphabetical list


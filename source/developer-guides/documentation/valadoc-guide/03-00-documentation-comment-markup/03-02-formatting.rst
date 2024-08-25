Formatting
==========

Vala's documentation comment formatting syntax is inspired by wiki markup (`wikitext <https://en.wikipedia.org/wiki/Help:Wikitext>`_).

.. note::
   
   This website's own styling may affect some of the outputs.

   In reality the outputs may look slightly different. This page gives
   you an idea of the expected output.

Linebreaks and Paragraphs
-------------------------

Comment
~~~~~~~

.. code-block:: vala

   /**
    * First paragraph,
    * still the first paragraph
    *
    * Second paragraph, first line,<<BR>>
    * second paragraph, second line
    */

Output
~~~~~~

First paragraph, still the first paragraph

Second paragraph, first line,
second paragraph, second line

Text Highlighting
-----------------

Comment
~~~~~~~

.. code-block:: vala

   /**
    * ''bold'' //italic// __underlined__ ``block quote``,
    * ''//__bold italic underlined__//''
    */

Output
~~~~~~

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
~~~~~

Two spaces are required after new lines

Comment
~~~~~~~

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

Output
~~~~~~

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

Code Blocks
-----------

Comment
~~~~~~~

.. code-block:: vala

   /**
   * Short description
   *
   * {{{
   *   static int main (string[] arg) {
   *      return 0;
   *   }
   * }}}
   *
   */

Output
~~~~~~

Short description

.. code-block:: vala
   
   static int main (string[] arg) {
       return 0;
   }
   
Images and Links
----------------

Comment
~~~~~~~

.. note::

   Only local images can be used

.. code-block:: vala

   /**
    * [[https://vala.dev|Vala]] [[https://vala.dev]]
    *
    * {{/assets/logo.png}} {{/assets/logo.png|alt-message}}
    */

Output
~~~~~~

`Vala <https://vala.dev>`_ `<https://vala.dev>`_

.. image:: assets/logo.png 

.. image:: assets/logo.png
   :alt: alt-message

Tables
------

Comment
~~~~~~~

.. code-block:: vala

   /**
    * Short description
    *
    * || ''headline'' || ''headline'' ||
    * || one cell || one cell ||
    * || one cell || one cell ||
    *
    */

Output
~~~~~~

============ ============ 
**headline** **headline** 
============ ============
one cell     one cell
one cell     one cell
============ ============

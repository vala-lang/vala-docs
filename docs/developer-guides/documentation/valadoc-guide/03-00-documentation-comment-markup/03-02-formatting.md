# 3.1.2. Formatting

Vala's documentation comment formatting syntax is inspired by wiki
markup ([wikitext](https://en.wikipedia.org/wiki/Help:Wikitext)).

::: info Note

This website's own styling may affect some of the outputs.

In reality the outputs may look slightly different. This page gives you
an idea of the expected output.
:::

## 3.1.2.1. Linebreaks and Paragraphs

### 3.1.2.1.1. Comment

```vala
/**
 * First paragraph,
 * still the first paragraph
 *
 * Second paragraph, first line,<<BR>>
 * second paragraph, second line
 */
```

### 3.1.2.1.2. Output

First paragraph, still the first paragraph

Second paragraph, first line, second paragraph, second line

## 3.1.2.2. Text Highlighting

### 3.1.2.2.1. Comment

```vala
/**
 * ''bold'' //italic// __underlined__ ``block quote``,
 * ''//__bold italic underlined__//''
 */
```

### 3.1.2.2.2. Output

::: raw
<strong>bold</strong>&nbsp;
<em>italic</em>&nbsp;
<u>underlined</u>&nbsp;
<code>
  <span class="pre">block</span>
  <span class="pre">quote</span>
</code>
<span>,</span>&nbsp;
<strong>
  <em>
    <u>bold italic underlined</u>
  </em>
</strong>
:::

## 3.1.2.3. Lists

Two spaces are required after new lines

### 3.1.2.3.1. Comment

```vala
/**
 * Short description
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
```

### 3.1.2.3.2. Output

Short description

1.  numbered list
2.  numbered list
3.  numbered list
<!-- -->
1. numbered list
2. numbered list
3. numbered list

i.  numbered list  
ii. numbered list  
iii. numbered list  

I. numbered list  
II. numbered list  
III. numbered list

a.  numbered list  
b.  numbered list  
c.  numbered list  

A.  alphabetical list  
B.  alphabetical list  
C.  alphabetical list  

-   dotted list
-   dotted list
-   dotted list

A.  alphabetical list   
&emsp;a.  alphabetical list  
&emsp;b.  alphabetical list  
B.  alphabetical list  
&emsp;a.  alphabetical list  
&emsp;b.  alphabetical list  
C.  alphabetical list  

## 3.1.2.4. Code Blocks

### 3.1.2.4.1. Comment

```vala
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
```

### 3.1.2.4.2. Output

Short description

```vala
static int main (string[] arg) {
    return 0;
}
```

## 3.1.2.5. Images and Links

### 3.1.2.5.1. Comment

::: info Note

Only local images can be used
:::

```vala
/**
 * [[https://vala.dev|Vala]] [[https://vala.dev]]
 *
 * {{/assets/logo.png}} {{/assets/logo.png|alt-message}}
 */
```

### 3.1.2.5.2. Output

[Vala](https://vala.dev) [https://vala.dev](https://vala.dev)

![image](assets/logo.png)
![alt-message](assets/logo.png)

## 3.1.2.6. Tables

### 3.1.2.6.1. Comment

```vala
/**
 * Short description
 *
 * || ''headline'' || ''headline'' ||
 * || one cell || one cell ||
 * || one cell || one cell ||
 *
 */
```

### 3.1.2.6.2. Output

Short description

| **headline** | **headline** |
|--------------|--------------|
| one cell     | one cell     |
| one cell     | one cell     |

## 3.1.2.7. Headers

### 3.1.2.7.1. Comment

```vala
/**
 * Short description
 *
 * = header 1 =
 * == header 2 ==
 * === header 3 ===
 * ==== header 4 ====
 */
```

### 3.1.2.7.2. Output

::: raw
<h1>header 1</h1>
<h2>header 2</h2>
<h3>header 3</h3>
<h4>header 4</h4>
:::

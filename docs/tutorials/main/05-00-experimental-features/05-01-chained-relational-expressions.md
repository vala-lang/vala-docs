# 5.1. Chained Relational Expressions

::: danger Danger

Experimental Feature
:::

This feature allows you to write complex relational expressions like

```vala
if (1 < a && a < 5) {}

if (0 < a && a < b && b < c && c < d && d < 255) {
    // do something
}
```

in a more natural way:

```vala
if (1 < a < 5) {}

if (0 < a < b < c < d < 255) {
    // do something
}
```

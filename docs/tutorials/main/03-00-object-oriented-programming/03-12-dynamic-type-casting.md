# 3.12. Dynamic Type Casting

For the dynamic cast, a variable is cast by a postfix expression
`as DesiredTypeName`. Vala will include a runtime type checking to
ensure this casting is reasonable - if it is an illegal casting, `null`
will be returned. However, this requires both the source type and the
target type to be referenced class types.

For example,

```vala
Button b = widget as Button;
```

If for some reason the class of the `widget` instance is not the Button
class or one of its subclasses or does not implement the Button
interface, `b` will be `null`. This cast is equivalent to:

```vala
Button b = (widget is Button) ? (Button) widget : null;
```

# 3.9. Enums

Java: enums are class based

Vala: enums are integer based. Methods allowed, however no constructors, fields, etc.

```vala
enum Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER;

    public bool is_hot () {
        return this == SUMMER;
    }
}
```

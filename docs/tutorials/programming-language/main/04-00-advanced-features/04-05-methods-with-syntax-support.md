# 4.5. Methods With Syntax Support

Vala recognizes some methods with certain names and signatures and
provides syntax support for them. For example, if a type has a
*contains()* method objects of this type can be used with the `in`
operator. The following table lists these special methods. *T* and *Tn*
are only type placeholders in this table and meant to be replaced with
real types.

#### Indexers
| Method                        | Description                           |
|-------------------------------|---------------------------------------|
| `T2 get(T1 index)`            | Index access: `obj[index]`            |
| `void set(T1 index, T2 item)` | Index assignment: `obj[index] = item` |

#### Indexers with multiple indices
| Method                                    | Description                                    |
|-------------------------------------------|------------------------------------------------|
| `T3 get(T1 index1, T2 index2)`            | Index access: `obj[index1, index2]`            |
| `void set(T1 index1, T2 index2, T3 item)` | Index assignment: `obj[index1, index2] = item` |

#### Others
| Method                                      | Description                                |
|---------------------------------------------|--------------------------------------------|
| `T slice(long start, long end)`             | Slicing: `obj[start:end]`                  |
| `bool contains(T needle)`                   | `in` operator: `bool b = needle in obj`    |
| `string to_string()`                        | Support within string templates: `@"$obj"` |
| `Iterator iterator()`                       | Iterable via `foreach`                     |
| `T2 get(T1 index)` <br/> `T1 size { get; }` | Iterable via `foreach`                     |

The *Iterator* type can have any name and must implement one of these
two protocols:

| Method                  | Description                                                                                                                                                                         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bool next()` `T get()` | Standard iterator protocol iterating until _next()_ returns `false`. The current element retrieved via _.get()_.                                                                    |
| `T? next_value()`       | Alternative iterator protocol: If the iterator object has a _.next_value()_ function that returns a nullable type then we iterate by calling this function until it returns `null`. |

This example implements some of these methods:

```vala
public class EvenNumbers {
    public int get(int index) {
        return index * 2;
    }

    public bool contains(int i) {
        return i % 2 == 0;
    }

    public string to_string() {
        return "[This object enumerates even numbers]";
    }

    public Iterator iterator() {
        return new Iterator(this);
    }

    public class Iterator {
        private int index;
        private EvenNumbers even;

        public Iterator(EvenNumbers even) {
            this.even = even;
        }

        public bool next() {
            return true;
        }

        public int get() {
            this.index++;
            return this.even[this.index - 1];
        }
    }
}

void main() {
    var even = new EvenNumbers();
    stdout.printf("%d\n", even[5]);   // get()
    if (4 in even) {                  // contains()
        stdout.printf(@"$even\n");    // to_string()
    }
    foreach (int i in even) {         // iterator()
        stdout.printf("%d\n", i);
        if (i == 20) break;
    }
}
```

# Indexers

C#: usage of `this` keyword to define indexers

```csharp
class SampleCollection<T>
{
    private T[] arr = new T[100];

    public T this[int i]
    {
        get { return arr[i]; }
        set { arr[i] = value; }
    }
}

class IndexerDemo
{
    static void Main(string[] args)
    {
        var stringCollection = new SampleCollection<string>();

        stringCollection[0] = "Hello, World";
        System.Console.WriteLine(stringCollection[0]);
    }
}
```

Vala: implement `T get(int i)` and `void set(int i, T item)` methods

```vala
class SampleCollection<T> {

    private T[] arr = new T[100];

    public T get (int i) {
        return arr[i];
    }

    public void set (int i, T item) {
        arr[i] = item;
    }
}

void main (string[] args) {
    var string_collection = new SampleCollection<string> ();

    string_collection[0] = "Hello, World";
    stdout.printf ("%s\n", string_collection[0]);
}
```

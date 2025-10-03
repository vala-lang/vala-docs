# Asynchronous Calls

C#

```csharp
using System;

class AsyncDemo
{
    delegate int BinaryOperator(int a, int b);

    static int Adder(int a, int b)
    {
        return a + b;
    }

    static void Callback(IAsyncResult r)
    {
        BinaryOperator adder = (BinaryOperator) r.AsyncState;

        Console.WriteLine("Addition completed");
        Console.WriteLine("Result was: {0}", adder.EndInvoke(r));
    }

    static void Main()
    {
        BinaryOperator adder = Adder;

        adder.BeginInvoke(4, 5, Callback, adder);

        /* wait */
        Console.ReadLine();
    }
}
```

Vala: built-in support for asynchronous methods (`async`, `yield`), must
be compiled with `--pkg gio-2.0`

```vala
class AsyncDemo {

    static async int adder (int a, int b) {
        return a + b;
    }

    static async void start () {
        int sum = yield adder (4, 5);
        stdout.printf ("Addition completed\n");
        stdout.printf ("Result was: %d\n", sum);
    }

    static void main () {
        start ();

        /* wait */
        var loop = new MainLoop (null, false);
        loop.run ();
    }
}
```

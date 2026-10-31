# Syntax Guide

Original Source: [Vala Syntax Guide](https://wiki.gnome.org/Projects/Vala/Syntax)

The syntax of Vala is similar to C#, modified to better fit the GObject type system. Vala supports modern language features as the following:

- OOP (classes, abstract classes, mixin interfaces, type polymorphism)
- Namespaces
- Delegates
- Properties
- Signals
- Property change notifications
- Foreach
- Lambda expressions / Closures
- Type inference for local variables
- Generics
- Non-null types
- Assisted memory management (automatic reference counting)
- Deterministic destructors (suitable for RAII)
- Exception handling (checked exceptions)
- Asynchronous methods (coroutines)
- Preconditions and postconditions (contract programming)
- Run-time type information
- Named constructors
- Verbatim strings and string templates
- Array and string slicing
- Conditional compilation
- Dynamic and static D-Bus support
- C# like syntax
- C ABI compatibility
- Experimental:
  - Chained relational expressions
  - Regular expression literals
  - Main blocks

## Contents

- [Basics](#basics)
- [Variables and Types](#variables-and-types)
- [Strings](#strings)
- [Control Flow](#control-flow)
- [Arrays and Collections](#arrays-and-collections)
- [Methods](#methods)
- [Delegates and Lambdas](#delegates-and-lambdas)
- [Classes and Objects](#classes-and-objects)
- [Interfaces](#interfaces)
- [Structs and Enums](#structs-and-enums)
- [Properties](#properties)
- [Signals](#signals)
- [Generics](#generics)
- [Error Handling](#error-handling)
- [Asynchronous Methods](#asynchronous-methods)
- [Contracts](#contracts)
- [Memory Management](#memory-management)
- [Namespaces](#namespaces)
- [Conditional Compilation](#conditional-compilation)
- [Access and Class Modifiers](#access-and-class-modifiers)
- [Threads and Locking](#threads-and-locking)
- [Operators in Action](#operators-in-action)
- [Pointers](#pointers)
- [Other Keywords](#other-keywords)
- [Keywords](#keywords)
- [Operators](#operators)

## Basics

```vala
// Single-line comment

/* Multi-line
   comment */

/**
 * Documentation comment (picked up by Valadoc)
 */

// Statements end with a semicolon and blocks use curly braces
void main () {
    print ("Hello, World!\n");
}
```

The entry point can also return an exit code and receive command line arguments:

```vala
int main (string[] args) {
    stdout.printf ("Got %d argument(s)\n", args.length);
    return 0;
}
```

## Variables and Types

```vala
void main () {
    // Explicit types
    int number = 42;
    double pi = 3.14159;
    bool is_ready = true;
    bool is_finished = false;
    char letter = 'a';
    unichar emoji = '😀';
    string text = "Hello";

    // Sized integer types
    int8 small = 127;
    uint16 unsigned_short = 65535;
    int64 big = 9223372036854775807;
    size_t length = 10;

    // Type inference for local variables
    var inferred_int = 10;
    var inferred_string = "Vala";

    // Constants
    const int MAX_ITEMS = 100;

    // Nullable types are marked with "?"
    string? maybe_text = null;

    // Casting
    double d = 3.7;
    int truncated = (int) d;

    // Type checking and dynamic casting
    Object obj = new Object ();
    if (obj is Object) {
        var same = (Object) obj;
    }
    var maybe_object = obj as Object;
}
```

## Strings

```vala
void main () {
    string name = "Vala";

    // Concatenation
    string greeting = "Hello, " + name + "!";

    // String templates
    string message = @"Hello, $name! 1 + 1 = $(1 + 1)";

    // Verbatim strings (no escape sequences are processed)
    string path = """C:\Users\vala
    This string spans multiple lines.""";

    // Slicing
    string slice = "Hello, World"[0:5]; // "Hello"

    // Comparison uses == for string contents
    bool same = (name == "Vala");

    // Format strings
    string formatted = "%s has %d letters".printf (name, name.length);

    // Common methods
    string upper = name.up ();
    bool starts = name.has_prefix ("Va");
}
```

## Control Flow

```vala
void main () {
    // if / else
    int x = 5;
    if (x > 10) {
        print ("big\n");
    } else if (x > 3) {
        print ("medium\n");
    } else {
        print ("small\n");
    }

    // switch
    switch (x) {
        case 1:
            print ("one\n");
            break;
        case 2:
        case 3:
            print ("two or three\n");
            break;
        default:
            print ("something else\n");
            break;
    }

    // Conditional (ternary) operator
    string size = x > 3 ? "large" : "small";

    // Null-coalescing operator
    string? input = null;
    string value = input ?? "default";

    // while and do-while
    int i = 0;
    while (i < 3) {
        i++;
    }

    do {
        i--;
    } while (i > 0);

    // for
    for (int j = 0; j < 3; j++) {
        print ("j = %d\n", j);
    }

    // foreach
    int[] numbers = { 1, 2, 3 };
    foreach (int n in numbers) {
        print ("%d\n", n);
    }

    // break and continue
    for (int k = 0; k < 10; k++) {
        if (k == 2) continue;
        if (k == 5) break;
    }
}
```

## Arrays and Collections

```vala
void main () {
    // Fixed-size and dynamic arrays
    int[] numbers = { 1, 2, 3, 4, 5 };
    int[] zeros = new int[10];
    print ("Length: %d\n", numbers.length);

    // Array slicing
    int[] first_three = numbers[0:3];

    // Multi-dimensional arrays
    int[,] grid = new int[3, 3];
    grid[1, 1] = 5;

    // Appending to arrays
    numbers += 6;

    // Lists and maps from GLib
    var list = new GLib.List<string> ();
    list.append ("a");
    list.append ("b");

    var map = new HashTable<string, int> (str_hash, str_equal);
    map["one"] = 1;
    map.insert ("two", 2);

    foreach (var item in list) {
        print ("%s\n", item);
    }
}
```

## Methods

```vala
// Basic method
int add (int a, int b) {
    return a + b;
}

// Default argument values
void greet (string name = "World") {
    print ("Hello, %s!\n", name);
}

// out and ref parameters
void divide (int a, int b, out int quotient, out int remainder) {
    quotient = a / b;
    remainder = a % b;
}

void increment (ref int value) {
    value++;
}

// Variable number of values with params
int sum (params int[] values) {
    int total = 0;
    foreach (int v in values) {
        total += v;
    }
    return total;
}

void example () {
    int q, r;
    divide (7, 2, out q, out r);
    greet ();
}
```

## Delegates and Lambdas

```vala
delegate int BinaryOperation (int a, int b);

int apply (BinaryOperation op, int a, int b) {
    return op (a, b);
}

void main () {
    // Lambda expressions
    BinaryOperation multiply = (a, b) => a * b;
    print ("%d\n", apply (multiply, 3, 4));

    // Closures capture variables from the enclosing scope
    int offset = 10;
    BinaryOperation add_offset = (a, b) => a + b + offset;
    print ("%d\n", apply (add_offset, 1, 2));
}
```

## Classes and Objects

```vala
public abstract class Animal : Object {
    public string name { get; construct set; }

    protected Animal (string name) {
        Object (name: name);
    }

    // Abstract methods must be overridden
    public abstract string sound ();

    // Virtual methods can be overridden
    public virtual void speak () {
        print ("%s says %s\n", name, sound ());
    }
}

public class Dog : Animal {
    private int tricks_learned = 0;

    // Constructor
    public Dog (string name) {
        base (name);
    }

    // Named constructor
    public Dog.puppy (string name) {
        this (name);
        tricks_learned = 0;
    }

    public override string sound () {
        return "Woof";
    }

    public override void speak () {
        base.speak ();
        print ("*wags tail*\n");
    }

    // Destructor
    ~Dog () {
        print ("%s is gone\n", name);
    }

    // Static members
    public static int count_legs () {
        return 4;
    }
}

void main () {
    var dog = new Dog ("Rex");
    dog.speak ();

    Animal animal = dog;
    if (animal is Dog) {
        print ("It's a dog!\n");
    }
}
```

## Interfaces

```vala
interface Swimmer : Object {
    // Interfaces can have abstract and default implementations
    public abstract int speed { get; set; }

    public virtual void swim () {
        print ("Swimming at speed %d\n", speed);
    }
}

class Duck : Object, Swimmer {
    public int speed { get; set; default = 3; }
}
```

## Structs and Enums

```vala
// Structs are value types
struct Point {
    public double x;
    public double y;

    public Point (double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double distance_to_origin () {
        return Math.sqrt (x * x + y * y);
    }
}

// Enums
enum Color {
    RED,
    GREEN,
    BLUE;

    public string to_label () {
        switch (this) {
            case RED: return "red";
            case GREEN: return "green";
            default: return "blue";
        }
    }
}

// Flags enums use [Flags]
[Flags]
enum Permissions {
    READ = 1,
    WRITE = 2,
    EXECUTE = 4
}

void main () {
    var p = Point (3, 4);
    print ("%f\n", p.distance_to_origin ());

    Permissions perms = Permissions.READ | Permissions.WRITE;
    if (Permissions.READ in perms) {
        print ("Can read\n");
    }
}
```

## Properties

```vala
public class Person : Object {
    // Automatically implemented property
    public string name { get; set; }

    // Read-only from outside
    public int age { get; private set; default = 0; }

    // Custom accessors with a backing field
    private int _score;
    public int score {
        get { return _score; }
        set {
            if (value >= 0) {
                _score = value;
            }
        }
    }

    // Computed property
    public string label {
        owned get { return "%s (%d)".printf (name, age); }
    }
}

void main () {
    var person = new Person ();
    person.name = "Ada";
    person.notify["name"].connect ((s, p) => {
        print ("name changed\n");
    });
}
```

## Signals

```vala
public class Button : Object {
    // Declare a signal
    public signal void clicked (int times);

    public void press () {
        clicked (1);
    }
}

void main () {
    var button = new Button ();

    // Connect a handler
    button.clicked.connect ((times) => {
        print ("Clicked %d time(s)\n", times);
    });

    button.press ();
}
```

## Generics

```vala
public class Box<T> {
    private T item;

    public Box (T item) {
        this.item = item;
    }

    public T get_item () {
        return item;
    }
}

T first<T> (T[] items) {
    return items[0];
}

void main () {
    var box = new Box<string> ("Hello");
    print ("%s\n", box.get_item ());
}
```

## Error Handling

```vala
// Declare an error domain
errordomain MathError {
    DIVISION_BY_ZERO,
    NEGATIVE_INPUT
}

// Methods that can fail declare "throws"
double safe_divide (double a, double b) throws MathError {
    if (b == 0) {
        throw new MathError.DIVISION_BY_ZERO ("Cannot divide %f by zero", a);
    }
    return a / b;
}

void main () {
    try {
        print ("%f\n", safe_divide (1, 0));
    } catch (MathError e) {
        print ("Error: %s\n", e.message);
    } finally {
        print ("Done\n");
    }
}
```

## Asynchronous Methods

```vala
async string fetch_greeting (string name) {
    // Yield control back to the main loop and resume later
    Idle.add (fetch_greeting.callback);
    yield;

    return "Hello, " + name;
}

void main () {
    var loop = new MainLoop ();

    fetch_greeting.begin ("Vala", (obj, res) => {
        print ("%s\n", fetch_greeting.end (res));
        loop.quit ();
    });

    loop.run ();
}
```

## Contracts

```vala
int divide (int a, int b)
    requires (b != 0)
    ensures (result * b <= a) {
    return a / b;
}
```

## Memory Management

```vala
class Node : Object {
    public Node? next;

    // Weak references don't increase the reference count,
    // which avoids reference cycles
    public weak Node? parent;
}

// Ownership transfer
string take_ownership (owned string text) {
    return text;
}

// Unowned references
unowned string borrow (string text) {
    return text;
}

void main () {
    var a = new Node ();
    var b = a; // Reference count is now 2
    b = null;  // Reference count is now 1
}
```

## Namespaces

```vala
// using imports the members of a namespace
using GLib;

namespace MyApp {
    namespace Utils {
        public int double_it (int n) {
            return n * 2;
        }
    }

    public class Greeter : Object {
        public void greet () {
            print ("Hi\n");
        }
    }
}

void main () {
    new MyApp.Greeter ().greet ();
    print ("%d\n", MyApp.Utils.double_it (4));

    // Global namespace qualifier
    var obj = new global::GLib.Object ();
}
```

Use `using` to import a namespace's members, for example `using GLib;`, so they can be used without qualification. Note that [vala-lint](https://github.com/vala-lang/vala-lint) discourages this in favour of explicit namespaces, so it's used only once above to show the keyword.

## Conditional Compilation

```vala
void main () {
#if LINUX
    print ("Running on Linux\n");
#elif WINDOWS
    print ("Running on Windows\n");
#else
    print ("Running somewhere else\n");
#endif
}
```

Symbols are defined at compile time with `valac -D SYMBOL`.

## Access and Class Modifiers

```vala
public class Account : Object {
    // Access modifiers
    public string owner = "Ada";   // Visible everywhere
    private double balance = 0;    // Visible only inside this class
    protected int id = 1;          // Visible in this class and subclasses
    internal int bank_code = 42;   // Visible inside the same package

    // Construction blocks
    static int instances;

    static construct {
        // Runs once, when the class is first used
        instances = 0;
    }

    class construct {
        // Runs once per class in the hierarchy, when the class is set up
    }

    construct {
        // Runs for every new instance
        instances++;
    }

    // inline hints that the C compiler should inline this method
    public inline double get_balance () {
        return balance;
    }

    // new hides a member with the same name in a base class
    public new string to_string () {
        return "Account of " + owner;
    }
}

// sealed classes can't be inherited from
public sealed class SavingsAccount : Account {
}

// partial classes can be split up (experimental)
public partial class Big : Object {
    public int a;
}

public partial class Big {
    public int b;
}

// extern binds to existing C code
[CCode (cname = "abs")]
extern int c_abs (int value);

void main () {
    var account = new Account ();
    print ("%f\n", account.get_balance ());
    print ("%d\n", c_abs (-5));
}
```

## Threads and Locking

```vala
class Counter : Object {
    private int count = 0;
    private Mutex mutex = Mutex ();

    public void increment () {
        // lock guards a member for the duration of the block
        lock (count) {
            count++;
        }
    }

    public void increment_manually () {
        // lock and unlock methods of a Mutex can also be used directly
        mutex.lock ();
        count++;
        mutex.unlock ();
    }
}

void main () {
    new Counter ().increment ();
}
```

## Operators in Action

```vala
void consume (owned string text) {
}

void main () {
    // Arithmetic: + - * / %
    int a = 7 + 3 - 2 * 4 / 2 % 5;

    // Bitwise: ~ & | ^ << >>
    int bits = (~a & 0xF) | (a ^ 3);
    int shifted = (1 << 4) >> 2;

    // Relational: < > <= >=
    bool relational = a < 5 || a > 10 || a <= 2 || a >= 8;

    // Equality: == !=
    bool equality = a == 3 || a != 4;

    // Logic: ! && ||
    bool logic = !relational && (equality || relational);

    // Assignment: = += -= *= /= %= &= |= ^= <<= >>=
    int v = 1;
    v += 2;
    v -= 1;
    v *= 6;
    v /= 2;
    v %= 4;
    v &= 7;
    v |= 8;
    v ^= 3;
    v <<= 2;
    v >>= 1;

    // Increment and decrement: ++ --
    v++;
    v--;

    // Conditional: ?:
    // Null-coalescing: ??
    // String concatenation: +
    string? maybe = null;
    string text = (v > 3 ? "big" : "small") + (maybe ?? "!");

    // Chained relational expressions (experimental)
    bool in_range = 0 < v < 100;

    // Index: []
    // Slice: [:]
    int[] arr = { 1, 2, 3, 4 };
    int first = arr[0];
    int[] part = arr[1:3];

    // Member access: .
    // Method invocation: ()
    print ("%d\n", text.length);

    // Lambda: =>
    Func<int> printer = (n) => print ("%d\n", n);
    printer (first);

    // Casting: (Type)
    // Casting with as (null if the cast fails)
    // Type checking: is
    Object o = new Object ();
    var cast = (Object) o;
    var maybe_cast = o as Object;
    bool same_type = o is Object;

    // sizeof and typeof
    size_t size = sizeof (int);
    Type type = typeof (Object);

    // Non-null cast: (!)
    string? nullable = "text";
    string definitely = (!) nullable;

    // Ownership transfer: (owned)
    string owned_text = "x";
    consume ((owned) owned_text);

    // Namespace alias qualifier: ::
    var global_object = new global::GLib.Object ();

    // in operator
    int[] items = { 1, 2 };
    bool has_two = 2 in items;
}
```

## Pointers

Pointers are mostly used when working with C code. See [Interop with C](./interop-with-c.md).

```vala
struct Vec {
    public int x;
    public int y;
}

void main () {
    // Address-of: &
    // Pointer indirection: *
    int value = 5;
    int* p = &value;
    *p = 6;

    // Pointer member access: ->
    Vec vec = Vec ();
    Vec* vp = &vec;
    vp->x = 1;

    // delete frees an object through a pointer
    var obj = new Object ();
    Object* raw = obj;
    delete raw;
}
```

## Other Keywords

```vala
class Window : Object {
    public string title { get; set; }
    public int width { get; set; }
}

void main () {
    var window = new Window ();

    // with lets you access members of an object without repeating its name
    with (window) {
        title = "Hello";
        width = 200;
    }

    // global refers to the global namespace
    print ("%s\n", global::GLib.Environment.get_user_name ());
}
```

### Dynamic Types

`dynamic` defers member lookup to run-time, which is how Vala talks to D-Bus services:

```vala
void main () {
    try {
        dynamic DBusProxy proxy = new DBusProxy.for_bus_sync (
            BusType.SESSION, DBusProxyFlags.NONE, null,
            "org.example.App", "/org/example/App", "org.example.App"
        );

        // Greet isn't known at compile-time
        string reply = proxy.Greet ("Vala");
        print ("%s\n", reply);
    } catch (Error e) {
        print ("%s\n", e.message);
    }
}
```

## Keywords

- Selection: `if, else, switch, case, default`
- Iteration: `do, while, for, foreach, in`
- Jumping: `break, continue, return`
- Exception Handling: `try, catch, finally, throw`
- Synchronization: `lock, unlock`
- Type Declaration: `class, interface, struct, enum, delegate, errordomain`
- Type Modifiers: `const, weak, unowned, dynamic`
- Modifiers: `abstract, virtual, override, signal, extern, static, async, inline, new, sealed, partial`
- Access Modifiers: `public, private, protected, internal`
- Method Parameters: `out, ref`
- Method Contract Keywords: `throws, requires, ensures`
- Namespaces: `namespace, using`
- Operator Keywords: `as, is, in, new, delete, sizeof, typeof`
- Access Keywords: `this, base`
- Literal Keywords: `null, true, false`
- Property Context: `get, set, construct, default, value`
- Construction Blocks: `construct, static construct, class construct`
- Other: `void, var, yield, global, owned, with`

## Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Bitwise: `~`, `&`, `|`, `^`, `<<`, `>>`
- Relational: `<`, `>`, `<=`, `>=`
- Equality: `==`, `!=`
- Logic: `!`, `&&`, `||`
- Assignment: `=`, `+=`, `-=`, `*=` , `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`
- Increment, Decrement: `++`, `--`
- Pointer: `&`, `*`, `->`, `delete`
- Conditional: `?:`
- Null-Coalescing: `??`
- String Concatenation: `+`
- Method Invocation: `()`
- Member Access: `.`
- Index: `[]`
- Slice: `[:]`
- Lambda: `=>`
- Casting: `(`_Type_`)`, `(!)`, `as`
- Type Checking: `is`
- Ownership Transfer: `(owned)`
- Namespace Alias Qualifier: `::` (currently only with `global`)
- Other: `new`, `sizeof`, `typeof`, `in`

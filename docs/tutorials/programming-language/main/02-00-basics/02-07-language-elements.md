# 2.7. Language Elements

## 2.7.1. Methods

Functions are called *methods* in Vala, regardless of whether they are
defined inside a class or not. From now on we will stick to the term
*method*.

```vala
int method_name (int arg1, Object arg2) {
    return 1;
}
```

This code defines a method, having the name *method_name*, taking two
arguments, one an integer and the other an *Object* (the first passed by
value, the second as a reference as described). The method will return
an integer, which in this case is 1.

All Vala methods are C functions, and therefore take an arbitrary number
of arguments and return one value (or none if the method is declared
*void*). They may approximate more return values by placing data in
locations known to the calling code. Details of how to do this are in
the "Parameter Directions" section in the advanced part of this
tutorial.

The naming convention for methods in Vala is *all_lower_case* with
underscores as word separators. This may be a little bit unfamiliar to
C# or Java programmers who are accustomed to *CamelCase* or
*mixedCamelCase* method names. But with this style you will be
consistent with other Vala and C/GObject libraries.

It is not possible to have multiple methods with the same name but
different signature within the same scope ("method overloading"):

```vala
void draw (string text) { }
void draw (Shape shape) { }  // not possible
```

This is due to the fact that libraries produced with Vala are intended
to be usable for C programmers as well. In Vala you would do something
like this instead:

```vala
void draw_text (string text) { }
void draw_shape (Shape shape) { }
```

By choosing slightly different names you can avoid a name clash. In
languages that support method overloading it is often used for providing
convenience methods with less parameters that chain up to the most
general method:

```vala
void f (int x, string s, double z) { }
void f (int x, string s) { f (x, s, 0.5); }  // not possible
void f (int x) { f (x, "hello"); }           // not possible
```

In this case you can use
Vala's default argument feature for method parameters in order to achieve a similar behaviour with just one method.  
You can define default values for the last parameters of a method, so that you don't
have to pass them explicitly to a method call:

```vala
void f (int x, string s = "hello", double z = 0.5) { }
```

Some possible calls of this method might be:

```vala
f (2);
f (2, "hi");
f (2, "hi", 0.75);
```

It's even possible to define methods with real variable-length argument lists (*varargs*) like *stdout.printf ()*, 
although not necessarily recommended.  You will learn how to do that later.  
Vala performs a basic nullability check on the method parameters and return values.  
If it is allowable for a method parameter or a return value to be _null_, the type symbol should be postfixed with a _?_ 
modifier.  This extra information helps the Vala compiler to perform static checks and to add runtime assertions on the 
preconditions of the methods, which may help in avoiding related errors such as dereferencing a _null_
reference.
```vala
string? method_name (string? text, Foo? foo, Bar bar) {
    // ...
}
```
In this example _text_, _foo_ and the return value may be _null_, however, _bar_ must not be _null_.

## 2.7.2. Delegates
```vala     
delegate void DelegateType (int a);
```
Delegates represent methods, allowing chunks of code to be passed around like objects.  
The example above defines a new type named *DelegateType* which represents methods taking an *int* and not returning a 
value.  Any method that matches this signature may be assigned to a variable of this type or passed as a method argument 
of this type.

```vala     
delegate void DelegateType (int a);

void f1 (int a) {
    stdout.printf ("%d\n", a);
}

void f2 (DelegateType d, int a) {
    d (a);       // Calling a delegate
}

void main () {
    f2 (f1, 5);  // Passing a method as delegate argument to another method
}
```
This code will execute the method *f2*, passing in a reference to method *f1* and the number 5.
*f2* will then execute the method *f1*, passing it the number.  
Delegates may also be created locally. A member method can also be assigned to a delegate, e.g.
```vala     
class Foo {
    public void f1 (int a) {
        stdout.printf ("a = %d\n", a);
    }
    delegate void DelegateType (int a);
    
    public static int main (string[] args) {
        Foo foo = new Foo ();
        DelegateType d1 = foo.f1;
        d1 (10);
        return 0;
    }    
}
```
More samples in [Delegates Manual](https://wiki.gnome.org/Projects/Vala/Manual/Delegates).  

## 2.7.3. Anonymous Methods / Closures

```vala     
(a) => { stdout.printf ("%d\n", a); }
```

An *anonymous method*, also known as *lambda expression*, *function literal* or *closure*, can be defined in Vala with 
the `=>` operator. The parameter list is on the left hand side of the operator, the method body on the right hand side.  
An anonymous method standing by itself like the one above does not make much sense.  
It is only useful if you assign it directly to a variable of a delegate type or pass it as a method argument to another 
method.  Notice that neither parameter nor return types are explicitly given.  
Instead the types are inferred from the signature of the delegate it is used with.  
Assigning an anonymous method to a delegate variable:

```vala     
delegate void PrintIntFunc (int a);

void main () {
    PrintIntFunc p1 = (a) => { stdout.printf ("%d\n", a);};
    p1(10);

    // Curly braces are optional if the body contains only one statement:
    PrintIntFunc p2 = (a) => stdout.printf ("%d\n", a);
    p2 (20);
}
```
Passing an anonymous method to another method:

```vala     
delegate int Comparator (int a, int b);

void my_sorting_algorithm (int[] data, Comparator compare) {
    // ... ``compare`` is called somewhere in here ...
}

void main () {
    int[] data = { 3, 9, 2, 7, 5 };
    // An anonymous method is passed as the second argument:
    my_sorting_algorithm (data, (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
}
```
Anonymous methods are real [Closures](http://en.wikipedia.org/wiki/Closure_(computer_science)). 
This means you can access the local variables of the outer method within the lambda expression:

```vala     
delegate int IntOperation (int i);     

IntOperation curried_add (int a) {        
    return (b) => a + b;  // ``a`` is an outer variable    
}     

void main () {        
    stdout.printf ("2 + 4 = %d\n", curried_add (2)(4));    
}  
```

In this example _curried_add_ (see [Currying](http://en.wikipedia.org/wiki/Currying)) returns a newly created method 
that preserves the value of *a*. This returned method is directly called afterwards with 4 as argument 
resulting in the sum of the two numbers.  

## 2.7.4. Namespaces

```vala     
namespace NameSpaceName {        
    // ...    
}
```

Everything between the braces in this statement is in the namespace *NameSpaceName* and must be referenced as such.  
Any code outside this namespace must either use qualified names for anything within the name of the namespace, or be in 
a file with an appropriate _using_ declaration in order to import this namespace:

```vala     
using NameSpaceName;     

// ...
```

For example, if the namespace *Gtk* is imported with _using Gtk;_ you can simply write *Window* instead of *Gtk.Window*. 
A fully qualified name would only be necessary in case of ambiguity, for example between *GLib.Object* and *Gtk.Object*.  
The namespace *GLib* is imported by default.  Imagine an invisible _using GLib;_ line at the beginning of every Vala 
file.  Everything that you don't put into a separate namespace will land in the anonymous global namespace. 
If you have to reference the global namespace explicitly due to ambiguity you can do that with the _global::_ prefix.

Namespaces can be nested, either by nesting one declaration inside
another, or by giving a name of the form *NameSpace1.NameSpace2*.

Several other types of definition can declare themselves to be inside a
namespace by following the same naming convention, e.g. _class
NameSpace1.Test { ... }_. Note that when doing this, the
final namespace of the definition will be the one the declaration is
nested in plus the namespaces declared in the definition.

## 2.7.5. Structs

```vala
struct StructName {
    public int a;
}
```

defines a _struct_ type, i.e. a compound value type. A Vala
struct may have methods in a limited way and also may have private
members, meaning the explicit _public_ access modifier is
required.

```vala
struct Color {
    public double red;
    public double green;
    public double blue;
}
```

This is how you can initialise a struct:

```vala
// without type inference
Color c1 = Color ();  // or Color c1 = {};
Color c2 = { 0.5, 0.5, 1.0 };
Color c3 = Color () {
    red = 0.5,
    green = 0.5,
    blue = 1.0
};

// with type inference
var c4 = Color ();
var c5 = Color () {
    red = 0.5,
    green = 0.5,
    blue = 1.0
};
```

Structs are stack/inline allocated and copied on assignment.

To define an array of structs, please see the
[FAQ](../../../../faq#how-do-i-create-an-array-of-structs)

## 2.7.6. Classes

```vala
class ClassName : SuperClassName, InterfaceName {
}
```

Defines a class, i.e. a reference type. In contrast to structs,
instances of classes are heap allocated. There is much more syntax
related to classes, which is discussed more fully in the section about
object oriented programming.

## 2.7.7. Interfaces

```vala
interface InterfaceName : SuperInterfaceName {
}
```

Defines an interface, i.e. a non instantiable type. In order to create
an instance of an interface you must first implement its abstract
methods in a non-abstract class. Vala interfaces are more powerful than
Java or C# interfaces. In fact, they can be used as
[mixins](https://en.wikipedia.org/wiki/Mixin). The details of interfaces
are described in the section about object oriented programming.

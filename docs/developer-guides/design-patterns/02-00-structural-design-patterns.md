# 2. Structural Design Patterns

In plain words > Structural patterns are mostly concerned with object
composition or in other words how the entities can use each other. Or
yet another explanation would be, they help in answering "How to build a
software component?"

Wikipedia says > In software engineering, structural design patterns
are design patterns that ease the design by identifying a simple way to
realize relationships between entities.

-   [Adapter](02-00-structural-design-patterns#_2-1-🔌-adapter)
-   [Bridge](02-00-structural-design-patterns#_2-2-🚡-bridge)
-   [Composite](02-00-structural-design-patterns#_2-3-🌿-composite)
-   [Decorator](02-00-structural-design-patterns#_2-4-☕-decorator)
-   [Facade](02-00-structural-design-patterns#_2-5-📦-facade)
-   [Flyweight](02-00-structural-design-patterns#_2-6-🍃-flyweight)
-   [Proxy](02-00-structural-design-patterns#_2-7-🎱-proxy)

## 2.1. 🔌 Adapter

Real world example > Consider that you have some pictures in your
memory card and you need to transfer them to your computer. In order to
transfer them you need some kind of adapter that is compatible with your
computer ports so that you can attach memory card to your computer. In
this case card reader is an adapter. > Another example would be the
famous power adapter; a three legged plug can't be connected to a two
pronged outlet, it needs to use a power adapter that makes it compatible
with the two pronged outlet. > Yet another example would be a
translator translating words spoken by one person to another

In plain words > Adapter pattern lets you wrap an otherwise
incompatible object in an adapter to make it compatible with another
class.

Wikipedia says > In software engineering, the adapter pattern is a
software design pattern that allows the interface of an existing class
to be used as another interface. It is often used to make existing
classes work with others without modifying their source code.

**Programmatic Example**

Consider a game where there is a hunter and he hunts lions.

First we have an interface `Lion` that all types of lions have to
implement

```vala
interface Lion {
    public abstract void roar ();
}

class AfricanLion: Lion {
    public void roar () {

    }
}

class AsiaLion: Lion {
    public void roar () {

    }
}
```

And hunter expects any implementation of `Lion` interface to hunt.

```vala
class Hunter {
    public void hunt (Lion lion) {

    }
}
```

Now let's say we have to add a `WildDog` in our game so that hunter can
hunt that also. But we can't do that directly because dog has a
different interface. To make it compatible for our hunter, we will have
to create an adapter that is compatible

```vala
// This needs to be added to the game
class WildDog {
    public void bark () {
    }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter: Lion {
    protected WildDog dog;

    public WildDogAdapter (WildDog dog) {
        this.dog = dog;
    }

    public void roar () {
        dog.bark ();
    }
}
```

And now the `WildDog` can be used in our game using `WildDogAdapter`.

```vala
var wild_dog = new WildDog ();
var wild_dog_adapter = new WildDogAdapter (wild_dog);

var hunter = new Hunter ();
hunter.hunt (wild_dog_adapter);
```

## 2.2. 🚡 Bridge

Real world example > Consider you have a website with different pages
and you are supposed to allow the user to change the theme. What would
you do? Create multiple copies of each of the pages for each of the
themes or would you just create separate theme and load them based on
the user's preferences? Bridge pattern allows you to do the second i.e.

![Bridge Pattern Image](https://cloud.githubusercontent.com/assets/11269635/23065293/33b7aea0-f515-11e6-983f-98823c9845ee.png)
> With and without the bridge pattern


In Plain Words > Bridge pattern is about preferring composition over
inheritance. Implementation details are pushed from a hierarchy to
another object with a separate hierarchy.

Wikipedia says > The bridge pattern is a design pattern used in
software engineering that is meant to "decouple an abstraction from its
implementation so that the two can vary independently"

**Programmatic Example**

Translating our WebPage example from above. Here we have the `WebPage`
hierarchy

```vala
interface WebPage {
    //abstract constructor doesn't exist, at least that i know of
    public abstract string get_content ();
}

class About : WebPage {
    protected Theme theme;

    public About (Theme theme) {
        this.theme = theme; 
    } 

    public string get_content () {
        return "About page in " + theme.get_color () + "\n";
    }
}

class Careers : WebPage {
    protected Theme theme;

    public Careers (Theme theme) {
        this.theme = theme; 
    } 

    public string get_content () {
        return "Careers page in " + theme.get_color () + "\n";
    }
}
```

And the separate theme hierarchy

```vala
interface Theme : Object {
    public abstract string get_color ();
}

class DarkTheme : Object, Theme {
    public string get_color () {
        return "Dark Black";
    }
}

class LightTheme : Object, Theme {
    public string get_color () {
        return "Off White";
    }
}

class AquaTheme : Object, Theme {
    public string get_color () {
        return "Light blue";
    }
}
```

And both the hierarchies

```vala
var dark_theme = new DarkTheme ();

var about = new About (dark_theme); 
var careers = new Careers (dark_theme); 

print ("%s", about.get_content ()); // "About page in Dark Black";
print ("%s", careers.get_content ()); // "Careers page in Dark Black";
```

## 2.3. 🌿 Composite

Real world example > Every organization is composed of employees. Each
of the employees has the same features i.e. has a salary, has some
responsibilities, may or may not report to someone, may or may not have
some subordinates etc.

In plain words > Composite pattern lets clients treat the individual
objects in a uniform manner.

Wikipedia says > In software engineering, the composite pattern is a
partitioning design pattern. The composite pattern describes that a
group of objects is to be treated in the same way as a single instance
of an object. The intent of a composite is to "compose" objects into
tree structures to represent part-whole hierarchies. Implementing the
composite pattern lets clients treat individual objects and compositions
uniformly.

**Programmatic Example**

Taking our employees example from above. Here we have different employee
types

```vala
interface Employee : Object {
    protected abstract string _name {protected get; protected set;}
    protected abstract float _salary {protected get; protected set;}

    // no overridable construct

    public string get_name () {
        return _name;
    }

    public void set_salary (float salary) {
        _salary = salary;
    }

    public float get_salary () {
        return _salary;
    } 
}


class Developer : Object, Employee {
    protected string _name {protected get; protected set;}
    protected float _salary {protected get; protected set;}

    public Developer (string name, float salary) {
        _name = name;
        _salary = salary;
    }
}

class Designer : Object, Employee {
    protected string _name {protected get; protected set;}
    protected float _salary {protected get; protected set;}

    public Designer (string name, float salary) {
        _name = name;
        _salary = salary;
    }
}
```

Then we have an organization which consists of several different types
of employees

```vala
class Organization {
    protected List<Employee> employees;

    public void add_employee (Employee employee) {
        employees.append (employee);
    }

    public float get_net_salaries () {
        float net_salary = 0;

        employees.foreach ((employee) => {
            net_salary += employee.get_salary ();
        });

        return net_salary;
    }
}
```

And then it can be used as

```vala
// Prepare the employees
var john = new Developer ("John Doe", 12000);
var jane = new Developer ("Jane", 10000);

// Add them to organization
var organization = new Organization ();
organization.add_employee (john);
organization.add_employee (jane);

print ("Net salaries: " + organization.get_net_salaries ().to_string () + "\n");
```

## 2.4. ☕ Decorator

Real world example

> Imagine you run a car service shop offering multiple services. Now how
> do you calculate the bill to be charged? You pick one service and
> dynamically keep adding to it the prices for the provided services
> till you get the final cost. Here each type of service is a decorator.

In plain words > Decorator pattern lets you dynamically change the
behavior of an object at run time by wrapping them in an object of a
decorator class.

Wikipedia says > In object-oriented programming, the decorator pattern
is a design pattern that allows behavior to be added to an individual
object, either statically or dynamically, without affecting the behavior
of other objects from the same class. The decorator pattern is often
useful for adhering to the Single Responsibility Principle, as it allows
functionality to be divided between classes with unique areas of
concern.

**Programmatic Example**

Lets take coffee for example. First of all we have a simple coffee
implementing the coffee interface

```vala
interface Coffee : Object {
    public abstract int get_cost ();
    public abstract string get_description ();
}

class SimpleCoffee : Object, Coffee {
    public int get_cost () {
        return 10;
    }

    public string get_description () {
        return "Simple coffee";
    }
}   
```

We want to make the code extensible to allow options to modify it if
required. Lets make some add-ons (decorators)

```vala
class MilkCoffee : Object, Coffee {
    protected Coffee coffee;

    public MilkCoffee (Coffee coffee) {
        this.coffee = coffee;
    }

    public int get_cost () {
        return coffee.get_cost () + 2;
    }

    public string get_description () {
        return coffee.get_description () + ", milk";
    }
}

class WhipCoffee : Object, Coffee {
    protected Coffee coffee;

    public WhipCoffee (Coffee coffee) {
        this.coffee = coffee;
    }

    public int get_cost () {
        return coffee.get_cost () + 5;
    }

    public string get_description () {
        return coffee.get_description () + ", whip";
    }
}

class VanillaCoffee : Object, Coffee {
    protected Coffee coffee;

    public VanillaCoffee (Coffee coffee) {
        this.coffee = coffee;
    }

    public int get_cost () {
        return coffee.get_cost () + 3;
    }

    public string get_description () {
        return coffee.get_description () + ", vanilla";
    }
}
```

Lets make a coffee now

```vala
Coffee some_coffee = new SimpleCoffee ();
print ("%d\n", some_coffee.get_cost ()); // 10
print ("%s\n", some_coffee.get_description ()); // Simple Coffee

some_coffee = new MilkCoffee (some_coffee);
print ("%d\n", some_coffee.get_cost ()); // 12
print ("%s\n", some_coffee.get_description ()); // Simple Coffee, milk

some_coffee = new WhipCoffee (some_coffee);
print ("%d\n", some_coffee.get_cost ()); // 17
print ("%s\n", some_coffee.get_description ()); // Simple Coffee, milk, whip

some_coffee = new VanillaCoffee (some_coffee);
print ("%d\n", some_coffee.get_cost ()); // 20
print ("%s\n", some_coffee.get_description ()); // Simple Coffee, milk, vanilla
```

## 2.5. 📦 Facade

Real world example > How do you turn on the computer? "Hit the power
button" you say! That is what you believe because you are using a simple
interface that computer provides on the outside, internally it has to do
a lot of stuff to make it happen. This simple interface to the complex
subsystem is a facade.

In plain words > Facade pattern provides a simplified interface to a
complex subsystem.

Wikipedia says > A facade is an object that provides a simplified
interface to a larger body of code, such as a class library.

**Programmatic Example**

Taking our computer example from above. Here we have the computer class

```vala
class Computer {
    public void get_electric_shock () {
        print ("Ouch!\n");
    }

    public void make_sound () {
        print ("Beep beep!\n");
    }

    public void show_loading_screen () {
        print ("Loading...\n");
    }

    public void bam () {
        print ("Ready to be used!\n");
    }

    public void close_everything () {
        print ("Bup bup bup buzzzz!\n");
    }

    public void sooth () {
        print ("Zzzzz\n");
    }

    public void pull_current () {
        print ("Haaah!\n");
    }
}
```

Here we have the facade

```vala
class ComputerFacade {
    protected Computer computer;

    public ComputerFacade (Computer computer) {
        this.computer = computer;
    }

    public void turn_on () {
        computer.get_electric_shock ();
        computer.make_sound ();
        computer.show_loading_screen ();
        computer.bam ();
    }

    public void turn_off () {
        computer.close_everything ();
        computer.pull_current ();
        computer.sooth ();
    }
}
```

Now to use the facade

```vala
var computer = new ComputerFacade (new Computer());
computer.turn_on (); // Ouch! Beep beep! Loading.. Ready to be used!
computer.turn_off (); // Bup bup buzzz! Haah! Zzzzz
```

## 2.6. 🍃 Flyweight

Real world example > Did you ever have fresh tea from some stall? They
often make more than one cup that you demanded and save the rest for any
other customer so to save the resources e.g. gas etc. Flyweight pattern
is all about that i.e. sharing.

In plain words > It is used to minimize memory usage or computational
expenses by sharing as much as possible with similar objects.

Wikipedia says > In computer programming, flyweight is a software
design pattern. A flyweight is an object that minimizes memory use by
sharing as much data as possible with other similar objects; it is a way
to use objects in large numbers when a simple repeated representation
would use an unacceptable amount of memory.

**Programmatic example**

Translating our tea example from above. First of all we have tea types
and tea maker

```vala
// Anything that will be cached is flyweight.
// Types of tea here will be flyweights.
using Gee;

class KarakTea {

}

// Acts as a factory and saves the tea
class TeaMaker {
    protected HashMap<string, KarakTea> available_tea = new HashMap<string, KarakTea> ();

    public KarakTea make (string preference) {
        if (!available_tea.has_key (preference)) {
            available_tea[preference] = new KarakTea ();
        }

        return available_tea[preference];
    }
}
```

Then we have the `TeaShop` which takes orders and serves them

```vala
class TeaShop {
    protected HashMap<int, KarakTea> orders = new HashMap<int, KarakTea> ();
    protected TeaMaker tea_maker;

    public TeaShop (TeaMaker tea_maker) {
        this.tea_maker = tea_maker;
    }

    public void take_order (string tea_type, int table) {
        orders[table] = tea_maker.make (tea_type); 
    }

    public void serve () {
        foreach (int table in orders.keys) {
            print ("Serving tea to table# %d\n", table);
        }
    }
}
```

And it can be used as below

```vala
var tea_maker = new TeaMaker ();
var shop = new TeaShop (tea_maker);

shop.take_order ("less sugar", 1);
shop.take_order ("more milk", 2);
shop.take_order ("without sugar", 5);

shop.serve ();
// Serving tea to table# 1
// Serving tea to table# 2
// Serving tea to table# 5
```

## 2.7. 🎱 Proxy

Real world example > Have you ever used an access card to go through a
door? There are multiple options to open that door i.e. it can be opened
either using access card or by pressing a button that bypasses the
security. The door's main functionality is to open but there is a proxy
added on top of it to add some functionality. Let me better explain it
using the code example below.

In plain words > Using the proxy pattern, a class represents the
functionality of another class.

Wikipedia says > A proxy, in its most general form, is a class
functioning as an interface to something else. A proxy is a wrapper or
agent object that is being called by the client to access the real
serving object behind the scenes. Use of the proxy can simply be
forwarding to the real object, or can provide additional logic. In the
proxy extra functionality can be provided, for example caching when
operations on the real object are resource intensive, or checking
preconditions before operations on the real object are invoked.

**Programmatic Example**

Taking our security door example from above. Firstly we have the door
interface and an implementation of door

```vala
interface Door : Object {
    public abstract void open ();
    public abstract void close ();
}

class LabDoor : Object, Door {
    public void open () {
        print ("Opening lab door\n");
    }

    public void close () {
        print ("Closing the lab door\n");
    }
}
```

Then we have a proxy to secure any doors that we want

```vala
class Security : Object {
    protected Door door;

    public Security (Door door) {
        this.door = door;
    }

    public void open (string password) {
        if (authenticate (password)) {
            door.open ();
        } else {
            print ("Big no! It ain't passible.\n");
        }
    }

    public bool authenticate (string password) {
        return password == "$ecr@t";
    }

    public void close () {
        door.close ();
    }
}
```

And here is how it can be used

```vala
var door = new Security (new LabDoor ());
door.open ("invalid"); // Big no! It ain't possible.

door.open ("$ecr@t"); // Opening lab door
door.close (); // Closing lab door
```

Yet another example would be some sort of data-mapper implementation.
For example, I recently made an ODM (Object Data Mapper), in PHP, for
MongoDB using this pattern where I wrote a proxy around mongo classes
while utilizing the magic method `__call()`. All the method calls were
proxied to the original mongo class and result retrieved was returned as
it is but in case of `find` or `findOne` data was mapped to the required
class objects and the object was returned instead of `Cursor`.

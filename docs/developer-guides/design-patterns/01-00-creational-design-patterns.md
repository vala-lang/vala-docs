# 1. Creational Design Patterns

In plain words > Creational patterns are focused towards how to
instantiate an object or group of related objects.

Wikipedia says > In software engineering, creational design patterns
are design patterns that deal with object creation mechanisms, trying to
create objects in a manner suitable to the situation. The basic form of
object creation could result in design problems or added complexity to
the design. Creational design patterns solve this problem by somehow
controlling this object creation.

-   [Simple Factory](01-00-creational-design-patterns#_1-1-🏠-simple-factory)
-   [Factory Method](01-00-creational-design-patterns#_1-2-🏭-factory-method)
-   [Abstract Factory](01-00-creational-design-patterns#_1-3-🔨-abstract-factory)
-   [Builder](01-00-creational-design-patterns#_1-4-👷-builder)
-   [Prototype](01-00-creational-design-patterns#_1-5-🐑-prototype)
-   [Singleton](01-00-creational-design-patterns#_1-6-💍-singleton)

## 1.1. 🏠 Simple Factory

Real world example > Consider, you are building a house and you need
doors. It would be a mess if every time you need a door, you put on your
carpenter clothes and start making a door in your house. Instead, you get
it made from a factory.

In plain words > Simple factory simply generates an instance for a client
without exposing any instantiation logic to the client

Wikipedia says > In object-oriented programming (OOP), a factory is an
object for creating other objects -- formally a factory is a function or
method that returns objects of a varying prototype or class from some
method call, which is assumed to be "new".

**Programmatic Example**

First of all we have a door interface and the implementation

```vala
interface Door : Object {
    public abstract float get_width ();
    public abstract float get_height ();
}

class WoodenDoor: Object, Door {
    protected float width;
    protected float height;

    public WoodenDoor (float width, float height) {
        this.width = width;
        this.height = height;
    }

    public float get_width () {
        return width;
    }

    public float get_height () {
        return height;
    }
}
```

Then we have our door factory that makes the door and returns it

```vala
class DoorFactory {
    public static Door make_door (float width, float height) {
        return new WoodenDoor (width, height);
    }
}
```

And then it can be used as

```vala
var door = DoorFactory.make_door (100,200);
print ("width: %f\n", door.get_width ());
print ("height: %f\n", door.get_height ());
```

**When to Use?**

When creating an object is not just a few assignments and involves some
logic, it makes sense to put it in a dedicated factory instead of
repeating the same code everywhere.

## 1.2. 🏭 Factory Method

Real world example > Consider the case of a hiring manager. It is
impossible for one person to interview for each of the positions. Based
on the job opening, she has to decide and delegate the interview steps
to different people.

In plain words > It provides a way to delegate the instantiation logic
to child classes.

Wikipedia says > In class-based programming, the factory method pattern
is a creational pattern that uses factory methods to deal with the
problem of creating objects without having to specify the exact class of
the object that will be created. This is done by creating objects by
calling a factory method---either specified in an interface and
implemented by child classes, or implemented in a base class and
optionally overridden by derived classes---rather than by calling a
constructor.

**Programmatic Example**

Taking our hiring manager example above. First of all we have an
interviewer interface and some implementations for it

```vala
interface Interviewer : Object {
    public abstract void ask_questions ();
}

class Developer : Object, Interviewer {
    public void ask_questions () {
        print ("Asking questions about patterns!\n");
    }
}

class CommunityExecutive : Object, Interviewer {
    public void ask_questions () {
        print ("Asking questions about community building.\n");
    }
}
```

Now let us create our `HiringManager`

```vala
abstract class HiringManager {
    // Factory Method
    public abstract Interviewer make_interviewer ();

    public void take_interview () {
        var interviewer = this.make_interviewer ();
        interviewer.ask_questions ();
    }
}
```

Now any child can extend it and provide the required interviewer

```vala
class DevelopmentManager : HiringManager {
    public override Interviewer make_interviewer () {
        return new Developer ();
    }
}

class MarketingManager : HiringManager {
    public override Interviewer make_interviewer () {
        return new CommunityExecutive ();
    }
}
```

and then it can be used as

```vala
var dev_manager = new DevelopmentManager ();
dev_manager.take_interview (); // Output: Asking about design patterns

var marketing_manager = new MarketingManager ();
marketing_manager.take_interview (); // Output: Asking about community building
```

**When to use?**

Useful when there is some generic processing in a class but the required
sub-class is dynamically decided at runtime. Or putting it in other
words, when the client doesn't know what exact sub-class it might need.

## 1.3. 🔨 Abstract Factory

Real world example > Extending our door example from Simple Factory.
Based on your needs you might get a wooden door from a wooden door shop,
iron door from an iron shop or a PVC door from the relevant shop. Plus
you might need a guy with different kind of specialities to fit the
door, for example a carpenter for wooden door, welder for iron door etc.
As you can see there is a dependency between the doors now, wooden door
needs carpenter, iron door needs a welder etc.

In plain words > A factory of factories; a factory that groups the
individual but related/dependent factories together without specifying
their concrete classes.

Wikipedia says > The abstract factory pattern provides a way to
encapsulate a group of individual factories that have a common theme
without specifying their concrete classes

**Programmatic Example**

Translating the door example above. First of all we have our `Door`
interface and some implementation for it

```vala
interface Door : Object {
    public abstract void get_description ();
}

class WoodenDoor : Object, Door {
    public void get_description () {
        print ("I'm a wooden door\n");
    }
}

class IronDoor : Object, Door {
    public void get_description () {
        print ("I'm a iron door\n");
    }
}
```

Then we have some fitting experts for each door type

```vala
interface DoorFittingExpert : Object {
    public abstract void get_description ();
}

class Welder : Object, DoorFittingExpert {
    public void get_description () {
        print ("I can only fit iron doors\n");
    }
}

class Carpenter : Object, DoorFittingExpert {
    public void get_description () {
        print ("I can only fit wooden doors\n");
    }
}
```

Now we have our abstract factory that would let us make family of
related objects i.e. wooden door factory would create a wooden door and
wooden door fitting expert and iron door factory would create an iron
door and iron door fitting expert

```vala
interface DoorFactory : Object {
    public abstract Door make_door ();
    public abstract DoorFittingExpert make_fitting_expert ();
}

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory : Object, DoorFactory {
    public Door make_door () {
        return new WoodenDoor ();
    }

    public DoorFittingExpert make_fitting_expert () {
        return new Carpenter ();
    }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory : Object, DoorFactory {
    public Door make_door () {
        return new IronDoor ();
    }

    public DoorFittingExpert make_fitting_expert () {
        return new Welder ();
    }
}
```

And then it can be used as

```vala
var wooden_factory = new WoodenDoorFactory ();

var door = wooden_factory.make_door ();
var expert = wooden_factory.make_fitting_expert ();

door.get_description (); // Output: I am a wooden door
expert.get_description (); // Output: I can only fit wooden doors

// Same for Iron Factory
var iron_factory = new IronDoorFactory ();

door = iron_factory.make_door ();
expert = iron_factory.make_fitting_expert ();

door.get_description (); // Output: I am an iron door
expert.get_description (); // Output: I can only fit iron doors
```

As you can see the wooden door factory has encapsulated the `carpenter`
and the `wooden door` also iron door factory has encapsulated the
`iron door` and `welder`. And thus it had helped us make sure that for
each of the created door, we do not get a wrong fitting expert.

**When to use?**

When there are interrelated dependencies with not-that-simple creation
logic involved

## 1.4. 👷 Builder

Real world example > Imagine you are at Hardee's and you order a
specific deal, lets say, "Big Hardee" and they hand it over to you
without *any questions*; this is the example of simple factory. But
there are cases when the creation logic might involve more steps. For
example you want a customized Subway deal, you have several options in
how your burger is made e.g., what bread do you want? what types of sauces
would you like? What cheese would you want? Etc., In such cases, the builder
pattern comes to the rescue.

In plain words > Allows you to create different flavors of an object
while avoiding constructor pollution. Useful when there could be several
flavors of an object. Or when there are a lot of steps involved in
creation of an object.

Wikipedia says > The builder pattern is an object creation software
design pattern with the intentions of finding a solution to the
telescoping constructor antipattern.

Having said that, let me add a bit about what telescoping constructor
antipattern is. At one point or the other we have all seen a
constructor like below:

```vala
public Burger (int size, bool cheese = true, bool pepperoni = true, bool tomato = false, bool lettuce = true) {
}
```

As you can see, the number of constructor parameters can quickly get out
of hand, and it might become difficult to understand the arrangement of
parameters. Plus, this parameter list could keep on growing if you would
want to add more options in future. This is called telescoping
constructor antipattern.

**Programmatic Example**

The sane alternative is to use the builder pattern. First of all, we have
our burger that we want to make

```vala
class Burger {
    protected int size;

    protected bool cheese = false;
    protected bool pepperoni = false;
    protected bool lettuce = false;
    protected bool tomato = false;

    public Burger (BurgerBuilder builder) {
        size = builder.size;
        cheese = builder.cheese;
        pepperoni = builder.pepperoni;
        lettuce = builder.lettuce;
        tomato = builder.tomato;
    }
}
```

And then we have the builder

```vala
class BurgerBuilder {
    public int size;

    public bool cheese = false;
    public bool pepperoni = false;
    public bool lettuce = false;
    public bool tomato = false;

    public BurgerBuilder (int size) {
        this.size = size;
    }

    public BurgerBuilder add_cheese () {
        cheese = true;
        return this;
    } 

    public BurgerBuilder add_pepperoni () {
        pepperoni = true;
        return this;
    } 

    public BurgerBuilder add_lettuce () {
        lettuce = true;
        return this;
    }

    public BurgerBuilder add_tomato () {
        tomato = true;
        return this;
    }

    public Burger build () {
        return new Burger (this);
    }
}
```

And then it can be used as:

```vala
var burger = (new BurgerBuilder (14))
    .add_pepperoni ()
    .add_lettuce ()
    .add_tomato ()
    .build ();
```

**When to use?**

When there could be several flavors of an object and to avoid the
constructor telescoping. The key difference from the factory pattern is
that factory pattern is to be used when the creation is a one-step
process while builder pattern is to be used when the creation is a multistep process.

## 1.5. 🐑 Prototype

Real world example > Remember dolly? The sheep that was cloned! Lets
not get into the details but the key point here is that it is all about
cloning

In plain words > Create object based on an existing object through
cloning.

Wikipedia says > The prototype pattern is a creational design pattern
in software development. It is used when the type of objects to create
is determined by a prototypical instance, which is cloned to produce new
objects.

In short, it allows you to create a copy of an existing object and
modify it to your needs, instead of going through the trouble of
creating an object from scratch and setting it up.

**Programmatic Example**

In Vala, there's no 'native', generic, shallow or deep, 'clone' method
and this topic is a bit controversial, so we just implement a clone
method that returns another instance of the same class with duplicated
properties.

```vala
class Sheep {
    protected string name;
    protected string category;

    public Sheep (string name, string category = "Mountain Sheep") {
        this.name = name;
        this.category = category;
    }

    public void set_name (string name) {
        this.name = name;
    }

    public string get_name () {
        return name;
    }

    public void set_category (string category) {
        this.category = category;
    }

    public string get_category () {
        return category;
    }

    // No Object clone method, lets implement a clone method
    public Sheep clone () {
        return new Sheep (name, category);
    }
}
```

Then it can be cloned like below

```vala
var original = new Sheep ("Jolly");
print ("%s\n", original.get_name ()); // Jolly
print ("%s\n", original.get_category ()); // Mountain Sheep

// Clone and modify what is required
var cloned = original.clone ();
cloned.set_name ("Dolly");
print ("%s\n", cloned.get_name ()); // Dolly
print ("%s\n", cloned.get_category ()); // Mountain sheep
```

**When to use?**

When an object is required that is similar to existing object or when
the creation would be expensive as compared to cloning.

## 1.6. 💍 Singleton

Real world example > There can only be one president of a country at a
time. The same president has to be brought to action, whenever duty
calls. President here is singleton.

In plain words > Ensures that only one object of a particular class is
ever created.

Wikipedia says > In software engineering, the singleton pattern is a
software design pattern that restricts the instantiation of a class to
one object. This is useful when exactly one object is needed to
coordinate actions across the system.

Singleton pattern is actually considered an anti-pattern and overuse of
it should be avoided. It is not necessarily bad and could have some
valid use-cases but should be used with caution because it introduces a
global state in your application and change to it in one place could
affect in the other areas and it could become pretty difficult to debug.
The other bad thing about them is it makes your code tightly coupled
plus it mocking the singleton could be difficult.

**Programmatic Example**

To create a singleton, make the constructor private, disable cloning,
disable extension and create a static variable to house the instance

```vala
public class President : Object {
    static President? instance;

    // Private constructor
    private President () {

    }

    // Public constructor
    public static President get_instance () {
        if (instance == null) {
            instance = new President ();
        }
        return instance;
    }

    // No default clone and unserialize methods.
}
```

Then in order to use

```vala
President a = President.get_instance ();
President b = President.get_instance ();

print ((a == b).to_string () + "\n"); // true
```

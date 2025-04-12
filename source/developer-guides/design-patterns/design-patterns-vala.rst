.. image:: https://cloud.githubusercontent.com/assets/11269635/23065273/1b7e5938-f515-11e6-8dd3-d0d58de6bb9a.png
   :height: 800
   :width: 1200
   :scale: 50
   :alt: Design Patterns for Humans


🎉 **Ultra-simplified explanation to design patterns!** 🎉

**A topic that can easily make anyone's mind wobble. Here I try to make them stick in to your mind (and maybe mine) by explaining them in the `simplest` way possible.**


🚀 Introduction
=================

Design patterns are solutions to recurring problems; **guidelines on how to tackle certain problems**. They are not classes, packages or libraries that you can plug into your application and wait for the magic to happen. These are, rather, guidelines on how to tackle certain problems in certain situations.

- Design patterns are solutions to recurring problems; guidelines on how to tackle certain problems

Wikipedia describes them as

- In software engineering, a software design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations.

⚠️ Be Careful
-----------------
- Design patterns are not a silver bullet to all your problems.
- Do not try to force them; bad things are supposed to happen, if done so. Keep in mind that design patterns are solutions **to** problems, not solutions **finding** problems; so don't overthink.
- If used in a correct place in a correct manner, they can prove to be a savior; or else they can result in a horrible mess of a code.

- Also note that the code samples below are in Vala, however this shouldn't stop you because the concepts are same anyways. Plus the **support for other languages is underway**.

Types of Design Patterns
-------------------------

* :ref:`creational-design-patterns`
* :ref:`structural-design-patterns`
* :ref:`behavioral-design-patterns`

.. _creational-design-patterns:

Creational Design Patterns
==========================

In plain words
- Creational patterns are focused towards how to instantiate an object or group of related objects.

Wikipedia says
- In software engineering, creational design patterns are design patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by somehow controlling this object creation.

 * :ref:`simple-factory`
 * :ref:`factory-method`
 * :ref:`abstract-factory`
 * :ref:`builder`
 * :ref:`prototype`
 * :ref:`singleton`

.. _simple-factory:

🏠 Simple Factory
------------------
Real world example
- Consider, you are building a house and you need doors. It would be a mess if every time you need a door, you put on your carpenter clothes and start making a door in your house. Instead you get it made from a factory.

In plain words
- Simple factory simply generates an instance for client without exposing any instantiation logic to the client

Wikipedia says
- In object-oriented programming (OOP), a factory is an object for creating other objects – formally a factory is a function or method that returns objects of a varying prototype or class from some method call, which is assumed to be "new".

**Programmatic Example**

First of all we have a door interface and the implementation

.. literalinclude:: Patterns.md 
    :lines: 70-91
    :language: vala

Then we have our door factory that makes the door and returns it

.. literalinclude:: Patterns.md 
    :lines: 95-99
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md 
    :lines: 103-105
    :language: vala

**When to Use?**

When creating an object is not just a few assignments and involves some logic, it makes sense to put it in a dedicated factory instead of repeating the same code everywhere.

.. _factory-method:

🏭 Factory Method
------------------

Real world example
- Consider the case of a hiring manager. It is impossible for one person to interview for each of the positions. Based on the job opening, she has to decide and delegate the interview steps to different people.

In plain words
- It provides a way to delegate the instantiation logic to child classes.

Wikipedia says
- In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

**Programmatic Example**

Taking our hiring manager example above. First of all we have an interviewer interface and some implementations for it

.. literalinclude:: Patterns.md
    :lines: 129-143
    :language: vala

Now let us create our `HiringManager`

.. literalinclude:: Patterns.md
    :lines: 149-157
    :language: vala

Now any child can extend it and provide the required interviewer

.. literalinclude:: Patterns.md
    :lines: 162-172
    :language: vala

and then it can be used as

.. literalinclude:: Patterns.md
    :lines: 177-181
    :language: vala

**When to use?**

Useful when there is some generic processing in a class but the required sub-class is dynamically decided at runtime. Or putting it in other words, when the client doesn't know what exact sub-class it might need.

.. _abstract-factory:

🔨 Abstract Factory
--------------------

Real world example
- Extending our door example from Simple Factory. Based on your needs you might get a wooden door from a wooden door shop, iron door from an iron shop or a PVC door from the relevant shop. Plus you might need a guy with different kind of specialities to fit the door, for example a carpenter for wooden door, welder for iron door etc. As you can see there is a dependency between the doors now, wooden door needs carpenter, iron door needs a welder etc.

In plain words
- A factory of factories; a factory that groups the individual but related/dependent factories together without specifying their concrete classes.

Wikipedia says
- The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes

**Programmatic Example**

Translating the door example above. First of all we have our `Door` interface and some implementation for it

.. literalinclude:: Patterns.md
    :lines: 205-219
    :language: vala

Then we have some fitting experts for each door type

.. literalinclude:: Patterns.md
    :lines: 225-239
    :language: vala

Now we have our abstract factory that would let us make family of related objects i.e. wooden door factory would create a wooden door and wooden door fitting expert and iron door factory would create an iron door and iron door fitting expert

.. literalinclude:: Patterns.md
    :lines: 244-269
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 273-288
    :language: vala

As you can see the wooden door factory has encapsulated the `carpenter` and the `wooden door` also iron door factory has encapsulated the `iron door` and `welder`. And thus it had helped us make sure that for each of the created door, we do not get a wrong fitting expert.   

**When to use?**

When there are interrelated dependencies with not-that-simple creation logic involved

.. _builder:

👷 Builder
--------------------------------------------
Real world example

- Imagine you are at Hardee's and you order a specific deal, lets say, "Big Hardee" and they hand it over to you without *any questions*; this is the example of simple factory. But there are cases when the creation logic might involve more steps. For example you want a customized Subway deal, you have several options in how your burger is made e.g what bread do you want? what types of sauces would you like? What cheese would you want? etc. In such cases builder pattern comes to the rescue.

In plain words
- Allows you to create different flavors of an object while avoiding constructor pollution. Useful when there could be several flavors of an object. Or when there are a lot of steps involved in creation of an object.

Wikipedia says
- The builder pattern is an object creation software design pattern with the intentions of finding a solution to the telescoping constructor anti-pattern.

Having said that let me add a bit about what telescoping constructor anti-pattern is. At one point or the other we have all seen a constructor like below:

.. literalinclude:: Patterns.md
    :lines: 311, 312
    :language: vala

As you can see; the number of constructor parameters can quickly get out of hand and it might become difficult to understand the arrangement of parameters. Plus this parameter list could keep on growing if you would want to add more options in future. This is called telescoping constructor anti-pattern.

**Programmatic Example**

The sane alternative is to use the builder pattern. First of all we have our burger that we want to make

.. literalinclude:: Patterns.md
    :lines: 322-337
    :language: vala

And then we have the builder

.. literalinclude:: Patterns.md
    :lines: 343-378
    :language: vala

And then it can be used as:

.. literalinclude:: Patterns.md
    :lines: 383-387
    :language: vala

**When to use?**

When there could be several flavors of an object and to avoid the constructor telescoping. The key difference from the factory pattern is that; factory pattern is to be used when the creation is a one step process while builder pattern is to be used when the creation is a multi step process.

.. _prototype:

🐑 Prototype
------------
Real world example

- Remember dolly? The sheep that was cloned! Lets not get into the details but the key point here is that it is all about cloning

In plain words
- Create object based on an existing object through cloning.

Wikipedia says
- The prototype pattern is a creational design pattern in software development. It is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects.

In short, it allows you to create a copy of an existing object and modify it to your needs, instead of going through the trouble of creating an object from scratch and setting it up.

**Programmatic Example**

In Vala, there's no 'native', generic, shallow or deep, 'clone' method and this topic is a bit controversial, so we just implement a clone method that returns another instance of the same class with duplicated properties.

.. literalinclude:: Patterns.md
    :lines: 412-441
    :language: vala

Then it can be cloned like below

.. literalinclude:: Patterns.md
    :lines: 445-453
    :language: vala

**When to use?**

When an object is required that is similar to existing object or when the creation would be expensive as compared to cloning.

.. _singleton:

💍 Singleton
------------

Real world example
- There can only be one president of a country at a time. The same president has to be brought to action, whenever duty calls. President here is singleton.

In plain words
- Ensures that only one object of a particular class is ever created.

Wikipedia says
- In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system.

Singleton pattern is actually considered an anti-pattern and overuse of it should be avoided. It is not necessarily bad and could have some valid use-cases but should be used with caution because it introduces a global state in your application and change to it in one place could affect in the other areas and it could become pretty difficult to debug. The other bad thing about them is it makes your code tightly coupled plus it mocking the singleton could be difficult.

**Programmatic Example**

To create a singleton, make the constructor private, disable cloning, disable extension and create a static variable to house the instance

.. literalinclude:: Patterns.md
    :lines: 477-494
    :language: vala

Then in order to use

.. literalinclude:: Patterns.md
    :lines: 498-501
    :language: vala

.. _structural-design-patterns:

Structural Design Patterns
==========================
In plain words
- Structural patterns are mostly concerned with object composition or in other words how the entities can use each other. Or yet another explanation would be, they help in answering "How to build a software component?"

Wikipedia says
- In software engineering, structural design patterns are design patterns that ease the design by identifying a simple way to realize relationships between entities.

 * :ref:`adapter`
 * :ref:`bridge`
 * :ref:`composite`
 * :ref:`decorator`
 * :ref:`facade`
 * :ref:`flyweight`
 * :ref:`proxy`

.. _adapter:

🔌 Adapter
-----------
Real world example
- Consider that you have some pictures in your memory card and you need to transfer them to your computer. In order to transfer them you need some kind of adapter that is compatible with your computer ports so that you can attach memory card to your computer. In this case card reader is an adapter.
- Another example would be the famous power adapter; a three legged plug can't be connected to a two pronged outlet, it needs to use a power adapter that makes it compatible with the two pronged outlet.
- Yet another example would be a translator translating words spoken by one person to another

In plain words
- Adapter pattern lets you wrap an otherwise incompatible object in an adapter to make it compatible with another class.

Wikipedia says
- In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

**Programmatic Example**

Consider a game where there is a hunter and he hunts lions.

First we have an interface `Lion` that all types of lions have to implement

.. literalinclude:: Patterns.md
    :lines: 540-554
    :language: vala

And hunter expects any implementation of `Lion` interface to hunt.

.. literalinclude:: Patterns.md
    :lines: 558-562
    :language: vala

Now let's say we have to add a `WildDog` in our game so that hunter can hunt that also. But we can't do that directly because dog has a different interface. To make it compatible for our hunter, we will have to create an adapter that is compatible

.. literalinclude:: Patterns.md
    :lines: 568-585
    :language: vala

And now the `WildDog` can be used in our game using `WildDogAdapter`.

.. literalinclude:: Patterns.md
    :lines: 590-594
    :language: vala

.. _bridge:

🚡 Bridge
----------
Real world example
- Consider you have a website with different pages and you are supposed to allow the user to change the theme. What would you do? Create multiple copies of each of the pages for each of the themes or would you just create separate theme and load them based on the user's preferences? Bridge pattern allows you to do the second i.e.

.. image:: https://cloud.githubusercontent.com/assets/11269635/23065293/33b7aea0-f515-11e6-983f-98823c9845ee.png
   :height: 800
   :width: 1200
   :scale: 50
   :alt: With and without the bridge pattern

In Plain Words
- Bridge pattern is about preferring composition over inheritance. Implementation details are pushed from a hierarchy to another object with a separate hierarchy.

Wikipedia says
- The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction from its implementation so that the two can vary independently"

**Programmatic Example**

Translating our WebPage example from above. Here we have the `WebPage` hierarchy

.. literalinclude:: Patterns.md
    :lines: 615-642
    :language: vala

And the separate theme hierarchy

.. literalinclude:: Patterns.md
    :lines: 647-667
    :language: vala

And both the hierarchies

.. literalinclude:: Patterns.md
    :lines: 671-677
    :language: vala

.. _composite:

🌿 Composite
-----------------

Real world example
- Every organization is composed of employees. Each of the employees has the same features i.e. has a salary, has some responsibilities, may or may not report to someone, may or may not have some subordinates etc.

In plain words
- Composite pattern lets clients treat the individual objects in a uniform manner.

Wikipedia says
- In software engineering, the composite pattern is a partitioning design pattern. The composite pattern describes that a group of objects is to be treated in the same way as a single instance of an object. The intent of a composite is to "compose" objects into tree structures to represent part-whole hierarchies. Implementing the composite pattern lets clients treat individual objects and compositions uniformly.

**Programmatic Example**

Taking our employees example from above. Here we have different employee types

.. literalinclude:: Patterns.md
    :lines: 697-735
    :language: vala

Then we have an organization which consists of several different types of employees

.. literalinclude:: Patterns.md
    :lines: 741-757
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 763-772
    :language: vala


.. _decorator:

☕ Decorator
-------------

Real world example

- Imagine you run a car service shop offering multiple services. Now how do you calculate the bill to be charged? You pick one service and dynamically keep adding to it the prices for the provided services till you get the final cost. Here each type of service is a decorator.

In plain words
- Decorator pattern lets you dynamically change the behavior of an object at run time by wrapping them in an object of a decorator class.

Wikipedia says
- In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class. The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows functionality to be divided between classes with unique areas of concern.

**Programmatic Example**

Lets take coffee for example. First of all we have a simple coffee implementing the coffee interface

.. literalinclude:: Patterns.md
    :lines: 793-806
    :language: vala

We want to make the code extensible to allow options to modify it if required. Lets make some add-ons (decorators)

.. literalinclude:: Patterns.md
    :lines: 810-856
    :language: vala

Lets make a coffee now

.. literalinclude:: Patterns.md
    :lines: 862-876
    :language: vala

.. _facade:

📦 Facade
----------------

Real world example
- How do you turn on the computer? "Hit the power button" you say! That is what you believe because you are using a simple interface that computer provides on the outside, internally it has to do a lot of stuff to make it happen. This simple interface to the complex subsystem is a facade.

In plain words
- Facade pattern provides a simplified interface to a complex subsystem.

Wikipedia says
- A facade is an object that provides a simplified interface to a larger body of code, such as a class library.

**Programmatic Example**

Taking our computer example from above. Here we have the computer class

.. literalinclude:: Patterns.md
    :lines: 896-924
    :language: vala

Here we have the facade

.. literalinclude:: Patterns.md
    :lines: 928-947
    :language: vala

Now to use the facade

.. literalinclude:: Patterns.md
    :lines: 951-953
    :language: vala

.. _flyweight:

🍃 Flyweight
-------------

Real world example
- Did you ever have fresh tea from some stall? They often make more than one cup that you demanded and save the rest for any other customer so to save the resources e.g. gas etc. Flyweight pattern is all about that i.e. sharing.

In plain words
- It is used to minimize memory usage or computational expenses by sharing as much as possible with similar objects.

Wikipedia says
- In computer programming, flyweight is a software design pattern. A flyweight is an object that minimizes memory use by sharing as much data as possible with other similar objects; it is a way to use objects in large numbers when a simple repeated representation would use an unacceptable amount of memory.

**Programmatic example**

Translating our tea example from above. First of all we have tea types and tea maker

.. literalinclude:: Patterns.md
    :lines: 973-992
    :language: vala

Then we have the `TeaShop` which takes orders and serves them

.. literalinclude:: Patterns.md
    :lines: 998-1015
    :language: vala

And it can be used as below

.. literalinclude:: Patterns.md
    :lines: 1020-1030
    :language: vala

.. _proxy:

🎱 Proxy
-------------------
Real world example
- Have you ever used an access card to go through a door? There are multiple options to open that door i.e. it can be opened either using access card or by pressing a button that bypasses the security. The door's main functionality is to open but there is a proxy added on top of it to add some functionality. Let me better explain it using the code example below.

In plain words
- Using the proxy pattern, a class represents the functionality of another class.

Wikipedia says
- A proxy, in its most general form, is a class functioning as an interface to something else. A proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object, or can provide additional logic. In the proxy extra functionality can be provided, for example caching when operations on the real object are resource intensive, or checking preconditions before operations on the real object are invoked.

**Programmatic Example**

Taking our security door example from above. Firstly we have the door interface and an implementation of door

.. literalinclude:: Patterns.md
    :lines: 1049-1062
    :language: vala

Then we have a proxy to secure any doors that we want

.. literalinclude:: Patterns.md
    :lines: 1066-1088
    :language: vala

And here is how it can be used

.. literalinclude:: Patterns.md
    :lines: 1092-1096
    :language: vala

Yet another example would be some sort of data-mapper implementation. For example, I recently made an ODM (Object Data Mapper), in PHP, for MongoDB using this pattern where I wrote a proxy around mongo classes while utilizing the magic method `__call()`. All the method calls were proxied to the original mongo class and result retrieved was returned as it is but in case of `find` or `findOne` data was mapped to the required class objects and the object was returned instead of `Cursor`.

.. _behavioral-design-patterns:

Behavioral Design Patterns
==========================

In plain words
- It is concerned with assignment of responsibilities between the objects. What makes them different from structural patterns is they don't just specify the structure but also outline the patterns for message passing/communication between them. Or in other words, they assist in answering "How to run a behavior in software component?"

Wikipedia says
- In software engineering, behavioral design patterns are design patterns that identify common communication patterns between objects and realize these patterns. By doing so, these patterns increase flexibility in carrying out this communication.

* :ref:`chain-of-responsibility`
* :ref:`command`
* :ref:`iterator`
* :ref:`mediator`
* :ref:`memento`
* :ref:`observer`
* :ref:`visitor`
* :ref:`strategy`
* :ref:`state`
* :ref:`template-method`

.. _chain-of-responsibility:

🔗 Chain of Responsibility
---------------------------

Real world example
- For example, you have three payment methods (`A`, `B` and `C`) setup in your account; each having a different amount in it. `A` has 100 USD, `B` has 300 USD and `C` having 1000 USD and the preference for payments is chosen as `A` then `B` then `C`. You try to purchase something that is worth 210 USD. Using Chain of Responsibility, first of all account `A` will be checked if it can make the purchase, if yes purchase will be made and the chain will be broken. If not, request will move forward to account `B` checking for amount if yes chain will be broken otherwise the request will keep forwarding till it finds the suitable handler. Here `A`, `B` and `C` are links of the chain and the whole phenomenon is Chain of Responsibility.

In plain words
- It helps building a chain of objects. Request enters from one end and keeps going from object to object till it finds the suitable handler.

Wikipedia says
- In object-oriented design, the chain-of-responsibility pattern is a design pattern consisting of a source of command objects and a series of processing objects. Each processing object contains logic that defines the types of command objects that it can handle; the rest are passed to the next processing object in the chain.

**Programmatic Example**

Translating our account example above. First of all we have a base account having the logic for chaining the accounts together and some accounts

.. literalinclude:: Patterns.md
    :lines: 1137-1181
    :language: vala

Now let's prepare the chain using the links defined above (i.e. Bank, Paypal, Bitcoin)

.. literalinclude:: Patterns.md
    :lines: 1187-1212
    :language: vala

.. _command:

👮 Command
-----------

Real world example
- A generic example would be you ordering a food at restaurant. You (i.e. `Client`) ask the waiter (i.e. `Invoker`) to bring some food (i.e. `Command`) and waiter simply forwards the request to Chef (i.e. `Receiver`) who has the knowledge of what and how to cook.
- Another example would be you (i.e. `Client`) switching on (i.e. `Command`) the television (i.e. `Receiver`) using a remote control (`Invoker`).

In plain words
- Allows you to encapsulate actions in objects. The key idea behind this pattern is to provide the means to decouple client from receiver.

Wikipedia says
- In object-oriented programming, the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.

**Programmatic Example**

First of all we have the receiver that has the implementation of every action that could be performed

.. literalinclude:: Patterns.md
    :lines: 1232-1241
    :language: vala

then we have an interface that each of the commands are going to implement and then we have a set of commands

.. literalinclude:: Patterns.md
    :lines: 1245-1290
    :language: vala

Then we have an `Invoker` with whom the client will interact to process any commands

.. literalinclude:: Patterns.md
    :lines: 1294-1299
    :language: vala

Finally let's see how we can use it in our client

.. literalinclude:: Patterns.md
    :lines: 1303-1310
    :language: vala

Command pattern can also be used to implement a transaction based system. Where you keep maintaining the history of commands as soon as you execute them. If the final command is successfully executed, all good otherwise just iterate through the history and keep executing the `undo` on all the executed commands.


.. _iterator:

➿ Iterator
------------

Real world example
- An old radio set will be a good example of iterator, where user could start at some channel and then use next or previous buttons to go through the respective channels. Or take an example of MP3 player or a TV set where you could press the next and previous buttons to go through the consecutive channels or in other words they all provide an interface to iterate through the respective channels, songs or radio stations.  

In plain words
- It presents a way to access the elements of an object without exposing the underlying presentation.

Wikipedia says
- In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.

**Programmatic example**

In Vala we'll use Libgee which implements collections and derivatives, includind iterators. Translating our radio stations example from above. First of all we have `RadioStation`

.. literalinclude:: Patterns.md
    :lines: 1332-1342
    :language: vala

Then we have our iterator

.. literalinclude:: Patterns.md
    :lines: 1347-1382
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1386-1397
    :language: vala

.. _mediator:

👽 Mediator
------------

Real world example
- A general example would be when you talk to someone on your mobile phone, there is a network provider sitting between you and them and your conversation goes through it instead of being directly sent. In this case network provider is mediator.

In plain words
- Mediator pattern adds a third party object (called mediator) to control the interaction between two objects (called colleagues). It helps reduce the coupling between the classes communicating with each other. Because now they don't need to have the knowledge of each other's implementation.

Wikipedia says
- In software engineering, the mediator pattern defines an object that encapsulates how a set of objects interact. This pattern is considered to be a behavioral pattern due to the way it can alter the program's running behavior.

**Programmatic Example**

Here is the simplest example of a chat room (i.e. mediator) with users (i.e. colleagues) sending messages to each other.

First of all, we have the mediator i.e. the chat room

.. literalinclude:: Patterns.md
    :lines: 1419-1430
    :language: vala

Then we have our users i.e. colleagues

.. literalinclude:: Patterns.md
    :lines: 1435-1451
    :language: vala

And the usage

.. literalinclude:: Patterns.md
    :lines: 1455-1465
    :language: vala


.. _memento:

💾 Memento
-----------
Real world example
- Take the example of calculator (i.e. originator), where whenever you perform some calculation the last calculation is saved in memory (i.e. memento) so that you can get back to it and maybe get it restored using some action buttons (i.e. caretaker).

In plain words
- Memento pattern is about capturing and storing the current state of an object in a manner that it can be restored later on in a smooth manner.

Wikipedia says
- The memento pattern is a software design pattern that provides the ability to restore an object to its previous state (undo via rollback).

Usually useful when you need to provide some sort of undo functionality.

**Programmatic Example**

Lets take an example of text editor which keeps saving the state from time to time and that you can restore if you want.

First of all we have our memento object that will be able to hold the editor state

.. literalinclude:: Patterns.md
    :lines: 1488-1498
    :language: vala

Then we have our editor i.e. originator that is going to use memento object

.. literalinclude:: Patterns.md
    :lines: 1504-1522
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1528-1546
    :language: vala

.. _observer:

😎 Observer
------------
Real world example
- A good example would be the job seekers where they subscribe to some job posting site and they are notified whenever there is a matching job opportunity.   

In plain words
- Defines a dependency between objects so that whenever an object changes its state, all its dependents are notified.

Wikipedia says
- The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

**Programmatic example**

Translating our example from above. First of all we have job seekers that need to be notified for a job posting

.. literalinclude:: Patterns.md
    :lines: 1564-1593
    :language: vala

Then we have our job postings to which the job seekers will subscribe

.. literalinclude:: Patterns.md
    :lines: 1597-1613
    :language: vala

Then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1617-1631
    :language: vala

.. _visitor:

🏃 Visitor
-----------
Real world example
- Consider someone visiting Dubai. They just need a way (i.e. visa) to enter Dubai. After arrival, they can come and visit any place in Dubai on their own without having to ask for permission or to do some leg work in order to visit any place here; just let them know of a place and they can visit it. Visitor pattern lets you do just that, it helps you add places to visit so that they can visit as much as they can without having to do any legwork.

In plain words
- Visitor pattern lets you add further operations to objects without having to modify them.

Wikipedia says
- In object-oriented programming and software engineering, the visitor design pattern is a way of separating an algorithm from an object structure on which it operates. A practical result of this separation is the ability to add new operations to existing object structures without modifying those structures. It is one way to follow the open/closed principle.

**Programmatic example**

Let's take an example of a zoo simulation where we have several different kinds of animals and we have to make them Sound. Let's translate this using visitor pattern

.. literalinclude:: Patterns.md
    :lines: 1650-1660
    :language: vala

Then we have our implementations for the animals

.. literalinclude:: Patterns.md
    :lines: 1664-1692
    :language: vala

Let's implement our visitor

.. literalinclude:: Patterns.md
    :lines: 1696-1708
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1713-1721
    :language: vala

We could have done this simply by having a inheritance hierarchy for the animals but then we would have to modify the animals whenever we would have to add new actions to animals. But now we will not have to change them. For example, let's say we are asked to add the jump behavior to the animals, we can simply add that by creating a new visitor i.e.

.. literalinclude:: Patterns.md
    :lines: 1726-1738
    :language: vala

And for the usage

.. literalinclude:: Patterns.md
    :lines: 1742-1752
    :language: vala

.. _strategy:

💡 Strategy
------------

Real world example
- Consider the example of sorting, we implemented bubble sort but the data started to grow and bubble sort started getting very slow. In order to tackle this we implemented Quick sort. But now although the quick sort algorithm was doing better for large datasets, it was very slow for smaller datasets. In order to handle this we implemented a strategy where for small datasets, bubble sort will be used and for larger, quick sort.

In plain words
- Strategy pattern allows you to switch the algorithm or strategy based upon the situation.

Wikipedia says
- In computer programming, the strategy pattern (also known as the policy pattern) is a behavioural software design pattern that enables an algorithm's behavior to be selected at runtime.

**Programmatic example**

Translating our example from above. First of all we have our strategy interface and different strategy implementations

.. literalinclude:: Patterns.md
    :lines: 1772-1792
    :language: vala

And then we have our client that is going to use any strategy

.. literalinclude:: Patterns.md
    :lines: 1797-1807
    :language: vala

And it can be used as

.. literalinclude:: Patterns.md
    :lines: 1811-1818
    :language: vala

.. _state:

💢 State
---------
Real world example
- Imagine you are using some drawing application, you choose the paint brush to draw. Now the brush changes its behavior based on the selected color i.e. if you have chosen red color it will draw in red, if blue then it will be in blue etc.  

In plain words
- It lets you change the behavior of a class when the state changes.

Wikipedia says
- The state pattern is a behavioral software design pattern that implements a state machine in an object-oriented way. With the state pattern, a state machine is implemented by implementing each individual state as a derived class of the state pattern interface, and implementing state transitions by invoking methods defined by the pattern's superclass.
- The state pattern can be interpreted as a strategy pattern which is able to switch the current strategy through invocations of methods defined in the pattern's interface.

**Programmatic example**

Let's take an example of text editor, it lets you change the state of text that is typed i.e. if you have selected bold, it starts writing in bold, if italic then in italics etc.

First of all we have our state interface and some state implementations

.. literalinclude:: Patterns.md
    :lines: 1840-1861
    :language: vala

Then we have our editor

.. literalinclude:: Patterns.md
    :lines: 1865-1879
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1883-1901
    :language: vala

.. _template-method:

📒 Template Method
-------------------

Real world example
- Suppose we are getting some house built. The steps for building might look like
- - Prepare the base of house
- - Build the walls
- - Add roof
- - Add other floors

- The order of these steps could never be changed i.e. you can't build the roof before building the walls etc but each of the steps could be modified for example walls can be made of wood or polyester or stone.

In plain words
- Template method defines the skeleton of how a certain algorithm could be performed, but defers the implementation of those steps to the children classes.

Wikipedia says
- In software engineering, the template method pattern is a behavioral design pattern that defines the program skeleton of an algorithm in an operation, deferring some steps to subclasses. It lets one redefine certain steps of an algorithm without changing the algorithm's structure.

**Programmatic Example**

Imagine we have a build tool that helps us test, lint, build, generate build reports (i.e. code coverage reports, linting report etc) and deploy our app on the test server.

First of all we have our base class that specifies the skeleton for the build algorithm

.. literalinclude:: Patterns.md
    :lines: 1928-1943
    :language: vala

Then we can have our implementations

.. literalinclude:: Patterns.md
    :lines: 1949-1991
    :language: vala

And then it can be used as

.. literalinclude:: Patterns.md
    :lines: 1996-2012
    :language: vala

*********************************************************************

 **🚦 Wrap Up Folks**

And that about wraps it up. I will continue to improve this, so you might want to watch/star this repository to revisit. Also, I have plans on writing the same about the architectural patterns, stay tuned for it.

 **👬 Contribution**

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at kamranahmed.se@gmail.com or on twitter `@kamranahmedse <http://twitter.com/kamranahmedse>`_

 **License**

MIT © `Kamran Ahmed <http://kamranahmed.info>`_

Behavioral Design Patterns
==========================

In plain words > It is concerned with assignment of responsibilities
between the objects. What makes them different from structural patterns
is they don’t just specify the structure but also outline the patterns
for message passing/communication between them. Or in other words, they
assist in answering “How to run a behavior in software component?”

Wikipedia says > In software engineering, behavioral design patterns are
design patterns that identify common communication patterns between
objects and realize these patterns. By doing so, these patterns increase
flexibility in carrying out this communication.

-  `Chain of Responsibility <#chain-of-responsibility>`__
-  `Command <#command>`__
-  `Iterator <#iterator>`__
-  `Mediator <#mediator>`__
-  `Memento <#memento>`__
-  `Observer <#observer>`__
-  `Visitor <#visitor>`__
-  `Strategy <#strategy>`__
-  `State <#state>`__
-  `Template Method <#template-method>`__

.. _chain-of-responsibility:
🔗 Chain of Responsibility
--------------------------

Real world example > For example, you have three payment methods (``A``,
``B`` and ``C``) setup in your account; each having a different amount
in it. ``A`` has 100 USD, ``B`` has 300 USD and ``C`` having 1000 USD
and the preference for payments is chosen as ``A`` then ``B`` then
``C``. You try to purchase something that is worth 210 USD. Using Chain
of Responsibility, first of all account ``A`` will be checked if it can
make the purchase, if yes purchase will be made and the chain will be
broken. If not, request will move forward to account ``B`` checking for
amount if yes chain will be broken otherwise the request will keep
forwarding till it finds the suitable handler. Here ``A``, ``B`` and
``C`` are links of the chain and the whole phenomenon is Chain of
Responsibility.

In plain words > It helps building a chain of objects. Request enters
from one end and keeps going from object to object till it finds the
suitable handler.

Wikipedia says > In object-oriented design, the chain-of-responsibility
pattern is a design pattern consisting of a source of command objects
and a series of processing objects. Each processing object contains
logic that defines the types of command objects that it can handle; the
rest are passed to the next processing object in the chain.

**Programmatic Example**

Translating our account example above. First of all we have a base
account having the logic for chaining the accounts together and some
accounts

.. code:: vala

   public errordomain OurError {
       PAY_ERROR 
   }

   abstract class Account : Object {
       protected Account? successor = null;
       protected float balance;

       public void set_next (Account account) {
           successor = account;
       }

       public void pay (float ammount_to_pay) throws OurError {
           if (can_pay (ammount_to_pay)) {
               print ("Paid %f using %s\n", ammount_to_pay, get_type ().name ()); 
           } else if (successor != null) {
               print ("Cannot pay using %s, Proceeding ..\n", get_type ().name ()); 
               successor.pay (ammount_to_pay);
           } else {
                   throw new OurError.PAY_ERROR ("None of the accounts have enough balance");
           }
       }

       public bool can_pay (float ammount) {
           return balance >= ammount;
       }
   }

   class Bank : Account {
       public Bank (float balance) {
           this.balance = balance;
       }
   }

   class Paypal : Account {
       public Paypal (float balance) {
           this.balance = balance;
       }
   }

   class Bitcoin : Account {
       public Bitcoin (float balance) {
           this.balance = balance;
       }
   }

Now let’s prepare the chain using the links defined above (i.e. Bank,
Paypal, Bitcoin)

.. code:: vala

   // Let's prepare a chain like below
   //      $bank->$paypal->$bitcoin
   //
   // First priority bank
   //      If bank can't pay then paypal
   //      If paypal can't pay then bit coin

   var bank = new Bank (100);       // Bank with balance 100
   var paypal = new Paypal (200);   // Paypal with balance 200
   var bitcoin = new Bitcoin (300); // Bitcoin with balance 300

   bank.set_next (paypal);
   paypal.set_next (bitcoin);

   // Let's try to pay using the first priority i.e. bank
   try {
     bank.pay (259);
   } catch (OurError e) {
     stderr.printf ("%s\n", e.message);
   }

   // Output will be
   // ==============
   // Cannot pay using bank. Proceeding ..
   // Cannot pay using paypal. Proceeding ..:
   // Paid 259 using Bitcoin!

.. _command:
👮 Command
----------

Real world example > A generic example would be you ordering a food at
restaurant. You (i.e. ``Client``) ask the waiter (i.e. ``Invoker``) to
bring some food (i.e. ``Command``) and waiter simply forwards the
request to Chef (i.e. ``Receiver``) who has the knowledge of what and
how to cook. > Another example would be you (i.e. ``Client``) switching
on (i.e. ``Command``) the television (i.e. ``Receiver``) using a remote
control (``Invoker``).

In plain words > Allows you to encapsulate actions in objects. The key
idea behind this pattern is to provide the means to decouple client from
receiver.

Wikipedia says > In object-oriented programming, the command pattern is
a behavioral design pattern in which an object is used to encapsulate
all information needed to perform an action or trigger an event at a
later time. This information includes the method name, the object that
owns the method and values for the method parameters.

**Programmatic Example**

First of all we have the receiver that has the implementation of every
action that could be performed

.. code:: vala

   // Receiver
   class Bulb {
       public void turn_on () {
           print ("Bulb has been lit\n");
       }

       public void turn_off () {
           print ("Darkness!\n");
       }
   }

then we have an interface that each of the commands are going to
implement and then we have a set of commands

.. code:: vala

   interface Command {
       public abstract void execute ();
       public abstract void undo ();
       public abstract void redo ();
   }

   // Command
   class TurnOn : Command {
       protected Bulb bulb;

       public TurnOn (Bulb bulb) {
           this.bulb = bulb;
       }

       public void execute () {
           bulb.turn_on ();
       }

       public void undo () {
           bulb.turn_off ();
       }

       public void redo () {
           execute ();
       }
   }

   class TurnOff : Command {
       protected Bulb bulb;

       public TurnOff (Bulb bulb) {
           this.bulb = bulb;
       }

       public void execute () {
           bulb.turn_off ();
       }

       public void undo () {
           bulb.turn_on ();
       }

       public void redo () {
           execute ();
       }
   }

Then we have an ``Invoker`` with whom the client will interact to
process any commands

.. code:: vala

   // Invoker
   class RemoteControl {
       public void submit (Command command) {
           command.execute ();
       }
   }

Finally let’s see how we can use it in our client

.. code:: vala

   var bulb = new Bulb ();

   var turn_on = new TurnOn (bulb);
   var turn_off= new TurnOff (bulb);

   var remote = new RemoteControl ();
   remote.submit (turn_on); // Bulb has been lit!
   remote.submit (turn_off); // Darkness!

Command pattern can also be used to implement a transaction based
system. Where you keep maintaining the history of commands as soon as
you execute them. If the final command is successfully executed, all
good otherwise just iterate through the history and keep executing the
``undo`` on all the executed commands.

.. _iterator:
➿ Iterator
-----------

Real world example > An old radio set will be a good example of
iterator, where user could start at some channel and then use next or
previous buttons to go through the respective channels. Or take an
example of MP3 player or a TV set where you could press the next and
previous buttons to go through the consecutive channels or in other
words they all provide an interface to iterate through the respective
channels, songs or radio stations.

In plain words > It presents a way to access the elements of an object
without exposing the underlying presentation.

Wikipedia says > In object-oriented programming, the iterator pattern is
a design pattern in which an iterator is used to traverse a container
and access the container’s elements. The iterator pattern decouples
algorithms from containers; in some cases, algorithms are necessarily
container-specific and thus cannot be decoupled.

**Programmatic example**

In Vala we’ll use Libgee which implements collections and derivatives,
includind iterators. Translating our radio stations example from above.
First of all we have ``RadioStation``

.. code:: vala

   class RadioStation {
       protected float frequency;

       public RadioStation (float frequency) {
           this.frequency = frequency;
       }

       public float get_frequency () {
           return frequency;
       }
   }

Then we have our iterator

.. code:: vala

   using Gee; 

   class StationList : Object, Traversable<RadioStation>, Iterable<RadioStation> {
       protected ArrayList<RadioStation> stations = new ArrayList<RadioStation> ();
       
       public void add_station (RadioStation station) {
           stations.add (station);
       }

       public bool remove_station (RadioStation to_remove) {
           foreach (RadioStation station in stations) {
               if (station.get_frequency () == to_remove.get_frequency ()) {
                   stations.remove (station);
                   return true;
               }
           }

           return false;
       }

       public int count () {
           return stations.size;
       }

       public Type element_type {
           get { return typeof (RadioStation); }
       }

       public bool @foreach (ForallFunc<RadioStation> f) {
           return iterator ().foreach (f); 
       }

       public Iterator<RadioStation> iterator () {
           return stations.iterator ();
       }
   }

And then it can be used as

.. code:: vala

   var station_list = new StationList ();

   station_list.add_station (new RadioStation (89.0f));
   station_list.add_station (new RadioStation (101.0f));
   station_list.add_station (new RadioStation (102.0f));
   station_list.add_station (new RadioStation (103.2f));

   foreach (RadioStation r in station_list) {
     print ("%f\n", r.get_frequency ());
   }

   station_list.remove_station (new RadioStation (89.0f)); // Will remove station 89

.. _mediator:
👽 Mediator
-----------

Real world example > A general example would be when you talk to someone
on your mobile phone, there is a network provider sitting between you
and them and your conversation goes through it instead of being directly
sent. In this case network provider is mediator.

In plain words > Mediator pattern adds a third party object (called
mediator) to control the interaction between two objects (called
colleagues). It helps reduce the coupling between the classes
communicating with each other. Because now they don’t need to have the
knowledge of each other’s implementation.

Wikipedia says > In software engineering, the mediator pattern defines
an object that encapsulates how a set of objects interact. This pattern
is considered to be a behavioral pattern due to the way it can alter the
program’s running behavior.

**Programmatic Example**

Here is the simplest example of a chat room (i.e. mediator) with users
(i.e. colleagues) sending messages to each other.

First of all, we have the mediator i.e. the chat room

.. code:: vala

   interface ChatRoomMediator : Object {
       public abstract void show_message (User user, string message);
   }

   // Mediator
   class ChatRoom : Object, ChatRoomMediator {
       public void show_message (User user, string message) {
           var time = new DateTime.now_local ();
           var sender = user.get_name ();
           print ("%s [%s]:%s\n", time.to_string (), sender, message);
       }
   }

Then we have our users i.e. colleagues

.. code:: vala

   class User {
       protected string name;
       protected ChatRoomMediator chat_mediator;

       public User (string name, ChatRoomMediator chat_mediator) {
           this.name = name;
           this.chat_mediator = chat_mediator;
       }

       public string get_name () {
           return name;
       }

       public void send (string message) {
           chat_mediator.show_message (this, message);
       }
   }

And the usage

.. code:: vala

   var mediator = new ChatRoom ();

   var john = new User ("John Doe", mediator);
   var jane = new User ("Jane Dow", mediator);

   john.send ("Hi there!");
   jane.send ("Hey!");

   // Output will be similar to
   // Feb 14, 10:58 [John]: Hi there!
   // Feb 14, 10:58 [Jane]: Hey!

.. _memento:
💾 Memento
----------

Real world example > Take the example of calculator (i.e. originator),
where whenever you perform some calculation the last calculation is
saved in memory (i.e. memento) so that you can get back to it and maybe
get it restored using some action buttons (i.e. caretaker).

In plain words > Memento pattern is about capturing and storing the
current state of an object in a manner that it can be restored later on
in a smooth manner.

Wikipedia says > The memento pattern is a software design pattern that
provides the ability to restore an object to its previous state (undo
via rollback).

Usually useful when you need to provide some sort of undo functionality.

**Programmatic Example**

Lets take an example of text editor which keeps saving the state from
time to time and that you can restore if you want.

First of all we have our memento object that will be able to hold the
editor state

.. code:: vala

   class EditorMemento {
       protected string content;

       public EditorMemento (string content) {
           this.content = content;
       }

       public string get_content () {
           return content;
       }
   }

Then we have our editor i.e. originator that is going to use memento
object

.. code:: vala

   class Editor {
       protected string content = "";

       public void type (string words) {
           content = content + " " + words;
       }

       public string get_content () {
           return content;
       }

       public EditorMemento save () {
           return new EditorMemento (content);
       }

       public void restore (EditorMemento memento) {
           content = memento.get_content ();
       }
   }

And then it can be used as

.. code:: vala

   var editor = new Editor ();

   // Type some stuff
   editor.type ("This is the first sentence.");
   editor.type ("This is second."); 

   // Save the state to restore to : This is the first sentence. This is second.
   var saved = editor.save ();

   // Type some more
   editor.type ("And this is third.");

   // Output: Content before Saving
   print ("%s\n", editor.get_content ());

   // Restoring to last saved state
   editor.restore (saved);

   print ("%s\n", editor.get_content ());

.. _observer:
😎 Observer
-----------

Real world example > A good example would be the job seekers where they
subscribe to some job posting site and they are notified whenever there
is a matching job opportunity.

In plain words > Defines a dependency between objects so that whenever
an object changes its state, all its dependents are notified.

Wikipedia says > The observer pattern is a software design pattern in
which an object, called the subject, maintains a list of its dependents,
called observers, and notifies them automatically of any state changes,
usually by calling one of their methods.

**Programmatic example**

Translating our example from above. First of all we have job seekers
that need to be notified for a job posting

.. code:: vala

   interface Observer : Object {
   }

   interface Observable {
   }

   class JobPost {
       protected string title;

       public JobPost (string title) {
           this.title = title;
       }

       public string get_title () {
           return title;
       }
   }

   class JobSeeker : Object, Observer {
       protected string name;

       public JobSeeker (string name) {
           this.name = name;
       }

       public void on_job_posted (JobPost job) {
           // Do something with the job posting
           print ("Hi %s! New job posted: %s\n", name, job.get_title ()); 
       }
   }

Then we have our job postings to which the job seekers will subscribe

.. code:: vala

   class JobPostings : Observable {
       protected ArrayList<Observer> observers = new ArrayList<Observer> ();

       public void notify (JobPost job_posting) {
           foreach (Observer observer in observers) {
               ((JobSeeker) observer).on_job_posted (job_posting);
           }
       }

       public void attach (Observer observer) {
           observers.add (observer);
       }

       public void add_job (JobPost job_posting) {
           notify (job_posting);
       }
   }

Then it can be used as

.. code:: vala

   // Create subscribers
   var john_doe = new JobSeeker ("John Doe");
   var jane_doe = new JobSeeker ("Jane Doe");

   // Create publisher and attach subscribers
   var job_postings = new JobPostings ();
   job_postings.attach (john_doe);
   job_postings.attach (jane_doe);

   // Add a new job and see if subscribers get notified
   job_postings.add_job (new JobPost ("Software Engineer"));

   // Output
   // Hi John Doe! New job posted: Software Engineer
   // Hi Jane Doe! New job posted: Software Engineer

.. _visitor:
🏃 Visitor
----------

Real world example > Consider someone visiting Dubai. They just need a
way (i.e. visa) to enter Dubai. After arrival, they can come and visit
any place in Dubai on their own without having to ask for permission or
to do some leg work in order to visit any place here; just let them know
of a place and they can visit it. Visitor pattern lets you do just that,
it helps you add places to visit so that they can visit as much as they
can without having to do any legwork.

In plain words > Visitor pattern lets you add further operations to
objects without having to modify them.

Wikipedia says > In object-oriented programming and software
engineering, the visitor design pattern is a way of separating an
algorithm from an object structure on which it operates. A practical
result of this separation is the ability to add new operations to
existing object structures without modifying those structures. It is one
way to follow the open/closed principle.

**Programmatic example**

Let’s take an example of a zoo simulation where we have several
different kinds of animals and we have to make them Sound. Let’s
translate this using visitor pattern

.. code:: vala

   // Visitee
   interface Animal {
       public abstract void accept (AnimalOperation operation);
   }

   // Visitor
   interface AnimalOperation {
       public abstract void visit_monkey (Monkey monkey);
       public abstract void visit_lion (Lion lion);
       public abstract void visit_dolphin (Dolphin dolphin);
   }

Then we have our implementations for the animals

.. code:: vala

   class Monkey : Animal {
       public void shout () {
           print ("Ooh oo aa aa!\n"); 
       }

       public void accept (AnimalOperation operation) {
           operation.visit_monkey (this);
       }
   }

   class Lion : Animal {
       public void roar () {
           print ("Roaaar !\n"); 
       }

       public void accept (AnimalOperation operation) {
           operation.visit_lion (this);
       }
   }

   class Dolphin : Animal {
       public void speak () {
           print ("Tuut tuttu tuutt!\n"); 
       }

       public void accept (AnimalOperation operation) {
           operation.visit_dolphin (this);
       }
   }

Let’s implement our visitor

.. code:: vala

   class Speak : AnimalOperation {
       public void visit_monkey (Monkey monkey) {
           monkey.shout ();
       }

       public void visit_lion (Lion lion) {
           lion.roar ();
       }

       public void visit_dolphin (Dolphin dolphin) {
           dolphin.speak ();
       }
   }

And then it can be used as

.. code:: vala

       var monkey = new Monkey ();
       var lion = new Lion ();
       var dolphin = new Dolphin ();

       var speak = new Speak ();

       monkey.accept (speak);  // Ooh oo aa aa! 
       lion.accept (speak);    // Roaaar!
       dolphin.accept (speak); // Tuut tutt tuutt!

We could have done this simply by having a inheritance hierarchy for the
animals but then we would have to modify the animals whenever we would
have to add new actions to animals. But now we will not have to change
them. For example, let’s say we are asked to add the jump behavior to
the animals, we can simply add that by creating a new visitor i.e.

.. code:: vala

   class Jump : AnimalOperation {
       public void visit_monkey (Monkey monkey) {
           print ("Jumped 20 feet high! on to the tree!\n");
       }

       public void visit_lion (Lion lion) {
           print ("Jumped 7 feet! Back on the ground!\n");
       }

       public void visit_dolphin (Dolphin dolphin) {
           print ("Walked on water a little and disappeared\n");
       }
   }

And for the usage

.. code:: vala

   var jump = new Jump ();

   monkey.accept (speak);  // Ooh oo aa aa! 
   monkey.accept (jump);   // Jumped 20 feet high! on to the tree!


   lion.accept (speak);    // Roaaar!
   lion.accept (jump);     // Jumped 7 feet! Back on the ground!

   dolphin.accept (speak); // Tuut tutt tuutt!
   dolphin.accept (jump);  // Walked on water a little and disappeared

.. _strategy:
💡 Strategy
-----------

Real world example > Consider the example of sorting, we implemented
bubble sort but the data started to grow and bubble sort started getting
very slow. In order to tackle this we implemented Quick sort. But now
although the quick sort algorithm was doing better for large datasets,
it was very slow for smaller datasets. In order to handle this we
implemented a strategy where for small datasets, bubble sort will be
used and for larger, quick sort.

In plain words > Strategy pattern allows you to switch the algorithm or
strategy based upon the situation.

Wikipedia says > In computer programming, the strategy pattern (also
known as the policy pattern) is a behavioural software design pattern
that enables an algorithm’s behavior to be selected at runtime.

**Programmatic example**

Translating our example from above. First of all we have our strategy
interface and different strategy implementations

.. code:: vala

   interface SortStrategy : Object {
       public abstract int[] sort (int[] dataset);
   }

   class BubbleSortStrategy : Object, SortStrategy {
       public int[] sort (int[] dataset) {
           print ("Sorting using bubble sort\n");
           
           //do sorting
           return dataset;
       }
   }

   class QuickSortStrategy : Object, SortStrategy {
       public int[] sort (int[] dataset) {
           print ("Sorting using quick sort\n");
           
           //do sorting
           return dataset;
       }
   }

And then we have our client that is going to use any strategy

.. code:: vala

   class Sorter {
       protected SortStrategy sorter;

       public Sorter (SortStrategy sorter) {
           this.sorter = sorter;
       }
       
       public int[] sort (int[] dataset) {
           return sorter.sort (dataset);
       }
   }

And it can be used as

.. code:: vala

   int[] dataset = {1, 5, 4, 3 ,2, 8};

   var sorter = new Sorter (new BubbleSortStrategy ());
   sorter.sort (dataset); // output : sorting using bubble sort


   sorter = new Sorter (new QuickSortStrategy ());
   sorter.sort (dataset); // Output : Sorting using quick sort

.. _state:
💢 State
--------

Real world example > Imagine you are using some drawing application, you
choose the paint brush to draw. Now the brush changes its behavior based
on the selected color i.e. if you have chosen red color it will draw in
red, if blue then it will be in blue etc.

In plain words > It lets you change the behavior of a class when the
state changes.

Wikipedia says > The state pattern is a behavioral software design
pattern that implements a state machine in an object-oriented way. With
the state pattern, a state machine is implemented by implementing each
individual state as a derived class of the state pattern interface, and
implementing state transitions by invoking methods defined by the
pattern’s superclass. > The state pattern can be interpreted as a
strategy pattern which is able to switch the current strategy through
invocations of methods defined in the pattern’s interface.

**Programmatic example**

Let’s take an example of text editor, it lets you change the state of
text that is typed i.e. if you have selected bold, it starts writing in
bold, if italic then in italics etc.

First of all we have our state interface and some state implementations

.. code:: vala

   interface WritingState : Object {
       public abstract void write (string words);
   }

   class UpperCase : Object, WritingState {
       public void write (string words) {
           print ("%s\n", words.up ());
       }
   }

   class LowerCase : Object, WritingState {
       public void write (string words) {
           print ("%s\n", words.down ());
       }
   }


   class Default : Object, WritingState {
       public void write (string words) {
           print ("%s\n", words);
       }
   }

Then we have our editor

.. code:: vala

   class TextEditor {
       protected WritingState state;

       public TextEditor (WritingState state) {
           this.state = state;
       }

       public void set_state (WritingState state) {
           this.state = state;
       }

       public void type (string words) {
           state.write (words);
       }
   }

And then it can be used as

.. code:: vala

   var editor = new TextEditor (new Default ());

   editor.type ("First line");

   editor.set_state (new UpperCase ());

   editor.type ("Second line");
   editor.type ("Third line");

   editor.set_state (new LowerCase ());
   editor.type ("Fourth line");
   editor.type ("Fifth line");

   // Output:
   // First line
   // SECOND LINE
   // THIRD LINE
   // fourth line
   // fifth line

.. _template-method:
📒 Template Method
------------------

Real world example > Suppose we are getting some house built. The steps
for building might look like > - Prepare the base of house > - Build the
walls > - Add roof > - Add other floors

   The order of these steps could never be changed i.e. you can’t build
   the roof before building the walls etc but each of the steps could be
   modified for example walls can be made of wood or polyester or stone.

In plain words > Template method defines the skeleton of how a certain
algorithm could be performed, but defers the implementation of those
steps to the children classes.

Wikipedia says > In software engineering, the template method pattern is
a behavioral design pattern that defines the program skeleton of an
algorithm in an operation, deferring some steps to subclasses. It lets
one redefine certain steps of an algorithm without changing the
algorithm’s structure.

**Programmatic Example**

Imagine we have a build tool that helps us test, lint, build, generate
build reports (i.e. code coverage reports, linting report etc) and
deploy our app on the test server.

First of all we have our base class that specifies the skeleton for the
build algorithm

.. code:: vala

   abstract class Builder {

       // Template method
       public void build()
       {
           this.test();
           this.lint();
           this.assemble();
           this.deploy();
       }

       public abstract void test();
       public abstract void lint();
       public abstract void assemble();
       public abstract void deploy();
   }

Then we can have our implementations

.. code:: vala

   class AndroidBuilder : Builder {
       public override void test()
       {
           print ("Running android tests\n");
       }

       public override void lint()
       {
           print ("Linting the android code\n");
       }

       public override void assemble()
       {
           print ("Assembling the android build\n");
       }

       public override void deploy()
       {
           print ("Deploying android build to server\n");
       }
   }

   class IosBuilder : Builder {
       public override void test()
       {
           print ("Running ios tests\n");
       }

       public override void lint()
       {
           print ("Linting the ios code\n");
       }

       public override void assemble()
       {
           print ("Assembling the ios build\n");
       }

       public override void deploy()
       {
           print ("Deploying ios build to server\n");
       }
   }

And then it can be used as

.. code:: vala

   var android_builder = new AndroidBuilder();
   android_builder.build ();

   // Output:
   // Running android tests
   // Linting the android code
   // Assembling the android build
   // Deploying android build to server

   var ios_builder = new IosBuilder ();
   ios_builder.build ();

   // Output:
   // Running ios tests
   // Linting the ios code
   // Assembling the ios build
   // Deploying ios build to server
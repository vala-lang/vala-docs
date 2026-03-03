# Threading

## Check Thread Support

Originally, UNIX did not have threads.
That means some traditional UNIX APIs are problematic in threaded programs.

Using the following statements, which could check whether the
current environment supports threads:
In most cases, it can be omitted.

```vala
void main() {
    // Some code
    if (!Thread.supported()) {
        error("Cannot run without thread support.\n");
    }
    // Some code
}
```

For brevity, It will be omitted in the rest of following code.

## Simple

```vala
int question(){
    // Some complex calculations ^^ 
    for (var i = 0; i < 3; i++){
        stdout.printf(".");
        Thread.usleep (800000);
        stdout.flush ();
    }
    return 42;
}

void main() {
    stdout.printf("The Ultimate Question of Life, the Universe, and Everything");

    // Generic parameter is the type of return value
    var thread = new Thread<int> ("question", question);

    stdout.printf(@" $(thread.join ())\n");
}
```

```shell
vala simple.vala
```

## Threads With Context

```vala
class MyThread {
    private string name;
    private int count = 0;

    public MyThread (string name) {
        this.name = name;
    }

    public void thread_func () {
        while (true) {
            stdout.printf ("%s: %i\n", this.name, this.count);
            this.count++;
            Thread.usleep (Random.int_range (0, 200000));
        }
    }
}

void main () {
    var thread_a_data = new MyThread ("A");
    var thread_b_data = new MyThread ("B");

    // Start two threads
    var thread_a = new Thread<void> ("thread_a", thread_a_data.thread_func);
    var thread_b = new Thread<void> ("thread_b", thread_b_data.thread_func);

    // Wait for threads to finish (this will never happen in our case, but anyway)
    thread_a.join ();
    thread_b.join ();
}
```

```shell
vala threads.vala
```

## Synchronization With Mutex and Cond

This is an implementation of the [dining philosophers problem](http://en.wikipedia.org/wiki/Dining_philosophers_problem), a classic multi-process synchronization problem.

```vala
/** Fork pool used by the philosophers */
class Forks {
    private bool[] fork = new bool[5]; // initially false, i.e. not used
    private Cond cond = Cond ();
    private Mutex mutex = Mutex ();

    // Try to pick up the forks with the designated numbers
    public void pick_up (int left, int right) {
        mutex.lock ();
        while (fork[left] || fork[right]) {
            cond.wait (mutex);
        }
        fork[left] = true;
        fork[right] = true;
        mutex.unlock ();
    }

    // Lay down the forks with the designated numbers
    public void lay_down (int left, int right) {
        mutex.lock ();
        fork[left] = false;
        fork[right] = false;
        cond.broadcast ();
        mutex.unlock ();
    }
}

/** A dining philosopher */
class Philosopher {

    private int number;                          // this philosopher's number
    private int think_delay;                     // how long does this philosopher think?
    private int eat_delay;                       // how long does this philosopher eat?
    private int left;                            // left fork number
    private int right;                           // right fork number
    private static Forks forks = new Forks ();   // forks used by all philosophers

    public Philosopher (int number, int think_delay, int eat_delay) {
        this.number = number;
        this.think_delay = think_delay;
        this.eat_delay = eat_delay;
        this.left = number == 0 ? 4 : number - 1;
        this.right = (number + 1) % 5;
    }

    public void run () {
        while (true) {
            Thread.usleep (think_delay);
            forks.pick_up (left, right);
            stdout.printf ("Philosopher %d starts eating...\n", number);
            Thread.usleep (eat_delay);
            forks.lay_down (left, right);
            stdout.printf ("Philosopher %d stops eating...\n", number);
        }
    }
}

void main () {
    Philosopher[] philos = {
        new Philosopher (0, 100000, 500000),
        new Philosopher (1, 200000, 400000),
        new Philosopher (2, 300000, 300000),
        new Philosopher (3, 400000, 200000),
        new Philosopher (4, 500000, 100000)
    };

    foreach (var philosopher in philos) {
        new Thread<void> (null, philosopher.run);
    }

    new MainLoop().run();
}
```

```shell
vala philosophers.vala
```

## Communcation between two threads using async queues

In this example data is sent from one thread to another.
This is done via GLib's AsyncQueue. The pop and push functions of
AsyncQueue provide built-in locking.

```vala
class ThreadCommunication {
    private const int NUMBER_OF_MESSAGES = 200000;
    private AsyncQueue<DataBox> async_queue;

    public ThreadCommunication () {
        this.async_queue = new AsyncQueue<DataBox> ();
    }

    // data object for sending
    private class DataBox {
        public int number { get; private set; }
        public string name { get; private set; }

        public DataBox (int number, string name) {
            this.number = number;
            this.name = name;
        }
    }

    private void writing_func () {
        var timer = new Timer ();
        timer.start ();
        for (int i = 0; i < NUMBER_OF_MESSAGES; i++) {
            // prepare an object to send
            var databox = new DataBox (i, @"some text for value $i");
            async_queue.push (databox);
        }
        // show time result
        print ("Pushed %d DataBoxes into AsyncQueue in %f s\n", NUMBER_OF_MESSAGES, timer.elapsed ());
    }

    private void reading_func () {
        var timer = new Timer ();
        timer.start ();
        for (int i = 0; i < NUMBER_OF_MESSAGES; i++) {
            // receive a message from the queue
            var databox = async_queue.pop ();

            // make sure the content is right
            assert (i == databox.number);
            assert (@"some text for value $i" == databox.name);

            // show one of the strings
            if ((NUMBER_OF_MESSAGES / 2) == databox.number) {
                print ("\tNO: %d \tTEXT: %s\n", databox.number, databox.name);
            }
        }
        // show time result
        print ("Popped %d DataBoxes from AsyncQueue in %f s\n", NUMBER_OF_MESSAGES, timer.elapsed ());
    }

    public void run () {
        var thread_a = new Thread<void> ("thread_a", writing_func);
        var thread_b = new Thread<void> ("thread_b", reading_func);

        // Wait until the threads finish
        thread_a.join ();
        thread_b.join ();
    }
}

void main () {
    var thread_comm = new ThreadCommunication ();
    thread_comm.run ();
}
```

```shell
vala async-queue-test.vala
```

## Thread Pool

```vala
class Worker {
    public string thread_name { private set; get; }
    public int x_times { private set; get; }
    public int priority { private set; get; }

    public Worker (string name, int x, int priority) {
        this.priority = priority;
        this.thread_name = name;
        this.x_times = x;
    }

    public void run () {
        for (int i = 0; i < this.x_times; i++) {
            print ("%s: %d/%d\n", this.thread_name, i + 1, this.x_times);
            // wait for a second.
            Thread.usleep (1000000);
        }
    }
}

void main () {
    try {
        ThreadPool<Worker> pool = new ThreadPool<Worker>.with_owned_data ((worker) => {
            // Call worker.run () on thread-start
            worker.run ();
        }, 3, false);

        // Define a priority (otpional)
        pool.set_sort_function ((worker1, worker2) => {
            // A simple priority-compare, qsort-style
            return (worker1.priority < worker2.priority) ? -1 :
            (int) (worker1.priority > worker2.priority);
        });

        // Assign some tasks:
        pool.add (new Worker ("Thread 1", 5, 4));
        pool.add (new Worker ("Thread 2", 10, 3));
        pool.add (new Worker ("Thread 4", 5, 2));
        pool.add (new Worker ("Thread 5", 5, 1));

        uint waiting = pool.unprocessed (); // unfinished workers = 4
        uint allowed = pool.get_max_threads (); // max running threads = 3
        uint running = pool.get_num_threads (); // running threads = 3
        print ("%u/%u threads are running, %u outstanding.\n", running, allowed, waiting);
    } catch (ThreadError e) {
        print ("ThreadError: %s\n", e.message);
    }
}
```

```vala
vala threadpool.vala
```

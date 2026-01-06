# 4.6. Multi-Threading

## 4.6.1. Threads in Vala

A program written in Vala may have more than one thread of execution,
allowing it to do more than one thing at a time. Exactly how this is
managed is outside of Vala's scope - threads may be sharing a single
processor core or not, depending on the environment.

A very simplified example:

```vala
void thread_func() {
    stdout.printf("child_thread is running.\n");
}

void main() {
    if (!Thread.supported()) {
        error("Cannot run without thread support.\n");
    }
    var thread = new Thread<void> ("child_thread", thread_func);
    stdout.printf("main_thread is running");
}
```

::: info Note

Notice the test at the start of the main method.

Originally, UNIX did not have threads, which means some traditional UNIX
APIs are problematic in threaded programs.

Using this test could check whether the current environment supports
threads.

In most cases, it can be omitted.
:::

Now look at the following statement:

```vala
var thread = new Thread<void> ("new_thread", thread_func);
```

We create a new thread, and it will start immediately. The first argument
is its name,the second one is the content of the new thread. The generic
parameter is the type of value which a thread returns.

The program will still not act as we expected, because we just Without
any sort of event loop, a Vala program will terminate when its
primary/root/parent thread (the one created to run "main") ends. In
order to control this behaviour, you can allow threads to cooperate.
This can be done powerfully using event loops and asynchronous queues,
but in this introduction to threading we will just show the basic
capabilities of threads.

The child thread will be killed if its primary/parent thread has
finished. According to this fact, we should tell the primary thread to
wait for child threads to finish, by invoking a method `join` in module
`Thread`.

```vala
// ......
var thread = new Thread<void> ("child_thread", thread_func);
stdout.printf("main_thread is running");
thread.join();   // Note
```

Because of the method `join`, the primary thread has to wait for child
thread to finish.

What's more, it is possible for a thread to tell the system that it
currently has no need to execute, and thereby suggest that another
thread should be run instead, this is done using the static method
*Thread.yield()*. If this statement was placed at the end of the above
*main* method, the runtime system will pause the main thread for an
instant and check if there are other threads that can be run - on
finding the newly created thread in a runnable state, it will run that
instead until it is finished - and the program will act is it appears it
should. However, there is no guarantee that this will happen still. The
system is able to decide when threads run, and as such might not allow
the new thread to finish before the primary thread is restarted and the
program ends.

All these examples have a potential problem, in that the newly created
thread doesn't know the context in which it should run. In C you would
supply the thread creation method with some data, in Vala instead you
would normally pass an instance method, instead of a static method.

More samples in [Threading Samples](https://wiki.gnome.org/Projects/Vala/ThreadingSamples).

## 4.6.2. Resource Control

Whenever more than one thread of execution is running simultaneously,
there is a chance that data are accessed simultaneously. This can lead
to race conditions, where the outcome depends on when the system decides
to switch between threads.

In order to control this situation, you can use the `lock` keyword to
ensure that certain blocks of code will not be interrupted by other
threads that need to access the same data. The best way to show this is
probably with an example:

```vala
public class Test : GLib.Object {

    private int a { get; set; }

    public void action_1() {
        lock (a) {
            int tmp = a;
            tmp++;
            a = tmp;
        }
    }

    public void action_2() {
        lock (a) {
            int tmp = a;
            tmp--;
            a = tmp;
        }
    }
}
```

This class defines two methods, where both need to change the value of
"a". If there were no lock statements here, it would be possible for
the instructions in these methods to be interweaved, and the resulting
change to "a" would be effectively random. As there are the `lock`
statements here, Vala will guarantee that if one thread has locked
"a", another thread that needs the same lock will have to wait its
turn.

In Vala, it is only possible to lock members of the object that is
executing the code. This might appear to be a major restriction, but in
fact the standard use for this technique should involve classes that are
individually responsible for controlling a resource, and so all locking
will indeed be internal to the class. Likewise, in above example all
accesses to "a" are encapsulated in the class.

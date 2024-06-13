Asynchronous Methods
====================

Asynchronous methods are methods whose execution can be paused and
resumed under the control of the programmer.  They are often used in
the main thread of an application where a method needs to wait for an
external slow task to complete, but must not stop other processing from
happening.  (For example, one slow operation must not freeze the whole GUI).
When the method has to wait, it gives control of the CPU back to its
caller (i.e. it *yields*), but it arranges to be called back to resume
execution when data becomes ready. External slow tasks that async
methods might wait for include: waiting for data from a remote server,
or waiting for calculations in another thread to complete, or waiting
for data to load from a disk drive.

Asynchronous methods are normally used with a GLib main loop running,
because idle callbacks are used to handle some of the internal
callbacks.  However under certain conditions ``async`` may be used
without the GLib main loop, for example if the async methods always
yield and ``Idle.add()`` is never used.

.. todo::

   Add the exact conditions ``async`` may be used
   without the GLib main loop

Asynchronous methods are designed for interleaving the processing of
many different long-lived operations within a single thread. They do
not by themselves spread the load out over different threads. However,
an async method may be used to control a background thread and to wait
for it to complete, or to queue operations for a background thread to
process.

Async methods in Vala use the GIO library to handle the callbacks, so
must be built with the ``--pkg=gio-2.0`` option.

An asynchronous method is defined with the ``async`` keyword.  For
example:

.. code-block:: vala

   async void display_jpeg(string fnam) {
       // Load JPEG in a background thread and display it when loaded
       [...]
   }


or:

.. code-block:: vala

   async int fetch_webpage(string url, out string text) throws IOError {
       // Fetch a webpage asynchronously and when ready return the
       // HTTP status code and put the page contents in 'text'
       [...]
       text = result;
       return status;
   }

The method may take arguments and return a value like any other
method.  It may use a ``yield`` statement at any time to give control of
the CPU back to its caller.

An async method may be called with either of these two forms:

.. code-block:: vala

   display_jpeg.begin("test.jpg");
   display_jpeg.begin("test.jpg", (obj, res) => {
       display_jpeg.end(res);
   });

Both forms starts the async method running with the given arguments.
The second form in addition registers an !AsyncReadyCallback which is
executed when the method finishes. The callback
takes a source object, ``obj``, and an instance of GAyncResult, ``res``,
as arguments. In the callback the ``.end()`` method should be called to receive the
return value of the asynchronous method if it has one. If the async
method can throw an exception, the ``.end()`` call is where the
exception arrives and must be caught. If the method has ``out``
arguments, then these should be omitted from the ``.begin()`` call and
added to the ``.end()`` call instead.

For example:

.. code-block:: vala

   fetch_webpage.begin("http://www.example.com/", (obj, res) => {
       try {
           string text;
           var status = fetch_webpage.end(res, out text);
           // Result of call is in 'text' and 'status' ...
       } catch (IOError e) {
           // Problem ...
       }
   });

When an asynchronous method starts running, it takes control of the
CPU until it reaches its first ``yield`` statement, at which point it
returns to the caller. When the method is resumed, it continues
execution immediately after that ``yield`` statement.  There are several
common ways to use ``yield``:

This form gives up control, but arranges for the GLib main loop to
resume the method when there are no more events to process:

.. code-block:: vala

   Idle.add(fetch_webpage.callback);
   yield;

This form gives up control, and stores the callback details for some
other code to use to resume the method's execution:

.. code-block:: vala

   SourceFunc callback = fetch_webpage.callback;
   [... store 'callback' somewhere ...]
   yield;

Some code elsewhere must now call the stored !SourceFunc in order for
the method to be resumed.  This could be done by scheduling the GLib
main loop to run it:

.. code-block:: vala

   Idle.add((owned) callback);

or alternatively a direct call may be made if the caller is running in
the main thread:

.. code-block:: vala

   callback();

If the direct call above is used, then the resumed asynchronous method
takes control of the CPU immediately and runs until its next ``yield``
before returning to the code that executed ``callback()``.  The
``Idle.add()`` method is useful if the callback must be made from a
background thread, e.g. to resume the async method after completion of
some background processing.  (The ``(owned)`` cast is necessary to avoid
a warning about copying delegates.)

The third common way of using ``yield`` is when calling another
asynchronous method, for example:

.. code-block:: vala

   yield display_jpeg(fnam);

or

.. code-block:: vala

   var status = yield fetch_webpage(url, out text);

In both cases, the calling method gives up control of the CPU and does
not resume until the called method completes.  The ``yield`` statement
automatically registers a callback with the called method to make sure
that the caller resumes correctly. The automatic callback also
collects the return value from the called method.

When this ``yield`` statement executes, control of the CPU first passes
to the called method which runs until its first ``yield`` and then drops
back to the calling method, which completes the ``yield`` statement
itself, and then gives back control to its own caller.

Examples
--------

See `Async Method Samples <https://wiki.gnome.org/Projects/Vala/AsyncSamples>`_ for examples of different ways that async may be used.


Resource Disposing
==================

C#: destructors are non-deterministic, implement ``IDisposable`` instead,
resource control with ``using``

.. code-block:: csharp

   class MyResource : IDisposable
   {
       public void Dispose()
       {
           // ...
       }
   }
   /* Usage: */
   using (var res = new MyResource()) {
       // ...
   }

Vala: destructors are deterministic, you can implement the `RAII <https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization>`_
pattern with destructor

.. code-block:: vala

   class MyResource : Object {
       ~MyResource () {
           // ...
       }
   }
   /* Usage: */
   {
       var res = new MyResource ();
       // ...
   }

Resource is disposed as soon as it goes out of scope.
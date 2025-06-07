Argument Checking
=================

C#

.. code-block:: csharp

   void Method(double d, int i, Foo foo)
   {
       if (d < 0 || d > 1.0)
           throw new ArgumentOutOfRangeException();
       if (i < 0 || i > 10)
           throw new ArgumentOutOfRangeException();
       if (foo == null)
           throw new ArgumentNullException();
       // ...
   }

Vala: reference type parameters are implicitly checked for ``null`` unless they
are marked nullable with ``?``, so you don't have to check them manually.
Methods may have preconditions:

.. code-block:: vala

   void method (double d, int i, Foo foo)
        requires (d >= 0.0 && d <= 1.0)
        requires (i >= 0 && i <= 10)
   {
       // ...
   }

Vala additionally supports postcontditions for checking the return value:

.. code-block:: vala

   int square (int i)
       ensures (result >= 0)
   {
       return i * i;
   }

``result`` is a special variable representing the return value.

Use exceptions (errors) for recoverable runtime errors (database errors, I/O
errors), use preconditions and assertions (``assert (...)``) for programming
errors such as illegal arguments.
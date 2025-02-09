Exceptions
==========

C#: unchecked exceptions, class-based

.. code-block:: csharp

   [Serializable()]
   public class MyException : System.Exception
   {
       public MyException() { }
       public MyException(string message) { }
       public MyException(string message, System.Exception inner) { }
       protected MyException(System.Runtime.Serialization.SerializationInfo info,
                             System.Runtime.Serialization.StreamingContext context) { }
   }

   void Method()
   {
       throw new MyException("not enough foo");
   }
   try {
       Method();
   } catch (MyException e) {
       Console.Error.WriteLine(e.Message);
   }

Vala: checked exceptions, Vala terminology: `errors`, not class-based, no wrapping

.. code-block:: vala

   // error domain with multiple error codes instead of exception class
   errordomain MyError {
       FOO,
       BAR
   }

   // must be declared in method signature, part of the contract
   void method () throws MyError {
       // error domain, error code, error message
       throw new MyError.FOO ("not enough foo");
   }
   // must be catched or propagated, compiler warning if ignored
   try {
       method ();
   } catch (MyError e) {
       stderr.printf ("Error: %s\n", e.message);
   }

Although the compiler emits warnings for ignored errors it does not abort the
compilation process. This allows prototyping without proper error handling and
will hopefully prevent forgotten empty catch blocks.
Error Handling
==============

GLib has a system for managing runtime exceptions called GError. Vala translates this into a form familiar to modern programming languages, but its implementation means it is not quite the same as in Java or C#. It is important to consider when to use this type of error handling - GError is very specifically designed to deal with recoverable runtime errors, i.e. factors that are not known until the program is run on a live system, and that are not fatal to the execution.  You should not use GError for problems that can be foreseen, such as reporting that an invalid value has been passed to a method.  If a method, for example, requires a number greater than 0 as a parameter, it should fail on negative values using contract programming techniques such as preconditions or assertions described in the previous section.

Vala errors are so-called *checked exceptions*, which means that errors must get handled at some point.  However, if you don't catch an error the Vala compiler will only issue a warning without stopping the compilation process.

Using exceptions (or *errors* in Vala terminology) is a matter of:

1) Declaring that a method may raise an error:

.. code-block:: vala
   void my_method() throws IOError {
       // ...
   }

2) Throwing the error when appropriate:

.. code-block:: vala

   if (something_went_wrong) {
       throw new IOError.FILE_NOT_FOUND("Requested file could not be found.");
   }

3) Catching the error from the calling code:

.. code-block:: vala

   try {
       my_method();
   } catch (IOError e) {
       stdout.printf("Error: %s\n", e.message);
   }

4) Comparing error code by "is" operator

.. code-block:: vala

   IOChannel channel;
   try {
       channel = new IOChannel.file("/tmp/my_lock", "w");
   } catch (FileError e) {
       if(e is FileError.EXIST) {
           throw e;
       }
       GLib.error("", e.message);
   }

All this appears more or less as in other languages, but defining the types of errors allowed is fairly unique.  Errors have three components, known as "domain", "code" and message. Messages we have already seen, it is simply a piece of text provided when the error is created. Error domains describe the type of problem, and equates to a subclass of "Exception" in Java or similar. In the above examples we imagined an error domain called "``IOError``".  The third part, the error code is a refinement describing the exact variety of problem encountered. Each error domain has one or more error codes - in the example there is a code called "FILE_NOT_FOUND".

The way to define this information about error types is related to the implementation in glib.  In order for the examples here to work, a definition is needed such as:

.. code-block:: vala

   errordomain IOError {
       FILE_NOT_FOUND
   }

When catching an error, you give the error domain you wish to catch errors in, and if an error in that domain is thrown, the code in the handler is run with the error assigned to the supplied name.  From that error object you can extract the error code and message as needed. If you want to catch errors from more than one domain, simply provide extra ``catch`` blocks.  There is also an optional block that can be placed after a ``try`` and any ``catch`` blocks, called ``finally``. This code is to be run always at the end of the section, regardless of whether an error was thrown or any catch blocks were executed, even if the error was in fact no handled and will be thrown again. This allows, for example, any resources reserved in the try block be freed regardless of any errors raised. A complete example of these features:

.. code-block:: vala

   public errordomain ErrorType1 {
       CODE_1A
   }

   public errordomain ErrorType2 {
       CODE_2A,
       CODE_2B
   }

   public class Test : GLib.Object {
       public static void thrower() throws ErrorType1, ErrorType2 {
           throw new ErrorType1.CODE_1A("Error");
       }

       public static void catcher() throws ErrorType2 {
           try {
               thrower();
           } catch (ErrorType1 e) {
               // Deal with ErrorType1
           } finally {
               // Tidy up
           }
       }

       public static int main(string[] args) {
           try {
               catcher();
           } catch (ErrorType2 e) {
               // Deal with ErrorType2
               if (e is ErrorType2.CODE_2B) {
                   // Deal with this code
               }
           }
           return 0;
       }
   }

This example has two error domains, both of which can be thrown by the "thrower" method.  Catcher can only throw the second type of error, and so must handle the first type if "thrower" throws it. Finally the "main" method will handle any errors from "catcher".


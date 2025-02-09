External Methods
================

C#

.. code-block:: csharp

   using System;
   using System.Runtime.InteropServices;

   public class MainClass
   {
       [DllImport("libfoo.so")]
       public static extern int SampleMethod(int x);

       static void Main()
       {
           Console.WriteLine("SampleMethod() returns {0}", SampleMethod(5));
       }
   }

Vala: ``CCode`` attribute, specify original function name (only if it differs
from the Vala name)

.. code-block:: vala

   public class MainClass : Object {

       [CCode (cname = "SampleMethod")]
       public static extern int sample_method (int x);

       static void main () {
           stdout.printf ("sample_method () returns %d\n", sample_method (5));
       }
   }

Pass library name to the compiler with ``-X -l...`` (with ``-X`` meaning the next option
is passed through to the C compiler)

.. code-block:: bash

   $ valac demo.vala -X -lfoo

You can also pass a C source file containing the external method to the Vala
compiler. This allows for mixed Vala and C source code projects.

.. code-block:: bash

   $ valac demo.vala foo.c
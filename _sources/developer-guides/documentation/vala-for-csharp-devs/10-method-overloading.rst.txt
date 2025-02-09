Method Overloading
==================

C#

.. code-block:: csharp

   class Demo
   {
       public void Draw(string text) { }

       public void Draw(Shape shape) { }


       /* Method overloading + chaining for convenience methods with less arguments */

       void F(int x, string s, double z) { }

       void F(int x, string s)
       {
           F(x, s, 0.5);
       }

       void F(int x)
       {
           F(x, "hello");
       }
   }

Vala: no method overloading, use different names instead or default values for arguments

.. code-block:: vala

   class Demo : Object {

       public void draw_text (string text) {
       }

       public void draw_shape (Shape shape) {
       }

       /* Argument default values, available in Vala, planned for C# 4.0 */
       void f (int x, string s = "hello", double z = 0.5) {
       }
   }
Methods
=========

Method overloading
-------------------

Java:

.. code-block:: java

    public class Demo {
        public void draw(String text) { }
        public void draw(Shape shape) { }
        
        /* Method overloading + chaining for convenience methods with less arguments */
        void f(int x, String s, double z) { }
        void f(int x, String s) {
            f(x, s, 0.5);
        }
        void f(int x) {
            f(x, "hello");
        }
    }

Vala:

.. code-block:: vala

    public class Demo : Object {
        public void draw_text (string text) {
        }
        public void draw_shape (Shape shape) {
        }
        
        /* Method with argument default values */
        void f (int x, string s = "hello", double z = 0.5) {
        }
    }

Vala does not support method overloading because libraries written in Vala are intended to be usable by C programmers as well with meaningful function names.


Method overriding
-------------------

Java:

.. code-block:: java

    public class Super {
        public int myMethod(int x, int y) { }
        public final void anotherMethod() { }
    }
    
    public class Sub extends Super {
        @Override
        public int myMethod(int x, int y) {
            super.myMethod(x, y);
            // ...
        }
    }

Vala:

.. code-block:: vala

    public class Super : Object {
        public virtual int my_method (int x, int y) { }
        public void another_method () { }
    }
    
    public class Sub : Super {
        public override int my_method (int x, int y) {
            base.my_method (x, y);
            // ...
        }
    }

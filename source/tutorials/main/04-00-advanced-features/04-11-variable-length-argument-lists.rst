Variable-Length Argument Lists
==============================

Vala supports C-style variable-length argument lists ("varargs") for methods.  They are declared with an ellipsis ("...") in the method signature.  A method with varargs requires at least one fixed argument:

.. code-block:: vala

   void method_with_varargs(int x, ...) {
       var l = va_list();
       string s = l.arg();
       int i = l.arg();
       stdout.printf("%s: %d\n", s, i);
   }

In this example ``x`` is a fixed argument to meet the requirements.  You obtain the varargs list with ``va_list()``.  Then you can retrieve the arguments one after another by calling the generic method ``arg<T>()`` sequently on this list, with T being the type that the argument should be interpreted as.  If the type is evident from the context (as in our example) the type is inferred automatically and you can just call ``arg()`` without the generic type argument.

This example parses an arbitrary number of *string - double* argument pairs:

.. code-block:: vala

   void method_with_varargs(int fixed, ...) {
       var l = va_list();
       while (true) {
           string? key = l.arg();
           if (key == null) {
               break;  // end of the list
           }
           double val = l.arg();
           stdout.printf("%s: %g\n", key, val);
       }
   }

   void main() {
       method_with_varargs(42, "foo", 0.75, "bar", 0.25, "baz", 0.32);
   }

It checks for *null* as a sentinel to recognize the end of the varargs list. Vala always implicitly passes *null* as the last argument of a varargs method call.

Varargs have a serious drawback that you should be aware of: they are not type-safe. The compiler can't tell you whether you are passing arguments of the right type to the method or not. That's why you should consider using varargs only if you have a good reason, for example: providing a convenience function for C programmers using your Vala library, binding a C function. Often an array argument is a better choice.

A common pattern with varargs is to expect alternating *string - value* pairs as arguments, usually meaning *gobject property - value*. In this case you can write *property: value* instead, e.g.:

.. code-block:: vala

   actor.animate (AnimationMode.EASE_OUT_BOUNCE, 3000, x: 100.0, y: 200.0, rotation_angle_z: 500.0, opacity: 0);

is equivalent to:

.. code-block:: vala

   actor.animate (AnimationMode.EASE_OUT_BOUNCE, 3000, "x", 100.0, "y", 200.0, "rotation-angle-z", 500.0, "opacity", 0);


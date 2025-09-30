Shared Context Delegates
========================

When multiple delegates are passed, they sometimes share a context pointer:

.. code-block:: c

   void foo(void *context, void(*x)(int a, void *context), void(*y)(double a, void *context));

Here, `x` and `y` are meant to share context, but Vala's delegates do not have a way of expressing this. However, there is a work around:

.. code-block:: vala

   [CCode (simple_generics = true, has_target = false)]
   public void X<T> (int a, T context);
   [CCode (simple_generics = true, has_target = false)]
   public void Y<T> (double a, T context);
   [CCode (simple_generics = true)]
   public void foo<T> (T context, X<T> x, Y<T> y);


This does not easily permit passing a lambda, but it does make passing a class or struct rather practical.

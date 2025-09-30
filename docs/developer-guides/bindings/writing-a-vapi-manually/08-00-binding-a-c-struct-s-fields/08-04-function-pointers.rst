Function Pointers
=================

Fields that are function pointers have more complexity depending on ownership and targeting. If a delegate is targetless then it can be treated as a simple type and no ownership considerations are needed.

If a delegate has a target then the C structure must have an holder for the target:

.. code-block:: c

   typedef void(*foo_func)(int a, void *userdata);
   
   typedef struct {
       foo_func callback;
       void *callback_context;
   } foo;

.. code-block:: vala

   [CCode (cname = "foo_func")]
   public delegate void FooFunc(int a);
   
   public struct Foo {
       [CCode (delegate_target_cname = "callback_context")]
       public unowned FooFunc callback;
   }


Check for nullability as per usual.

Ownership is slightly more complex as there must be a field to hold a function that will free the context data. In GLib terminology, this is a destroy notification.

.. code-block:: c

   typedef void(*foo_func)(int a, void *userdata);
   
   typedef struct {
       foo_func callback;
       void *callback_context;
       void(*callback_free)(void*);
   } foo;

.. code-block:: vala

   [CCode (cname = "foo_func")]
   public delegate void FooFunc(int a);
   
   public struct Foo {
       [CCode (delegate_target_cname = "callback_context", delegate_target_destroy_notify_cname = "callback_free")]
       public FooFunc callback;
   }

If the function pointer will be called exactly once and calling it should result in destruction of the context then use ``scope = "async"``.

.. code-block:: c

   typedef void(*start_job)(int priority, void *context);
   
   void threadpool_queue_job(Pool *p, start_job j, void *context);

.. code-block:: vala

   [CCode (scope = "async", cname = "start_job")]
   public delegate void StartJob (int priority);
   
   public class ThreadPool {
       public void queue_job (StartJob j);
   }


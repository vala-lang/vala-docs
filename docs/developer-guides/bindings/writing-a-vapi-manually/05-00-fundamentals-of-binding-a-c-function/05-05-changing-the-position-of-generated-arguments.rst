Changing the Position of Generated Arguments
============================================

The default behaviour of Vala is to keep the position of arguments in a Vala caller the same as the position of parameters in the C function callee. Where an argument is not explicit on the Vala side, for example instance data, Vala assumes it will be in a certain position. Instance data is assumed to be the first parameter of the C function, but this can be changed via the ``instance_pos`` CCode attribute to any position. The Vala position system is used for the instance position (``instance_pos``), array length position (``array_length_pos``), delegate target position (``delegate_target_pos``), and can even be used to reorder parameters (``pos``).

Vala's positioning system is a little confusing at first, so it bears explanation. 
Suppose we have a Vala function as follows:

.. code-block:: vala

   public class Foo {
       public delegate int Transform (double a);
       public int[] compute (int x, Transform t);
   }

The generated signature for ``compute`` will be:

.. code-block:: c

   int *foo_compute(Foo self, int x, foo_transform t, void *t_userdata, int *array_len)

I have marked the parameters that occur verbatim in Vala with their positions. From Vala's perspective, the position of self must be less than 1. Similarly, ``t_userdata`` must be greater than 2, and ``array_len`` must be greater than ``t_userdata`` for this ordering to make sense. Vala allows floating point values to describe this ordering. Once can think of ``self`` as having position 0, ``t``'s context as having position 2.1, and the returned array length as having position 2.2. This is just one possible set of values. It could also be 0.9, 2.5, 2.8, respectively, and produce the same result.

By default, Vala will set the instance to be 0, any array length to be the position of the array plus 0.1, any delegate's target to be the position of the delegate plus 0.1, any destructor for an owned delegate to be the position of the delegate plus 0.2.

If the order does not suit the C function, it is possible to reorder them using appropriate values, however you must keep the total order clean in your mind.

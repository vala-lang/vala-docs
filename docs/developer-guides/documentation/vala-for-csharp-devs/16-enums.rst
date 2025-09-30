Enums
=====

Vala enums may have methods:

.. code-block:: vala

   enum Season {
       SPRING, SUMMER, AUTUMN, WINTER;

       public bool is_hot () {
           return this == SUMMER;
       }
   }

In C# this can only be achieved by extension methods:

.. code-block:: csharp

   enum Season { Spring, Summer, Autumn, Winter }

   static class SeasonExtensions
   {
       public static bool IsHot(this Season season)
       {
           return season == Season.Summer;
       }
   }
Methods that Destroy the Instance Reference
===========================================

If a method destroys the instance (that is, frees it) it can be marked with the ``DestroysInstance`` attribute. The method must return void. Although in most cases such a method would be bound as the ``free_function`` of the compact class.

If a function destroys an instance but provides a useable return value, instead, bind it as a static method which takes an owned variable for the instance:

.. code-block:: c

   typedef struct transaction Transaction;
   Transaction begin_tx(Database *db);
   void transaction_abort(Transaction *tx);
   void transaction_commit(Transaction *tx);
   bool transaction_try_commit(Transaction *tx);


.. code-block:: vala

   [Compact]
   [CCode (cname = "Transaction", free_function = "transaction_abort")]
   public class Transaction {
       public Transaction (Database db);
       [DestroysInstance]
       public void commit ();
       public static bool try_commit (owned Transaction tx);
   }

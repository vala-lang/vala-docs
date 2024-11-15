Naming Conventions
==================

Java
----

* classes, interfaces, enums: ``CamelCase``
* methods, local variables, fields: ``mixedCamelCase``
* constants, enum values: ``UPPER_CASE``

Example:

.. code-block:: java

    public class MyClass {
        private static final int MAX_VALUE = 100;
        private String myField;
        
        public void myMethod() {
            int localVariable = 42;
        }
    }

Vala
----

* classes, interfaces, structs, enums, delegate types, namespaces: ``CamelCase``
* methods, local variables, fields, properties, signals: ``lower_case``
* constants, enum values: ``UPPER_CASE``

Example:

.. code-block:: vala

    public class MyClass {
        private const int MAX_VALUE = 100;
        private string my_field;
        
        public void my_method() {
            int local_variable = 42;
        }
    }

No non-ASCII letters for identifiers allowed. You can use Vala keywords as identifiers if you prefix them with ``@``. The at sign is not considered as part of the name.

With Statement
==============

.. danger::

   Experimental Feature

The with statement creates data type scoped blocks which allow implicit member access to the given expression or declaration statement.

    with ( [ var | unowned var | type-name) identifier = ] expression ) embedded_statement

.. code-block:: vala

    struct Color {
        int red;
        int green;
        int blue;
    }

    void main()
    {
        Color c = {255, 0, 0};

        print ("red: %d, green: %d, blue: %d\n", c.red, c.green, c.blue);
        with (c) {
            red = 1;
            green = 2;
            blue = 3;
        }
        print ("red: %d, green: %d, blue: %d\n", c.red, c.green, c.blue);
    }


The with statement is a convenient way to access members of a struct or class without having to prefix them with the object name. The with statement is not recommended for use in new code, as it can make the code harder to read and understand.

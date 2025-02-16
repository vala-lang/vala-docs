Inheritance
===========

Java: ``extends``, ``implements``::

    public class Demo extends Foo implements Bar {
        public Demo() {
            super();
        }
    }

Vala: colon followed by comma separated list, both for super class and interfaces::

    public class Demo : Foo, Bar {
        public Demo () {
            base ();
        }
    }

``super`` is called ``base`` in Vala.

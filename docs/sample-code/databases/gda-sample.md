# GNOME Data Access sample (Libgda)

Open an SQLite database through Libgda, create tables, insert rows, and run `SELECT` queries built with `Gda.SqlBuilder`. Adapted from the archived GNOME Wiki page [Projects/Vala/GDA](https://wiki.gnome.org/Projects/Vala/GDA).

The program expects to use (or create) a SQLite database file named `test.db` in the current working directory, matching the default connection string `SQLite://DB_DIR=.;DB_NAME=test`.

You need Libgda 5.x (or newer), its Vala bindings, and `libxml-2.0` as used by the VAPI. If your distribution splits GIR/VAPI packages, install the development package that provides `libgda-5.0.vapi`.

```vala
/* file: gda-sample.vala */
using Gda;

namespace Test {

    class SelectQuery : Object {
        public string field { set; get; default = "*"; }
        public string table { set; get; default = "test"; }
        public Connection connection { set; get; }

        public DataModel get_table_contents ()
            throws Error
            requires (this.connection.is_opened ())
        {
            stdout.printf ("Building query...\n");
            var b = new SqlBuilder (SqlStatementType.SELECT);
            b.select_add_field (this.field, null, null);
            b.select_add_target (this.table, null);
            var s = b.get_statement ();
            stdout.printf ("Executing...\n");
            return this.connection.statement_execute_select (s, null);
        }
    }

    class DataBase : Object {
        public string provider { set; get; default = "SQLite"; }
        public string constr { set; get; default = "SQLite://DB_DIR=.;DB_NAME=test"; }
        public Connection cnn;

        public void open () throws Error {
            stdout.printf ("Opening Database connection...\n");
            this.cnn = Connection.open_from_string (null, this.constr, null, ConnectionOptions.NONE);
        }

        public void create_tables ()
            throws Error
            requires (this.cnn.is_opened ())
        {
            stdout.printf ("Creating and populating data...\n");
            this.run_query ("CREATE TABLE test (description string, notes string)");
            this.run_query ("INSERT INTO test (description, notes) VALUES (\"Test description 1\", \"Some notes\")");
            this.run_query ("INSERT INTO test (description, notes) VALUES (\"Test description 2\", \"Some additional notes\")");

            this.run_query ("CREATE TABLE table1 (city string, notes string)");
            this.run_query ("INSERT INTO table1 (city, notes) VALUES (\"Mexico\", \"Some place to live\")");
            this.run_query ("INSERT INTO table1 (city, notes) VALUES (\"New York\", \"A new place to live\")");
        }

        public int run_query (string query)
            throws Error
            requires (this.cnn.is_opened ())
        {
            stdout.printf ("Executing query: [%s]\n", query);
            return this.cnn.execute_non_select_command (query);
        }
    }

    class App : Object {
        public DataBase db;

        public App () {
            this.db = new DataBase ();
        }

        public void test_initdb ()
            throws Error
        {
            stdout.printf ("Test: Opening and initializing Database ...\n");
            try {
                db.open ();
                db.create_tables ();
            } catch (Error e) {
                stdout.printf ("ERROR: '%s'\n", e.message);
            }
        }

        public void test_builder ()
            throws Error
            requires (this.db.cnn.is_opened ())
        {
            stdout.printf ("Test: GdaSqlBuilder...\n");
            var q = new SelectQuery ();
            q.connection = this.db.cnn;

            this.show_data (q);

            q.field = "notes";
            this.show_data (q);

            q.table = "table1";
            this.show_data (q);

            q.field = "*";
            this.show_data (q);
        }

        public void show_data (SelectQuery q)
            throws Error
            requires (this.db.cnn.is_opened ())
        {
            try {
                var m = q.get_table_contents ();
                stdout.printf ("Table: '%s'\n%s", q.table, m.dump_as_string ());
            } catch (GLib.Error e) {
                stdout.printf ("ERROR: '%s'\n", e.message);
            }
        }

        public static int main (string[] args) {
            stdout.printf ("GNOME Data Access Vala Demo\n");
            var a = new App ();
            try {
                a.test_initdb ();
            } catch (GLib.Error e) {
                stdout.printf ("ERROR: '%s'\n", e.message);
            }
            try {
                a.test_builder ();
            } catch (GLib.Error e) {
                stdout.printf ("ERROR: '%s'\n", e.message);
            }
            return 0;
        }
    }
}
```

## Compile

For Libgda 5.0:

```shell
valac --pkg libgda-5.0 --pkg libxml-2.0 -o gda-sample gda-sample.vala
```

Use the VAPI that matches your installed Libgda (for example `libgda-6.0` on some systems) if `libgda-5.0` is not available.

## Run

Run from the directory where you want `test.db` to be created (or where it already exists):

```shell
./gda-sample
```

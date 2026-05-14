# SQLite sample (sqlite3)

Run SQL against an existing database file with `sqlite3_exec`, and iterate result rows with a prepared statement. Adapted from the archived GNOME Wiki page [Projects/Vala/SqliteSample](https://wiki.gnome.org/Projects/Vala/SqliteSample).

The first example is based on the [SQLite quickstart](https://www.sqlite.org/quickstart.html) callback style. The second uses `prepare_v2` and `step` instead of a callback. Compared to the wiki, error checks use `Sqlite.OK` rather than comparing to `1`, and the prepared-statement example uses `int main` so it can return a proper exit status.

## Execute SQL with a callback

```vala
/**
 * Using SQLite in Vala sample code.
 * Port of an example found on the SQLite site.
 * https://www.sqlite.org/quickstart.html
 */

using GLib;
using Sqlite;

public class SqliteSample : GLib.Object {

    public static int callback (int n_columns, string[] values,
                                string[] column_names)
    {
        for (int i = 0; i < n_columns; i++) {
            stdout.printf ("%s = %s\n", column_names[i], values[i]);
        }
        stdout.printf ("\n");

        return 0;
    }

    public static int main (string[] args) {
        Database db;
        int rc;

        if (args.length != 3) {
            stderr.printf ("Usage: %s DATABASE SQL-STATEMENT\n", args[0]);
            return 1;
        }

        if (!FileUtils.test (args[1], FileTest.IS_REGULAR)) {
            stderr.printf ("Database %s does not exist or is directory\n", args[1]);
            return 1;
        }

        rc = Database.open (args[1], out db);

        if (rc != Sqlite.OK) {
            stderr.printf ("Can't open database: %d, %s\n", rc, db.errmsg ());
            return 1;
        }

        rc = db.exec (args[2], callback, null);
        /* Or use a closure to capture locals:
        rc = db.exec (args[2], (n_columns, values, column_names) => {
            for (int i = 0; i < n_columns; i++) {
                stdout.printf ("%s = %s\n", column_names[i], values[i]);
            }
            stdout.printf ("\n");
            return 0;
        }, null);
        */

        if (rc != Sqlite.OK) {
            stderr.printf ("SQL error: %d, %s\n", rc, db.errmsg ());
            return 1;
        }

        return 0;
    }
}
```

## Retrieve rows with a prepared statement

```vala
using GLib;
using Sqlite;

int main (string[] args) {
    Database db;
    Statement stmt;
    int rc;
    int col, cols;

    if (args.length != 3) {
        stderr.printf ("Usage: %s DATABASE SQL-STATEMENT\n", args[0]);
        return 1;
    }

    rc = Database.open (args[1], out db);
    if (rc != Sqlite.OK) {
        stderr.printf ("Can't open database: %d, %s\n", rc, db.errmsg ());
        return 1;
    }

    rc = db.prepare_v2 (args[2], -1, out stmt, null);
    if (rc != Sqlite.OK) {
        stderr.printf ("SQL error: %d, %s\n", rc, db.errmsg ());
        return 1;
    }

    cols = stmt.column_count ();
    do {
        rc = stmt.step ();
        switch (rc) {
        case Sqlite.DONE:
            break;
        case Sqlite.ROW:
            for (col = 0; col < cols; col++) {
                string txt = stmt.column_text (col);
                stdout.printf ("%s = %s\n", stmt.column_name (col), txt);
            }
            break;
        default:
            stderr.printf ("Error: %d, %s\n", rc, db.errmsg ());
            break;
        }
    } while (rc == Sqlite.ROW);

    return 0;
}
```

## Create a small database for testing

```shell
sqlite3 testdb << EOF
CREATE TABLE tbl (data TEXT, num DOUBLE);
INSERT INTO tbl VALUES ('First row', 10);
INSERT INTO tbl VALUES ('Second row', 20);
EOF
```

## Compile and run

First example (save as `sqlite-exec-sample.vala`):

```shell
valac --pkg sqlite3 -o sqlite-exec-sample sqlite-exec-sample.vala
./sqlite-exec-sample testdb "select * from tbl"
```

Second example (save as `sqlite-statement-sample.vala`):

```shell
valac --pkg sqlite3 -o sqlite-statement-sample sqlite-statement-sample.vala
./sqlite-statement-sample testdb "select * from tbl"
```

Example output from the statement-based program:

```text
data = First row
num = 10.0
data = Second row
num = 20.0
```

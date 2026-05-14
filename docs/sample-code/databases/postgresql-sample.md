# PostgreSQL sample (libpq)

Connect to a PostgreSQL server, run commands inside a transaction, and print rows from `pg_database` using a cursor, similar to the libpq C tutorial flow. Adapted from the archived GNOME Wiki page [Projects/Vala/PostgreSQL](https://wiki.gnome.org/Projects/Vala/PostgreSQL).

You need the Vala `libpq` binding, PostgreSQL client libraries, and a reachable server (local or remote). The default connection string is `dbname = postgres` if you do not pass one on the command line.

```vala
/**
 * PostgreSQL / libpq sample.
 *
 * Compile:
 *   valac --pkg libpq -X -lpq -o postgresql-sample postgresql-sample.vala
 */

using GLib;
using Postgres;

public static int main (string[] args) {
    string conninfo;

    if (args.length > 1) {
        conninfo = args[1];
    } else {
        conninfo = "dbname = postgres";
    }

    Database conn = Postgres.connect_db (conninfo);

    if (conn.get_status () != ConnectionStatus.OK) {
        stderr.printf ("Connection to database failed: %s\n", conn.get_error_message ());
        return 1;
    }

    Result res = conn.exec ("BEGIN");
    if (res.get_status () != ExecStatus.COMMAND_OK) {
        stderr.printf ("BEGIN command failed: %s\n", conn.get_error_message ());
        return 1;
    }

    res = conn.exec ("DECLARE myportal CURSOR FOR select * from pg_database");
    if (res.get_status () != ExecStatus.COMMAND_OK) {
        stderr.printf ("DECLARE CURSOR failed: %s\n", conn.get_error_message ());
        return 1;
    }

    res = conn.exec ("FETCH ALL in myportal");
    if (res.get_status () != ExecStatus.TUPLES_OK) {
        stderr.printf ("FETCH ALL failed: %s\n", conn.get_error_message ());
        return 1;
    }

    int n_fields = res.get_n_fields ();
    for (int i = 0; i < n_fields; i++) {
        stdout.printf ("%-15s", res.get_field_name (i));
    }
    stdout.printf ("\n\n");

    for (int i = 0; i < res.get_n_tuples (); i++) {
        for (int j = 0; j < n_fields; j++) {
            stdout.printf ("%-15s", res.get_value (i, j));
        }
        stdout.printf ("\n");
    }

    ConnectionOptions opt = Postgres.get_default_options ();
    stdout.printf ("label=%s, keyword=%s\n", opt.label, opt.keyword);

    stdout.printf ("db=%s, user=%s, passwd=%s, host=%s, port=%s, tty=%s, options=%s\n",
                   conn.get_db (), conn.get_user (), conn.get_passwd (),
                   conn.get_host (), conn.get_port (), conn.get_tty (),
                   conn.get_options ());

    res = conn.exec ("CLOSE myportal");
    res = conn.exec ("END");

    return 0;
}
```

## Compile and run

```shell
valac --pkg libpq -X -lpq -o postgresql-sample postgresql-sample.vala
./postgresql-sample
```

Pass a [libpq connection URI](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) or keyword/value string if the default is not appropriate:

```shell
./postgresql-sample "host=localhost dbname=myapp user=myuser"
```

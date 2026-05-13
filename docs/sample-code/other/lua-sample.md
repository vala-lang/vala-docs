# Lua embedding sample

Examples for driving [Lua](https://www.lua.org/) from Vala using the `lua` VAPI, adapted from the archived GNOME Wiki page [Projects/Vala/LuaSample](https://wiki.gnome.org/Projects/Vala/LuaSample).

Install Lua development files so the compiler can find headers and `pkg-config` data (often `lua-devel` or `liblua5.1-dev`).

## Calling Vala from Lua

```vala
using Lua;

int my_func (LuaVM vm) {
    stdout.printf ("Vala called from Lua (%f)\n", vm.to_number (1));
    return 1;
}

void main (string[] args) {
    string code = """
        print "Lua called from Vala"
        my_func(33)
    """;

    var vm = new LuaVM ();
    vm.open_libs ();
    vm.register ("my_func", my_func);
    vm.do_string (code);
}
```

```shell
valac --pkg lua luatest.vala -o luatest
./luatest
```

Some distributions ship the pkg-config file as `lua5.1.pc` instead of `lua.pc`. Point `--pkg` at the name `pkg-config --list-all | grep -i lua` prints, or add a compatibility symlink only if you understand the implications for other packages.

## Building a Lua table from Vala

Based on the [Simple Lua API example](https://lua-users.org/wiki/SimpleLuaApiExample) on lua-users.org.

```vala
using Lua;

void main () {
    var vm = new LuaVM ();
    vm.open_libs ();

    vm.new_table ();
    for (int i = 1; i <= 5; i++) {
        vm.push_number (i);
        vm.push_number (i * 2);
        vm.raw_set (-3);
    }
    vm.set_global ("foo");

    vm.do_string ("""
        io.write("The table the script received has:\n");
        x = 0
        for i = 1, #foo do
          print(i, foo[i])
          x = x + foo[i]
        end
        io.write("Returning data back to Vala\n");
        return x
    """);

    double sum = vm.to_number (-1);
    stdout.printf ("Script returned: %.0f\n", sum);
    vm.pop (1);
}
```

```shell
valac --pkg lua lua-table.vala -o lua-table
./lua-table
```

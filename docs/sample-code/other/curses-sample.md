# Curses (ncurses) sample

Minimal [ncurses](https://invisible-island.net/ncurses/) program using the `Curses` binding, adapted from the archived GNOME Wiki page [Projects/Vala/CursesSample](https://wiki.gnome.org/Projects/Vala/CursesSample).

```vala
using Curses;

int main (string[] args) {
    /* Initialize Curses */
    initscr ();

    /* Initialize color mode and define a color pair */
    start_color ();
    init_pair (1, Color.GREEN, Color.RED);

    /* Create a window (height/lines, width/columns, y, x) */
    var win = new Window (LINES - 8, COLS - 8, 4, 4);
    win.bkgdset (COLOR_PAIR (1) | Attribute.BOLD);
    win.addstr ("Hello world!");
    win.clrtobot ();
    win.getch ();

    endwin ();
    return 0;
}
```

## Compile and run

Install ncurses development headers and ensure the Curses VAPI from your Vala installation is available.

```shell
valac --pkg curses -X -lncurses cursesdemo.vala
./cursesdemo
```

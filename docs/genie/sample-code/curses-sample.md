# Genie Curses demo

Minimal [ncurses](https://invisible-island.net/ncurses/) program using the
`Curses` binding. Source:
[Projects/Genie/CursesSample](https://wiki.gnome.org/Projects/Genie/CursesSample).

```genie
uses
	Curses

init
	/* Initialize Curses */
	initscr ()

	/* Initialize color mode and define a color pair */
	start_color ()
	init_pair (1, Color.GREEN, Color.RED)

	/* Create a window (height/lines, width/columns, y, x) */
	var win = new Window (LINES - 8, COLS - 8, 4, 4)
	win.bkgdset (COLOR_PAIR (1) | Attribute.BOLD)
	win.addstr ("Hello world!")
	win.clrtobot ()
	win.getch ()
	endwin ()
```

## Compile and run

You need the ncurses development headers and the Curses VAPI from your Vala
installation.

```shell
valac --pkg curses -X -lncurses cursesdemo.gs
./cursesdemo
```

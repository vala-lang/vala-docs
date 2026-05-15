# SDL samples

Adapted from the archived GNOME Wiki page [Projects/Vala/SDLSample](https://wiki.gnome.org/Projects/Vala/SDLSample). That page targeted SDL 1.2 with `SDLGraphics` circles. SDL 1.2 is obsolete; the runnable sample below targets SDL 3 with Vala bindings from [sdl3-vapi](https://codeberg.org/edwood-grant/sdl3-vapi) (third-party vapi files; not shipped with Vala).

Install SDL 3 development libraries on your system (`sdl3` for pkg-config). Clone or download [sdl3-vapi](https://codeberg.org/edwood-grant/sdl3-vapi) and point `valac` at its `vapi/` directory with `--vapidir`. Do not mix these bindings with Vala’s built-in SDL 2 vapi: both use the `SDL` namespace and are incompatible (see the sdl3-vapi README).

## SDL 3: window, renderer, random rectangles

The program initializes SDL 3, opens a window with an accelerated renderer, clears the background each frame, draws a random solid rectangle, and exits when the window is closed. It follows the same structure as the upstream project’s [Renderer examples](https://codeberg.org/edwood-grant/sdl3-vapi/src/branch/main/examples/Renderer).

```vala
using SDL;

SDL.Video.Window? window = null;
SDL.Render.Renderer? renderer = null;

public int main (string[] args) {
    SDL.Init.set_app_metadata ("Vala SDL3 demo", "1.0", "org.example.sdlsample");

    if (!Init.init (Init.InitFlags.VIDEO)) {
        stderr.printf ("SDL_Init failed: %s\n", SDL.Error.get_error ());
        return 1;
    }

    if (!SDL.Render.create_window_and_renderer ("Vala SDL3 Demo", 640, 480, 0,
                                                out window, out renderer)) {
        stderr.printf ("SDL_CreateWindowAndRenderer failed: %s\n", SDL.Error.get_error ());
        SDL.Init.quit ();
        return 1;
    }

    var rng = new Rand ();
    bool running = true;
    SDL.Events.Event ev;

    while (running) {
        while (SDL.Events.poll_event (out ev)) {
            if (ev.type == SDL.Events.EventType.QUIT) {
                running = false;
            }
        }

        SDL.Render.set_render_draw_color (renderer, 20, 24, 32, SDL.Pixels.ALPHA_OPAQUE);
        SDL.Render.render_clear (renderer);

        SDL.Rect.FRect r = SDL.Rect.FRect ();
        r.x = rng.int_range (0, 540);
        r.y = rng.int_range (0, 380);
        r.w = rng.int_range (20, 100);
        r.h = rng.int_range (20, 100);
        SDL.Render.set_render_draw_color (renderer,
            (uint8) rng.int_range (64, 255),
            (uint8) rng.int_range (64, 255),
            (uint8) rng.int_range (64, 255),
            SDL.Pixels.ALPHA_OPAQUE);
        SDL.Render.render_fill_rect (renderer, r);

        SDL.Render.render_present (renderer);
        SDL.Timer.delay (16);
    }

    SDL.Render.destroy_renderer (renderer);
    SDL.Video.destroy_window (window);
    SDL.Init.quit ();
    return 0;
}
```

### Compile and run

Replace `/path/to/sdl3-vapi` with the directory where you cloned [sdl3-vapi](https://codeberg.org/edwood-grant/sdl3-vapi) (the folder that contains `vapi/sdl3.vapi`).

```shell
valac --vapidir /path/to/sdl3-vapi/vapi --pkg sdl3 -o sdlsample3 sdlsample3.vala
./sdlsample3
```

If the C compiler cannot find SDL 3 headers, add an explicit include path (adjust for your OS), for example:

```shell
valac --vapidir /path/to/sdl3-vapi/vapi --pkg sdl3 -X -I/usr/include/SDL3 -o sdlsample3 sdlsample3.vala
```

For Meson, see the [sdl3-vapi README](https://codeberg.org/edwood-grant/sdl3-vapi/src/branch/main/README.md) (`--vapidir` plus `dependency('sdl3')`, and wrap-file caveats).

## SDL 1.2 wiki samples (archived)

The GNOME Wiki showed SDL 1.2 plus SDL_gfx (`Circle.fill_color`, `Screen.set_video_mode`, …) and a second sample using SDL_ttf. Those APIs do not map line‑for‑line onto SDL 3. The archived sources remain on [Projects/Vala/SDLSample](https://wiki.gnome.org/Projects/Vala/SDLSample).

## SDL_ttf on SDL 3

For text rendering on SDL 3, use SDL_ttf 3 with the renderer or surface APIs. With sdl3-vapi, add `sdl3-ttf.vapi` from the same `vapi/` directory and pass `--pkg sdl3-ttf` together with `--pkg sdl3` (see the [project README](https://codeberg.org/edwood-grant/sdl3-vapi/src/branch/main/README.md) and `SDL.TTF` examples under `examples/SDL_TTF/`).

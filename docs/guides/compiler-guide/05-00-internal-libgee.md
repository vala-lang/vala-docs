# 5. Internal libgee

Currently the vala compiler repository uses its own internal copy of [libgee](https://gitlab.gnome.org/GNOME/libgee), located in [`vala/gee`](https://gitlab.gnome.org/GNOME/vala/-/tree/main/gee)

The copy was made to replace the use of GLib collections in the project ([See git commit 5a32f9e2](https://gitlab.gnome.org/GNOME/vala/-/commit/5a32f9e2108feff5cdc997fd79303e5f4e9b6175)). Internal libgee contains a subset of the features from external libgee. Some features get backported over time.

There were issues preventing external libgee from being used in the compiler repository however, they have been resolved.

Work is in-progress to stop using a bundled version of libgee and use the external libgee library: https://gitlab.gnome.org/GNOME/vala/-/work_items/398

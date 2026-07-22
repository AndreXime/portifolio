---
order: 99
title: "On-demand Linux app manager: Flatpak, APT, and fwupd in one app"
shortDescription: "I built Vekt, an on-demand Linux app manager that unifies Flatpak, APT, and firmware (fwupd) with no background daemons. The core is Tauri 2 with a Rust backend and Preact UI: the frontend only calls typed commands, and long-running processes emit logs and progress in real time. Out of scope: Snap, AppImage, and system services."
tech: ["Tauri", "Rust", "Preact", "TypeScript", "Flatpak", "APT", "fwupd"]
imageUrl: "../../images/projects/vekt.png"
github: "https://github.com/AndreXime/vekt"
---

## Technical context

I modeled Vekt as an on-demand Linux desktop app, in the spirit of KDE Discover, but without background services: Flatpak (Flathub catalog via AppStream), APT (system repositories), and fwupd (firmware) only run while the window is open. I chose Tauri 2 to isolate the shell in the Rust backend and leave the UI in Preact/TypeScript with Vite, modular state, and custom routing. The front only talks via `invoke` and listens for task events; Rust validates arguments, runs `flatpak`, `apt-get`, `fwupdmgr`, and elevation with PolicyKit, and keeps catalogs in memory with on-disk cache.

## Engineering challenges (how and why)

- **Closed command surface:** TypeScript never builds a shell string. App IDs, APT package names, remotes, and fwupd devices go through regex and size limits before becoming argv; Tauri capabilities stay minimal (core and events).
- **Task queue with streaming:** a `TaskManager` spawns long-running processes, emits `task-log` and `task-progress`, keeps up to 500 log lines, and cancels with an atomic flag plus `kill` on the child. Progress comes from parsing stdout by task type.
- **Update everything in sequence:** `update_everything` enqueues APT (`dist-upgrade` via `pkexec` in a single call), then Flatpak and fwupd, waiting for a terminal state with timeout. If the APT lock is active (`fuser` on dpkg/apt locks), I skip APT with a marked task and continue with Flatpak and firmware.
- **Local AppStream catalog:** I download the Flathub XML, decompress, parse, filter, and write it under `~/.cache/vekt/` with TTL and filter version. Search and categories run on the backend with scoring by name, id, and summary, without scanning on the front.
- **APT alongside Flatpak:** inventory from the repos' `Packages` files, own cache, and scored search; in Explore, APT packages come after Flatpak apps. Details unify metadata, Flatpak permissions, screenshots, and anonymous ODRS reviews when a compatible `app_id` exists.

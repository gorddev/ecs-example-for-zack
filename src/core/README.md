## src/core

This folder contains the core runtime code used to start and manage the application.
It handles shared objects like the camera, world setup, setup helpers, and the update loop
that keeps the ECS world running.

#### ║:: `./Camera.ts`::║ 〈File〉
Contains the shared `pixi.js` camera `Container`.
Sprites that should move with the game world are added to this container, allowing the
entire world view to be panned and zoomed together.

#### ║:: `./Updater.ts`::║ 〈File〉
Contains the update loop logic for the ECS world.
This is responsible for repeatedly running the registered systems so entities continue
to move, animate, and update over time.

#### ║:: `./SetupWorld.ts`::║ 〈File〉
Contains the `SetupWorld()` function.
This function creates the ECS world, attaches the camera to the stage, runs setup helpers,
loads assets, creates starting entities, and prepares the world before it is returned.

#### ║:: `./setup`::║ 〘Dir〙
Contains setup functions used by `SetupWorld.ts`.
These helpers keep initialization code organized, such as camera controls, asset loading,
and system registration.

### Warning
All ECS systems must be registered during world setup before they can update entities.
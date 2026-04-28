## src

Contains the main source code for the project.

`main.ts` is the application entry point. It starts the Pixi application, initializes the ECS world, and begins the update process.

#### ║:: `./core`::║ 〘Dir〙
Contains core setup and runtime code for the application.

This includes the Pixi application instance, shared camera/container setup, and asset loading helpers.

#### ║:: `./ecs`::║ 〘Dir〙
Contains the Entity Component System code.

This folder includes ECS initialization, the main updater, components, and systems.

#### ║:: `./pixi`::║ 〘Dir〙
Contains Pixi-specific helper code.

This includes rendering-related helpers that are separate from the core application setup and ECS logic.

#### ║:: `./main.ts`::║ 〈File〉
Entry point for the application.

Creates and starts the Pixi application, initializes the ECS world, and begins the main update loop.
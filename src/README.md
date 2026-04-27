## src

Contains the main source code for the project. This folder is split into components, systems, and core setup code.
`main.ts` is the application entry point and connects the Pixi application with the ECS world.

#### ║:: `./components`::║ {dir}
Contains all components that can be added onto entities.
Components store data or behavior used by systems, such as sprites, velocity, paths, filters, and helper vector types.

#### ║:: `./core`::║ {dir}
Contains the central setup and runtime code for the application.
This includes the camera container, world setup, update loop, and setup helpers used to initialize the project.

#### ║:: `./systems`::║ {dir}
Contains ECS systems that update entities with matching components.
For example, movement systems update entities with velocity components, while path and filter systems update entities with paths or filters.

#### ║:: `./main.ts`::║ 〈File〉
Entry point for the application.
Creates and starts the Pixi application, initializes the world, and begins the main update process.
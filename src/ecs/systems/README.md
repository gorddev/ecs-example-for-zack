# ECS Systems

This folder contains the systems that run during the ECS update loop. 

## SystemSetup.ts

`SystemSetup.ts` is the central registration point for all systems in this folder.

When a new system is created, it should be imported into `SystemSetup.ts` and added to the `world.addSystems(...)` call. If a system is not registered here, it will not run during the ECS update cycle.

Current systems are registered under the `Updater` schedule.

### Adding a New System

To add a new system:

1. Create a new system file in this folder.
2. Define the system function and its ECS query arguments.
3. Import the system in `SystemSetup.ts`.
4. Add the system to the `world.addSystems(Updater, [...])` list.


## Systems

### VelocitySystem.ts

`VelocitySystem` moves sprites based on their velocity.

It processes entities that have both:

- `MapSprite`
- `Velocity`

Each update, the system adds the velocity values to the sprite position.

Use this system for simple linear movement.

### RotationalVelocitySystem.ts

`RotationalVelocitySystem` rotates sprites based on their rotational velocity.

It processes entities that have both:

- `MapSprite`
- `RotationalVelocity`

Each update, the system adds the rotational velocity value to the sprite rotation.

Use this system for continuous spinning or rotation-based motion.

### PathSystem.ts

`PathSystem` moves sprites along a defined path.

It processes entities that have:

- `Entity`
- `MapSprite`
- `Path`

Each update, the path updates the sprite using elapsed frame time. When the path is complete, the `Path` component is removed from the entity.

Use this system for scripted movement, animation paths, or movement between predefined points.

### FilterSystem.ts

`FilterSystem` updates sprite filters over time.

It processes entities that have:

- `Entity`
- `MapSprite`
- `Filters`

Each update, the filter component updates the sprite using elapsed frame time. When the filter effect is complete, the `Filters` component is removed from the entity.

Use this system for temporary visual effects such as fades, color changes, or other filter-based sprite effects.



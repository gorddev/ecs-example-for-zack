## src/components

Contains all components that can be added onto any entity in the solar system.
For example, adding the `Velocity` component gives an entity a velocity,
while adding a `Path` component gives it a path it follows. 

#### ║:: `./Sprite.ts`::║ 〈File〉
Implementation for any renderable object that will be displayed on the canvas. 
Could not be named "Renderable" because pixi.js already has a `Renderable` object. 
#### ║:: `./vec2.ts`::║ 〈File〉
Simple 2-element number vector that can be used to define other types. 
#### ::║ `./Velocity.ts`::║ 〈File〉
Contains definitions for `Velocity` and `RotationalVelocity`
#### ::║ `./paths`::║ {dir}
Contains definitions for `Path`, `PathNode`, and extensions of `PathNodes`. Utilized by the `PathSystem` world system.  
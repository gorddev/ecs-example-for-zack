## ECS Components

This folder contains reusable ECS components that can be attached to entities.

For example, adding a `Velocity` component allows `VelocitySystem` to move an entity, while adding a `Path` component allows `PathSystem` to move it along a path.

### `MapSprite.ts`

Wraps a PixiJS sprite for use as an ECS component.

`MapSprite` represents a renderable object on the map. Automatically creates/destroys pixi.js resources.

### `Filters.ts`

Stores PixiJS filters attached to a sprite.

Filters can be permanent or dynamic. Dynamic filters include an update function and can remove themselves when their effect is complete.

This component is processed by `FilterSystem`.

### `Hitbox.ts`

Defines a rectangular PixiJS graphics object that can be used as a clickable or selectable area.

Use this component for entities that need mouse interaction or selection behavior.

### `vec2.ts`

A small two-value vector helper with `x` and `y` properties.

It includes utility methods for common vector operations such as addition, subtraction, multiplication, division, cloning, tuple conversion, and magnitude calculation.

Used by several movement and positioning components.

## Subfolders

### `movement/`

Contains movement-related components.
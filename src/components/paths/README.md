## src/components/paths
Used by the `PathSystem` to properly update an entity who has paths attached to them. 

In order to make an object have a
path, it needs to first have a `Path` object attached to it. 
In the `Path` constructor, you attach a number of `PathNodes` to it. 1 node is a point on the path.

`PathNode` is an interface that specifies how new `PathNodes` are created. `FixedPath` is a simple example
of a `PathNode` implementation that moves an object from a start position to an end position in an amount of time. 

#### ║:: `./Path.ts`::║ 〈File〉
Object used to add paths to entities
#### ║:: `./PathNode.ts`::║ 〈File〉
An interface representing section of a path. For example, a `Path` that traces a square will have
a total of 4 `PathNodes`, one for each side. 
#### ║:: `./FixedPath.ts`::║ 〈File〉
Specifies a path from a start point to an end point in fixed time. 
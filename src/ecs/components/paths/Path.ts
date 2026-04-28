// PRIMARY INTERFACE FOR A PATH
import PathNode from "./PathNode";
import { Sprite }   from "pixi.js";

/** Contains all information necessary to move a sprite along a path. Contains:
 * - `constructor(Array<PathNode>)` › Creates a Path from an array of path nodes.
 * - `update(Sprite)` › Updates the sprite's position given the current path chain.
 * - `isDone()` › Returns true if the path is complete.
 * - `addPathNode()` › Adds a path node to the end of the path chain. */
export default class Path {
    private paths : Array<PathNode>;

/* ************ Constructor ************* */
    constructor(paths : Array<PathNode>) {
        this.paths = paths;
    }

/* ************* Member Functions ************* */
    /** Updates the given sprite's position with the current path chain. */
    public update(sprite : Sprite, dt : number) : void {
        if (this.paths.length !== 0) {
            this.paths[0].update(sprite, dt);
            if (this.paths[0].isDone()) {
                this.paths.shift();
            }
        }
    }

    /** Returns true if the path is complete. */
    public isDone() : boolean {
        return this.paths.length === 0;
    }

    /** Adds a path node to the end of the path chain. */
    public addPathNode(pathNode : PathNode) : void {
        this.paths.push(pathNode);
    }

    /** Creates a copy of a path. */
    public clone() : Path {
        return new Path(Array.from(this.paths));
    }
}
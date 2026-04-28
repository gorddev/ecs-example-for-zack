import { Sprite } from 'pixi.js'

/** PathNodes are segments of paths objects may take. PathNodes must implement:
 * - `update(Sprite)` - Updates the sprite's position
 * - `isDone()` - Returns true if the path is complete */
export default interface PathNode {
    update(sprite : Sprite, dt : number)    : void;
    isDone()                                : boolean;
}
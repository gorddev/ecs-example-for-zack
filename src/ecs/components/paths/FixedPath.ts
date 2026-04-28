import PathNode                 from "./PathNode";
import vec2                     from "../vec2";
import {Sprite as PixiSprite}   from "pixi.js";

/** A path that take a sprite from one position to another in fixed time.
 * - `constructor(startPos : vec2, endPos : vec2, seconds : number)`  */
export default class FixedPath implements PathNode {
    private startPos            : vec2;
    private endPos              : vec2;
    private readonly seconds    : number;
    private elapsedTime         : number;

/* ************ Constructor ************* */
    constructor(startPos : [number, number], endPos : [number, number], seconds : number) {
        this.startPos   = vec2.from_tuple(startPos);
        this.endPos     = vec2.from_tuple(endPos);
        this.seconds    = seconds;
        this.elapsedTime = 0.0;
    }

/* *************** Implementation ***************/
    public update(sprite : PixiSprite, dt : number) : void {
        const p : number = this.elapsedTime/this.seconds;
        const v = this.startPos.add(this.endPos.sub(this.startPos).mul(p));
        sprite.position.set(v.x, v.y);
        this.elapsedTime += dt;
    }

    public isDone() : boolean {
        return this.elapsedTime >= this.seconds;
    }
}
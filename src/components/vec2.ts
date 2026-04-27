import {PointData} from "pixi.js";

/** Helper class that contains two elements: an `x` and a `y`.
 * Contains helper functions:
 * - `add(vec2) : vec2`
 * - `sub(vec2) : vec2`
 * - `mul(number) : vec2`
 * - `div(number) : vec2`
 * - `mag() : number` › Returns magnitude of vector (e.g. it's distance) */
export default class vec2 implements PointData {
    public x : number;
    public y : number;

// ************** Constructors **************** //
    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    public static make(x : number, y : number) : vec2 {
        return new vec2(x, y);
    }
    public static from(v : vec2) : vec2 {
        return new vec2(v.x, v.y);
    }
//************** Member Functions ***************** //
    public set(x : number, y : number) : void {
        this.x = x;
        this.y = y;
    }

// ************** Const Member Functions **************** //

    public add(v : vec2) : vec2 {
        return new vec2(this.x + v.x, this.y + v.y);
    }
    public sub(v : vec2) : vec2 {
        return new vec2(this.x - v.x, this.y - v.y);
    }
    public mul(s : number) : vec2 {
        return new vec2(this.x * s, this.y * s);
    }
    public div(s : number) : vec2 {
        return new vec2(this.x / s, this.y / s);
    }
    /** Returns the magnitude of the vector (e.g. it's distance) */
    public mag() : number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
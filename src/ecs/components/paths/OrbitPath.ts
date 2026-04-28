import PathNode from "./PathNode";
import vec2 from "../vec2";
import {Sprite} from "pixi.js";

export default class OrbitPath implements PathNode {

// **************** Constructor ******************* //
    constructor(center : [number, number], radius : number, speed : number, angle : number = 0) {
        this.center = new vec2(center[0], center[1]);
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
    }

// *************** Member functions **************** //
    public update(sprite : Sprite, dt : number) : void {
        this.angle += this.speed * dt;
        sprite.position.x = this.center.x + this.radius * Math.cos(this.angle);
        sprite.position.y = this.center.y + this.radius * Math.sin(this.angle);
    }

    public isDone() : boolean {
        return false;
    }

// ************** Private Member Vars ****************** //
    private readonly center : vec2;
    private readonly radius : number;
    private readonly speed : number;
    private angle : number;
}
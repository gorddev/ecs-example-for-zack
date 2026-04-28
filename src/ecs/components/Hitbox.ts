import { Graphics as PixiGraphics} from "pixi.js";
import vec2 from "./vec2";


/** Hitbox class which allows for an object to be selected by the mouse click */
export default class Hitbox
{
    public hitbox : PixiGraphics;

// ******************* Constructors *******************
    /**
     * Creates a new Hitbox instance with specified position and size.
     * @param pos - The position of the hitbox.
     * @param size - The size of the hitbox (rectangular) */
    constructor(pos : [number, number] = [0, 0], size : [number, number] = [30, 30])
    {
        this.hitbox = new PixiGraphics();
        this.hitbox.clear();
        this.hitbox.x = pos[0];
        this.hitbox.y = pos[1];
        this.hitbox.setSize(size[0], size[1])

        this.hitbox.on("pointerup", () => {});

        this.hitbox.rect(pos[0], pos[1], size[0], size[1]);
    }

    public clone()
    {
        let h : Hitbox = new Hitbox();
        h.hitbox = this.hitbox.clone();
        return h;
    }
}


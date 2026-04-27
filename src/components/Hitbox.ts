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
    constructor(pos : vec2 = vec2.make(0, 0), size : vec2 = vec2.make(0, 0))
    {
        this.hitbox = new PixiGraphics();
        this.hitbox.clear();
        this.hitbox.x = pos.x;
        this.hitbox.y = pos.y;
        this.hitbox.setSize(size.x, size.y)

        this.hitbox.on("pointerup", () => {});

        this.hitbox.rect(pos.x, pos.y, size.x, size.y);
    }

    public static from(hitbox : Hitbox)
    {
        let h : Hitbox = new Hitbox();
        h.hitbox = hitbox.hitbox.clone();
        return h;
    }
}


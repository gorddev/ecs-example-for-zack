import {
    Texture as PixiTexture,
    Sprite as PixiSprite, Sprite,
} from "pixi.js";
import vec2 from "./vec2";
import camera from "../core/Camera"

/** "Map Sprite," concerns a sprite that is rendered on the map. Used so we don't have to manually
 * clean up PixiSprite resources, and it automatically adds itself to the map. Contains:
 * - `sprite : PixiSprite` › Actual PixiJS object that is rendered on the canvas.
 * - `constructor(image: string, pos : vec2 = {0,0})` Creates the Map Sprite with a given position.
 *
 * If you want to alter properties of the sprite itself, please modify them through the public sprite object. */
export default class MSprite {
    public sprite : PixiSprite;

/* ********** Constructors ********** */

    /** Default constructable */
    constructor() {
        this.sprite = new Sprite();
    }

    /** Creates the Map Sprite with a given position.
     * @param image Path to the image to use for the sprite
     * @param pos Starting position of the sprite. Defaults to {0,0} */
    public static make(image : string, pos : vec2 = vec2.make(0, 0)) : MSprite {
        let spr = new MSprite();
        const tex = PixiTexture.from(image);
        spr.sprite = PixiSprite.from(tex);
        spr.sprite.position.set(pos.x, pos.y);
        camera.addChild(spr.sprite);
        return spr;
    }

    /** Creates the Map Sprite from an existing PixiSprite object.
     * @param sprite PixiSprite object to use for the Map Sprite */
    public static from(sprite: PixiSprite) : MSprite {
        let spr = new MSprite();
        spr.sprite = sprite;
        camera.addChild(spr.sprite);
        return spr;
    }

    /* ********** Destructor ********** */
    // Called when the Sprite is destructed
    [Symbol.dispose]() {
        this.sprite.destroy({children: true, texture: false});
        camera.removeChild(this.sprite);
    }

}
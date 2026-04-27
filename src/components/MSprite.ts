import {
    Texture as PixiTexture,
    Sprite as PixiSprite,
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

    /** Creates the Map Sprite with a given position.
     * @param image Path to the image to use for the sprite
     * @param pos Starting position of the sprite. Defaults to {0,0} */
    constructor(
        image   : string,
        pos     : vec2 = vec2.make(0, 0)
    )
    {
        const tex = PixiTexture.from(image);
        this.sprite = PixiSprite.from(tex);
        this.sprite.position.set(pos.x, pos.y);
        camera.addChild(this.sprite);
    }


    // Called when the Sprite is destructed
    [Symbol.dispose]() {
        this.sprite.destroy({children: true, texture: false});
        camera.removeChild(this.sprite);
    }

}
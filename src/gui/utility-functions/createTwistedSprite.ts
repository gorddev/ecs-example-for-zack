// Pixi imports
import {
    Container       as PixiContainer,
    Texture         as PixiTexture,
    Sprite          as PixiSprite,
    Graphics        as PixiGraphics,
    RenderTexture   as PixiRenderTexture,
} from 'pixi.js'
import { TwistFilter } from "pixi-filters";

// Local imports
import app          from "../../core/Application";
import MapSprite    from "../../ecs/components/MapSprite";


export default function createTwistedSprite(
    image : string,
    { twistAngle = 45, offset = [0, 0] } : { twistAngle?: number, offset?: [number, number] } = {}
) : PixiSprite {
    const containerObj = new PixiContainer()

    const texture = PixiTexture.from(image);

    const size = {
        width: texture.orig.width,
        height: texture.orig.height
    }

    const offsetX = (size.width)/2 + offset[0];
    const offsetY = (size.height)/2 + offset[1];

    const sprite = new PixiSprite(texture);
    sprite.x = 0;
    sprite.y = 0;
    sprite.anchor=0;
    sprite.zIndex=0

    containerObj.addChild(sprite)

    const twistFilter = new TwistFilter({
        radius: Math.max(texture.orig.width/2, texture.orig.height/2),
        angle: twistAngle,
        padding: 0,
    })

    twistFilter.offsetX = offsetX//+1000
    twistFilter.offsetY = offsetY//+1000

    containerObj.filters=[twistFilter]

    const bounds = containerObj.getLocalBounds();
    const rtWidth = Math.ceil(bounds.width);
    const rtHeight = Math.ceil(bounds.height);
    const rt = PixiRenderTexture.create({width: rtWidth, height: rtHeight})

    const finalSprite = new PixiSprite(rt);

    const finalCont = new PixiContainer();
    finalCont.addChild(finalSprite)
    finalCont.pivot.set(offsetX, offsetY)
    app.renderer.render({
        container: containerObj,
        target: rt,
        clear: false,
    });

    const g = new PixiGraphics();
    g.rect(-rtWidth/2, -rtHeight/2, rtWidth, rtHeight);
    g.fill('red')
    g.alpha=0

    finalCont.destroy({children: false, texture: false});
    twistFilter.destroy();
    containerObj.destroy({children: false, texture: false});
    sprite.destroy({children: true, texture: false});


    return finalSprite;
};
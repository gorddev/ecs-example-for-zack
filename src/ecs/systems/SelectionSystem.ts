import { Query, World } from "thyseus";
import MapSprite from "../components/MapSprite";
import Selectable from "../components/Selectable";

/**
 * System that synchronizes the position of the Selectable hitbox graphics
 * with the position of the entity's MapSprite.
 */
export default function SelectionSystem(query: Query<[MapSprite, Selectable]>): void {
    for (const [msprite, selectable] of query) {
        selectable.updatePosition(msprite.sprite.position.x, msprite.sprite.position.y);
        selectable.graphics.rotation = msprite.sprite.rotation;
    }
}

SelectionSystem.getSystemArguments = (world: World) => [
    Query.intoArgument(world, [MapSprite, Selectable]),
];

import {Entity, Query, World} from "thyseus";
import MapSprite          from "../components/MapSprite"
import Filters          from "../components/Filters";
import {Ticker} from "pixi.js";

export default function FilterSystem(query: Query<[Entity, MapSprite, Filters]>): void {
    for (const [entity, msprite, filter] of query) {
        filter.update(msprite, (Ticker.shared.elapsedMS / 1000.0));
        if (filter.isDone()) {
            entity.remove(Filters);
        }
    }
}

FilterSystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [Entity, MapSprite, Filters]),
];
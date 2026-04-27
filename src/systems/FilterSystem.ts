import {Entity, Query, World} from "thyseus";
import MSprite          from "../components/MSprite"
import Filters          from "../components/Filters";
import {Ticker} from "pixi.js";

export default function FilterSystem(query: Query<[Entity, MSprite, Filters]>): void {
    for (const [entity, msprite, filter] of query) {
        console.log(Ticker.shared.deltaTime);
        filter.update(msprite, (Ticker.shared.elapsedMS / 1000.0));
        if (filter.isDone()) {
            entity.remove(Filters);
        }
    }
}

FilterSystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [Entity, MSprite, Filters]),
];
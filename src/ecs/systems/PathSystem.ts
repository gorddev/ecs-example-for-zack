import { Query, World, Entity } from "thyseus";
import MapSprite from "../components/MapSprite"
import Path from "../components/paths/Path";
import {Ticker} from "pixi.js";


export default function PathSystem(query: Query<[Entity, MapSprite, Path]>): void {
    for (const [entity, r, path] of query) {
        path.update(r.sprite, (Ticker.shared.elapsedMS / 1000.0));
        if (path.isDone()) {
            entity.remove(Path);
        }
    }
}

PathSystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [Entity, MapSprite, Path]),
];
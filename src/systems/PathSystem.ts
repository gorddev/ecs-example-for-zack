import { Query, World, Entity } from "thyseus";
import MSprite from "../components/MSprite"
import Path from "../components/paths/Path";
import {Ticker} from "pixi.js";


export default function PathSystem(query: Query<[Entity, MSprite, Path]>): void {
    for (const [entity, r, path] of query) {
        console.log(Ticker.shared.deltaTime);
        path.update(r.sprite, (Ticker.shared.elapsedMS / 1000.0));
        if (path.isDone()) {
            entity.remove(Path);
        }
    }
}

PathSystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [Entity, MSprite, Path]),
];
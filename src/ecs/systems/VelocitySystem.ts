import { Query, World } from "thyseus";
import MapSprite          from "../components/MapSprite"
import Velocity         from "../components/movement/Velocity";

export default function VelocitySystem(query: Query<[MapSprite, Velocity]>): void {
    for (const [r, vel] of query) {
        r.sprite.position.x += vel.x;
        r.sprite.position.y += vel.y;
    }
}

VelocitySystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [MapSprite, Velocity]),
];
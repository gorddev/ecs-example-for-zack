import { Query, World } from "thyseus";
import MSprite          from "../components/MSprite"
import Velocity         from "../components/movement/Velocity";

export default function VelocitySystem(query: Query<[MSprite, Velocity]>): void {
    for (const [r, vel] of query) {
        r.sprite.position.x += vel.x;
        r.sprite.position.y += vel.y;
    }
}

VelocitySystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [MSprite, Velocity]),
];
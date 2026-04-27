import { Query, World }     from "thyseus";
import MSprite              from "../components/MSprite"
import RotationalVelocity   from "../components/movement/RotationalVelocity";

export default function RotationalVelocitySystem(query: Query<[MSprite, RotationalVelocity]>): void {
    for (const [r, rot_vel] of query) {
        r.sprite.rotation += rot_vel.valueOf();
    }
}

RotationalVelocitySystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [MSprite, RotationalVelocity]),
];
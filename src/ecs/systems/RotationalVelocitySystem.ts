import { Query, World }     from "thyseus";
import MapSprite              from "../components/MapSprite"
import RotationalVelocity   from "../components/movement/RotationalVelocity";

export default function RotationalVelocitySystem(query: Query<[MapSprite, RotationalVelocity]>): void {
    for (const [r, rot_vel] of query) {
        r.sprite.rotation += rot_vel.valueOf();
    }
}

RotationalVelocitySystem.getSystemArguments = (world : World) => [
    Query.intoArgument(world, [MapSprite, RotationalVelocity]),
];
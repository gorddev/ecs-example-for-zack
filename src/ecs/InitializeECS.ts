import { Application }  from "pixi.js";
import { World }        from "thyseus";

// Setup functions
import SystemSetup      from "./systems/SystemSetup";

// Component imports
import MapSprite        from "./components/MapSprite";
import vec2             from "./components/vec2";
import Path             from "./components/paths/Path";
import FixedPath        from "./components/paths/FixedPath";
import Velocity         from "./components/movement/Velocity";
import createTwistedSprite from "../gui/utility-functions/createTwistedSprite";
import RotationalVelocity from "./components/movement/RotationalVelocity";
import Selectable from "./components/Selectable";
import Location from "../world/Location";
import TitanLocation from "../world/data/locations/TitanLocation";
import NullLocation from "../world/data/locations/NullLocation";
import NoahFaction from "../world/data/factions/NoahFaction";
import OrbitPath from "./components/paths/OrbitPath";
import Filters from "./components/Filters";
import {TwistFilter} from "pixi-filters";

let f = 0;

export default async function InitializeECS(app: Application): Promise<World> {
    const world = new World();

    await SystemSetup(world);   //< Add systems to the world

    // Testing grounds
    world.spawn()
        .add(MapSprite.make("/player.png", vec2.make(50, 50)))
        .add(new Path([new OrbitPath([0, 0], 700, 0.5)]))
        .add(new RotationalVelocity(0.04))
        .add(new Selectable(new Location(
            {name: "noah's car", type: "car", description: "here's where noah drives his car", faction: NoahFaction}),
            {type: 'rect', width: 200, height: 200}));

    world.spawn()
        .add(MapSprite.from(createTwistedSprite("/Titan.png", {twistAngle: 20})))
        .add(new RotationalVelocity(0.003))
        .add(new Selectable(TitanLocation, {type: 'circle', radius: 600}));

    await world.prepare();

    return world;
}
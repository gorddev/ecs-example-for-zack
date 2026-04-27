import {Application, BlurFilter} from "pixi.js";
import { TwistFilter } from 'pixi-filters'
import { World } from "thyseus";

// Setup functions
import LoadAssets from "./setup/LoadAssets";
import CameraSetup from "./setup/CameraSetup";
import SystemSetup from "./setup/SystemSetup";

// Global Vars
import camera from "./Camera";

// Type imports
import MSprite from "../components/MSprite";
import Velocity from "../components/movement/Velocity";
import vec2 from "../components/vec2";

import Path from "../components/paths/Path";
import FixedPath from "../components/paths/FixedPath";
import Filters from "../components/Filters";
import RotationalVelocity from "../components/movement/RotationalVelocity";


export default async function SetupWorld(app: Application): Promise<World> {
    const world = new World();

    // Add the camera to the stage.
    app.stage.addChild(camera);

    await CameraSetup(app);     //< Add mouse controls for camera
    await SystemSetup(world);   //< Add systems to the world
    await LoadAssets();         //< Load all of our assets

    // Testing grounds

    let vel = new Velocity(1, 1);
    let e = world.spawn()
        .add(MSprite.make("/player.png", vec2.make(0, 0)))
        .add(vel)
        .add(new Path(
            [
                new FixedPath(vec2.make(0, 0),      vec2.make(100, 0),  2),
                new FixedPath(vec2.make(100, 0),    vec2.make(100, 100),2),
                new FixedPath(vec2.make(100, 100),  vec2.make(200, 200),2),
                new FixedPath(vec2.make(200, 200),  vec2.make(0, 0),    2),
                new FixedPath(vec2.make(0, 0),      vec2.make(500, 500),2),
            ]

        ));

    let myFilter = new TwistFilter();
    myFilter.offset.x = 0.5;
    e.add(new Filters([[myFilter]]));

    app.ticker.add(() => {
        vel.mul(0.90);
    })

    await world.prepare();

    return world;
}
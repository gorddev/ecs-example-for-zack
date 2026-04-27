import {Schedule, World}    from "thyseus";
import Updater                  from "../Updater";
import VelocitySystem           from "../../systems/VelocitySystem";
import PathSystem               from "../../systems/PathSystem";
import FilterSystem             from "../../systems/FilterSystem";
import RotationalVelocitySystem from "../../systems/RotationalVelocitySystem";

export default function SystemSetup(world : World) {
    /******************************/
    /* Add new systems here */
    /******************************/
    world.addSystems(Updater, [
        VelocitySystem,
        PathSystem,
        FilterSystem,
        RotationalVelocitySystem
    ]);
    /******************************/
}


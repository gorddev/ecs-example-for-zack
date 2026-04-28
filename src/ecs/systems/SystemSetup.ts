import {World}    from "thyseus";
import Updater                  from "../Updater";
import VelocitySystem           from "./VelocitySystem";
import PathSystem               from "./PathSystem";
import FilterSystem             from "./FilterSystem";
import RotationalVelocitySystem from "./RotationalVelocitySystem";
import SelectionSystem          from "./SelectionSystem";

export default function SystemSetup(world : World) {
    /******************************/
    /* Add new systems here */
    /******************************/
    world.addSystems(Updater, [
        VelocitySystem,
        PathSystem,
        FilterSystem,
        RotationalVelocitySystem,
        SelectionSystem
    ]);
    /******************************/
}


// contains all the information needed to render/display a location
import Faction from "./Faction";

export default class Location {
    /** Name of the location. */
    public name : string;
    /** Type of location (e.g. planet, moon, asteroid field). */
    public type : string;
    /** Description of the location. */
    public description : string;

// ************** Constructor ****************** //
    constructor({name, type = "", description = "", faction = undefined} : {name : string, type : string, description : string, faction? : Faction}) {
        this.name = name;
        this.type = type;
        this.description = description;
        if (faction)
            this._faction = faction;
    }

// ************** Getters and Setters ************** //

    get faction() : Faction | undefined {
        return this._faction;
    }

    set faction(faction : Faction) {
        this._faction = faction;
    }

// ************** Private Members ************** //

    /** Faction that owns this location. */
    private _faction? : Faction;
}
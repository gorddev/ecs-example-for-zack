import Location from "../../Location";
import ZackholeFaction from "../factions/ZackholeFaction";

const TitanLocation = new Location({
    name: "Gaping Hole",
    description: "This is where all the zackholes gather.",
    faction: ZackholeFaction,
    type: "hole"
});

export default TitanLocation;

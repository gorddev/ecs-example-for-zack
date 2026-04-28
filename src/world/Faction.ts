// contains all the data for a single faction class
// WIP: more parameters can and should definitely be added.

/** Faction class. Contains:
 * - `name : string` › Name of the faction
 * - `description : string` › Description of the faction itself
 * - `image? : string` › Path to the faction's banner image
 * - `color? : string` › Optional HTML color that represents the faction.
 */
export default class Faction {
    public name         : string;
    public description  : string;
    public image?       : string;
    public color?       : string;

    constructor(name: string = "", description: string = "", image?: string, color?: string) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.color = color;
    }
}
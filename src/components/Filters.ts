import {Filter as PixiFilter} from "pixi.js";
import MSprite from "./MSprite";

// Each filter is just a pixi filter & an optional update function
type FilterType         = [PixiFilter, ((filter : any, dt : number) => boolean)?];
type InternalFilterType = [PixiFilter, ((filter : any, dt : number) => boolean)];

export default class Filters {
    /** Keeps track of all filters that don't need updating */
    private permanentFilters : Array<PixiFilter>;
    /** True if we need to update the list of the sprite's filters. */
    private changeSpriteFilters : boolean;
    /** Keeps track of all filters that need updating */
    private dynamicFilters : Array<InternalFilterType>;

/* ***************** Constructor ****************** */
    constructor(filters : ReadonlyArray<FilterType>) {
        this.permanentFilters = [];
        this.changeSpriteFilters = true;
        this.dynamicFilters = [];

        for (const [filter, updateFunc] of filters) {
            if (updateFunc) {
                this.dynamicFilters.push([filter, updateFunc]);
            } else {
                this.permanentFilters.push(filter);
            }
        }
    }

// *************** Member Functions **************** //

    public update(mSprite : MSprite, dt : number) : void {
        // Updates all temporary filters that need updating
        let oldLength = this.dynamicFilters.length;
        // Filter out any filters that have finished
        this.dynamicFilters =
            this.dynamicFilters.filter(f => !f[1](f[0], dt));

        // If the length ended up changing
        if (oldLength !== this.dynamicFilters.length) {
            this.changeSpriteFilters = true;
        }

        // Update filters on the sprite if the number of filters has changed
        if (this.changeSpriteFilters) {
            mSprite.sprite.filters = this.permanentFilters.concat(this.dynamicFilters.map(f => f[0]));
            this.changeSpriteFilters = false;
        }
    }

    /** Adds a filter to the sprite. */
    public addFilter(f: FilterType) : void {
        if (f[1]) {
            this.dynamicFilters.push([f[0], f[1]]);
        } else {
            this.permanentFilters.push(f[0]);
        }
        this.changeSpriteFilters = true;
    }

    /** Checks to see if there's any more filters */
    public isDone() : boolean {
        return this.permanentFilters.length === 0 && this.dynamicFilters.length === 0;
    }
}


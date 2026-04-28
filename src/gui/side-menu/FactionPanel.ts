// contains information for creating a visual of a faction in the side menu

import {MenuInterface} from "./MenuInterface";
import Faction from "../../world/Faction";

/** The small section in the panel that is displayed for each clickable object */
export default class FactionPanel implements MenuInterface {
    constructor(faction : Faction) {
        this._root          = document.createElement("div");
        this.imageTag       = document.createElement("img");
        this.nameTag        = document.createElement("h3");
        this.tooltipElement = document.createElement("div");

        if (faction.color) {
            this._color = faction.color;
        }

        this.nameTag.textContent = faction.name;
        this.tooltipElement.textContent = faction.description;

        if (faction.image) {
            this.imageTag.src = faction.image;
        }

        this.buildStructure();
        this.setupStyles();
        this.setupTooltip();
    }

    public setImage(image : string) {
        this.imageTag.src = image;
    }

    public root() : HTMLElement {
        return this._root;
    }

    public show() {
        this._root.style.display = "flex";
    }

    public hide() {
        this._root.style.display = "none";
    }

    get name() : string             { return this.nameTag.textContent || ""; }
    set name(value : string)        { this.nameTag.textContent = value; }
    get description() : string      { return this.tooltipElement.textContent || ""; }
    set description(value : string) { this.tooltipElement.textContent = value; }

// *********** Private Functions and Variables ************* //

    private setupStyles() {
        Object.assign(this._root.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "4px double",
            padding: "15px",
            borderRadius: "10px",
            borderColor: "rgba(150, 150, 150, 0.7)",
            margin: "0px",
            position: "relative",
            transition: "transform 0.3s ease, filter 0.3s ease",
            cursor: "pointer",
        });
        
        if (this.imageTag.src === "" || this.imageTag.getAttribute('src') === null) {
            this._root.style.justifyContent = "center";
        }

        this._root.onmouseover = () => {
            this._root.style.transform = "scaleX(1.03) scaleY(1.03)";
            this._root.style.filter = "brightness(1.3)";
        };
        this._root.onmouseout = () => {
            this._root.style.transform = "scaleX(1) scaleY(1)";
            this._root.style.filter = "brightness(1)";
        };

        Object.assign(this.imageTag.style, {
            order: 2,
            maxWidth: "50px",
            maxHeight: "50px",
            pointerEvents: "none"
        });

        Object.assign(this.nameTag.style, {
            order: 1,
            margin: "0",
            pointerEvents: "none"
        });

        Object.assign(this.tooltipElement.style, {
            position: "absolute",
            top: "100%",
            left: "50%",
            width: "100%",
            boxSizing: "border-box",
            transform: "translate(-50%, -10px)",
            borderColor: "rgba(120, 120, 120, 0.7)",
            border: "0.5px dotted",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
            fontSize: "14px",
            textAlign: "center",
            zIndex: "1001",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            fontWeight: "normal",
        });

        if (this._color) {
            this._root.style.background = this._color;
            this.tooltipElement.style.background = this._color;
            this.tooltipElement.style.filter = "brightness(0.6)";
        } else {
            this.tooltipElement.style.background = this._color;
        }
    }

    private setupTooltip() {
        this._root.addEventListener("mouseenter", () => {
            if (this.description) {
                this.tooltipElement.style.opacity = "1.0";
                this.tooltipElement.style.transform = "translate(-50%, 10px)";
            }
        });

        this._root.addEventListener("mouseleave", () => {
            this.tooltipElement.style.opacity = "0.0";
            this.tooltipElement.style.transform = "translate(-50%, -10px)";
        });
    }

    private buildStructure() {
        this._root.appendChild(this.nameTag);
        if (this.imageTag.src !== "" && this.imageTag.getAttribute('src') !== null) {
            this._root.appendChild(this.imageTag);
        }
        this._root.appendChild(this.tooltipElement);
    }

    get color() : string { return this._color; }
    
    private _root           : HTMLDivElement;
    private imageTag        : HTMLImageElement;
    private nameTag         : HTMLHeadingElement;
    private tooltipElement  : HTMLDivElement;
    private _color           : string = "";
}

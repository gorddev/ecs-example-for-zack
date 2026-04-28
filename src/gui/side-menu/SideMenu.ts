// Creates a menu on the side of the screen that allows for easy display of object/faction
// information

import {MenuInterface}  from "./MenuInterface";
import FactionPanel     from "./FactionPanel";
import Faction          from "../../world/Faction";
import Location         from "../../world/Location";

interface SideMenuInterface {
    /** Updates the side menu with new information. */
    update(location : Location) : void;
    /** Displays the side menu */
    show() : void;
    /** Hides the side menu */
    hide() : void;
    destroy() : void;
}

export class SideMenu implements SideMenuInterface, MenuInterface {

    public update(location : Location) : void {
        // Title
        if (location.name) this.setTitle(location.name);
        else this.setTitle("");
        // Description
        if (location.description) this.setDescription(location.description);
        else this.setDescription("");
        // Faction
        if (location.faction) {
            this.setFaction(new FactionPanel(location.faction));
            this.element.style.background = this.factionElement.color;
            this.element.style.backgroundImage = "linear-gradient(rgba(130, 130, 130, 0.2), rgba(0, 0, 0, 0.4))"
        }
        else this.setFaction(new FactionPanel(new Faction("Undeclared Faction")));
        // Additional Info
        if (location.type) this.setAdditionalInfo(location.type);
        else this.setAdditionalInfo("");

        this.show();
    }

    get title()         : string { return this._title; }
    get description()   : string { return this._description; }
    get factionElement()       : FactionPanel { return this._factionElement; }
    get info()          : string { return this._additionalInfo; }

    public show() {
        this.element.style.display = "flex";
        this.element.style.pointerEvents = "auto";
        // Force a reflow to ensure the display change is applied before the transition starts
        this.element.offsetHeight;
        this.element.style.opacity = "1.0";
        this.element.style.transform = "translateX(0%)";
    }

    public hide() {
        this.element.style.opacity = "0.0";
        this.element.style.transform = "translateX(100%)";
        this.element.style.pointerEvents = "none";
        
        const onTransitionEnd = (event: TransitionEvent) => {
            if (event.propertyName === 'opacity' && this.element.style.opacity === "0.0") {
                this.element.style.display = "none";
                this.element.removeEventListener('transitionend', onTransitionEnd);
            }
        };
        
        this.element.addEventListener('transitionend', onTransitionEnd);
    }

    public set is_visible(value: boolean) {
        if (value) this.show();
        else this.hide();
    }

    public destroy() {
        this.element.remove();
    }

    public get is_visible(): boolean {
        return this.element.style.display !== "none";
    }

    public root() : HTMLElement {
        return this.element;
    }
    
// ****************** Constructor **********************
    constructor(font? : string) {
        this.element                = document.createElement("div");
        this.closeButtonElement     = document.createElement("button");
        this.titleElement           = document.createElement("h2");
        this.descriptionElement     = document.createElement("p");
        this.additionalInfoElement  = document.createElement("div");

        this.setupStyles(font);
        this.buildStructure();
        
        this.closeButtonElement.addEventListener("click", () => this.hide());
        
        document.body.appendChild(this.element);
    }

// ************* Private Functions **************

    private setupStyles(font? : string) {
        let font_str : string = "sans-serif";
        if (font) font_str = font;

        // Main container
        Object.assign(this.element.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            bottom: "20px",
            width: "calc(25% - 40px)",
            backgroundColor: "rgba(30, 30, 30, 0.9)",
            border: "2px solid rgba(160, 160, 160, 1)",
            color: "#e6e6e6",
            boxShadow: "0 0px 4px rgba(255,255,255,0.1)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
            borderRadius: "15px",
            padding: "20px",
            boxSizing: "border-box",
            overflowY: "auto",
            zIndex: "1000",
            fontFamily: font_str,
            display: "none",
            opacity: "0",
            transform: "translateX(100%)",
            flexDirection: "column",
            background: this.factionElement.color,
            gap: "10px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
        });
        this.element.onmouseover = () => {
            this.element.style.boxShadow = "0 0px 12px rgba(255,255,255,0.3)";
        };

        this.element.onmouseout = () => {
            this.element.style.boxShadow = "0 0px 4px rgba(255,255,255,0.1)";
        };

        // Close Button
        this.closeButtonElement.textContent = "×";
        Object.assign(this.closeButtonElement.style, {
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",

            border: "1px solid rgba(140, 140, 140, 1.0)",
            background: this.factionElement.color,
            fontSize: "24px",
            cursor: "pointer",
            color: "#d3d3d3",
            lineHeight: "1",
            padding: "0",
            borderRadius: "10px",
            transition: "background 0.2s ease, transform 0.2s ease",
        });
        this.closeButtonElement.onmouseover = () => {
            this.closeButtonElement.style.color = "#e3e3e3";
            this.closeButtonElement.style.background = "#2F2F2F";
        };
        this.closeButtonElement.onmouseout = () => {
            this.closeButtonElement.style.color = "#d8d8d8";
            this.closeButtonElement.style.background = "#0F0F0F";
        };

        // Title
        Object.assign(this.titleElement.style, {
            margin: "0 0 10px 0",
            fontSize: "24px",
            borderBottom: "2px solid #ccc",
            fontColor: "white",
            paddingBottom: "5px"
        });

        // Faction
        Object.assign(this.factionElement.root().style, {
            fontWeight: "bold",
            color: "#e1e1e1",
            fontSize: "14px",
            textTransform: "uppercase"
        });

        // Description
        Object.assign(this.descriptionElement.style, {
            lineHeight: "1.5",
            fontSize: "16px"
        });

        // Bottom Info
        Object.assign(this.additionalInfoElement.style, {
            marginTop: "auto",
            paddingTop: "15px",
            borderTop: "1px solid #eee",
            fontSize: "14px",
            fontStyle: "italic"
        });
    }

    /** Adds all DOM elements to the root of this SideMenu */
    private buildStructure() {
        this.element.appendChild(this.closeButtonElement);
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.factionElement.root());
        this.element.appendChild(this.descriptionElement);
        this.element.appendChild(this.additionalInfoElement);
    }

    /** Sets the underlying title of the HTML */
    private setTitle(value: string) {
        this._title = value;
        this.titleElement.textContent = value;
    }

    /** Sets the description of the HTML object */
    private setDescription(value: string) {
        this._description = value;
        this.descriptionElement.textContent = value;
    }

    /** Sets the faction of the HTML object */
    private setFaction(value: FactionPanel) {
        this.root().replaceChild(value.root(), this._factionElement.root())
        this._factionElement = value;
    }

    /** Sets the additional info box of the HTML object */
    private setAdditionalInfo(value: string) {
        this._additionalInfo = value;
        this.additionalInfoElement.textContent = value;
    }

    private element: HTMLDivElement;
    private closeButtonElement: HTMLButtonElement;
    private titleElement: HTMLHeadingElement;
    private descriptionElement: HTMLParagraphElement;
    private additionalInfoElement: HTMLDivElement;

    private _title: string = "";
    private _description: string = "";
    private _factionElement: FactionPanel = new FactionPanel(new Faction());
    private _additionalInfo: string = "";
}

let locationMenu : SideMenu = new SideMenu();
export default locationMenu;
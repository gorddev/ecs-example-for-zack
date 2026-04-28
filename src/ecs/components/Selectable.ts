import { Graphics, Container, ColorSource, ColorMatrixFilter } from "pixi.js";
import Location from "../../world/Location";
import camera from "../../core/Camera";
import locationMenu from "../../gui/side-menu/SideMenu";

export type HitboxShape = 
    | { type: 'rect'; width: number; height: number }
    | { type: 'circle'; radius: number }
    | { type: 'poly'; points: number[] };

/** Selectable component that responds to PixiJS mouse events.
 * Lights up in the shape of the hitbox when hovered over.
 */
export default class Selectable {
    public location: Location;
    public graphics: Graphics;
    
    private _baseAlpha: number = 0;
    private _hoverAlpha: number = 0.5;
    private _color: ColorSource = 0x707070;

    constructor(location: Location, shape: HitboxShape) {
        this.location = location;
        this.graphics = new Graphics();
        this.graphics.alpha = this._hoverAlpha;
        
        this.drawShape(shape);
        
        const filter = new ColorMatrixFilter();
        filter.contrast(10, true);
        filter.saturate(0.5);    // 50% saturation
        this.graphics.filters = [filter];
        
        this.graphics.eventMode = 'static';
        this.graphics.cursor = 'pointer';
        this.graphics.alpha = this._baseAlpha;
        this.graphics.zIndex = this.calculateZIndex(shape);

        this.graphics.on('pointerover', () => {
            this.graphics.alpha = this._hoverAlpha;
        });

        this.graphics.on('pointerout', () => {
            this.graphics.alpha = this._baseAlpha;
        });

        this.graphics.on('pointertap', () => {
                locationMenu.update(this.location)
            }
        );

        camera.addChild(this.graphics);
    }

    private calculateZIndex(shape: HitboxShape): number {
        let area = 0;
        switch (shape.type) {
            case 'rect':
                area = shape.width * shape.height;
                break;
            case 'circle':
                area = Math.PI * shape.radius * shape.radius;
                break;
            case 'poly':
                area = 10000; //TODO: gotta do a calculation?
                break;
        }
        return Math.max(0, 1000000 - Math.floor(area));
    }

    private drawShape(shape: HitboxShape) {
        this.graphics.clear();
        
        switch (shape.type) {
            case 'rect':
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                this.graphics.rect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                break;
            case 'circle':
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                this.graphics.circle(0, 0, shape.radius);
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                break;
            case 'poly':
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                this.graphics.poly(shape.points);
                this.graphics.fill({color: this._color, alpha: this._hoverAlpha});
                break;
        }
    }

    /**
     * Updates the position of the graphics object to match the location (if needed)
     * or any other update logic.
     */
    public updatePosition(x: number, y: number) {
        this.graphics.position.set(x, y);
    }

    [Symbol.dispose]() {
        this.graphics.destroy({ children: true, texture: true });
        camera.removeChild(this.graphics);
    }
}

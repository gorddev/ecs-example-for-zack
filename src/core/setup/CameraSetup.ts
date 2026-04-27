import { FederatedPointerEvent, Application } from "pixi.js";
import camera from "../Camera"
import vec2 from "../../components/vec2";

export default function CameraSetup(app: Application): void {
    let isDragging : boolean = false;
    let last = vec2.make(0, 0);

    let zoom : number = 1;
    const minZoom = 0.25;
    const maxZoom = 4;
    const zoomSpeed = 0.0015;

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("pointerdown", (event: FederatedPointerEvent) => {
        isDragging = true;
        last.set(event.global.x, event.global.y);
    });

    app.stage.on("pointermove", (event: FederatedPointerEvent) => {
        if (!isDragging) {
            return;
        }

        const dx = event.global.x - last.x;
        const dy = event.global.y - last.y;

        camera.x += dx;
        camera.y += dy;

        last.set(event.global.x, event.global.y);
    });

    app.stage.on("pointerup", () => {
        isDragging = false;
    });

    app.stage.on("pointerupoutside", () => {
        isDragging = false;
    });

    app.canvas.addEventListener("wheel",
        (event: WheelEvent) => {
            event.preventDefault();

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const oldZoom = zoom;

            zoom *= 1 - event.deltaY * zoomSpeed;
            zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

            const zoomRatio = zoom / oldZoom;

            camera.x = mouseX - (mouseX - camera.x) * zoomRatio;
            camera.y = mouseY - (mouseY - camera.y) * zoomRatio;

            camera.scale.set(zoom);
        },
        { passive: false },
    );
}
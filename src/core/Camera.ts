// This file just contains the camera, it's initialization, and nothing else

import { Viewport }     from 'pixi-viewport';
import app 				from "./Application"

// First create the camera as a viewport. 
let camera : Viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,
        events: app.renderer.events
});

app.stage.addChild(camera);

camera.sortableChildren = true;

camera
    .drag()
    .pinch()
    .wheel();

export default camera;
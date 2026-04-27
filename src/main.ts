import { Application as PixiApp }   from "pixi.js";
import SetupWorld                   from "./core/SetupWorld";
import Updater                      from "./core/Updater";

async function main(): Promise<void> {

    // Create our PixiJS Application
    const app = new PixiApp();

    // Setup the background and how PixiJS should render itself.
    await app.init({
        background: "#202020",
        resizeTo: window,
    });

    // Append the pixi canvas to the DOM
    document.body.appendChild(app.canvas);

    // Create the ECS world with Thyseus
    const world = await SetupWorld(app);


    app.ticker.add(async () => {
        await world.runSchedule(Updater);
    });
}

void main();
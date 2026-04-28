import app                          from "./core/Application";
import InitializeECS                from "./ecs/InitializeECS";
import LoadAssets                   from "./core/LoadAssets";
import Updater                      from "./ecs/Updater";
import testFunc from "./testing";
import locationMenu from "./gui/side-menu/SideMenu";
import TitanLocation from "./world/data/locations/TitanLocation";
import NullLocation from "./world/data/locations/NullLocation";


async function main(): Promise<void> {

    // Load all of our assets
    await LoadAssets();
    // Append the pixi canvas to the DOM
    document.body.appendChild(app.canvas);

    // Create the ECS world with Thyseus
    const world = await InitializeECS(app);

    app.stage.layout = {
        width: app.screen.width,
        height: app.screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    locationMenu.update(NullLocation);
    locationMenu.show();

    await testFunc(app, world);

    app.ticker.add(async () => {
        await world.runSchedule(Updater);
    });
}

void main();
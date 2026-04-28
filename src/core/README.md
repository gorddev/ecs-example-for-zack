## src/core

This folder contains the core runtime code used to start and manage the application.


#### ║:: `./Camera.ts`::║ 〈File〉
Contains the shared `camera` instance under `import camera`. All new items on the map should be added
to the camera. 

#### ║:: `./Application.ts`::║ 〈File〉
Contains the `pixi.js` application instance under `import app`.

#### ║:: `./LoadAssets`::║ 〘Dir〙
Where to load new assets into `pixi.js`. Assets are found in `ø/public`.
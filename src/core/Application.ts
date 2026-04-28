import { Application as PixiApp } from 'pixi.js'
import '@pixi/layout'

const app = new PixiApp();

await app.init({
	background: "#131313",
	preference: "webgpu",
	powerPreference: "high-performance",
	resizeTo: window,
    backgroundAlpha: 1,
    premultipliedAlpha: false
});

export default app;
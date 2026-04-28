import { Assets } from 'pixi.js'

export default async function LoadAssets() {

    await Assets.load("/player.png");
    await Assets.load("/Titan.png")
    await Assets.load("/faction.png")
    await Assets.load("/noah-faction.png")

}

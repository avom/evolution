import type { World } from "../engine/World";
import { WORLD_BACKGROUND_COLOR, WORLD_EDGE_COLOR } from "./Const";

export class WorldRenderer {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    render(world: World) {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.fillStyle = WORLD_BACKGROUND_COLOR;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.strokeStyle = WORLD_EDGE_COLOR;
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
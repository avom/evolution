import type { World } from "../engine/World";
import { AnimalRenderer } from "./AnimalRenderer";
import { WORLD_BACKGROUND_COLOR, WORLD_EDGE_COLOR } from "./Const";
import { PlantRenderer } from "./PlantRenderer";

export class WorldRenderer {
    private readonly plantRenderer: PlantRenderer;
    private readonly animalRenderer: AnimalRenderer;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get canvas 2D context");
        }
        this.ctx = ctx;
        this.plantRenderer = new PlantRenderer(this.ctx);
        this.animalRenderer = new AnimalRenderer(this.ctx);
    }

    render(world: World) {
        this.ctx.fillStyle = WORLD_BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.strokeStyle = WORLD_EDGE_COLOR;
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.plantRenderer.render(world.plants);
        this.animalRenderer.render(world.animals);
    }
}
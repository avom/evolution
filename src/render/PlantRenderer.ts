import { PLANT_COLOR } from "../engine/Config";
import type { Plant } from "../engine/Plant";

export class PlantRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    render(plants: Plant[]) {
        this.ctx.fillStyle = PLANT_COLOR;
        for (const plant of plants) {
            this.ctx.fillRect(plant.x, plant.y, 1, 1);
        }
    }
}
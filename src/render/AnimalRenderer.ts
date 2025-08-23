import type { Animal } from "../engine/Animal";
import { ANIMAL_COLOR } from "../engine/Config";

export class AnimalRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    render(animals: Animal[]) {
        this.ctx.strokeStyle = ANIMAL_COLOR;
        this.ctx.beginPath();
        for (const animal of animals) {
            this.ctx.arc(animal.x, animal.y, 3, 0, Math.PI * 2);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
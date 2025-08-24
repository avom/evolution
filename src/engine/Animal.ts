import type { ArtificialDNA } from "./ArtificialDNA";
import { Organism } from "./Organism";


interface Delta {
    readonly x: number;
    readonly y: number;
    readonly energy: number;
}

export class Animal extends Organism {

    private delta = {
        x: 0,
        y: 0,
        energy: 0
    };

    private readonly lengthFactor: number;
    private readonly widthFactor: number;

    constructor(x: number, y: number, birth: number, generation: number, 
        public readonly energy: number,
        private direction: number,
        private readonly dna: ArtificialDNA) {
        super(x, y, birth, generation);

        const genes = dna.getGenes();
        this.lengthFactor = genes[0].value;
        this.widthFactor = genes[1].value;
    }

    update(t: number): void {
        if (this.t >= t) {
            return;
        }

        const vx = 20 * (Math.random() - 0.5);
        const vy = 20 * (Math.random() - 0.5);

        this.delta = {
            x: vx,
            y: vy,
            energy: 0.001 * this.mass() * Math.sqrt(vx * vx + vy * vy)
        };

        const dt = t - this.t;
        this.pos.x += vx * dt;
        this.pos.y += vy * dt;

        super.update(t);
    }

    get getDelta() {
        return this.delta;
    }

    getDirection(): number {
        return this.direction;
    }

    get width() {
        return this.widthFactor
    }

    private mass(): number {
        return this.energy;
    }
}
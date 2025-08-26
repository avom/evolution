import type { Plant } from "../Plant";

export class PlantMap {

    private plants: (Plant | null)[][] = [];
    private plotSize: number;

    constructor(density: number) {
        this.plotSize = 1 / Math.sqrt(density);
    }

    public containsPlant(x: number, y: number): boolean {
        const col = Math.floor(x / this.plotSize);
        const row = Math.floor(y / this.plotSize);
        return !!this.plants[row]?.[col];
    }
    public getPlantAt(x: number, y: number): Plant | null {
        const col = Math.floor(x / this.plotSize);
        const row = Math.floor(y / this.plotSize);
        return this.plants[row]?.[col] || null;
    }

    public addPlant(plant: Plant): void {
        const col = Math.floor(plant.x / this.plotSize);
        const row = Math.floor(plant.y / this.plotSize);
        this.plants[row] = this.plants[row] || [];
        this.plants[row][col] = plant;
    }

    public removePlant(plant: Plant): void {
        const col = Math.floor(plant.x / this.plotSize);
        const row = Math.floor(plant.y / this.plotSize);
        if (this.plants[row]) {
            this.plants[row][col] = null;
        }
    }

    public getClosestInRange(x: number, y: number, r: number): Plant | null {
        const col = Math.floor(x / this.plotSize);
        const row = Math.floor(y / this.plotSize);
        const range = Math.ceil(r / this.plotSize);

        let closest: Plant | null = null;
        let closestDistSq = r * r;

        for (let dy = -range; dy <= range; dy++) {
            for (let dx = -range; dx <= range; dx++) {
                const plot = this.plants[row + dy]?.[col + dx];
                if (plot) {
                    const distSq = (plot.x - x) * (plot.x - x) + (plot.y - y) * (plot.y - y);
                    if (distSq < closestDistSq) {
                        closest = plot;
                        closestDistSq = distSq;
                    }
                }
            }
        }

        return closest;
    }
}
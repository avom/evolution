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
}
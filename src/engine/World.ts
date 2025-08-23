import type { Animal } from "./Animal";
import { PLANT_GROWTH_DENSITY } from "./Config";
import { PlantMap } from "./data_structures/PlantMap";
import type { Organism } from "./Organism";
import type { Plant } from "./Plant";
import type { PlantSeeder } from "./PlantSeeder";

export interface WorldOptions {
    width: number;
    height: number;
}

export class World {
    private width: number;
    private height: number;
    private plantsMap: PlantMap;
    public readonly plants: Plant[] = [];
    public readonly animals: Animal[] = [];

    constructor(options: WorldOptions) {
        this.width = options.width;
        this.height = options.height;
        this.plantsMap = new PlantMap(PLANT_GROWTH_DENSITY);
    }

    public getSeeder(): PlantSeeder {
        return {
            seed: (seed: Plant) => {
                if (seed.x < 0 || seed.x >= this.width || seed.y < 0 || seed.y >= this.height) {
                    return;
                }
                
                if (this.plantsMap.getPlantAt(seed.x, seed.y) === null) {
                    this.plantsMap.addPlant(seed);
                    this.plants.push(seed);
                }
            }
        };
    }

    public addPlant(plant: Plant): void {
        if (this.plantsMap.containsPlant(plant.x, plant.y)) {
            return;
        }
        this.plants.push(plant);
        this.plantsMap.addPlant(plant);
    }

    public update(t: number) {
        this.updateOrganisms(t, this.plants);
        this.updateOrganisms(t, this.animals);
    }

    private updateOrganisms(t: number, organisms: Organism[]) {
        let j = 0;
        for (let i = 0; i < organisms.length; i++) {
            if (organisms[i].isAlive()) {
                organisms[i].update(t);
                j++;
            }

            if (j < i) {
                organisms[j] = organisms[i];
            }
        }
        organisms.length = j;
    }

    public addAnimal(animal: Animal): void {
        this.animals.push(animal);
    }

}
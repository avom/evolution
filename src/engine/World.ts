import { PLANT_GROWTH_DENSITY } from "./Config";
import { PlantMap } from "./data_structures/PlantMap";
import type { Plant } from "./Plant";
import type { PlantSeeder } from "./PlantSeeder";

export interface WorldOptions {
    width: number;
    height: number;
}

export class World {
    private width: number;
    private height: number;
    private plants: PlantMap;

    constructor(options: WorldOptions) {
        this.width = options.width;
        this.height = options.height;
        this.plants = new PlantMap(PLANT_GROWTH_DENSITY);
    }

    public getSeeder(): PlantSeeder {
        return {
            seed: (seed: Plant) => {
                if (seed.x < 0 || seed.x >= this.width || seed.y < 0 || seed.y >= this.height) {
                    return;
                }
                
                if (this.plants.getPlantAt(seed.x, seed.y) === null) {
                    this.plants.addPlant(seed);
                }
            }
        };
    }
}
import { PLANT_ENERGY_GAIN_PER_SECOND, PLANT_SEED_ENERGY, PLANT_SEEDING_ENERGY, PLANT_SEEDING_RANGE, PLANT_SEEDING_SEED_COUNT } from "./Config";
import { Organism } from "./Organism";
import type { PlantSeeder } from "./PlantSeeder";

export class Plant extends Organism {

    private seedsProduced = 0;

    constructor(x: number, y: number, birth: number, 
        private seeder: PlantSeeder) {
        super(x, y, birth);
    }

    update(t: number): void {
        const dt = t - this.t0;
        if (dt < 0) {
            return;
        }

        while (this.getEnergy(t) >= PLANT_SEEDING_ENERGY) {
            const range = PLANT_SEEDING_RANGE;
            for (let i = 0; i < PLANT_SEEDING_SEED_COUNT; i++) {
                const seedX = this.x + 2 * Math.random() * range - range;
                const seedY = this.y + 2 * Math.random() * range - range;
                const seed = new Plant(seedX, seedY, t, this.seeder);
                this.seeder.seed(seed);
                this.seedsProduced++;
            }
        }
    }

    getEnergy(t: number): number {
        const age = t - this.birth;
        let energy = PLANT_SEED_ENERGY + age * PLANT_ENERGY_GAIN_PER_SECOND;
        energy -= this.seedsProduced * PLANT_SEED_ENERGY;
        return energy;
    }
}
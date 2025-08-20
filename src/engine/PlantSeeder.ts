import type { Plant } from "./Plant";

export interface PlantSeeder {
    seed(plant: Plant): void;
}
import { Animal } from "./Animal";
import { ANIMAL_INITIAL_ENERGY, PLANT_ENERGY_GAIN_PER_SECOND, PLANT_INITIAL_DENSITY, PLANT_SEED_ENERGY, PLANT_SEEDING_ENERGY } from "./Config";
import { Plant } from "./Plant";
import type { PlantSeeder } from "./PlantSeeder";
import { World } from "./World";

export function buildWorld(width: number, height: number) {
    const world = new World({ width, height });
    const seeder = world.getSeeder();
    const initialPlantCount = Math.floor(width * height * PLANT_INITIAL_DENSITY);
    
    for (let i = 0; i < initialPlantCount; i++) {
        const plant = createRandomPlant(width, height, seeder);
        world.addPlant(plant);
    }

    world.addAnimal(createRandomAnimal(width, height));

    return world;
}

function createRandomPlant(width: number, height: number, seeder: PlantSeeder) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const seedingAge = (PLANT_SEEDING_ENERGY - PLANT_SEED_ENERGY) / PLANT_ENERGY_GAIN_PER_SECOND;
    const age = seedingAge * Math.random();
    const generation = 1;
    return new Plant(x, y, -age, generation, seeder);
}

function createRandomAnimal(width: number, height: number) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const birth = 0;
    const generation = 1;
    return new Animal(x, y, birth, generation, ANIMAL_INITIAL_ENERGY);
}
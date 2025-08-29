import { K2Tree } from "./data_structures/K2Tree";
import type { PlantMap } from "./data_structures/PlantMap";
import { Plant } from "./Plant";

export interface Eater {
  eat(x: number, y: number, r: number): void;
}

export class PlantEater implements Eater {
  constructor(private readonly plantFinder: K2Tree<Plant>) {}

  eat(x: number, y: number, r: number): void {
    const plant = this.plantFinder.getClosestInRange(x, y, r);
    if (plant) {
      // plant.consume();
    }
  }
}

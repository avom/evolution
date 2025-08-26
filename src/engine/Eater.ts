import type { PlantMap } from "./data_structures/PlantMap";

export interface Eater {
  eat(x: number, y: number, r: number): void;
}

export class PlantEater implements Eater {
  constructor(private readonly plantFinder: PlantMap) {}

  eat(x: number, y: number, r: number): void {
    
  }
}

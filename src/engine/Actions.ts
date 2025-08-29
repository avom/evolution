import { Organism, OrganismId } from "./Organism";
import { Plant } from "./Plant";

export enum ActionType {
  Eat = 'eat',
  Move = 'move',
  CreatePlant = 'create_plant',
  Grow = 'grow'
}

export interface Action {
  readonly type: ActionType;
  readonly plantId?: OrganismId;
  readonly animalId?: OrganismId;
  readonly durationSeconds: number;
}

export interface CreatePlantAction extends Action {
  readonly type: ActionType.CreatePlant;
  readonly x: number;
  readonly y: number;
}

import { Action } from "./Actions";
import type { ArtificialDNA } from "./ArtificialDNA";
import { ANIMAL_DEFAULT_MOVEMENT_SPEED } from "./Config";
import { Organism } from "./Organism";

interface AnimalProps {
  x: number;
  y: number;
  birth: number;
  generation: number;
  energy: number;
  direction: number;
  dna: ArtificialDNA;
}

interface Delta {
  readonly x: number;
  readonly y: number;
  readonly energy: number;
}

export class Animal extends Organism {
  private delta = {
    x: 0,
    y: 0,
    energy: 0,
  };

  private readonly lengthFactor: number;
  private readonly widthFactor: number;
  private readonly dna: ArtificialDNA;

  private energy: number;
  private direction: number;

  constructor({
    x,
    y,
    birth,
    generation,
    energy,
    direction,
    dna,
  }: AnimalProps) {
    super(x, y, birth, generation);

    const genes = dna.getGenes();
    this.lengthFactor = genes[0].value;
    this.widthFactor = genes[1].value;
    this.energy = energy;
    this.direction = direction;
    this.dna = dna;
  }

  update(t: number): Action | null {
    super.update(t);
    return null;

    // if (this.t >= t) {
    //   return;
    // }

    // const vx = 2 * ANIMAL_DEFAULT_MOVEMENT_SPEED * (Math.random() - 0.5);
    // const vy = 2 * ANIMAL_DEFAULT_MOVEMENT_SPEED * (Math.random() - 0.5);

    // this.delta = {
    //   x: vx,
    //   y: vy,
    //   energy: 0.001 * this.mass() * Math.sqrt(vx * vx + vy * vy),
    // };

    // const dt = t - this.t;
    // this.pos.x += vx * dt;
    // this.pos.y += vy * dt;

    // super.update(t);
  }

  get getDelta() {
    return this.delta;
  }

  getDirection(): number {
    return this.direction;
  }

  get width() {
    return this.widthFactor;
  }

  private mass(): number {
    return this.energy;
  }
}

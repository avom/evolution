import { energyToArea } from "./Physics";

export class Cell {
  private energy = 0;

  constructor(
    private lengthFactor: number,
    private widthFactor: number,
    private growthFactor: number) {}

  get length(): number {
    // S = pi * (l / 2) * (w / 2)
    // l * w = 4 * S / pi
    // l / w = lf / wf => w = l * wf / lf
    // l * l = 4 * S / pi * lf / wf
    // l = sqrt(4 * S / pi * lf / wf)
    const area = energyToArea(this.energy);
    return Math.sqrt(4 * area / Math.PI * this.lengthFactor / this.widthFactor);
  }

  get width(): number {
    // l / w = lf / wf => l = w * lf / wf
    // w * w = 4 * S / pi * wf / lf
    // w = sqrt(4 * S / pi * wf / lf)
    const area = energyToArea(this.energy);
    return Math.sqrt(4 * area / Math.PI * this.widthFactor / this.lengthFactor);
  }

    addEnergy(energy: number): void {
        this.energy += energy * this.growthFactor;
    }

    

}

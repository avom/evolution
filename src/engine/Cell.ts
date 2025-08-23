import { energyToArea } from "./Physics";

export class Cell {
  private energy = 0;

  constructor(
    private radiusRatio: number, 
    private growthFactor: number) {}

  get length(): number {
    // S = pi * a * b
    // a = b * k, where k = radius ratio
    // S = pi * a^2 / k
    // a = sqrt(S * k / pi)
    // length = 2 * a
    const area = energyToArea(this.energy);
    return Math.sqrt((area * this.radiusRatio) / Math.PI) * 2;
  }

  get width(): number {
    // S = pi * a * b
    // b = a / k, where k = radius ratio
    // S = pi * b^2 * k
    // b = sqrt(S / (pi * k))
    // width = 2 * b
    const area = energyToArea(this.energy);
    return Math.sqrt(area / (Math.PI * this.radiusRatio)) * 2;
  }

    addEnergy(energy: number): void {
        this.energy += energy * this.growthFactor;
    }

    

}

export class Organism {

    private pos: { x: number; y: number; };
    public readonly birth: number;
    protected t0: number;
    private alive = true;

    constructor(x: number, y: number, birth: number) {
        this.pos = { x, y };
        this.birth = birth;
        this.t0 = birth;
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    update(t: number) {
        this.t0 = Math.max(this.t0, t);
    }

    getEnergy(t: number): number {
        return (t - this.t0) * 10;
    }

    isAlive(): boolean {
        return this.alive;
    }

    kill(): void {
        this.alive = false;
    }
}
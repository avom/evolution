export class Organism {

    public pos: { x: number; y: number; };
    public readonly birth: number;
    protected t: number;
    private alive = true;

    constructor(x: number, y: number, birth: number, 
        public readonly generation: number = 1) {

        this.pos = { x, y };
        this.birth = birth;
        this.t = birth;
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    update(t: number) {
        this.t = Math.max(this.t, t);
    }

    getEnergy(t: number): number {
        return (t - this.t) * 10;
    }

    isAlive(): boolean {
        return this.alive;
    }

    kill(): void {
        this.alive = false;
    }
}
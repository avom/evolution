import { Action } from "./Actions";

export type OrganismId = number;

export class Organism {

    public pos: { x: number; y: number; };
    public readonly birth: number;
    protected t: number;
    private alive = true;

    constructor(
        public readonly id: OrganismId,
        x: number, y: number, birth: number,
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

    update(_t: number): Action[] {
        return [];
    }

    get energy(): number {
        return (this.t - this.birth) * 10;
    }

    isAlive(): boolean {
        return this.alive;
    }

    kill(): void {
        this.alive = false;
    }

    handleAction(action: Action): void {
    }
}
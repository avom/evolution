export class Gene {
    constructor(public readonly value: number) {}

    replicate(mutationRate: number): Gene {
        if (Math.random() < mutationRate) {
            return new Gene(Math.random());
        }
        return this;
    }
}
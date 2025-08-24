import type { Gene } from "./Gene";

export class ArtificialDNA {
    constructor(private readonly genes: Gene[]) {}

    replicate(mutationRate: number = 0.1): ArtificialDNA {
        const newGenes: Gene[] = [];
        for (let i = 0; i < this.genes.length; ) {
            const cellLength = this.genes[i++].replicate(mutationRate);
            newGenes.push(cellLength);

            const cellWidth = this.genes[i++].replicate(mutationRate);
            newGenes.push(cellWidth);
        }

        return new ArtificialDNA(newGenes);
    }

    getGenes(): ReadonlyArray<Gene> {
        return this.genes;
    }
}
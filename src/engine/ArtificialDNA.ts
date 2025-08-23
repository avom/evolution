export class ArtificialDNA {
    constructor(private sequence: number[]) {}

    replicate(mutationRate: number = 0.1): ArtificialDNA {
        const newSequence = number[];
        let newLen = 0;
        for (let i = 0; i < this.sequence.length; i++) {
            const cellLength = this.sequence[i];
            newSequence.push(cellLength);
            newLen++;
        }

        return new ArtificialDNA(newSequence);
    }

    // private mutateGene

}
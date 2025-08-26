import type { Gene } from "./Gene";

export interface DNA {
    getGenes(): ReadonlyArray<Gene>;
    replicate(mutationRate?: number): DNA;
}
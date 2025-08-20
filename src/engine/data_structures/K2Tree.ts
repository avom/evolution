class XNode<T> {
    private count = 0;
    private item: T | null = null;

    constructor(
        public readonly left: number, 
        public readonly right: number,
        public readonly top: number,
        public readonly bottom: number) {
    }

    add(item: T) {
        if (this.count == 0) {
            this.item = item;
            this.count = 1;
        }
    }

    remove(item: T) {}

}

export class K2Tree<T> {

}


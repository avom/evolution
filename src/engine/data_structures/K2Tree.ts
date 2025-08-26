export interface K2TreeItem {
  x: number;
  y: number;
}

class K2TreeNode<T extends K2TreeItem> {
  private _count = 0;
  private item: T | null = null;
  private child1: K2TreeNode<T> | null = null;
  private child2: K2TreeNode<T> | null = null;

  constructor(
    private readonly left: number,
    private readonly right: number,
    private readonly top: number,
    private readonly bottom: number,
  ) {}

  get count(): number {
    return this._count;
  }

  add(item: T): void {
    this._count++;
    if (this.isLeaf()) {
      if (this.item === null) {
        this.item = item;
        return;
      } else {
        this.split();
      }
    }

    if (this.child1!.containsPoint(item.x, item.y)) {
      this.child1!.add(item);
    } else {
      this.child2!.add(item);
    }
  }

  containsInRange(x: number, y: number, r: number): boolean {
    if (this.count === 0) {
      return false;
    }

    if (
      this.left > x + r ||
      this.right < x - r ||
      this.top > y + r ||
      this.bottom < y - r
    ) {
      return false;
    }

    if (this.isLeaf()) {
      if (this.item === null) {
        return false;
      }
      const dx = this.item.x - x;
      const dy = this.item.y - y;
      return dx ** 2 + dy ** 2 <= r ** 2;
    }

    if (this.isEntirelyInRange(x, y, r)) {
      return this.count > 0;
    }

    return this.child1!.containsInRange(x, y, r) || this.child2!.containsInRange(x, y, r);
  }

  private isLeaf(): boolean {
    return this.child1 === null && this.child2 === null;
  }

  private isEntirelyInRange(x: number, y: number, r: number): boolean {
    const dLeft = this.left - x;
    const dRight = this.right - x;
    const dTop = this.top - y;
    const dBottom = this.bottom - y;

    const farthestCorner = Math.max(
      dLeft ** 2 + dTop ** 2,
      dRight ** 2 + dTop ** 2,
      dLeft ** 2 + dBottom ** 2,
      dRight ** 2 + dBottom ** 2
    );

    return farthestCorner <= r ** 2;
  }

  private split(): void {
    const width = this.right - this.left;
    const height = this.bottom - this.top;

    if (width >= height) {
      const midX = this.left + width / 2;
      this.child1 = new K2TreeNode<T>(this.left, midX, this.top, this.bottom);
      this.child2 = new K2TreeNode<T>(midX, this.right, this.top, this.bottom);
    } else {
      const midY = this.top + height / 2;
      this.child1 = new K2TreeNode<T>(this.left, this.right, this.top, midY);
      this.child2 = new K2TreeNode<T>(this.left, this.right, midY, this.bottom);
    }
  }

  private containsPoint(x: number, y: number): boolean {
    return this.left <= x && x < this.right && this.top <= y && y < this.bottom;
  }
}

export class K2Tree<T extends K2TreeItem> {
  private root: K2TreeNode<T>;

  constructor(width: number, height: number) {
    this.root = new K2TreeNode<T>(0, width - 1, 0, height - 1);
  }

  add(item: T): void {
    this.root.add(item);
  }

  containsInRange(x: number, y: number, r: number): boolean {
    return this.root.containsInRange(x, y, r);
  }

  get count(): number {
    return this.root.count;
  }
}

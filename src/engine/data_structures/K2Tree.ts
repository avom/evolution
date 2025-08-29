export interface K2TreeItem {
  x: number;
  y: number;
}

export class K2Tree<T extends K2TreeItem> {
  private root: K2TreeNode<T>;

  constructor(
    private width: number,
    private height: number,
    resolution: number = 1
  ) {
    this.root = new K2TreeNode<T>(0, width, 0, height, resolution);
  }

  add(item: T): void {
    if (item.x < 0 || item.y < 0 || item.x >= this.width || item.y >= this.height) {
      throw new Error('Item is out of bounds');
    }
    this.root.add(item);
  }

  containsInRange(x: number, y: number, r: number): boolean {
    return this.root.containsInRange(x, y, r);
  }

  getClosestInRange(x: number, y: number, r: number): T | null {
    return this.root.getClosestInRange(x, y, r);
  }

  get count(): number {
    return this.root.count;
  }
}

class K2TreeNode<T extends K2TreeItem> {
  private _count = 0;
  private readonly items: T[] = [];
  private readonly child1: K2TreeNode<T> | null = null;
  private readonly child2: K2TreeNode<T> | null = null;

  protected readonly isLeaf: boolean;

  constructor(
    private readonly left: number,
    private readonly right: number,
    private readonly top: number,
    private readonly bottom: number,
    resolution: number
  ) {
    if (resolution <= 0) {
      throw new Error('Resolution must be positive');
    }

    const width = right - left;
    const height = bottom - top;
    this.isLeaf = resolution > Math.max(width, height);
    if (!this.isLeaf) {
      if (width >= height) {
        const midX = left + width / 2;
        this.child1 = new K2TreeNode<T>(left, midX, top, bottom, resolution);
        this.child2 = new K2TreeNode<T>(midX, right, top, bottom, resolution);
      } else {
        const midY = top + height / 2;
        this.child1 = new K2TreeNode<T>(left, right, top, midY, resolution);
        this.child2 = new K2TreeNode<T>(left, right, midY, bottom, resolution);
      }
    }
  }

  get count(): number {
    return this._count;
  }

  add(item: T): void {
    this._count++;
    if (this.isLeaf) {
      this.items.push(item);
    } else if (this.child1!.containsPoint(item.x, item.y)) {
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

    if (this.isLeaf) {
      return this.items.some(item => {
        const dx = item.x - x;
        const dy = item.y - y;
        return dx ** 2 + dy ** 2 <= r ** 2;
      });
    }

    if (this.isEntirelyInRange(x, y, r)) {
      return this.count > 0;
    }

    return (
      this.child1!.containsInRange(x, y, r) ||
      this.child2!.containsInRange(x, y, r)
    );
  }

  getClosestInRange(x: number, y: number, r: number): T | null {
    if (this.count === 0) {
      return null;
    }

    if (
      this.left > x + r ||
      this.right < x - r ||
      this.top > y + r ||
      this.bottom < y - r
    ) {
      return null;
    }

    let closest: T | null = null;
    let closestDistSq = r * r;

    if (this.isLeaf) {
      for (const item of this.items) {
        const dx = item.x - x;
        const dy = item.y - y;
        const distSq = dx * dx + dy * dy;
        if (distSq <= closestDistSq) {
          closest = item;
          closestDistSq = distSq;
        }
      }
      return closest;
    }

    const child1Closest = this.child1!.getClosestInRange(x, y, r);
    if (child1Closest) {
      const dx1 = child1Closest.x - x;
      const dy1 = child1Closest.y - y;
      const distSq1 = dx1 * dx1 + dy1 * dy1;
      if (distSq1 < closestDistSq) {
        closest = child1Closest;
        closestDistSq = distSq1;
      }
    }

    const child2Closest = this.child2!.getClosestInRange(x, y, r);
    if (child2Closest) {
      const dx2 = child2Closest.x - x;
      const dy2 = child2Closest.y - y;
      const distSq2 = dx2 * dx2 + dy2 * dy2;
      if (distSq2 < closestDistSq) {
        closest = child2Closest;
        closestDistSq = distSq2;
      }
    }

    return closest;
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

  private containsPoint(x: number, y: number): boolean {
    return this.left <= x && x < this.right && this.top <= y && y < this.bottom;
  }
}

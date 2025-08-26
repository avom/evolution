import { K2Tree, K2TreeItem } from "./K2Tree";

describe("K2Tree", () => {
  describe("containsItemInRange()", () => {
    it("returns false when the tree is empty", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      expect(sut.containsInRange(50, 50, 100)).toBe(false);
    });

    it("returns true when an item is within range", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      sut.add({ x: 45, y: 45 });
      expect(sut.containsInRange(50, 50, 10)).toBe(true);
    });

    it("returns false when the closest item is out of range", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      sut.add({ x: 45, y: 45 });
      expect(sut.containsInRange(50, 50, 5)).toBe(false);
    });

    it("returns true when closest point is several sections away", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      sut.add({ x: 1, y: 10 });
      for (let x = 0; x < 50; x++) {
        sut.add({ x, y: 100 });
      }
      
      expect(sut.containsInRange(50, 10, 50)).toBe(true);
    });
  });

  describe("add()", () => {
    it("adds an item to the tree", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      sut.add({ x: 50, y: 50 });
      expect(sut.count).toBe(1);
    });

    it("adds an item to the tree even if another item is in the same location", () => {
      const sut = new K2Tree<K2TreeItem>(100, 100);
      sut.add({ x: 50, y: 50 });
      sut.add({ x: 50, y: 50 });
      expect(sut.count).toBe(2);
    });
  });
});

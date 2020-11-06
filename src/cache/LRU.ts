import { T_Result } from './../calculators/TotalAmount';

type Cache = {
  [name: string]: {
    key: string;
    value: T_Result;
    next: Node;
    prev: Node;
  }
}

class Node {
  key: string;
  value: T_Result;
  next: this;
  prev: this;

  constructor(key: string, value: T_Result, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export class LRU {
  private capacity: number;
  private head: Node;
  private tail: Node;
  private cache: Cache;
  private size: number;

  constructor({capacity}) {
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.cache = {};
    this.size = 0;
  }

  get(key: string): false | T_Result {
    if (this.cache[key]) {
      const value = this.cache[key].value;
      this.remove(key);
      this.put(key, value);

      return value;
    } else {
      return false;
    }
  }

  put(key: string, value: T_Result): void {
    this.checkSize(key);

    if (!this.cache[key]) {
      if (!this.head) {
        this.head = this.tail = new Node(key, value);
      } else {
        const node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      }

      this.cache[key] = this.head;
      this.size++;
    } else {
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
      this.remove(key);
      this.cache[key] = node;
      this.size++;
    }
  }

  remove(key: string): void {
    const node = this.cache[key];

    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    delete this.cache[key];
    this.size--;
  }

  checkSize(key: string): void {
    if (this.size + 1 > this.capacity && !this.cache[key]) {
      this.remove(this.tail.key);
    }
  }
}

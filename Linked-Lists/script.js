class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this._head = null;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this._head) {
      this._head = newNode;
      return;
    }

    let current = this._head;
    while (current.nextNode) {
      current = current.nextNode;
    }

    current.nextNode = newNode;
  }

  prepend(value) {
    this._head = new Node(value, this._head);
  }

  size() {
    let count = 0;
    let current = this._head;

    while (current) {
      count += 1;
      current = current.nextNode;
    }

    return count;
  }

  head() {
    return this._head?.value;
  }

  tail() {
    if (!this._head) return undefined;

    let current = this._head;
    while (current.nextNode) {
      current = current.nextNode;
    }

    return current.value;
  }

  at(index) {
    if (index < 0) return undefined;

    let currentIndex = 0;
    let current = this._head;

    while (current) {
      if (currentIndex === index) {
        return current.value;
      }

      currentIndex += 1;
      current = current.nextNode;
    }

    return undefined;
  }

  pop() {
    if (!this._head) return undefined;

    const removedValue = this._head.value;
    this._head = this._head.nextNode;
    return removedValue;
  }

  contains(value) {
    let current = this._head;

    while (current) {
      if (current.value === value) {
        return true;
      }

      current = current.nextNode;
    }

    return false;
  }

  findIndex(value) {
    let currentIndex = 0;
    let current = this._head;

    while (current) {
      if (current.value === value) {
        return currentIndex;
      }

      currentIndex += 1;
      current = current.nextNode;
    }

    return -1;
  }

  toString() {
    if (!this._head) return "";

    const parts = [];
    let current = this._head;

    while (current) {
      parts.push(`( ${current.value} )`);
      current = current.nextNode;
    }

    return `${parts.join(" -> ")} -> null`;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw new RangeError("Index out of bounds");
    }

    if (values.length === 0) {
      return;
    }

    let nextNodeAtIndex;

    if (index === 0) {
      nextNodeAtIndex = this._head;
    } else {
      let previous = this._head;
      let currentIndex = 0;

      while (currentIndex < index - 1) {
        previous = previous.nextNode;
        currentIndex += 1;
      }

      nextNodeAtIndex = previous.nextNode;

      let chainHead = null;
      let chainTail = null;
      for (const value of values) {
        const node = new Node(value);
        if (!chainHead) {
          chainHead = node;
          chainTail = node;
        } else {
          chainTail.nextNode = node;
          chainTail = node;
        }
      }

      chainTail.nextNode = nextNodeAtIndex;
      previous.nextNode = chainHead;
      return;
    }

    let chainHead = null;
    let chainTail = null;
    for (const value of values) {
      const node = new Node(value);
      if (!chainHead) {
        chainHead = node;
        chainTail = node;
      } else {
        chainTail.nextNode = node;
        chainTail = node;
      }
    }

    chainTail.nextNode = nextNodeAtIndex;
    this._head = chainHead;
  }

  removeAt(index) {
    const listSize = this.size();
    if (index < 0 || index >= listSize) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      const removedValue = this._head.value;
      this._head = this._head.nextNode;
      return removedValue;
    }

    let previous = this._head;
    let currentIndex = 0;

    while (currentIndex < index - 1) {
      previous = previous.nextNode;
      currentIndex += 1;
    }

    const removedNode = previous.nextNode;
    previous.nextNode = removedNode.nextNode;
    return removedNode.value;
  }
}

export { LinkedList, Node };

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

class Tree {
  constructor(array = []) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return null;
    }

    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);

    const buildFromRange = (start, end) => {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedUnique[mid]);
      node.left = buildFromRange(start, mid - 1);
      node.right = buildFromRange(mid + 1, end);
      return node;
    };

    return buildFromRange(0, sortedUnique.length - 1);
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return true;
      }

      current = value < current.data ? current.left : current.right;
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return;
      }

      if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }

        current = current.right;
      }
    }
  }

  deleteItem(value) {
    const deleteNode = (node, target) => {
      if (node === null) {
        return null;
      }

      if (target < node.data) {
        node.left = deleteNode(node.left, target);
        return node;
      }

      if (target > node.data) {
        node.right = deleteNode(node.right, target);
        return node;
      }

      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      node.data = successor.data;
      node.right = deleteNode(node.right, successor.data);
      return node;
    };

    this.root = deleteNode(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (this.root === null) {
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  height(value) {
    const findNode = (node, target) => {
      let current = node;

      while (current !== null) {
        if (target === current.data) {
          return current;
        }

        current = target < current.data ? current.left : current.right;
      }

      return null;
    };

    const node = findNode(this.root, value);
    if (node === null) {
      return undefined;
    }

    const computeHeight = (current) => {
      if (current === null) {
        return -1;
      }

      return (
        1 + Math.max(computeHeight(current.left), computeHeight(current.right))
      );
    };

    return computeHeight(node);
  }

  depth(value) {
    let current = this.root;
    let currentDepth = 0;

    while (current !== null) {
      if (value === current.data) {
        return currentDepth;
      }

      current = value < current.data ? current.left : current.right;
      currentDepth += 1;
    }

    return undefined;
  }

  isBalanced() {
    const check = (node) => {
      if (node === null) {
        return { balanced: true, height: -1 };
      }

      const left = check(node.left);
      if (!left.balanced) {
        return { balanced: false, height: 0 };
      }

      const right = check(node.right);
      if (!right.balanced) {
        return { balanced: false, height: 0 };
      }

      const balanced = Math.abs(left.height - right.height) <= 1;
      const height = 1 + Math.max(left.height, right.height);

      return { balanced, height };
    };

    return check(this.root).balanced;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.#buildTree(values);
  }
}

const randomArray = (length = 15, max = 100) => {
  const arr = [];

  for (let i = 0; i < length; i += 1) {
    arr.push(Math.floor(Math.random() * max));
  }

  return arr;
};

const valuesFromTraversal = (tree, traversalMethod) => {
  const values = [];
  traversalMethod.call(tree, (value) => values.push(value));
  return values;
};

const tree = new Tree(randomArray());

console.log("Initial tree balanced:", tree.isBalanced());
prettyPrint(tree.root);
console.log("Level order:", valuesFromTraversal(tree, tree.levelOrderForEach));
console.log("Preorder:", valuesFromTraversal(tree, tree.preOrderForEach));
console.log("Postorder:", valuesFromTraversal(tree, tree.postOrderForEach));
console.log("Inorder:", valuesFromTraversal(tree, tree.inOrderForEach));

tree.insert(101);
tree.insert(120);
tree.insert(150);
tree.insert(180);
tree.insert(220);

console.log("\nAfter adding values > 100, balanced:", tree.isBalanced());
prettyPrint(tree.root);

tree.rebalance();

console.log("\nAfter rebalance, balanced:", tree.isBalanced());
prettyPrint(tree.root);
console.log("Level order:", valuesFromTraversal(tree, tree.levelOrderForEach));
console.log("Preorder:", valuesFromTraversal(tree, tree.preOrderForEach));
console.log("Postorder:", valuesFromTraversal(tree, tree.postOrderForEach));
console.log("Inorder:", valuesFromTraversal(tree, tree.inOrderForEach));

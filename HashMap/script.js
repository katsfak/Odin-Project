class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("HashMap only supports string keys.");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let index = 0; index < key.length; index += 1) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(index)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];

    for (let index = 0; index < bucket.length; index += 1) {
      if (bucket[index][0] === key) {
        bucket[index][1] = value;
        return;
      }
    }

    if ((this.size + 1) / this.capacity > this.loadFactor) {
      this.#resize();
    }

    const resizedBucketIndex = this.hash(key);
    const resizedBucket = this.buckets[resizedBucketIndex];

    resizedBucket.push([key, value]);
    this.size += 1;
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)];

    for (let index = 0; index < bucket.length; index += 1) {
      if (bucket[index][0] === key) {
        return bucket[index][1];
      }
    }

    return null;
  }

  has(key) {
    const bucket = this.buckets[this.hash(key)];

    for (let index = 0; index < bucket.length; index += 1) {
      if (bucket[index][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const bucket = this.buckets[this.hash(key)];

    for (let index = 0; index < bucket.length; index += 1) {
      if (bucket[index][0] === key) {
        bucket.splice(index, 1);
        this.size -= 1;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    const result = [];

    for (
      let bucketIndex = 0;
      bucketIndex < this.buckets.length;
      bucketIndex += 1
    ) {
      const bucket = this.buckets[bucketIndex];
      for (let index = 0; index < bucket.length; index += 1) {
        result.push(bucket[index][0]);
      }
    }

    return result;
  }

  values() {
    const result = [];

    for (
      let bucketIndex = 0;
      bucketIndex < this.buckets.length;
      bucketIndex += 1
    ) {
      const bucket = this.buckets[bucketIndex];
      for (let index = 0; index < bucket.length; index += 1) {
        result.push(bucket[index][1]);
      }
    }

    return result;
  }

  entries() {
    const result = [];

    for (
      let bucketIndex = 0;
      bucketIndex < this.buckets.length;
      bucketIndex += 1
    ) {
      const bucket = this.buckets[bucketIndex];
      for (let index = 0; index < bucket.length; index += 1) {
        result.push([bucket[index][0], bucket[index][1]]);
      }
    }

    return result;
  }

  #resize() {
    const oldEntries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (let index = 0; index < oldEntries.length; index += 1) {
      const [key, value] = oldEntries[index];
      this.set(key, value);
    }
  }
}

class HashSet {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.map = new HashMap(loadFactor, initialCapacity);
  }

  hash(key) {
    return this.map.hash(key);
  }

  set(key) {
    this.map.set(key, true);
  }

  get(key) {
    return this.map.get(key);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  length() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }

  entries() {
    return this.map.keys();
  }

  get capacity() {
    return this.map.capacity;
  }

  get loadFactor() {
    return this.map.loadFactor;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Length at load factor:", test.length());
console.log("Capacity before growth:", test.capacity);

test.set("apple", "green-red");
test.set("banana", "bright yellow");
console.log("Length after overwrites (same expected):", test.length());
console.log("Capacity after overwrites (same expected):", test.capacity);

test.set("moon", "silver");
console.log("Length after growth insert:", test.length());
console.log("Capacity after growth (doubled expected):", test.capacity);

test.set("moon", "pale silver");
test.set("dog", "dark brown");

console.log('get("dog"):', test.get("dog"));
console.log('has("lion"):', test.has("lion"));
console.log('remove("frog"):', test.remove("frog"));
console.log('remove("not-there"):', test.remove("not-there"));
console.log("length():", test.length());
console.log("keys():", test.keys());
console.log("values():", test.values());
console.log("entries():", test.entries());

test.clear();
console.log("length() after clear:", test.length());

const setTest = new HashSet();
setTest.set("apple");
setTest.set("banana");
setTest.set("apple");

console.log("HashSet length (no duplicates expected):", setTest.length());
console.log('HashSet has("apple"):', setTest.has("apple"));
console.log('HashSet remove("banana"):', setTest.remove("banana"));
console.log("HashSet keys():", setTest.keys());
console.log("HashSet entries():", setTest.entries());
console.log("HashSet capacity:", setTest.capacity);

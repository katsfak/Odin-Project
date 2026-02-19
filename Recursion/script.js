function fibs(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

console.log(fibs(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

function fibsRec(n) {
  if (n <= 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    const fibsArray = fibsRec(n - 1);
    const nextFib =
      fibsArray[fibsArray.length - 1] + fibsArray[fibsArray.length - 2];
    fibsArray.push(nextFib);
    return fibsArray;
  }
}

console.log(fibsRec(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

console.log(mergeSort([])); // Output: []
console.log(mergeSort([73])); // Output: [73]
console.log(mergeSort([1, 2, 3, 4, 5])); // Output: [1, 2, 3, 4, 5]
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // Output: [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([105, 79, 100, 110])); // Output: [79, 100, 105, 110]

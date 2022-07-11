// 前提是有序的
Array.prototype.binarySearch = function (target) {
  let left = 0;
  let right = this.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (this[mid] > target) {
      right = mid - 1;
    } else if (this[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
const res = [1, 2, 3, 4, 5, 6];
console.log(res.binarySearch(6))

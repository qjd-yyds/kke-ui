// 冒泡排序 logn 每次分两半
Array.prototype.mergeSort = function () {
  const rec = arr => {
    if (arr.length === 1) return arr;
    const mid = arr.length >> 1;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    const leftArr = rec(left);
    const rightArr = rec(right);
    const res = [];
    while (leftArr.length || rightArr.length) {
      if (leftArr.length && rightArr.length) {
        res.push(leftArr[0] < rightArr[0] ? leftArr.shift() : rightArr.shift());
      } else if (leftArr.length) {
        res.push(leftArr.shift());
      } else if (rightArr.length) {
        res.push(rightArr.shift());
      }
    }
    return res;
  };
  const res = rec(this)
};
const arr = [5, 4, 3, 2, 1];
arr.mergeSort();
console.log(arr)
// 快速排序
Array.prototype.quickSort = function () {
  const rec = arr => {
    if (arr.length <= 1) return arr;
    const left = [];
    const right = [];
    // 增加一个基准
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > mid) {
        right.push(arr[i]);
      } else {
        left.push(arr[i]);
      }
    }
    // 最终返回一个mid
    return [...rec(left), mid, ...rec(right)];
  };
  return rec(this);
};
const arr = [5, 4, 3, 2, 1];
console.log(arr.quickSort());

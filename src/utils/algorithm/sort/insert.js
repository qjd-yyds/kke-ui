// 插入排序
Array.prototype.insertSort = function () {
  for (let i = 1; i < this.length; i++) {
    // 待插入的值
    const temp = this[i];
    let j = i;
    while (j > 0) {
      if (this[j - 1] > temp) {
        this[j] = this[j - 1];
      } else {
        break;
      }
      j -= 1;
    }
    this[j] = temp;
  }
};
const arr = [5, 4, 3, 2, 1];
arr.insertSort();

console.log(arr)
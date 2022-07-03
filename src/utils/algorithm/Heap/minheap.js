class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 交换节点
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  // 查找父节点
  getParentIndex(index) {
    // return Math.floor((index - 1) / 2);
    return (index - 1) >> 1;
  }
  // 获取左节点
  getLeftIndex(index) {
    return index * 2 + 1;
  }
  // 获取右节点
  getRightIndex(index) {
    return index * 2 + 2;
  }
  // 上移操作
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    // 如果当前父节点大于当前节点，则交换
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      // 可能存在交换后还是不满足堆的特性，需要继续上移
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[index] > this.heap[leftIndex]) {
      this.swap(index, leftIndex);
      shiftDown(leftIndex)
    }
    if (this.heap[index] > this.heap[rightIndex]) {
      this.swap(index, rightIndex);
      shiftDown(rightIndex)
    }
  }
  // 向堆中添加节点
  insert(value) {
    this.heap.push(value);
    // 上移
    this.shiftUp(this.heap.length - 1);
  }
  // 删除栈顶
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  // 获取栈顶
  peek() {
     return this.heap[0];
  }
  // 返回堆的大小
  size() {
    return this.heap.length;
  }
}
const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop()

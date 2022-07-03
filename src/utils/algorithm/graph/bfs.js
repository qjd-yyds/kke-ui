const graph = require('./graph');
// 广度优先遍历
// 也是维护一个队列，根节点入队列
// 根节点出队遍历
// 遍历根节点没有被访问过的节点入队列
// 重复3，4
const queue = [2];
const visited = new Set();
visited.add(2);
while (queue.length) {
  const current = queue.shift();
  console.log(current)
  graph[current].forEach(item => {
    if (!visited.has(item)) {
      queue.push(item)
      visited.add(item);
    }
  });
}

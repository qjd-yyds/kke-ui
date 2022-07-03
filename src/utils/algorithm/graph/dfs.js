const graph = require('./graph');
const set = new Set();
// 深度优先遍历
// 先遍历根节点
// 遍历根节点没有被访问过的节点
const dfs = n => {
  const current = graph[n];
  console.log(n)
  set.add(n);
  current.forEach(item => {
    if (!set.has(item)) {
      dfs(item);
    }
  });
};
dfs(2);

/**
 * @description: 树
 * 深度优先遍历
 * 广度优先遍历
 * 先序中序后序遍历
 */
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: []
        },
        {
          val: 'g',
          children: []
        }
      ]
    }
  ]
};
// 深度优先搜索 1.访问根节点，对根节点的children挨个进行深度优先搜索
// dfs
const dfs = root => {
  console.log(root.val);
  root.children.forEach(child => {
    dfs(child);
  });
};
// bfs 广度优先遍历
// 1.新建一个队列，根节点入队
// 2.队头出队并访问
// 3.对头children挨个入队
// 重复2和3，直到队列为空
const bfs = root => {
  const queue = [root];
  while (queue.length) {
    // 取出队头
    const node = queue.shift();
    console.log(node.val);
    node.children.forEach(child => {
      queue.push(child);
    });
  }
};


/**
 * @description: 树
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
const list = []
const dfs = root => {
  list.push(root.val);
  root.children.forEach(child => {
    dfs(child);
  });
};
dfs(tree)
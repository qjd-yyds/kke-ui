/**
 * @description: 二叉树
 */
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    }
  }
};
// !==========================================================
// 先序遍历
// 访问根节点，再访问左子树，再访问右子树
// 根左右
function preOrder(node) {
  if (!node) {
    return;
  }
  console.log(node.val);
  preOrder(node.left);
  preOrder(node.right);
}
// preOrder(bt);
// !==========================================================
// 中序遍历
// 再访问根节点，访问左子树，访问自己，访问右子树
// 左根右
function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
}
// inOrder(bt);
// 后序遍历
// 访问根节点，访问左子树，访问右子树，访问根节点
// 左右根
function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
}
// postOrder(bt);

// ! 非递归版==========================================================
// ? 使用栈
// 先序遍历
function preOrder1(node) {
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
}
// preOrder1(bt);

// ! 非递归版==========================================================
// ? 使用栈
// 中序遍历
// 遍历左节点
function inOrder1(node) {
  const stack = [];
  let p = node;
  while (stack.length || p) {
    // 当前根节点所有左节点推入栈中
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 取出栈顶元素
    const n = stack.pop();
    console.log(n.val);
    // 找到根节点的右节点
    p = n.right;
  }
}
// inOrder1(bt)

// ! 非递归版==========================================================
// ? 使用栈
// 后序遍历
// 左右根
// 倒序输出先序遍历
function postOrder1(node) {
  if (!node) return;
  const outPutStack = [];
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    outPutStack.push(n.val);
    n.left && stack.push(n.left);
    n.right && stack.push(n.right);
  }
  while (outPutStack.length) {
    console.log(outPutStack.pop());
  }
}
postOrder1(bt)

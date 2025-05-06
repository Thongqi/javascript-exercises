const Tree = require("./binaryst.js")

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])



console.log(prettyPrint(tree.root))
console.log(tree.inOrder())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.isBalanced())

tree.insert(125)
tree.insert(155)
tree.insert(431)
tree.insert(2125)


tree.rebalance()
console.log(prettyPrint(tree.root))
console.log(tree.isBalanced())


 
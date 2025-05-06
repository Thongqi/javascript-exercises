class Node {
    constructor(data){
        this.data = data,
        this.left = null,
        this.right = null
    }
}
class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }

    insert(value){
        let index = this.checkIndex(this.root, value)
        console.log('index: ' + index)
        if (index.data > value) index.left = new Node(value);
        else index.right = new Node(value);
    }

    delete(value){
        let node = this.checkIndex(this.root, value)
        if (!node.left && !node.right) node.data = null
        else if (node.left || node.right){
            this.replace(node)
        }
    }

    levelOrder(callback){
        let queue = [this.root];
        let levelOrderArray = []

        while (queue.length > 0){
            let dequeue = queue.shift()
            callback? callback(dequeue):levelOrderArray.push(dequeue.data)
            if (dequeue.left) queue.push(dequeue.left)
            if (dequeue.right) queue.push(dequeue.right)
        }
        return levelOrderArray
    }

    inOrder(callback, node = this.root, inOrderArray = []){

        if (!node) return
 
        this.inOrder(callback, node.left, inOrderArray)
        callback? callback(node):inOrderArray.push(node.data)
        this.inOrder(callback, node.right, inOrderArray)

        return inOrderArray
    }

    preOrder(callback, node = this.root, preOrderArray = []){
        if (!node) return
 
        
        callback? callback(node):preOrderArray.push(node.data)
        this.preOrder(callback, node.left, preOrderArray)
        this.preOrder(callback, node.right, preOrderArray)

        return preOrderArray
    }

    postOrder(callback, node = this.root, postOrderArray = []){
        if (!node) return
 
        this.postOrder(callback, node.left, postOrderArray)
        this.postOrder(callback, node.right, postOrderArray)
        callback? callback(node):postOrderArray.push(node.data)
        

        return postOrderArray
    }

    find(value){
        return this.checkIndex(this.root, value)
    }

    // height(value){
    //     if (!value) return 'provide a value'
    //     let height = 0;
    //     let tmp = this.root
    //     while(tmp.data != value){
    //         if (!tmp) return 'not in tree'
    //         if(tmp.data > value) {
    //         	tmp = tmp.left
    //         }
    //         else if(tmp.data < value) {
    //         	tmp = tmp.right
    //         }

    //         height++
    //         console.log(tmp)
          
    //     }
    //     return height;
    // }

    height(value){
        if (!value) return 'provide a value'
        let height = {value: -1}
        this.findMaxHeight(this.root, parseInt(value), height)
        return height.value
    }

    findMaxHeight(root = this.root, value, height){
        if (!root) return -1

        let leftHeight = this.findMaxHeight(root.left, value, height)
        let rightHeight = this.findMaxHeight(root.right, value, height)
				
        let ans = Math.max(leftHeight, rightHeight) + 1
        if(root.data === value) height.value = ans
        return ans
    }

    depth(value){
        let depth = 0;
        let tmp = this.root
        while(tmp.data != value){
            if (!tmp) return 'not in tree'
            if(tmp.data > value) {
            	tmp = tmp.left
            }
            else if(tmp.data < value) {
            	tmp = tmp.right
            }
            depth++
          
        }
        return depth;
    }

    replace(node){
        let tmp = node
        if (node.left) {
            tmp.data = node.left;
            node.left = node.data;
            node.data = tmp.data;
        }
        else if(node.right){
            tmp.data = node.right;
            node.right = node.data;
            node.data = tmp.data;
        }
        console.log(node)
        return node
    }

    isBalanced(node = this.root){
        if(!node) return true
        let leftHeight = this.findMaxHeight(node.left)
        let rightHeight = this.findMaxHeight(node.right)

        // once inbalance, break and return false
        if(Math.abs(leftHeight - rightHeight) > 1) return false
        return this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    rebalance(){
        let newArray = this.inOrder()
        this.root = this.buildTree(newArray)
    }

    checkIndex(tmp, value){

        if (tmp.right === null && tmp.left === null) {
            return tmp
        } 
        if (value > tmp.data) {
            tmp = tmp.right?this.checkIndex(tmp.right, value):tmp
        } else if (value < tmp.data) {
            tmp = tmp.left?this.checkIndex(tmp.left, value):tmp
        }
        return tmp
        
    }
    
    buildTree(array) {
        let sortedArray = mergeSort(array)
        let s = new Set(sortedArray)
        let removeDuplicates = [...s]
        return this.buildNode(removeDuplicates, 0, removeDuplicates.length - 1);
    }
    
    buildNode(array, start, end){
        let mid = Math.floor((start + end) / 2);
    
        if (start > end) return null;
    
        let root = new Node(array[mid])
        root.left = this.buildNode(array, start, mid - 1);
        root.right = this.buildNode(array, mid + 1 , end);
    
        return root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}



function mergeSort(array){
    let sorted = [];
    if (array.length === 1){
        return array
    }
    let half = Math.ceil(array.length/2)
    let left = mergeSort(array.slice(0, half))
    let right = mergeSort(array.slice(half))
    
    while (array.length !== sorted.length){
    // while (left.length > 0 && right.length > 0){
        // if right array is not empty, check if left[0] bigger than right[0]

        let minArray = left[0] > right[0]? right:left;
        if (minArray.length > 0) sorted.push(minArray.shift())
        else sorted.push(minArray === right? left.shift():right.shift())
        
    }

    return sorted
}

module.exports = Tree;
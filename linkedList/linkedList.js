export class LinkedList {
    constructor(){
        this.listhead = null
    }
    
    // tail = new Node('tail');
    // head = new Node('head', this.tail);

    append(value){
        const newNode = new Node(value);
        if (this.listhead === null) this.listhead = newNode
        else {
          this.Nodetail().nextNode = newNode;
        }
        
    }

    prepend(value){
        const newNode = new Node(value);
        if (this.listhead === null) this.listhead = newNode
        else {
            let tmp = this.listhead;
            newNode.nextNode = tmp;
            this.listhead = newNode;
        }
    }

    size(){
        let sizeOfList = 1;
        let tmp = this.listhead;
        while (tmp.nextNode != null) {
            sizeOfList++;
            tmp = tmp.nextNode;
        }
        return sizeOfList;
    }

    Nodehead(){
        return this.listhead;
    }

    Nodetail(){
        let tmp = this.Nodehead();
        while (tmp.nextNode != null) tmp = tmp.nextNode
        return tmp
    }

    at(index){
        let currentIndex = 0;
        let tmp = this.listhead;
        for (currentIndex = 0; currentIndex < index; currentIndex++){
            tmp = tmp.nextNode;
        }
        return tmp
    }

    pop(){
        let tmp = this.listhead;
        let prev = this.listhead;
        while(tmp.nextNode != null){
            prev = tmp;    
            tmp = tmp.nextNode;
        }
        prv.nextNode = null;
    }

    contains(value){
        let tmp = this.listhead;
        let result = true;
        while (tmp.value != value){
            if(tmp.nextNode === null) {
                result = false;
                return result;
                break
            }
            tmp = tmp.nextNode
        }
        return result;
    }

    find(value){
        let tmp = this.listhead;
        let index = 0;
        while (tmp.value != value){
            tmp = tmp.nextNode
            index++
        }
        return index;
    }

    toString(){
        let tmp = this.listhead
        let stringList = '';
        for(let i = 0; i < this.size(); i++){
            stringList = stringList.concat(`(${tmp.value}) -> `)
            tmp = tmp.nextNode
        }
        console.log(stringList + 'null')
    }

    insertAt(value, index){
        if (index === 0) this.prepend(value)
        else {
            let tmp = this.at(index);
            let prv = this.at(index - 1);
            const newNode = new Node(value)
            prv.nextNode = newNode;
            newNode.nextNode = tmp;
        }

    }

    removeAt(index){
        if (index === 0) this.listhead = this.listhead.nextNode;
        else {
            let tmp = this.at(index);
            let prv = this.at(index - 1);
            prv.nextNode = tmp.nextNode;
        }

    }

}

class Node{
    constructor(value, nextNode){
        this.value = value,
        this.nextNode = nextNode || null
    }
}
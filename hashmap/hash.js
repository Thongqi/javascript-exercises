class HashMap {
    constructor(){
        this.loadFactor = 0.8,
        this.capacity = 16,
        this.buckets = []
    }

    

    growth(){
        if (this.length() > this.loadFactor * this.capacity){
            this.capacity = this.capacity * 2;
        }
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.capacity;
        }
     
        return hashCode;
    } 

    set(key, value){
        this.growth()
        let index = this.hash(key)
        if(this.buckets[index]){
            if (!this.get(key)) this.buckets[index].push([key, value])
            else {
                this.buckets[index].forEach(element => {
                    if (element[0] === key) element[1] = value
                })
            }
            
        }
        else this.buckets[index] = [[key, value]]
        return this.buckets
    }

    get(key){
        let index = this.hash(key);
        for (let [k, v] of this.buckets[index]){
            if (k === key) return v
            else return null
        }
    }

    has(key){
       let result = this.get(key) != null?  true : false
       return result;
    }

    removes(key){
        if (!this.has(key)) return false
        else {
            let index = this.hash(key)
             let i = 0;
            this.buckets[index] = this.buckets[index].filter(([k,v]) => k !== key)
            return true

        }
    }

    length(){
        let number = 0;
        this.buckets.forEach(item => number += item.length)
        return number;
    }

    clear(){
        this.buckets = []
    }

    keys(){
        let array = []
        this.buckets.forEach(item => item.forEach(([k,v]) => array.push(k)))
        return array
    }

    values(){
        let array = []
        this.buckets.forEach(item => item.forEach(([k,v]) => array.push(v)))
        return array
    }

    entries(){
        let array = []
        this.buckets.forEach(item => item.forEach(([k,v]) => array.push([k,v])))
        return array
    }
}

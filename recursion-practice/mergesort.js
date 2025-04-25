function mergeSort(array){
    let sorted = [];
    if (array.length === 1){
        return array
    }
    let half = Math.ceil(array.length/2)
    let left = mergeSort(array.slice(0, half))

    let right = mergeSort(array.slice(half))
    
    while (array.length > sorted.length){
        console.log(sorted, left, right)
        if (left[0] > right[0]) {
            if(right.length > 0) sorted.push(right.shift())
        }
        else {if (left.length > 0)sorted.push(left.shift())}
        
        if (left.length === 0 && right.length != 0) sorted.push(right.shift())
        if (right.length === 0 && left.length != 0) sorted.push(left.shift())
    }

    return sorted
}

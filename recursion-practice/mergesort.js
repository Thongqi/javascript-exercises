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


        
        // else {if (left.length > 0)sorted.push(left.shift())}
        
        // if (left.length === 0 && right.length != 0) sorted.push(right.shift())
        
    }

    return sorted
}

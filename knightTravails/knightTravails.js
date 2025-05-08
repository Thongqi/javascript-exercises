function knightMoves(start, end){
    let moves = []
    let queueToCheck = generatePossibleMove(start)
    while (queueToCheck.length > 0){
        moves.pop()
        let next = queueToCheck.shift()
        if (next === end) return
        queueToCheck = queueToCheck.concat(generatePossibleMove(next))
        moves.push(next)
    }
    return moves

}

// function checkMoves(coordinate){
//     return generatePossibleMove(coordinate)
// }

function generatePossibleMove([x, y]){
    const setofMoves = [
        [-1,2], [2,-1], [1, -2], [-2, 1],
        [-1, -2], [-2, -1], [2, 1], [1, 2]
    ]
    let possibleMoves = []
    setofMoves.forEach(([i,j]) => possibleMoves.push([x+i, y+j]))
    possibleMoves = possibleMoves.filter(([i, j]) => {
      if (i < 0 || j < 0 || j > 7 || i > 7) return false
      return true
    })
    return possibleMoves
}

// function generatePossibleMoves([x, y]){
    
//     let possibleMoves = {}
//     for (x; x< 8; x++){
//         let y = 0
//         for (y; y < 8; y ++){
// /*         		console.log(x, y) */
//         		let moves = []
//             if (x - 1 > 0){
//                 if (y - 2 > 0) moves.push([x - 1, y - 2])
//                 if (y + 2 < 8) moves.push([x - 1, y + 2])
//             }
//             if (x - 2 > 0){
//                 if (y - 1 > 0) moves.push([x - 2, y - 1])
//                 if (y + 1 < 8) moves.push([x - 2, y + 1])
//             }
//             if (x + 1 < 8){
//                 if (y + 2 < 8) moves.push([x + 1, y + 2])
//                 if (y - 2 > 0) moves.push([x + 1, y - 2])
//             }
//             if (x + 2 < 8){
//                 if (y + 1 < 8) moves.push([x + 2, y + 1])
//                 if (y - 1 > 0) moves.push([x + 2, y - 1])
//             }
//             let key = `[${x}, ${y}]`
//             // console.log(key, moves)
//             possibleMoves[key] = moves
//         }
//     }
//     return possibleMoves
// }
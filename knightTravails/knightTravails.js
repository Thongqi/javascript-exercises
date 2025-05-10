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

function knightMoves(start,end, moves=[start,end], queueToCheck = generatePossibleMove(moves[0]), callback){
	// if the start and the second coordinate is connected, end
  if(generatePossibleMove(moves[0]).filter(item => JSON.stringify(item) == JSON.stringify(moves[1])).length > 0 ) printOut(moves)

  // else let the second coordinate as end, and find path to connect
  if (queueToCheck.filter(item => JSON.stringify(item) == JSON.stringify(moves[1])).length > 0) return
    
  let next = queueToCheck.shift()
  // keep the coordinate in [moves], and check if the 'end' is in child of it
  moves = moves.toSpliced(1, 0, next)
  queueToCheck = queueToCheck.concat(generatePossibleMove(next))
  
  // if not in it, remove the coordinate from [moves]
  if (queueToCheck.filter(item => JSON.stringify(item) == JSON.stringify(moves[2])).length < 1) {
    if (JSON.stringify(next) == JSON.stringify(start)){
      moves = moves.filter(item => JSON.stringify(item) !== JSON.stringify(next))
      moves = moves.toSpliced(0, 0, start)
    }
    else moves = moves.filter(item => JSON.stringify(item) !== JSON.stringify(next))
  }
  // if in it, do not remove, and regenerate queueToCheck with start.
  else {
 	 	queueToCheck = generatePossibleMove(moves[0])
  }
  //let second coordinate as end, find path to connect start and new end
  end = moves[1]
  moves = knightMoves(start, end, moves, queueToCheck, callback)
	
	return moves
	
}

function printOut(moves){
	console.log(`You made it in ${moves.length - 2} moves!  Here's your path:`)
  moves.forEach(item => console.log(item))
}

module.exports = knightMoves
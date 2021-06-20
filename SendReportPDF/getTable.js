tablePlot = [[22,2],[30,7]]

console.log(tablePlot)

function gerArray (offset=1) {
  let firstRow = tablePlot[1][1] + 1
  let firstColumn = tablePlot[1][2]
  let lastRow = tablePlot[2][1]
  let lastColumn = tablePlot[2][2]
  
  let getColumn = tablePlot[1][firstColumn + offset]
  
  if (getColumn > lastColumn) {
    return console.error('Offset beyond table limits');
  }
  
  let list = []
  
  for (i = firstRow; i < lastRow; i++) {
   content = data[i][getColumn]
   list.push(content)
  }
  
  return list
}
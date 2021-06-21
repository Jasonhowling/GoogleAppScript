function getFirstCell(string = "Stakeholders") {
	for (var row = 0; row < data.length; row++) {
		for (var col = 0; col < data[row].length; col++) {
			if (data[row][col] == string) {
				return [row, col];
			}
		}
	}
}

function getTable(string = "Stakeholders") {
	let firstCell = getFirstCell(string)
	let firstRow = firstCell[0]
	let secondRow = firstRow + 1
	let firstColumn = firstCell[1]

	let finalRow = 0
	let finalCol = 0
	let finalCell = []

	for (var row = secondRow; data[row][firstColumn] != ""; row++) {
		finalRow = row
	}
	finalCell.push(finalRow)

	for (var col = firstColumn; data[secondRow][col] != ""; col++) {
		finalCol = col
	}
	finalCell.push(finalCol)

	console.log(firstCell, finalCell)
	return firstCell, finalCell
}


function gerArray(string="stakeholders", offset = 1) {
  let tablePlot = getTable(string)

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

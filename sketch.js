let gridBlocks = [];
const rows = 7;
const cols = 7;
const padding = 10; // Space between blocks
let cellWidth, cellHeight;

function setup() {
  createCanvas(400, 400);
  noLoop(); // Draw only when needed

  cellWidth = (width - padding * (cols - 1)) / cols;
  cellHeight = (height - padding * (rows - 1)) / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (cellWidth + padding);
      const y = row * (cellHeight + padding);

      // Randomly assign initial container and symbol types
      const containerType = floor(random(1, 3));
      const symbolType = floor(random(1, 4));

      gridBlocks.push({ x, y, cellWidth, cellHeight, containerType, symbolType, row, col });
    }
  }

  drawGrid();
}

function drawGrid() {
  background(255);

  for (const block of gridBlocks) {
    const { x, y, cellWidth, cellHeight, containerType, symbolType } = block;

    stroke(0); // Set the line color to black

    if (containerType === 1) {
      fill(255, 165, 0); // Orange for rectangle border
      drawRectangle(x, y, cellWidth, cellHeight);
      drawSymbolInRectangle(x, y, cellWidth, cellHeight, symbolType);
    } else if (containerType === 2) {
      fill(0, 255, 0); // Green for circle border
      drawCircle(x + cellWidth / 2, y + cellHeight / 2, min(cellWidth, cellHeight) * 0.8);
      drawSymbolInCircle(x + cellWidth / 2, y + cellHeight / 2, min(cellWidth, cellHeight) * 0.6, symbolType);
    }
  }
}

function mousePressed() {
  const col = floor(mouseX / (cellWidth + padding));
  const row = floor(mouseY / (cellHeight + padding));

  if (col < 0 || col >= cols || row < 0 || row >= rows) return; // Ensure within bounds

  triggerRipple(row, col, 0);
}

function triggerRipple(startRow, startCol, delay) {
  const maxDistance = max(rows, cols);

  for (let dist = 0; dist < maxDistance; dist++) {
    setTimeout(() => {
      for (let row = -dist; row <= dist; row++) {
        for (let col = -dist; col <= dist; col++) {
          if (abs(row) === dist || abs(col) === dist) {
            const curRow = startRow + row;
            const curCol = startCol + col;

            if (curRow >= 0 && curRow < rows && curCol >= 0 && curCol < cols) {
              const index = curRow * cols + curCol;
              gridBlocks[index].containerType = floor(random(1, 3));
              gridBlocks[index].symbolType = floor(random(1, 4));
            }
          }
        }
      }
      drawGrid();
    }, delay + dist * 500); // 500 ms delay for each new layer/row
  }
}

function drawRectangle(x, y, w, h) {
  rect(x, y, w, h);
}

function drawCircle(cx, cy, diameter) {
  ellipse(cx, cy, diameter, diameter);
}

function drawSymbolInRectangle(x, y, w, h, symbolType) {
  const padding = 10;
  if (symbolType === 1) {
    fill(255, 255, 0); // Yellow for triangle pointing up
    drawTriangleUp(x + padding, y + padding, w - 2 * padding, h - 2 * padding);
  } else if (symbolType === 2) {
    fill(255, 0, 0); // Red for triangle pointing down
    drawTriangleDown(x + padding, y + padding, w - 2 * padding, h - 2 * padding);
  } else if (symbolType === 3) {
    fill(255, 0, 0); // Red for X
    drawX(x + padding, y + padding, w - 2 * padding, h - 2 * padding);
  }
}

function drawSymbolInCircle(cx, cy, diameter, symbolType) {
  const r = diameter / 2;
  if (symbolType === 1) {
    fill(255, 255, 0); // Yellow for triangle pointing up
    drawTriangleUp(cx - r, cy - r, 2 * r, 2 * r);
  } else if (symbolType === 2) {
    fill(255, 0, 0); // Red for triangle pointing down
    drawTriangleDown(cx - r, cy - r, 2 * r, 2 * r);
  } else if (symbolType === 3) {
    fill(255, 0, 0); // Red for X
    drawX(cx - r, cy - r, 2 * r, 2 * r);
  }
}

function drawTriangleUp(x, y, w, h) {
  triangle(x, y + h, x + w / 2, y, x + w, y + h);
}

function drawTriangleDown(x, y, w, h) {
  triangle(x, y, x + w / 2, y + h, x + w, y);
}

function drawX(x, y, w, h) {
  line(x, y, x + w, y + h);
  line(x, y + h, x + w, y);
}
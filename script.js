const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const shapes = [];
const gravity = 1;

let shapeCount = 0;
let surfaceArea = 0;

function generateShape() {
  const x = Math.random() * canvas.width;
  const color = getRandomColor();
  const shape = { x, y: -50, color };

  shapes.push(shape);
  shapeCount++;
  surfaceArea += calculateShapeArea(shape);

  updateInfo();
}

function calculateShapeArea(shape) {
  return 50 * 50;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateInfo() {
  const shapeCountDisplay = document.getElementById("shapeCount");
  const surfaceAreaDisplay = document.getElementById("surfaceArea");

  shapeCountDisplay.textContent = `Shape Count: ${shapeCount}`;
  surfaceAreaDisplay.textContent = `Surface Area: ${surfaceArea}px²`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw shapes
  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;
    ctx.fillRect(shape.x, shape.y, 50, 50);
  });

  // apply gravity
  shapes.forEach((shape) => {
    shape.y += gravity;

    // check if outside the canvas
    if (shape.y > canvas.height) {
      const index = shapes.indexOf(shape);
      shapes.splice(index, 1);
      shapeCount--;
      surfaceArea -= calculateShapeArea(shape);
    }
  });

  updateInfo();

  requestAnimationFrame(draw);
}

// click
function handleClick(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - canvasRect.left;
  const offsetY = event.clientY - canvasRect.top;

  shapes.forEach((shape) => {
    if (
      offsetX >= shape.x &&
      offsetX <= shape.x + 50 &&
      offsetY >= shape.y &&
      offsetY <= shape.y + 50
    ) {
      const index = shapes.indexOf(shape);
      shapes.splice(index, 1);
      shapeCount--;
      surfaceArea -= calculateShapeArea(shape);
      updateInfo();
    }
  });

  const color = getRandomColor();
  const newShape = { x: offsetX, y: offsetY, color };
  shapes.push(newShape);
  shapeCount++;
  surfaceArea += calculateShapeArea(newShape);
  updateInfo();
}

function handleShapeClick(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - canvasRect.left;
  const offsetY = event.clientY - canvasRect.top;

  shapes.forEach((shape, index) => {
    if (
      offsetX >= shape.x &&
      offsetX <= shape.x + 50 &&
      offsetY >= shape.y &&
      offsetY <= shape.y + 50
    ) {
      shapes.splice(index, 1);
      shapeCount--;
      surfaceArea -= calculateShapeArea(shape);
      updateInfo();
    }
  });
}

canvas.addEventListener("click", handleClick);
canvas.addEventListener("click", handleShapeClick);

setInterval(generateShape, 1000);
draw();

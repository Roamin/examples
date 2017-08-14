const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rubberBandDiv = document.getElementById('rubberBandDiv');
const resetButton = document.getElementById('resetButton');

const image = new Image();
const mouseDown = {};

let rubberBandRectangle = {};
let dragging = false;


// Functions
const rubberBandStart = (x, y) => {
  mouseDown.x = x;
  mouseDown.y = y;

  rubberBandRectangle.left = mouseDown.x;
  rubberBandRectangle.top = mouseDown.y;

  moveRubberBandDiv();
  showRubberBandDiv();

  dragging = true;
};

const rubberBandStretch = (x, y) => {
    rubberBandRectangle.left = x < mouseDown.x ? x : mouseDown.x;
    rubberBandRectangle.top = y < mouseDown.y ? y : mouseDown.y;

    rubberBandRectangle.width = Math.abs(x - mouseDown.x);
    rubberBandRectangle.height = Math.abs(y - mouseDown.y);

    moveRubberBandDiv();
    resizeRubberBandDiv();
};

const rubberBandEnd = () => {
    var bbox = canvas.getBoundingClientRect();

    try {
        context.drawImage(canvas,
                rubberBandRectangle.left - bbox.left,
                rubberBandRectangle.top - bbox.top,
                rubberBandRectangle.width,
                rubberBandRectangle.height,
                0,
                0,
                canvas.width,
                canvas.height);
    } catch (e) {
        console.error(e);
    }

    resetRubberBandRectangle();

    rubberBandDiv.style.width = 0;
    rubberBandDiv.style.height = 0;

    hideRubberBandDiv();

    dragging = false;
};

const moveRubberBandDiv = () => {
    rubberBandDiv.style.top = rubberBandRectangle.top + 'px';
    rubberBandDiv.style.left = rubberBandRectangle.left + 'px';
};

const resizeRubberBandDiv = () => {
    rubberBandDiv.style.width = rubberBandRectangle.width + 'px';
    rubberBandDiv.style.height = rubberBandRectangle.height + 'px';
};

const showRubberBandDiv = () => {
    rubberBandDiv.style.display = 'block';
};

const hideRubberBandDiv = () => {
    rubberBandDiv.style.display = 'none';
};

const resetRubberBandRectangle = () => {
    rubberBandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
};

// Event handlers

canvas.onmousedown = e => {
    const x = e.clientX;
    const y = e.clientY;

    e.preventDefault();
    rubberBandStart(x, y);
};

window.onmousemove = e => {
  const x = e.clientX;
  const y = e.clientY;

  e.preventDefault();

  if (dragging) {
      rubberBandStretch(x, y);
  }
};

window.onmouseup = e => {
    e.preventDefault();

    rubberBandEnd();
};

image.onload = () => {
    context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
};

resetButton.onclick = e => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
};

image.src = 'src/img/img.png';

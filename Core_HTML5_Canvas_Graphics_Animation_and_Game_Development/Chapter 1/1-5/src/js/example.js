const canvas = document.getElementById('canvas');
const readout = document.getElementById('readout');

const context = canvas.getContext('2d');
const spritesheet = new Image();

function windowToCanvas(canvas, x, y) {
    const  box = canvas.getBoundingClientRect();

    return {
        x: x - box.left * (canvas.width / box.width),
        y: y - box.top * (canvas.height / box.height)
    };
}

function drawBackground() {
    const VERTICAL_LINE_SPACING = 12;
    let i = context.canvas.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;

    while (i > VERTICAL_LINE_SPACING * 4) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();

        i -= VERTICAL_LINE_SPACING;
    }
}

function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
}

function drawGuidelines(x, y) {
    context.strokeStyle = 'rgba(0, 0, 230, 0.8)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontaLine(y);
}

function updateReadout(x, y) {
    readout.innerText = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
}

function drawHorizontaLine(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}

function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
}

canvas.onmousemove = e => {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

spritesheet.src = 'src/img/running-sprite-sheet.png';
spritesheet.onload = () => {
    drawSpritesheet();
};

drawBackground();

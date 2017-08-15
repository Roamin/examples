const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const snapshotButton = document.getElementById('snapshotButton');
const snapshotImageElement = document.getElementById('snapshotImageElement');

const FONT_HEIGHT = 15,
      MARGIN = 35,
      HAND_TRUNCATION = canvas.width / 25,
      HOUR_HAND_TRUNCATION = canvas.width / 10,
      NUMERAL_SPACING = 20,
      RADIUS = canvas.width / 2 - MARGIN,
      HAND_RADIUS = RADIUS + NUMERAL_SPACING;

function drawCircle() {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
    context.stroke();
}

function drawNumerals() {
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let angle = 0,
        numeralWidth = 0;

    numerals.forEach((numeral) => {
        angle = Math.PI / 6 * (numeral - 3);
        numeralWidth = context.measureText(numeral).width;

        context.fillText(
                numeral,
                canvas.width / 2 + Math.cos(angle) * HAND_RADIUS - numeralWidth /2,
                canvas.height / 2 + Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 3
        );
    });
}

function drawCenter() {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
    context.fill();
}

function drawHand(loc, isHour) {
    const angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
          handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;

    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius, canvas.height / 2 + Math.sin(angle) * handRadius);
    context.stroke();
}

function drawHands() {
    const date = new Date();
    let hour = date.getHours();

    hour = hour > 12 ? hour - 12 : hour;

    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.5);
    drawHand(date.getMinutes(), false, 0.5);
    drawHand(date.getSeconds(), false, 0.5);
}

function drawClock() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}

snapshotButton.onclick = e => {
    let dataUrl;

    if (snapshotButton.value === 'Take snapshot') {
        dataUrl = canvas.toDataURL();

        clearInterval(loop);

        snapshotImageElement.src = dataUrl;
        snapshotImageElement.style.display = 'inline';

        canvas.style.display = 'none';

        snapshotButton.value = 'Return to Canvas'
    } else {
        canvas.style.display = 'inline';

        snapshotImageElement.style.display = 'none';

        loop = setInterval(drawClock, 1000);

        snapshotButton.value = 'Take snapshot';
    }
};

context.font = FONT_HEIGHT + 'px Arial';

let loop = setInterval(drawClock, 1000);

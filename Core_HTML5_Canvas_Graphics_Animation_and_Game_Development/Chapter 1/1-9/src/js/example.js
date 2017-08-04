const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rubberBandDiv = document.getElementById('rubberBandDiv');
const resetButton = document.getElementById('resetButton');

const image = new Image();
const mouseDown = {};
const rubberBandRectAngle = {};

let dragging = false;


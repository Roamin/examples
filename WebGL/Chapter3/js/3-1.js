const canvasFrameId = 'canvas-frame'
let width
let height

let renderer
function initThree() {
    width = document.getElementById(canvasFrameId).clientWidth
    height = document.getElementById(canvasFrameId).clientHeight

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(width, height)
    document.getElementById(canvasFrameId).appendChild(renderer.domElement)
    renderer.setClearColor(0xFFFFFF, 1.0)
}

let camera
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 600

    camera.up.x = 0
    camera.up.y = 1
    camera.up.z = 0

    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    })
}

let scene
function initScene() {
    scene = new THREE.Scene()
}

let light
function initLight() {
    light = new THREE.AmbientLight(0xFF0000)
    light.position.set(100, 100, 200)
    scene.add(light)
}

function initObject() {
    const geometry = new THREE.CylinderGeometry(100, 150, 400)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position = new THREE.Vector3(0, 0, 0)
    scene.add(mesh)
}

let increment = 1
let halfDistance
function animation() {
    if (camera.position.x * increment > halfDistance) {
        increment *= -1
    }

    camera.position.x = camera.position.x + increment
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
}

function threeStart() {
    initThree()
    initCamera()
    initScene()
    initLight()
    initObject()

    halfDistance = width / 2 - 100
    animation()
}

threeStart()
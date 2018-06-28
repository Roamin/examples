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
    camera.position.x = 1200
    camera.position.y = 1200
    camera.position.z = 1200

    camera.up = new THREE.Vector3(0, 1, 0)

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
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0)
    light.position.set(100, 100, 200)
    scene.add(light)
}

function initObject() {
    const geometry = new THREE.Geometry()

    geometry.vertices.push(new THREE.Vector3(-600, 0, 0))
    geometry.vertices.push(new THREE.Vector3(600, 0, 0))

    for (let i = 0; i <= 120; i++) {
        let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 }))
        line.position.z = (i * 10) - 600
        scene.add(line)

        line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 }))
        line.position.x = (i * 10) - 600
        line.rotation.y = 90 * Math.PI / 180
        scene.add(line)
        scene.add(new THREE.AxisHelper(500))
    }
}

function threeStart() {
    initThree()
    initCamera()
    initScene()
    initLight()
    initObject()
    renderer.clear()
    renderer.render(scene, camera)
}

threeStart()
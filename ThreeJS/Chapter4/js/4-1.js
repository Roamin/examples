const $canvasFrame = document.getElementById('canvas-frame')
const $txtFov = document.getElementById('txt-fov')
const $currentFov = document.getElementById('current-fov')

let width
let height

let renderer
function initThree() {
    width = $canvasFrame.clientWidth
    height = $canvasFrame.clientHeight

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(width, height)
    $canvasFrame.appendChild(renderer.domElement)
    renderer.setClearColor(0xFFFFFF, 1.0)
}

let camera
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    // camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 10, 1000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 600

    // default
    camera.up.x = 0
    camera.up.y = 1
    camera.up.z = 0

    // default
    camera.lookAt(0, 0, 0)
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

    light = new THREE.PointLight(0x00FF00)
    light.position.set(0, 0, 300)
    scene.add(light)
}

function initObject() {
    const geometry = new THREE.CylinderGeometry(70, 100, 200)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position = new THREE.Vector3(0, 0, 0)
    scene.add(mesh)
}

function setCameraFov(fov) {
    camera.fov = fov
    camera.updateProjectionMatrix()
}

function changeFov() {
    const txtFov = $txtFov.value
    const val = parseFloat(txtFov)

    $currentFov.innerHTML = val
    setCameraFov(val)
}

function animation() {
    changeFov()
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
}

function threeStart() {
    initThree()
    initCamera()
    initScene()
    initLight()
    initObject()
    animation()
}

threeStart()
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
    camera.position.x = 600
    camera.position.y = 0
    camera.position.z = 600

    // default
    camera.up.x = 0
    camera.up.y = 1
    camera.up.z = 0

    camera.lookAt(0, 0, 0)
}

let scene
function initScene() {
    scene = new THREE.Scene()
}

let light
function initLight() {
    
}

function initObject() {
    const geometry = new THREE.CubeGeometry(200, 100, 50, 4, 4)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position = new THREE.Vector3(0, 0, 0)
    scene.add(mesh)
    scene.add(new THREE.AxesHelper(300))
}

function animation() {
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
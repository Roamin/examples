const $canvasFrame = document.getElementById('canvas-frame')
const $txtIntensity = document.getElementById('txt-intensity')
const $currentIntensity = document.getElementById('current-intensity')

const $positionX = document.getElementById('position-x')
const $positionY = document.getElementById('position-y')
const $positionZ = document.getElementById('position-z')


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
    // 第二个参数是光源强度
    light = new THREE.DirectionalLight(0xFF0000, 1)
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light.position.set(0, 0, 1)
    scene.add(light)
}

function initObject() {
    const geometry = new THREE.CubeGeometry(200, 100, 50, 4, 4)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position = new THREE.Vector3(0, 0, 0)
    scene.add(mesh)
    scene.add(new THREE.AxesHelper(300))
}

function setIntensity(intensity) {
    light.intensity = intensity
}

function changeIntensity() {
    const txtIntensity = $txtIntensity.value
    const intensity = parseFloat(txtIntensity)

    setIntensity(intensity)
    $currentIntensity.innerHTML = intensity
}

function setPosition({ x, y, z = 1 }) {
    light.position.set(x, y, z)
}

function changePosition() {
    const txtX = $positionX.value
    const txtY = $positionY.value
    const txtZ = $positionZ.value

    const x = parseFloat(txtX)
    const y = parseFloat(txtY)
    const z = parseFloat(txtZ)

    setPosition({x, y, z})
}

function animate() {
    changeIntensity()
    changePosition()
    renderer.clear()
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

function threeStart() {
    initThree()
    initCamera()
    initScene()
    initLight()
    initObject()

    animate()
}

threeStart()
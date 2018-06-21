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

let scene
function initScene() {
    scene = new THREE.Scene()
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

let light
function initLight() {
    // light = new THREE.PointLight(0xFF0000, 1)
    // light.position.set(0, 0, 25)
    // scene.add(light)

    light = new THREE.PointLight(0x00FF00, 1)
    light.position.set(0, 0, 25)
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xFF0000)
    directionalLight.position.set(0, 0, 1)
    scene.add(directionalLight)
}

function initObject() {
    const geometry = new THREE.CubeGeometry(200, 100, 50, 4, 4)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
    const cube1 = new THREE.Mesh(geometry, material)
    const cube2 = new THREE.Mesh(geometry, material)
    const cube3 = new THREE.Mesh(geometry, material)
    const cube4 = new THREE.Mesh(geometry, material)
    const cube5 = new THREE.Mesh(geometry, material)
    const cube6 = new THREE.Mesh(geometry, material)

    cube1.position.set(0, 0, 0)
    scene.add(cube1)

    cube2.position.set(-300, 0, 0)
    scene.add(cube2)

    cube3.position.set(0, -150, 0)
    scene.add(cube3)

    cube4.position.set(0, 150, 0)
    scene.add(cube4)

    cube5.position.set(300, 0, 0)
    scene.add(cube5)

    cube6.position.set(0, 0, -100)
    scene.add(cube6)

    scene.add(new THREE.AxesHelper(1000))
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

    setPosition({ x, y, z })
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
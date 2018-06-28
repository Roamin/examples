let width
let height

let renderer
function initThree() {
    width = window.innerWidth
    height = window.innerHeight

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(width, height)
    document.body.appendChild(renderer.domElement)
    renderer.setClearColor(0xFFFFFF, 1.0)
}

let camera
function initCamera() {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 100000)
    camera.position.x = 0
    camera.position.y = 1000
    camera.position.z = 0
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1
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

let line
function initObject() {
    const geometry = new THREE.Geometry()
    const material = new THREE.LineBasicMaterial({ vertexColors: true })

    const color1 = new THREE.Color(0x444444)
    const color2 = new THREE.Color(0xFF0000)

    const p1 = new THREE.Vector3(-100, 0, 100)
    const p2 = new THREE.Vector3(100, 0, -100)

    geometry.vertices.push(p1)
    geometry.vertices.push(p2)
    geometry.colors.push(color1, color2)

    line = new THREE.Line(geometry, material, THREE.LineSegments)
    scene.add(line)
}

function animate() {
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
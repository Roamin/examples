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
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 800

    camera.up.x = 0
    camera.up.y = 1
    camera.up.z = 0

    camera.lookAt(0, 0, 0)
}

let scene
function initScene() {
    scene = new THREE.Scene()
}

let sphere
function initObject() {
    const geometry = new THREE.SphereGeometry(200, 18, 12)
    const material = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        wireframe: true
    })

    sphere = new THREE.Mesh(geometry, material)
    sphere.position = new THREE.Vector3(0, 0, 0)
    scene.add(sphere)
    // scene.add(new THREE.AxesHelper(600))
}

function animate() {
    sphere.rotation.y += Math.PI / 180
    renderer.clear()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

function threeStart() {
    initThree()
    initCamera()
    initScene()
    initObject()

    animate()
}

threeStart()
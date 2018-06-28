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
    camera.position.x = 1000
    camera.position.y = 1000
    camera.position.z = 1000

    camera.up.x = 0
    camera.up.y = 1
    camera.up.z = 0
    
    camera.lookAt(0, 0, 0)
}

let scene
function initScene() {
    scene = new THREE.Scene()
}

function initObject() {
    scene.add(new THREE.AxesHelper((width > height ? height : width) / 2.5))
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
    initObject()

    animate()
}

threeStart()
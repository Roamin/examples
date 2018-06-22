const $canvasFrame = document.getElementById('canvas-frame')

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
    camera.position.y = 600
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
    light = new THREE.AmbientLight(0xFF0000)
    light.position.set(100, 100, 200)
    scene.add(light)
}

let cube
function initObject() {
    const geometry = new THREE.BoxGeometry(100, 100, 100)

    for (let i = 0; i < geometry.faces.length; i += 2) {
        const hex = Math.random() * 0xffffff

        geometry.faces[i].color.setHex(hex)
        geometry.faces[i + 1].color.setHex(hex)
    }

    const material = new THREE.MeshBasicMaterial({ 
        vertexColors: THREE.FaceColors,
        transparent: true,
        opacity: 0.7
    })
    cube = new THREE.Mesh(geometry, material)

    cube.position = new THREE.Vector3(0, 0, 0)
    cube.up = new THREE.Vector3(1, 1, 1)

    console.log(cube)
    scene.add(cube)
}

function initGrid() {
    const helper = new THREE.GridHelper(1000, 50, 0x0000FF, 0x808080)

    scene.add(helper)
    scene.add(new THREE.AxesHelper(500))
}

function bind () {
    document.body.addEventListener('mousewheel', mousewheelHandle, false)
}

function mousewheelHandle(e) {
    e.preventDefault()

    if (e.wheelDelta) { // IE\Chrome
        if (e.wheelDelta > 0) { // up
            camera.fov -= camera.near < camera.fov ? 1: 0
        } else { // down
            camera.fov += camera.near < camera.fov ? 1: 0
        }
    } else if (e.detail) { // Firefox
        if (e.detail > 0) { // up
            camera.fov -= camera.near < camera.fov ? 1: 0
        } else { // down
            camera.fov += camera.near < camera.fov ? 1: 0
        }
    }

    camera.updateProjectionMatrix()
}

function animation() {
    // cube.rotation.y += 0.01
    // cube.rotate(1, 1, 1)
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
}


function threeStart() {
    initThree()
    initCamera()
    initScene()
    initLight()

    initObject()
    initGrid()

    bind()

    animation()
}

threeStart()
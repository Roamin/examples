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
}

let camera
function initCamera() {
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
}

let scene
function initScene() {
    scene = new THREE.Scene()
}

let cube
function initObject() {
    const geometry = new THREE.CubeGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)    
}

function animate() {
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
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
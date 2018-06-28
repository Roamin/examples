let $container
let stats
let camera, scene, renderer, particle
let mouseX = 0, mouseY = 0

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

function init () {
    $container = document.createElement('div')
    document.body.appendChild($container)

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000)
    camera.position.z = 1000

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000040)

    const material = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite()),
        blending: THREE.AdditiveBlending
    })

    for (let i = 0; i < 1000; i++) {
        particle = new THREE.Sprite(material)
        initParticle(particle, i * 10)
        scene.add(particle)
    }

    renderer = new THREE.CanvasRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    $container.appendChild(renderer.domElement)

    stats = new Stats()
    $container.appendChild(stats.dom)

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('touchstart', onDocumentTouchStart, false)
    document.addEventListener('touchmove', onDocumentTouchMove, false)

    window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    windowHalfX = windowWidth / 2
    windowHalfY = windowHeight / 2

    camera.aspect = windowWidth / windowHeight
    camera.updateProjectionMatrix()

    renderer.setSize(windowWidth, windowHeight)
}

function generateSprite () {
    const $canvas = document.createElement('canvas')

    $canvas.width = 16
    $canvas.height = 16

    const context = $canvas.getContext('2d')
    const gradient = context.createRadialGradient($canvas.width / 2, $canvas.height / 2, 0, $canvas.width / 2, $canvas.height / 2, $canvas.width / 2)

    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(0, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(0, 0, 64, 1)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')

    context.fillStyle = gradient
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    return $canvas
}

function initParticle (particle, delay = 0) {
    particle = this instanceof THREE.Sprite ? this : particle

    particle.position.set(0, 0, 0)
    particle.scale.x = particle.scale.y = Math.random() * 32 + 16

    new TWEEN.Tween(particle)
        .delay(delay)
        .to({}, 10000)
        .onComplete(initParticle)
        .start()

    new TWEEN.Tween(particle.position)
        .delay(delay)
        .to({x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 200}, 10000)
        .start()

    new TWEEN.Tween(particle.scale)
        .delay(delay)
        .to({x: 0.01, y: 0.01}, 10000)
        .start()
}

function onDocumentMouseMove (event) {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
}

function onDocumentTouchStart (event) {
    if (event.touches.length === 1) {
        event.preventDefault()
        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
    }
}

function onDocumentTouchMove (event) {
    if (event.touches.length === 1) {
        event.preventDefault()
        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
    }
}

//
function animate () {
    requestAnimationFrame(animate)
    render()
    stats.update()
}

function render () {
    TWEEN.update()
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
}

init()
animate()

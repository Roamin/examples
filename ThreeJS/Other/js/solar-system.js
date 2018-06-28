let width = window.innerWidth
let height = window.innerHeight

let renderer = null
let scene = null
let camera = null

let stat = null
let controls = null

let Sun = null
let Mercury = null // 水星
let Venus = null // 金星
let Earth = null // 地球
let Mars = null // 火星
let Jupiter = null // 木星
let Saturn = null // 土星
let Uranus = null // 天王星
let Neptune = null // 海王星

const planets = []

function initThree () {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true // 辅助线
    renderer.shadowMapSoft = true // 柔和阴影
    renderer.setClearColor(0xffffff, 0)

    document.body.appendChild(renderer.domElement)
}

function initScene () {
    scene = new THREE.Scene()
}

function initCamera () {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000)
    camera.position.set(200, 50, 0)
    camera.lookAt(0, 0, 0)

    scene.add(camera)
}

function initLight () {
    const ambientLight = new THREE.AmbientLight(0x999999)
    const sunLight = new THREE.PointLight(0xddddaa, 1.0, 500)

    scene.add(ambientLight)
    scene.add(sunLight)
}

function initStat () {
    stat = new Stats()

    stat.domElement.style.position = 'absolute'
    stat.domElement.style.right = 0
    stat.domElement.style.top = 0

    document.body.appendChild(stat.domElement)
}

function initStar () {
    const particles = 20000 // 星星数量
    const bufferGeometry = new THREE.BufferGeometry() // buffer 星星

    // 32 位浮点整型数组
    const positions = new Float32Array(particles * 3)
    const colors = new Float32Array(particles * 3)

    const color = new THREE.Color()
    const gap = 500 // 定义星星最近出现的位置

    for (let i = 0; i < positions.length; i += 3) {
        // positions
        // -2gap < x < 2gap
        const pos = {
            x: Math.random() * gap * 2 * (Math.random() < 0.5 ? -1 : 1),
            y: Math.random() * gap * 2 * (Math.random() < 0.5 ? -1 : 1),
            z: Math.random() * gap * 2 * (Math.random() < 0.5 ? -1 : 1)
        }

        const biggest = Math.abs(pos.x) > Math.abs(pos.y) ? Math.abs(pos.x) > Math.abs(pos.z) ? 'x' : 'z' :
            Math.abs(pos.y) > Math.abs(pos.z) ? 'y' : 'z'

        if (Math.abs(pos[biggest]) < gap) {
            pos[biggest] = pos[biggest] < 0 ? -gap : gap
        }

        positions[i] = pos.x
        positions[i + 1] = pos.y
        positions[i + 2] = pos.z

        // colors
        // 70% 的星星有颜色
        const hasColor = Math.random() > 0.3
        let vx = 1
        let vy = 1
        let vz = 1

        if (hasColor) {
            vx = (Math.random() + 1) / 2
            vy = (Math.random() + 1) / 2
            vz = (Math.random() + 1) / 2
        }

        color.setRGB(vx, vy, vz)

        colors[i] = color.r
        colors[i + 1] = color.g
        colors[i + 2] = color.b
    }

    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
    bufferGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3))
    bufferGeometry.computeBoundingSphere()

    const material = new THREE.PointsMaterial({size: 6, vertexColors: THREE.VertexColors})
    const particleSystem = new THREE.Points(bufferGeometry, material)

    scene.add(particleSystem)
}

function initSun () {
    const loader = new THREE.TextureLoader()

    loader.load('img/sun.jpg', (texture) => {
        const geometry = new THREE.SphereGeometry(12, 32, 32)
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            map: texture
        })

        Sun = new THREE.Mesh(geometry, material)

        Sun.name = 'Sun'
        Sun.castShadow = true
        Sun.receiveShadow = true
        scene.add(Sun)
    })
}

/**
 * 行星初始化
 * @param name 行星名称
 * @param speed 角速度
 * @param angle 初始角
 * @param color 颜色
 * @param distance 距离太阳距离
 * @param volume 体积
 * @returns {{name: *, distance: *, volume: *, Mesh: THREE.Mesh}}
 */
function initPlanet (name, speed, angle, color, distance, volume, ringMsg) {
    const planet = {}
    const sphere = new THREE.SphereGeometry(volume, 32, 32)
    const material = new THREE.MeshLambertMaterial({
        color
    })
    const mesh = new THREE.Mesh(sphere, material)

    mesh.name = name
    mesh.position.x = distance
    mesh.receiveShadow = true
    mesh.castShadow = true

    const track = new THREE.Mesh(
        new THREE.RingGeometry(distance - 0.2, distance + 0.2, 64, 1),
        new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.DoubleSide})
    )

    track.rotation.x = -Math.PI / 2
    scene.add(track)

    scene.add(mesh)

    if (ringMsg) {
        const ring = new THREE.Mesh(
            new THREE.RingGeometry(ringMsg.innerRadius, ringMsg.outerRadius, 32, 6),
            new THREE.MeshBasicMaterial({color: ringMsg.color, side: THREE.DoubleSide, opacity: 0.7, transparent: true})
        )

        ring.name = `Ring of ${ name }`
        ring.rotation.x = -Math.PI / 3
        ring.rotation.y = -Math.PI / 4

        scene.add(ring)

        planet.ring = ring
    }

    return Object.assign(planet, {
        name,
        speed,
        angle,
        distance,
        volume,
        Mesh: mesh
    })
}

function initPlanets () {
    Mercury = this.initPlanet('Mercury', 0.02, 0, 'rgb(124, 131, 203)', 20, 2)
    planets.push(Mercury)

    Venus = this.initPlanet('Venus', 0.012, 0, 'rgb(190, 138, 44)', 30, 4)
    planets.push(Venus)

    Earth = this.initPlanet('Earth', 0.010, 0, 'rgb(46, 69, 119)', 40, 5)
    planets.push(Earth)

    Mars = this.initPlanet('Mars', 0.008, 0, 'rgb(210, 81, 16)', 50, 4)
    planets.push(Mars)

    Jupiter = this.initPlanet('Jupiter', 0.006, 0, 'rgb(254, 208, 101)', 70, 9)
    planets.push(Jupiter)

    Saturn = this.initPlanet('Saturn', 0.005, 0, 'rgb(210, 140, 39)', 100, 7, {
        color: 'rgb(136,75,30)',
        innerRedius: 9,
        outerRadius: 11
    })
    planets.push(Saturn)

    Uranus = this.initPlanet('Uranus', 0.003, 0, 'rgb(49, 168, 218)', 120, 4)
    planets.push(Uranus)

    Neptune = this.initPlanet('Neptune', 0.002, 0, 'rgb(84, 125, 204)', 150, 3)
    planets.push(Neptune)
}

function movePlanet (planet) {
    planet.angle += planet.speed

    if (planet.angle > Math.PI * planet.distance) {
        planet.angle -= Math.PI * planet.distance
    }

    planet.Mesh.position.set(planet.distance * Math.sin(planet.angle), 0, planet.distance * Math.cos(planet.angle))

    if (typeof planet.ring !== 'undefined') {
        planet.ring.position.set(planet.distance * Math.sin(planet.angle), 0, planet.distance * Math.cos(planet.angle))
    }
}

function control () {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate () {
    planets.forEach((plante) => {
        movePlanet(plante)
    })

    stat.update()
    controls.update()
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

function init () {
    initThree()

    initScene()
    initCamera()
    initLight()

    initStar()
    initSun()
    initPlanets()

    initStat()

    control()

    animate()
}

init()

class Cube {
    constructor (selector) {
        this.el = document.querySelector(selector)

        this.Z = 0
        this.XAngle = 0
        this.YAngle = 0

        this.bindEvents()
    }

    // CSS
    updateView () {
        this.el.style.setProperty('--translateZ', this.Z)
        this.el.style.setProperty('--rotateX', this.XAngle)
        this.el.style.setProperty('--rotateY', this.YAngle)
    }

    // Events
    onMouseWheel (e) {
        let delta

        if (e.detail) {
            delta = e.detail * -5
        } else if (e.wheelDelta) {
            delta = e.wheelDelta / 8
        } else {
            delta = e.deltaY
        }

        if (!delta) return

        this.Z += delta * 5

        // scroll/perspective check
        if (this.Z > 300) {
            this.Z = 300
        } else if (this.Z < -300) {
            this.Z = -300
        } else {
            e.preventDefault()
        }

        this.updateView()
    }

    onMouseMove (e) {
        this.XAngle = (0.5 - (e.clientY / window.innerHeight)) * 180
        this.YAngle = (0.5 - (e.clientX / window.innerWidth)) * 180

        this.updateView()
    }

    bindEvents () {
        window.addEventListener('mousewheel', this.onMouseWheel.bind(this))
        window.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this))
        window.addEventListener('mousemove', this.onMouseMove.bind(this))
    }
}

const cube = new Cube('#world')
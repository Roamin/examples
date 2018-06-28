import Watcher from './Watcher'

const REG = /\{\{(.*)\}\}/

class Compiler {
    constructor (el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm

        this.frag = this._createFragment()
        this.el.appendChild(this.frag)
    }

    _createFragment () {
        const frag = document.createDocumentFragment()
        let child = null

        while (child = this.el.firstChild) {
            this._compile(child)
            frag.appendChild(child)
        }

        return frag
    }

    _compile (node) {
        if (node.nodeType === 1) {
            const attr = node.attributes

            if (attr.hasOwnProperty('v-model')) {
                const name = attr['v-model'].nodeValue

                node.addEventListener('input', e => {
                    this.vm[name] = e.target.value
                })

                node.value = this.vm[name]
            }
        }

        console.log(node)

        if (node.nodeType === 3) {
            // console.log(node)
            // console.log(REG.test(node.nodeValue))

            if (REG.test(node.nodeValue)) {
                let name = RegExp.$1

                name = name.trim()
                new Watcher(node, name, this.vm)
            }
        }
    }
}

export default Compiler
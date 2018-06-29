import Watcher from './Watcher'

const REG = /\{\{(.*)\}\}/

class Compiler {
    constructor (el, vm) {
        this.vm = vm
        this.el = document.querySelector(el)

        this.frag = this.createFragment()
        this.el.appendChild(this.frag)
    }

    createFragment () {
        const frag = document.createDocumentFragment()
        let child

        while (child = this.el.firstChild) {
            this.compile(child)
            frag.appendChild(child)
        }

        return frag
    }

    compile (node) {
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

        if (node.nodeType === 3) {
            // console.log(node)
            // console.log(REG.test(node.nodeValue))

            if (REG.test(node.nodeValue)) {
                let name = RegExp.$1

                name = name.trim()
                new Watcher(node, name, this.vm)
            }
        }

        node.childNodes.forEach((subNode) => {
            this.compile(subNode)
        })
    }
}

export default Compiler
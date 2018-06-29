import Dep from './Dep'

class Observer {
    constructor (data) {
        this.data = data

        Object.keys(this.data).forEach(key => {
            this.bind(data, key, data[key])
        })
    }

    bind (data, key, value) { 
        const dep = new Dep()

        Object.defineProperty(data, key, {
            get () {
                if (Dep.target) {
                    dep.listen(Dep.target)
                }

                return value
            },
            set (newValue) {
                if (newValue === value) {
                    return
                }

                value = newValue

                dep.notify()
            }
        })
    }
}

export default Observer
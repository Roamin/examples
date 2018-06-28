import Observer from './Observer'
import Compiler from './Compiler'

class VM {
    constructor (options) {
        this.$options = options
        this.$el = this.$options.el
        this._data = this.$options.data

        Object.keys(this._data).forEach(key => {
            this.addWatch(key)
        })

        new Observer(this._data)

        new Compiler(this.$el, this)
    }

    addWatch (key) {
        const _this = this

        Object.defineProperty(this, key, {
            get () {
                return _this._data[key]
            },
            set (value) {
                _this._data[key] = value
            }
        })
    }
}

export default VM
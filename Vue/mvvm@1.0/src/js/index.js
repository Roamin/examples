import MVVM from './MVVM'

window.vm = new MVVM({
    el: '#app',
    data: {
        message: 'hello mvvm'
    }
})
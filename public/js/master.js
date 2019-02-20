window.onload = function() {

    var socket = io()
    var form = document.querySelector('.b-form')
    var status = []

    socket.on('update', function(data) {
        // при получении сохраняем и рисуем
        status = data
        render(form, data)
    })

    function init(formElement) {
        controls = formElement.querySelectorAll('input.b-form__input');
        controls.forEach(function(control, index) {
            control.addEventListener('change', function(event) {
                // при изменении сохраняем и отправляем
                status[index] = event.target.checked
                socket.emit('update', status)
            })
        })
    }

    function render(formElement, data) {
        controls = formElement.querySelectorAll('input.b-form__input');
        controls.forEach(function(control, index) {
            control.checked = data[index]
        })
    }

    init(form)
}

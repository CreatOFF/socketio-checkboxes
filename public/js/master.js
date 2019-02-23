window.onload = function() {

    let socket = io()
    let form = document.querySelector('.b-form')
    let status = []
    let message = ''

    // let currentCard
    //
    // const cards = document.querySelectorAll('.b-table__card')
    // if (cards) {
    //     cards.forEach(function(card) {
    //         card.setAttribute('draggable', 'true')
    //         card.style.backgroundColor = getRandomColor()
    //
    //         card.addEventListener('dragstart', dragStart)
    //         card.addEventListener('dragend', dragEnd)
    //     })
    // }
    //
    // function dragStart() {
    //     console.log('dragStart')
    //     this.classList.add('b-table__card_hold')
    //     setTimeout(() => (this.classList.add('b-card_hold')), 0);
    //     currentCard = this
    // }
    //
    // function dragEnd() {
    //     console.log('dragEnd')
    //     this.classList.remove('b-card_hold')
    // }
    //
    // const slots = document.querySelectorAll('.b-table__slot')
    // if (slots) {
    //     slots.forEach(function(slot) {
    //         slot.addEventListener('dragover', dragOver)
    //         slot.addEventListener('dragenter', dragEnter)
    //         slot.addEventListener('dragleave', dragLeave)
    //         slot.addEventListener('drop', dragDrop)
    //     })
    // }
    //
    // function dragOver(e) {
    //     e.preventDefault()
    //     console.log('dragOver')
    // }
    //
    // function dragEnter(e) {
    //     e.preventDefault()
    //     console.log('dragEnter')
    //     this.classList.add('b-table__slot_hover')
    // }
    //
    // function dragLeave() {
    //     console.log('dragLeave')
    //     this.classList.remove('b-table__slot_hover')
    // }
    //
    // function dragDrop() {
    //     console.log('dragDrop')
    //     this.classList.remove('b-table__slot_hover')
    //     this.append(currentCard)
    // }
    //
    // function getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }


    // socket.on('update', function(data) {
    //     // при получении сохраняем и рисуем
    //     status = data
    //     render(form, data)
    // })
    //
    // function init(formElement) {
    //     controls = formElement.querySelectorAll('input.b-form__input');
    //     controls.forEach(function(control, index) {
    //         control.addEventListener('change', function(event) {
    //             // при изменении сохраняем и отправляем
    //             status[index] = event.target.checked
    //             socket.emit('update', status)
    //         })
    //     })
    // }
    //
    // function render(formElement, data) {
    //     controls = formElement.querySelectorAll('input.b-form__input');
    //     controls.forEach(function(control, index) {
    //         control.checked = data[index]
    //     })
    // }
    //
    // init(form)

    var app = new Vue({
        el: '#app',
        data: {
            socket: socket,
            game: {
                field: [],
                players: []
            },
            turn: {
                sticks: 0
            }
        },
        created: function() {
            this.socket.on('update', (game) => {
                this.game = game
            })
            this.socket.on('players', (players) => {
                this.game.players = players
            })
            this.socket.on('closeReason', (data) => {
                this.errors.disconnect = data.reason
            })
        },
        methods: {
            playPull: function(index, event) {

                let pulled = event.target.classList.contains('b-stick_pulled')
                if (pulled) {
                    // если палочка вытянута, возвращаем обратно
                    this.turn.sticks--
                    this.$set(this.game.field[index], "pulled", false);
                } else {
                    if (this.turn.sticks < 3) {
                        // если меньше трёх, тянем палочку
                        this.turn.sticks++
                        this.$set(this.game.field[index], "pulled", true);
                    }
                }
            }
        }
    })
}

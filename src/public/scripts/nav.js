const listenerButton = document.getElementById('nav-Listener')

if (listenerButton != null) {

    listenerButton.addEventListener("click", (e) => {
        const value = e.target.innerHTML;

        if (value === 'Listener') {
            window.location.assign('/pages/listener')
        }
    })

}

const actBtn = document.getElementById('act-btn')

if (actBtn != null) {

    actBtn.addEventListener("click", (e) => {

        // Update with account information as we develop sessions.
        window.location.assign('/pages/login')
    })
}

const producerButton = document.getElementById('nav-Producer')

if (producerButton != null) {
    producerButton.addEventListener("click", (e) => {
        window.location.assign('/pages/producer')
    })
}
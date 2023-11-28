const logoutButton = document.getElementById("logout-btn")

logoutButton.addEventListener("click", () => {

    fetch('/users/logout', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {

        window.location.assign('/pages/login')

    })

})
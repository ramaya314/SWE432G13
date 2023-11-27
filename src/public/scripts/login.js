const loginForm = document.getElementById('login-form')


const loginFailElement = () => {
    const failDiv = document.createElement('div')
    failDiv.id = 'fail-div'

    const failText = document.createElement('h4')
    failText.innerHTML = 'Account Name or Password unknown'

    failDiv.append(failText)

    return failDiv
}

loginForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    const userNameElement = document.getElementById('username-input');
    const pwdElement = document.getElementById('pwd-input');
   
    const userNameValue = userNameElement.value
    const pwdValue = pwdElement.value

    fetch('/users/login', {

        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify({
            username:   userNameValue,
            password:   pwdValue
        })

    }).then(res => {

        res.json().then(obj => {
            

            // We have successfully logged in
            if (obj.response === 'OK') {
                window.location.assign('/pages/account')
                return
            } 

            const failText = document.getElementById('fail-div')

            if (failText != null) {
                failText.remove();
            }

            loginForm.append(loginFailElement())

            pwdElement.innerHTML = ''

        })
    })
})
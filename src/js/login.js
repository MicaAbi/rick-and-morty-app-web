// TOKEN VALIDATION
const userLogged = localStorage.getItem('userLogged')

if(userLogged) {
    window.location = `./index.html`
}

// ENDPOINT LOGIN - AUTH API
const auth_api_user_login = 'https://api-auth-moby.herokuapp.com/api/user/login'

const validations = {
    email: {
        value: '',
        error: true,
    },
    password: {
        value: '',
        error: true,
    },
}

// INPUT VALIDATIONS

// Input EMAIL
const emailForm = document.querySelector('#email-input')
const errorEmail = document.querySelector('#error-email')

const isEmail = (string) => {
    const validationEmail = string.includes('@')
    return validationEmail
}

const emailValidation = () => {
    if (emailForm.value === '') {
        emailForm.style.border = '1.5px solid #dc3545'
        errorEmail.textContent = 'This field cannot be empty, please enter an email'
        validations.email.error = true
    } else if (emailForm.value.length < 10 || emailForm.value.length > 50) {
        emailForm.style.border = '1.5px solid #dc3545'
        errorEmail.textContent = 'The email must have more than 10 characters and less than 50'
        validations.email.error = true
    } else if (!isEmail(emailForm.value)) {
        emailForm.style.border = '1.5px solid #dc3545'
        errorEmail.textContent = 'You must complete with a valid email'
        validations.email.error = true
    } else {
        emailForm.style.border = '#dee2e6 1px solid'
        errorEmail.textContent = ''
        validations.email.error = false
        validations.email.value = emailForm.value
    }
}

emailForm.addEventListener('focusout', emailValidation)

// Input PASSWORD
const passwordForm = document.querySelector('#password-input')
const errorPassword = document.querySelector('#error-password')

const passwordValidation = () => {
    if (passwordForm.value === '') {
        passwordForm.style.border = '1.5px solid #dc3545'
        errorPassword.textContent = 'This field cannot be empty, please enter a password'
        validations.password.error = true
    } else if (passwordForm.value.length < 8 || passwordForm.value.length > 30) {
        passwordForm.style.border = '1.5px solid #dc3545'
        errorPassword.textContent = 'Password must contain more than 8 characters and less than 30'
        validations.password.error = true
    } else {
        passwordForm.style.border = '#dee2e6 1px solid'
        errorPassword.textContent = ''
        validations.password.error = false
        validations.password.value = passwordForm.value
    }
}

passwordForm.addEventListener('focusout', passwordValidation)

// FETCH FUNCTION

const loginUser = async (user) => {
    try {
        const res = await fetch(auth_api_user_login, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    
        const data = await res.json()
    
        const { header } = data
        const { resultCode } = header

        if(resultCode == 0) {
            const { data : dataUser } = data
            const { token } = dataUser
            localStorage.setItem('userLogged', JSON.stringify(token))
            loginForm.reset()
            window.location = '../../index.html'
        } else {
            loginError.textContent = 'Incorrect user or password'
        }
        
    } catch (error) {
        console.error(error);
    }
}

// SUBMIT FORM

const loginForm = document.querySelector('.login-form')
const loginError = document.querySelector('#error-field')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    emailValidation()
    passwordValidation()

    if(validations.email.error || validations.password.error) {
        loginError.textContent = 'Some of the information is incorrect, please check the form'
    } else {
        loginError.textContent = ''

        const {email, password} = validations

        const userToAuthenticate = {
            mail: email.value,
            password: password.value,
        }

        loginUser(userToAuthenticate)
    }
})
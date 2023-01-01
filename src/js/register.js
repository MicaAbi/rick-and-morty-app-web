// URL API
const auth_api_user_post = 'https://api-auth-moby.herokuapp.com/api/user/register'

const validations = {
    fullName: {
        value: '',
        error: true,
    },
    email: {
        value: '',
        error: true,
    },
    password: {
        value: '',
        error: true,
    },
    passwordRepeat: {
        value: '',
        error: true,
    },
    address: {
        value: {
            street: '',
            city: '',
            country: '',
            zipCode: '',
        },
        error: false,
    },
}

// INPUT VALIDATIONS

// Input NAME
const nameForm = document.querySelector('#full-name')
const errorName = document.querySelector('#error-name')

const nameValidation = () => {
    if (nameForm.value === '') {
        nameForm.style.border = '1.5px solid #dc3545'
        errorName.textContent = 'This field cannot be empty, please enter a name'
        validations.fullName.error = true
    } else if (nameForm.value.length < 5 || nameForm.value.length > 15) {
        nameForm.style.border = '1.5px solid #dc3545'
        errorName.textContent = 'The name must contain at least 5 characters and less than 15'
        validations.fullName.error = true
    } else {
        nameForm.style.border = '#dee2e6 1px solid'
        errorName.textContent = ''
        validations.fullName.error = false
        validations.fullName.value = nameForm.value
    }
}

nameForm.addEventListener('focusout', nameValidation)

// Input EMAIL
const emailForm = document.querySelector('#email')
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
const passwordForm = document.querySelector('#password')
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

// Input PASSWORD REPEAT
const passwordRepeatForm = document.querySelector('#password-repeat')
const errorPasswordR = document.querySelector('#error-password-repeat')

const passwordRepValidation = () => {
    if (passwordRepeatForm.value === '') {
        passwordRepeatForm.style.border = '1.5px solid #dc3545'
        errorPasswordR.textContent = 'Please repeat the password'
        validations.passwordRepeat.error = true
    } else if (passwordRepeatForm.value === validations.password.value) {
        passwordRepeatForm.style.border = '#dee2e6 1px solid'
        errorPasswordR.textContent = ''
        validations.passwordRepeat.error = false
        validations.passwordRepeat.value = passwordRepeatForm.value
    } else {
        passwordRepeatForm.style.border = '1.5px solid #dc3545'
        errorPasswordR.textContent = 'The value entered does not match your password'
        validations.passwordRepeat.error = true
    }
}
passwordRepeatForm.addEventListener('focusout', passwordRepValidation)

// FETCH FUNCTIONS

const createUser = async (user) => {
    try {
        const res = await fetch(auth_api_user_post, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    
        const data = await res.json()
    
        const { header } = data
        const { resultCode } = header

        resultCode == 0 ? (
            registerForm.reset(),
            window.location = '../views/login.html'
        ) : (
            errorRegister.textContent = header.error
        )

    } catch (error) {
        console.log(error);
    }
}


// Class User

class User {
    constructor({name, mail, password, address}) {
        this.name = name
        this.mail = mail
        this.password = password
        this.address = address
    }
}

// SUBMIT FORM
const registerForm = document.querySelector('.register-form')
const errorRegister = document.querySelector('#error-field')

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    nameValidation()
    emailValidation()
    passwordValidation()
    passwordRepValidation()

    if (validations.fullName.error || validations.email.error || validations.password.error || validations.passwordRepeat.error) {
        errorRegister.textContent = 'Some of the information is incorrect, please check the form'
    } else {
        errorRegister.textContent = ""

        const {fullName, email, password, address} = validations

        const newUser = new User({
            name: fullName.value,
            mail: email.value,
            password: password.value,
        })

        createUser(newUser)
    }
})

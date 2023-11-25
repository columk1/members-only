const form = document.querySelector('form')
const firstName = document.getElementById('firstName')
const firstNameError = document.querySelector('#firstName ~ span.error')
const lastName = document.getElementById('lastName')
const lastNameError = document.querySelector('#lastName ~ span.error')
const email = document.getElementById('email')
const emailError = document.querySelector('#email ~ span.error')
const emailExistsError = document.getElementById('emailExistsError')
const password = document.getElementById('password')
const passwordError = document.querySelector('#password ~ span.error')
const confirm_password = document.getElementById('confirm_password')
const confirm_passwordError = document.querySelector('#confirm_password ~ span.error')

// Takes firstName or lastName input element as param
function validateName(name) {
  let nameError = document.querySelector(`#${name.id} ~ span.error`)
  // if (!/^([a-zA-Z]|[à-ú]|[À-Ú])+$/.test(name.value)) {
  //   name.setCustomValidity('Please enter a valid name')
  // } else {
  //   name.setCustomValidity('')
  // }
  if (name.validity.valid) {
    console.log(nameError)
    nameError.className = 'error'
    nameError.previousElementSibling.className = 'errorIcon activeIcon'
    nameError.previousElementSibling.firstChild.src = '/icons/check.svg'
  } else {
    nameError.textContent = getNameError(name)
    nameError.className = 'error active'
    nameError.previousElementSibling.firstChild.src = '/icons/error.svg'
    nameError.previousElementSibling.className = 'errorIcon activeIcon'
  }
}

// Takes firstName or lastName input element as param
const getNameError = (name) => {
  return name.validity.valueMissing
    ? 'Name is required'
    : name.validity.tooShort
    ? `Name should be at least ${name.minLength} characters`
    : name.validationMessage
}

function validateEmail() {
  if (email.validity.valid) {
    //TODO Remove Email Exists Error if there is one
    emailError.className = 'error' // Reset the visual state of the message
    emailError.previousElementSibling.className = 'errorIcon activeIcon'
    emailError.previousElementSibling.firstChild.src = '/icons/check.svg'
  } else {
    // If there is still an error, show the correct error
    emailError.textContent = getEmailError()
    emailError.className = 'error active'
    emailError.previousElementSibling.className = 'errorIcon activeIcon'
    emailError.previousElementSibling.firstChild.src = '/icons/error.svg'
  }
}

const getEmailError = () => {
  return email.validity.valueMissing
    ? 'Email address is required'
    : email.validity.typeMismatch
    ? 'Please enter a valid email address'
    : email.validity.tooShort
    ? `Email should be at least ${email.minLength} characters;`
    : ''
}

function validatePassword() {
  if (password.validity.valid) {
    passwordError.className = 'error'
    passwordError.previousElementSibling.className = 'errorIcon activeIcon'
    passwordError.previousElementSibling.firstChild.src = '/icons/check.svg'
  } else {
    passwordError.textContent = getPasswordError()
    passwordError.className = 'error active'
    passwordError.previousElementSibling.firstChild.src = '/icons/error.svg'
    passwordError.previousElementSibling.className = 'errorIcon activeIcon'
  }
  if (confirm_password.value) validateConfirmPassword()
}

function validateConfirmPassword() {
  if (password.value != confirm_password.value) {
    // password.setCustomValidity("Passwords Don't Match")
    confirm_password.setCustomValidity("Passwords Don't Match")
  } else {
    confirm_password.setCustomValidity('')
    password.setCustomValidity('')
  }
  if (confirm_password.validity.valid) {
    confirm_passwordError.className = 'error'
    confirm_passwordError.previousElementSibling.className = 'errorIcon activeIcon'
    confirm_passwordError.previousElementSibling.firstChild.src = '/icons/check.svg'
  } else {
    confirm_passwordError.textContent = getPasswordError()
    confirm_passwordError.className = 'error active'
    confirm_passwordError.previousElementSibling.firstChild.src = '/icons/error.svg'
    confirm_passwordError.previousElementSibling.className = 'errorIcon activeIcon'
  }
}

const getPasswordError = () => {
  return password.validity.valueMissing
    ? 'Password is required'
    : password.validity.tooShort
    ? `Password should be at least ${password.minLength} characters; you entered ${password.value.length}`
    : confirm_password.validationMessage
}

firstName.addEventListener('change', validateName.bind(this, firstName))
firstName.onchange = () => {
  firstName.removeEventListener('change', validateName.bind(this, firstName))
  firstName.addEventListener('input', validateName.bind(this, firstName))
}

lastName.addEventListener('change', validateName.bind(this, lastName))
lastName.onchange = () => {
  lastName.removeEventListener('change', validateName.bind(this, lastName))
  lastName.addEventListener('input', validateName.bind(this, lastName))
}

email.addEventListener('change', validateEmail)
email.onchange = () => {
  email.removeEventListener('change', validateEmail)
  email.addEventListener('input', validateEmail)
}

password.addEventListener('change', validatePassword)
password.onchange = () => {
  password.removeEventListener('change', validatePassword)
  password.addEventListener('input', validatePassword)
}

confirmPassword.addEventListener('change', validateConfirmPassword)
confirmPassword.onchange = () => {
  confirmPassword.removeEventListener('change', validateConfirmPassword)
  confirmPassword.addEventListener('input', validateConfirmPassword)
}

form.addEventListener('submit', (event) => {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    validateEmail()
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault()
  }
})

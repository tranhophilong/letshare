var first_name = document.querySelector('#first-name')
var last_name = document.querySelector('#last-name')
var phone_number = document.querySelector('#phone-number')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var address = document.querySelector('#address')
var day = document.querySelector('#day')
var month = document.querySelector('#month')
var year = document.querySelector('#year')
var gender = document.querySelector('input[name="gender"]:checked')
const form = document.querySelector('form')
const btn_submit = document.querySelector('#btn-submit')
var url_signup = "http://127.0.0.1:5000/auth/signup"

function app() {
    btn_submit.addEventListener('click', event => {
        let isEmptyAll =  checkEmptyInvalid([first_name, last_name, phone_number, email, password, address])
        checkAfterCheckEmptyInvalid([first_name, last_name, phone_number, email, password, address])
        let isEmptyForEmail = checkEmptyInvalid([email])
        let isEmptyPassword = checkEmptyInvalid([password])

        

        if (isEmptyForEmail == false){
            checkEmailInvalid(email)
        }

        if (isEmptyPassword == false){
            checkLengthInvalid(password, 4, 10)
        }

        if(isEmptyAll == false ){
            var data = {
                last_name : last_name.value,
                first_name : first_name.value,
                email : email.value,
                address_user : address.value,
                password_user : password.value,
                gender : gender.value,
                date_of_birth : day.value,
                month_of_birth :month.value,
                year_of_birth : year.value,
                phone_number : phone_number.value,
            }

            if( checkEmailInvalid(email) == false && checkLengthInvalid(password, 4, 10) == false){
                postNewUser(url_signup, data)
            }

        
        }


    })

}
app()

function showError(input, message) {
    let parent = input.parentElement
    let small = parent.querySelector('small')
    parent.classList.add('error')
    small.innerHTML = message
}

function showSuccess(input) {
    let parent = input.parentElement
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerHTML = ''

}

function checkEmptyInvalid(listinput) {
    let is_empty = false
    listinput.forEach(input => {
        input.value = input.value.trim()
        if (input.value == '') {
            showError(input, 'Bạn chưa điền thông tin này')
            is_empty = true
        } else {
            showSuccess(input)
        }
    });

    return is_empty
}

function checkAfterCheckEmptyInvalid(listinput) {
    listinput.forEach(input => {
        input.value = input.value.trim()
        input.addEventListener('keydown', event => {
            if (input.value == '') {
                showError(input, 'Bạn chưa điền thông tin này')
            } else {
                showSuccess(input)
            }
        })
    })
}

function checkEmailInvalid(input) {
    let is_invalid = false
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()
    if (re.test(input.value)) {
        showSuccess(input)
    } 
    else {
        showError(input, 'Email của bạn không hợp lệ')
        is_invalid = true
    }
    return is_invalid

}

function checkLengthInvalid(input, min, max){
    let is_invalid = false
    input.value = input.value.trim()
    if(input.value.length < min){
        showError(input, `Phải có ít nhất ${min} ký tự`)
        is_invalid = true
    }else if(input.value.length > max){
        showError(input, `Không được quá ${max} ký tự`)
        is_invalid = true
    }else{
        showSuccess(input)
    }
    return is_invalid


}

function postNewUser(api, data){
    var options = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    }

    fetch(api, options)
    .then(response => response.json())
}







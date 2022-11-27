// import {checkEmptyInvalid, submit , checkEmailInvalid} from './utils.js';
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var btn_submit = document.querySelector('#btn-submit')
url_login = 'http://127.0.0.1:5000/auth/login'

function app(){
    btn_submit.addEventListener('click', event =>{
        let  isEmptyAll = checkEmptyInvalid([email, password])
        if(isEmptyAll == false){
            var data = {
                email :email.value,
                password : password.value
            }

                submit(url_login, data)
        }
    })
}

app()


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

function submit(api, data){
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
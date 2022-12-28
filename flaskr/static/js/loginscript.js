// import {checkEmptyInvalid, submit , checkEmailInvalid} from './utils.js';
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var btn_submit = document.querySelector('#btn-submit')
var url_login = 'http://127.0.0.1:5000/auth/login'


// import { checkEmailInvalid } from "./utils"
import { submit } from "./utils.js"
import { checkEmptyInvalid } from "./utils.js"

function app(){
    if(btn_submit){
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

}

app()



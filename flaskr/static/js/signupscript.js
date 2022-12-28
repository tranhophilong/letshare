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
const btn_post_user = document.querySelector('#btn-post-user')
var url_signup = "http://127.0.0.1:5000/auth/signup"

import { checkEmptyInvalid } from "./utils.js"
import { checkAfterCheckEmptyInvalid } from "./utils.js"
import { checkEmailInvalid } from "./utils.js"
import { checkLengthInvalid } from "./utils.js"
import { submit } from "./utils.js"

function app() {
    if(btn_post_user){
        btn_post_user.addEventListener('click', event => {
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
                    submit(url_signup, data)
                }
    
            
            }
            
    
        })
    
    }
    

}
app()








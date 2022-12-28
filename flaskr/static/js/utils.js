
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
    .then( (data)=>{
        window.location.href = data.redirec
    })
}


export{checkEmptyInvalid, submit, checkEmailInvalid, checkAfterCheckEmptyInvalid, checkLengthInvalid}
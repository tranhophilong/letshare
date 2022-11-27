
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


function submit(){
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


export{checkEmptyInvalid, submit, checkEmailInvalid}
var title_product = document.querySelector('#title-product')
var catgorical_product = document.querySelector('input[name="catogrical-product"]:checked')
var image_product = document.querySelector('#image-product')
var description = document.querySelector('#description')
var btn_submit = document.querySelector('#btn-submit')
url_create = document.querySelector('http://127.0.0.1:5000/news/create')

function app(){
    // btn_submit.addEventListener('click', event =>{
    //     console.log(image_product.value)
    // })
    btn_submit.addEventListener('click', event =>{
        let isEmptyAll = checkEmptyInvalid([title_product, catgorical_product, image_product, description])
        if (isEmptyAll == false){
            data = {
                title_product : title_product.value,
                catgorical_product : catgorical_product.value,
                image_product : image_product.value,
                description : description.value
            }
            submit(url_create, data)
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

document.getElementById("pizza-form").onsubmit = validate;

function validate() {
    let isValid = true
    //reset errors
    clearErrors();

    //validate first name
    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "inline";
        isValid = false;
    }

    //validate last name
    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }

    //validate email
    let email = document.getElementById("email").value.trim();
    if (!email) {
        document.getElementById("err-email").style.display = "inline";
        isValid = false;
    }

    //validate size
    let size = document.getElementById("size").value;
    if (size == "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    //validate method
    let delivery = document.getElementById("delivery");
    let pickup = document.getElementById("pickup");
    if (!delivery.checked && !pickup.checked) {
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none"
    }

}




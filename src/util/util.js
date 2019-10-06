export function isEmail(text) {
    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regex.test(text) === false) {
        return false;
    } else {
        return true
    }
}

export function isValidLicense(plate){
    var regex = new RegExp("[a-zA-Z]{3}[0-9]{4}");

    if(regex.test(plate) === false) {
        return false;
    } else {
        return true
    }
}
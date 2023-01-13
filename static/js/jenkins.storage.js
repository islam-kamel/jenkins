function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function checkItem(key) {
    let res = getItemFromLocalStorage(key);
    if (res) {
        return true;
    }
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}

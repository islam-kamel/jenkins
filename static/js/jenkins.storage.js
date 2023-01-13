function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}

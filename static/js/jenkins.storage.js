function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return undefined
    }
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}

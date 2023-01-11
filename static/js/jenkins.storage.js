
function createCookie(cookieValue) {
    let date = new Date();
    const expire = date.getTime() + 1000 * 60 * 60 * 24;
    date.setTime(expire);
    document.cookie = `name=${cookieValue}; expires=${date};`;
}

function readCookie(key) {
    let cookie = document.cookie.split("; ");
    for (let c of cookie) {
        if (c.split("=")[0] === key) {
            return c.split("=")[1];
        }
    }
    return 0;
}

function removeCookie(key) {
    let cookie = readCookie(key);

    if (cookie) {
        let date = new Date(0);
        document.cookie = `${key}=; expires=${date.toUTCString()}`;
    } else {
        return 0;
    }
}

function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}

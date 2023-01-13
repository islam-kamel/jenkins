const signform = document.forms.signupForm;
const loginform = document.forms.loginForm;
const data = JSON.parse(localStorage.getItem("users"));

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
}

function loginError() {
    let error = document.querySelector("#loginForm > .invalid-feedback");
    error.classList.add("d-block");
}

function logout() {
    removeItemFromLocalStorage("login");
    window.location.reload();
}
function displayLoginInfo() {
    try {
        let {username} = getItemFromLocalStorage("login");
        userInfo.innerHTML = "@"+username;
        userInfo.innerHTML += `<button onclick="logout()" class="btn btn-dark mx-3">Logout</button>`
    } catch (e) {
        
    }

}
loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    let login = User.login({username: loginform.usernameLogin.value, password: loginform.passwordLogin.value});

    if (!loginform.checkValidity()) {
        e.stopPropagation();
    }
    loginform.classList.add('was-validated');
    if (login) {
        saveLocalStorage("login", JSON.stringify({username: login.username}))
        displayLoginInfo();
        window.location.reload();
        document.querySelector("#loginForm > div.col-12 > div > button.btn.btn-secondary").click();
    } else {
        loginError();
    }
})

signform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!signform.checkValidity()) {
        e.stopPropagation();
    } else {
        newUser(signform);
    }
    signform.classList.add('was-validated');

})

signform.password2.addEventListener("input", e => {
    if (e.target.value === signform.password1.value){
        return e.target.setCustomValidity("");
    }
    e.target.setCustomValidity("error");
})


function newUser(form) {
    let formInput  = form.querySelectorAll("input");
    let user = {};
    for (let key of formInput) {
        user[key.id] = key.value;
    }
    let create = new User(user);
    create.newPassword(form._password.value);
    return create.save();
}

class LovedPorducts {
    #products;
    constructor(products = false) {
        this.#products = products ? products : {};
    }

    love(username, productId) {
        let products = this.#products[username];
        if (products === undefined) {
            return this.#products[username] = [productId];
        }
        products[products.length] = productId
        return this.#products[username] = products;
    }

    unloved(username, productId) {
        let products = this.#products[username];
        products = products.filter((id) => {
            return id !== productId;
        })
        return this.#products[username] = products;
    }

    getAll() {
        return this.#products;
    }
}

class User {

    constructor(data) {
        this.fname = data.fname;
        this.lname = data.lname;
        this.username = data.username;
        this.lovedProducts = new LovedProducts();
        this._password = "";

    }

    static hashPassword(password){
        let hashed = [];
        for(let code of password) {
            code = String(code);
            hashed[hashed.length] = code.charCodeAt();
        }
        return hashed.join("");
    }
    newPassword(password) {
        let hashed = User.hashPassword(password);
        console.log(hashed, password)
        this._password = hashed;
        return this._password;
    };

    static getUser(username) {
        let users = JSON.parse(localStorage.getItem("users"));
        for(let user of users) {
            if (user.username === username) {
                let obj  = new User(user);
                obj.lovedProducts = new LovedProducts(user.lovedProducts);
                return obj
            }
        }
    }
    static login(obj) {
        let data = JSON.parse(localStorage.getItem("users"));
        for (let user of data) {
            if (user.username === obj.username && User.hashPassword(obj.password) === user._password) {
                return new User(user);
            }
        }
        return false;
    }

    static getCurrentUser() {
        return getItemFromLocalStorage("login");
    }
    #validUser() {
        let users = getItemFromLocalStorage("users");
        for (let user of users) {
            if (user.username === this.username) {
                return false
            }
        }
        return true;
    }
    update() {
        let users = getItemFromLocalStorage("users");
        for (let user of users) {
            if(user.username === this.username) {
                user.lovedProducts = this.lovedProducts.getAll();
                saveLocalStorage("users", JSON.stringify(users));
            }
        }
    }
    save() {
        let obj = JSON.parse(localStorage.getItem("users"));
        if (this.#validUser()) {
            obj[obj.length] = this;
            saveLocalStorage("users", JSON.stringify(obj));
            return this;
        }
        return false;
    }

}

function setUserLove() {
    try {
        let user = User.getUser(User.getCurrentUser().username);
        let loved = user.lovedProducts.getAll();
        for (let product of loved[user.username]) {
            let love = document.querySelector(`.love[data-product-id="${product}"]`);
            love.innerText = "favorite";
            love.classList.add("loved");
        }
    } catch (e) {

    }

}

(() => {
    let login = getItemFromLocalStorage("login");
    if (login) {
        userInfo.innerHTML = "@"+login.username;
        window.addEventListener("fetched", () => {
            setUserLove();
        })
    }
})()

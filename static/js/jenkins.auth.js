const signform = document.forms.signupForm;
const loginform = document.forms.loginForm;

const data = JSON.parse(localStorage.getItem("users"));

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
}
if (!localStorage.getItem("id")) {
    localStorage.setItem("id", 0);
}

function loginError() {
    let error = document.querySelector("#loginForm > .invalid-feedback");
    error.classList.add("d-block");
}

loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    let login = User.login({username: loginform.usernameLogin.value, password: loginform.passwordLogin.value});

    if (!loginform.checkValidity()) {
        e.stopPropagation();
    }
    loginform.classList.add('was-validated');
    if (login) {
        userInfo.innerHTML = "@"+loginform.usernameLogin.value;
        document.querySelector("#loginForm > div.col-12 > div > button.btn.btn-secondary").click();
        saveLocalStorage("login", `{username: ${login.username}}`)
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

class ProductRatings {
    #ratings;
    constructor() {
        this.#ratings = {};
    }

    setRating(username, productId, rating) {
        let products = this.#ratings[username];
        if (products === undefined) {
            return this.#ratings[username] = JSON.parse(`{
                "${productId}": ${rating}
            }`);
        }
        return this.#ratings[username][productId] = rating;
    }

    getAll() {
        return this.#ratings;
    }

    remove(username, prodeuctId) {
        let ratings = this.getAll(username);
        delete ratings[username][prodeuctId];
        this.#ratings[username] = ratings[username];
    }
}
class LovedPorducts {
    #products;
    constructor() {
        this.#products = {};
    }

    love(username, productId) {
        let products = this.#products[username];
        if (products === undefined) {
            return this.#products[username] = [productId];
        }
        products[products.length] = productId
        return this.#products[username] = products;
    }

    unlove(username, productId) {
        let products = this.#products[username];
        let index = products.indexOf(productId);
        if (index > -1) {
            products.pop(products.indexOf(productId));
            return this.#products[username] = products;
        }
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
        this.lovedProducts = new LovedPorducts();
        this.productRatings = new ProductRatings();
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
                return new User(user);
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

    #vaildUser() {
        let users = getItemFromLocalStorage("users");
        for (let user of users) {
            if (user.username === this.username) {
                return false
            }
        }
        return true;
    }

    save() {
        let obj = JSON.parse(localStorage.getItem("users"));
        if (this.#vaildUser()) {
            obj[obj.length] = this;
            saveLocalStorage("users", JSON.stringify(obj));
            return this;
        }
        return false;
    }

}
//user = new User({fname:"islam", lname:"kamel", username:"islam.kamel"})
const signform = document.querySelectorAll('.needs-validation[name="signupForm"]');
const loginform = document.querySelectorAll('.needs-validation[name="loginForm"]');
const data = JSON.parse(localStorage.getItem("users"));

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
}
if (!localStorage.getItem("id")) {
    localStorage.setItem("id", 0);
}

(() => {
    'use strict'
    Array.from(loginform).forEach(form => {

        form.addEventListener('submit', event => {
            event.preventDefault()
            if (!form.checkValidity()) {
                event.stopPropagation()
            }
            login();
            form.classList.add('was-validated')
        }, false)
    })
})();

(() => {
    'use strict'
    Array.from(signform).forEach(form => {

        form.addEventListener('submit', event => {
            event.preventDefault()
            if (!form.checkValidity()) {
                event.stopPropagation()
            }
            if (data.length > 0) {
                for (let user of data) {
                    if (user.username !== form.username.value) {
                       newUser(form);
                    }
                }
            } else {
                newUser(form);
                form.classList.add('was-validated')
            }

        }, false)
 })
})();

signform[0].password2.addEventListener("input", e => {
    if (e.target.value === signform[0].password1.value){
        return e.target.setCustomValidity("");
    }
    e.target.setCustomValidity("error");
})

function newUser() {
    let user = {
        id: ++localStorage.id,
        fname: fname.value,
        lname: lname.value,
        username: username.value,
        password: password1.value,
        orders: [],
        productsRating: [],
        lovedProducts: []
    };

    let obj = JSON.parse(localStorage.getItem("users"))
    obj[obj.length] = user;
    localStorage.setItem("users", JSON.stringify(obj))
}

function login() {
    let loginInfo = {username: usernameLogin.value, password:passwordLogin.value};
    let data = JSON.parse(localStorage.getItem("users"));
    for (user of data) {
        if (user.username == loginInfo.username && user.password == loginInfo.password) {
            console.log(user);
        }
    }
}


class User {
    constructor(data) {
        // this.id
        this.fname = data.fname;
        this.lname = data.lname;
        this.username = data.username;
        this.password = data.password;
        // this.orders
        // this.productsRating
        // this.lovedProducts
    }
}
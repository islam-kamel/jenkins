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

function newUser(form) {
    let userForm = {
        fname: form.fname.value,
        lname: form.lname.value,
        username: form.username.value,
    };
    console.log(form)
    let user = new User(userForm);
    user.newPassword(form._password.value);
    user.save();
//    let obj = JSON.parse(localStorage.getItem("users"))
//    obj[obj.length] = user;
//    localStorage.setItem("users", JSON.stringify(obj))
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

//user = new User({fname:"islam", lname:"kamel", username:"islam.kamel"})
class User {
    constructor(data) {
        this._id = ++localStorage.id;
        this.fname = data.fname;
        this.lname = data.lname;
        this.username = data.username;
        this._password = "";
    }

    getId() {
        return this._id;
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

    static getUser(id) {
        let users = JSON.parse(localStorage.getItem("users"));
        for(let user of users) {
            if (user._id === id) {
                return new User(user);
            }
        }
    }
    static login(form) {
        let data = JSON.parse(localStorage.getItem("users"));
        for (let user of data) {
            if (user.username === form.username && User.hashPassword(form.password) === user._password) {
                return new User(user);
            }
        }
    }
    save() {
        let obj = JSON.parse(localStorage.getItem("users"))
        obj[obj.length] = this;
        localStorage.setItem("users", JSON.stringify(obj))
    }

}

//user = new User({fname:"islam", lname:"kamel", username:"islam.kamel"})
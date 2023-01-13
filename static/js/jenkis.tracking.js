let rec = getItemFromLocalStorage("recommend");
let views = getItemFromLocalStorage("views");

function recommentaions() {
    if(!rec) {
        saveLocalStorage("recommend", '{}');
        rec = getItemFromLocalStorage("recommend");
    }

}

//window.addEventListener("viewd", (e) => {
//        console.log(e.target)
//})

function latestView(product) {
    if(!rec) {
        saveLocalStorage("views", '{}');
        views = getItemFromLocalStorage("views");
    }

}
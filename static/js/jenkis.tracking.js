let views = getItemFromLocalStorage("views");

function latestView(product) {
    if(!views) {
        saveLocalStorage("views", '{}');
        views = getItemFromLocalStorage("views");
    }
    product = JSON.parse(product);
    views[product.id] = JSON.stringify(product);
    saveLocalStorage("views", JSON.stringify(views))
}

function displayLatestView(data) {
    container = document.getElementById("autoGenerate");
    container.innerHTML += data
}

function buildContainer(title) {
    let container = root.parentElement;
    container.innerHTML += `
            <div class="text-center border-bottom mb-3">
                <h2 class="w-fit text-center mt-5 bg-dark p-3">${title}</h2>
            </div>
            <div id="autoGenerate" class="row row-cols-3 row-cols-sm-1 g-4 d-flex flex-nowrap" style="max-width: 100%; overflow-x: auto">
            </div>
        `
}
function getLatestView() {
    try{
        buildContainer("Latest View");
        for (let product in views) {
            product = JSON.parse(views[product])
            CreateElement(product, displayLatestView)
        }
    } catch (e) {}
}
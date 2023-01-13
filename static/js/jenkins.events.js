const fetched = new Event("fetched");
const loved = new Event("loved");
const viewd = new Event("viewd");

window.onload = function () {
    FetchData(displayData);
    getCategories();
}

window.addEventListener("fetched", () => {
    lodaingArea.classList.add("loaded");
    setTimeout(() => {
        lodaingArea.style.display = "none";
        }, 250);

    setRate();
    renderLove();
})

searchInput.addEventListener("input", (e) => {
    let product = cache.search(e.target.value);
    if (!product || e.target.value === '') {
        seRes.innerText = '';
        seRes.parentNode.classList.remove("active")
        return false;
    }
    seRes.innerText = product.title;
    seRes.parentNode.classList.add("active");
    seRes.addEventListener("click", e => getProduct(e.target));
})
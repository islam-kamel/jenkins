const fetched = new Event("fetched");

window.onload = function () {
    displayLoginInfo();
    FetchData(displayData);
}

window.addEventListener("fetched", () => {
    lodaingArea.classList.add("loaded");
    setTimeout(() => {
        lodaingArea.style.display = "none";
        }, 250);
    
    getCategories();
    getLatestView();
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
    seRes.setAttribute("data-product-id", product.id)
    seRes.parentNode.classList.add("active");
    seRes.addEventListener("click", e => getProduct(e.target.dataset.productId));
})
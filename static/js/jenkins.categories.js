function getCategories() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            for (let res of JSON.parse(this.response)) {
                categoriesList.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link" href="#root" onclick="filterByCategories(this)" data-bs-target="${res}">${res}</a>
                </li>
                `
            }
        }
    }
    req.open("GET", "https://fakestoreapi.com/products/categories");
    req.send()
}

function filterByCategories(target) {
    let req = new XMLHttpRequest();
    let isRemoved = false;
    if (cache[target.dataset.bsTarget]) {
        for (let product of cache[target.dataset.bsTarget]) {
            CreateElement(product, (card) => {
                if (isRemoved) {
                    root.innerHTML += card;
                } else {
                    root.innerHTML = card;
                    isRemoved = true;
                }
            })
        }
        setRate();
        renderLove();
        setUserLove();
        return true
    }
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cache[target.dataset.bsTarget] = JSON.parse(this.response);

            for (let product of JSON.parse(this.response)) {
                CreateElement(product, (card) => {
                    if (isRemoved) {
                        root.innerHTML += card;
                    } else {
                        root.innerHTML = card;
                        isRemoved = true;
                    }
                })
            }
            setRate();
            renderLove();
            setUserLove();
        }
    }
    req.open("GET", `https://fakestoreapi.com/products/category/${target.dataset.bsTarget}`);
    req.send();
}
const fetched = new Event("fetched");
const cache = {
    search: function(query) {
        let products = JSON.parse(this.products)
        for (let product of products) {
            if (product.title.includes(query)) {
                return product.title
            }
        }
    }
};

function FetchData(callBack) {
    let req = new XMLHttpRequest();
    cache.products !== '' ? console.log("cache"): console.log("no")
    req.onreadystatechange = function () {
        console.log("here")
        if (this.readyState === 4 && this.status === 200) {
            cache.products = this.response;
            callBack(this.response);
            window.dispatchEvent(fetched);
        }
    }

    req.open("GET", "https://fakestoreapi.com/products");
    req.send();
}


function CreateElement(data, callBack) {
    let card = `
        <div class="col">
            <div class="card">
                <img src="${data.image}" class="card-img-top" alt="Product image">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h1 class="card-title" title="${data.title}">${data.title}</h1>
                        <i class="material-icons-outlined love">favorite_border</i>
                    </div>
                    <div class="seller-info d-flex flex-column align-items-start mb-2">
                        <div class="star-rate" rating="${Math.round(data.rating.rate)}">
                            <hr>
                        </div>
                    </div>
                    <div class="d-flex flex-column justify-content-between product-desc">
                        <p class="card-text lh-base fs-4">${data.description}</p>
                        <div class="product-action d-flex align-items-center justify-content-between">
                            <span><strong class="">Price:</strong><span
                                class="badge text-bg-light text-success mx-3">${data.price}$</span></span>
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    callBack
        ? callBack(card)
        : root.innerHTML += card
}

function getCategories() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            for (let res of JSON.parse(this.response)) {
                categoriesList.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="filterByCategories(this)" data-bs-target="${res}">${res}</a>
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
        }
    }
    req.open("GET", `https://fakestoreapi.com/products/category/${target.dataset.bsTarget}`);
    req.send();
}

function displayData(data) {
    data = JSON.parse(data);
    for (let p of data) {
        CreateElement(p)
    }
}

FetchData(displayData)
getCategories();

function setRate() {
    let stars = document.querySelectorAll('.star-rate');

    for (let star of stars) {
        star.innerHTML += '<i class="material-icons-outlined rated">star</i>'.repeat(+star.getAttribute("rating"))
        star.innerHTML += '<i class="material-icons-outlined">star_border</i>'.repeat(5 - +star.getAttribute("rating"))
    }
}

function toggle(element, query) {
    if (element.className.includes(query)) {
        element.classList.remove(query)
        return true
    } else {
        element.classList.add(query)
        return false
    }
}

function setLove() {
    let loves = document.querySelectorAll(".love");

    for (let love of loves) {
        love.addEventListener("click", (e) => {
            if (toggle(e.target, "loved")) {
                e.target.innerText = "favorite_border"
            } else {
                e.target.innerText = "favorite"
            }
        })
    }
}

window.addEventListener("fetched", () => {
    setRate();
    setLove();
})


let images = Array.from(document.querySelectorAll(".slider-container .slider .slider-images img"));

function slider() {
    if (images.length < 1) {
        images = Array.from(document.querySelectorAll(".slider-container .slider .slider-images img"))
        for (let image of images) {
            image.classList.remove("active")
        }
    }

    toggle(images.shift(), "active");
}

setInterval(slider, 1500);

searchInput.addEventListener("input", (e) => {
//    let res = cache.search(e.target.value);
//
//
//    searchResaultArea.innerHTML += `<h1 class="fs-4 card-title">${res}</h1>`

    console.log(e.target.value)
})
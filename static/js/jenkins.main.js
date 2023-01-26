let lodaingArea = document.querySelector(".loading");

function FetchData(callBack) {
    let req = new XMLHttpRequest();
    let cacheResualt = cache.getProducts();
    if (cacheResualt) {
        callBack(cacheResualt);
        return window.dispatchEvent(fetched);
    }

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cache.cacheProducts(this.response);
            callBack(this.response);
            window.dispatchEvent(fetched);
        }
    }
    req.open("GET", "https://fakestoreapi.com/products");
    req.send();
}

function CreateElement(data, callBack) {
    let card = `
        <div class="col" data-product=${data.id}>
            <div class="card">
                <img src="${data.image}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h1 class="card-title" onclick="getProduct(${data.id})" title="${data.title}" data-target="${data.id}">${data.title}</h1>
                        <i class="material-icons-outlined love" data-product-id="${data.id}">favorite_border</i>
                    </div>
                    <div class="seller-info d-flex flex-column align-items-start mb-2">
                        <div class="star-rate" rating="${Math.round(data.rating.rate)}">
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex flex-column justify-content-between product-desc">
                        <p class="card-text lh-base fs-4">${data.description}</p>
                        <div class="product-action d-flex align-items-center justify-content-between">
                            <span><strong class="">Price:</strong><span
                                class="badge text-bg-light text-success mx-1">${data.price}$</span></span>
                            <button class="btn btn-dark bg-text-dark" onclick="getProduct(${data.id}, addItems)">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    if (callBack) {
        callBack(card)
    } else {
        root.className = "row row-cols-lg-4 row-cols-md-3 row-cols-sm-1";
        root.innerHTML += card;
    }
}

function displayData(data) {
    data = JSON.parse(data);
    for (let p of data) {
        CreateElement(p)
    }
}

function setRate() {
    let stars = document.querySelectorAll('.star-rate');
    for (let star of stars) {
        if (star.childNodes.length < 4) {
            star.innerHTML += '<i class="material-icons-outlined rated">star</i>'.repeat(+star.getAttribute("rating"))
            star.innerHTML += '<i class="material-icons-outlined">star_border</i>'.repeat(5 - +star.getAttribute("rating"))
        }
    }
    return stars
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

function renderLove() {
    try {
        let loves = document.querySelectorAll(".love");
        let user =  User.getUser(User.getCurrentUser().username);
        for (let love of loves) {
            love.addEventListener("click", (e) => {
                if (toggle(e.target, "loved")) {
                    e.target.innerText = "favorite_border";
                    user.lovedProducts.unlove(user.username, +e.target.dataset.productId);
                } else {
                    e.target.innerText = "favorite"
                    user.lovedProducts.love(user.username, +e.target.dataset.productId);
                }
                user.update();
            })
        }
    } catch (e){}
}


function slider(src) {
    let image = document.querySelector(".slider-container .slider .slider-images div")
    image.style.backgroundImage = `url(./static/images/carousel/${src})`;
    image.classList.toggle("active");
    setTimeout(()=>{
        image.classList.toggle("active")
    }, 3470)
}

let imageSource = ["3.png", "2.png", "1.png"];
setInterval(() => {
    if (!imageSource.length) {
        imageSource = ["3.png", "2.png", "1.png"];
    }
    slider(imageSource.shift());
    }, 3500)

function reset() {
    window.location.reload();
}
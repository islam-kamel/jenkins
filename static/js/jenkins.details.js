function getProduct(target, callBack) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(callBack){
                return callBack(this.response);
            }
            showDetails(this.response);
            latestView(this.response)
        }
    }

    req.open("GET", `https://fakestoreapi.com/products/${target}`);
    req.send();
}



function hiddenSlider() {
    let slider = document.querySelector(".slider-container");

    slider.classList.toggle("slider-hidden")
    setTimeout(() => {
        slider.style.display = "none";
        }, 250)
}

function showDetails(data) {
    data = JSON.parse(data);
    let card = `
        <div class="col">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.image}"
                             class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <h1 class="card-title" title="${data.title}">${data.title}</h1>
                                <i class="material-icons-outlined love" data-product-id="${data.id}">favorite_border</i>
                            </div>
                            <div class="seller-info d-flex flex-column align-items-start mb-2">
                                <div class="star-rate" rating="${Math.round(data.rating.rate)}">
                                    <hr>
                                </div>
                            </div>
                            <div class="d-flex flex-column justify-content-between ">
                                <p class=" lh-base fs-4">${data.description}</p>
                                <div class="product-action d-flex align-items-center justify-content-between">
                                <span>
                                    <strong class="">Price:</strong>
                                    <span class="badge text-bg-light text-success mx-3">${data.price}$</span>
                                </span>
                                    <button class="btn btn-dark bg-text-dark" onclick="getProduct(${data.id}, addItems)">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    hiddenSlider();
    root.className = "row";
    root.innerHTML = card;
    setRate();
    renderLove();
    setUserLove();
}

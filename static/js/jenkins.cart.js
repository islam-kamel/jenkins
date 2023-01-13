const cartName = "shopingCart";

(() => {
    let products = getItemFromLocalStorage(cartName);
    if (products) {
        renderItems(products);
    }
})();
function addItems(product) {
    let products = getItemFromLocalStorage(cartName);
    if (!products) {
        saveLocalStorage(cartName, '{}');
        products = getItemFromLocalStorage(cartName);
    }
    product = JSON.parse(product);
    products[product.id] = product;
    saveLocalStorage(cartName, JSON.stringify(products))
    renderItems(products);
}

function renderItems(products) {
    cartItems.innerHTML = "";
    for (let key in products) {
        let item = `
        <li class="row justify-content-around align-items-center m-0" data-product-id="${products[key].id}">
            <div class="col-2">
                <img src="${products[key].image}" alt="${products[key].title}" style="{max-width:50px;}">
            </div>
            <div class="col-10">
                <h1 class="card-title fs-5" >${products[key].title}</h1>
                <span><strong class="">Price:</strong>
                <span class="badge text-bg-light text-success mx-1">${products[key].price}$</span></span>
            </div>
        </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        `
        cartItems.innerHTML += item;
    }
    cartItems.innerHTML += `
        <li class="m-3 p-3"><button class="btn btn-dark d-block w-75 m-auto" onclick="checkOutPage()">Check Out</button></li>
    `
}

function checkOutPage() {
    let products = getItemFromLocalStorage(cartName);
    let elements = ""
    let checkout = `
     <div class="card shadow-2-strong mb-5  " style="border-radius: 16px;" id="checkout">
                    <div class="card-body p-4">

                        <div class="row">
                            <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                <form>
                                    <div class="d-flex flex-row pb-3">
                                        <div class="d-flex align-items-center pe-2">
                                            <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                                                value="" aria-label="..." checked />
                                        </div>
                                        <div class="rounded border w-100 p-3">
                                            <p class="d-flex align-items-center mb-0">
                                                <i class="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                                                Card
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row pb-3">
                                        <div class="d-flex align-items-center pe-2">
                                            <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                                                value="" aria-label="..." />
                                        </div>
                                        <div class="rounded border w-100 p-3">
                                            <p class="d-flex align-items-center mb-0">
                                                <i class="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="d-flex align-items-center pe-2">
                                            <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                                                value="" aria-label="..." />
                                        </div>
                                        <div class="rounded border w-100 p-3">
                                            <p class="d-flex align-items-center mb-0">
                                                <i class="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-6 col-lg-4 col-xl-6">
                                <div class="row">
                                    <div class="col-12 col-xl-6">
                                        <div class="form-outline mb-4 mb-xl-5">
                                            <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                                                placeholder="John Smith" />
                                            <label class="form-label" for="typeName">Name on card</label>
                                        </div>

                                        <div class="form-outline mb-4 mb-xl-5">
                                            <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="MM/YY"
                                                size="7" id="exp" minlength="7" maxlength="7" />
                                            <label class="form-label" for="typeExp">Expiration</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-6">
                                        <div class="form-outline mb-4 mb-xl-5">
                                            <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                                                placeholder="1111 2222 3333 4444" minlength="19" maxlength="19" />
                                            <label class="form-label" for="typeText">Card Number</label>
                                        </div>

                                        <div class="form-outline mb-4 mb-xl-5">
                                            <input type="password" id="typeText" class="form-control form-control-lg"
                                                placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                            <label class="form-label" for="typeText">Cvv</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-xl-3">
                                <div class="d-flex justify-content-between" style="font-weight: 500;">
                                    <p class="mb-2">Subtotal</p>
                                    <p class="mb-2">$23.49</p>
                                </div>

                                <div class="d-flex justify-content-between" style="font-weight: 500;">
                                    <p class="mb-0">Shipping</p>
                                    <p class="mb-0">$2.99</p>
                                </div>

                                <hr class="my-4">

                                    <div class="d-flex justify-content-between mb-4" style="font-weight: 500;">
                                        <p class="mb-2">Total (tax included)</p>
                                        <p class="mb-2">$26.48</p>
                                    </div>

                                    <button type="button" class="btn btn-primary btn-block btn-lg">
                                        <div class="d-flex justify-content-between">
                                            <span>Checkout</span>
                                            <span>$26.48</span>
                                        </div>
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
    `
    for (let key in products) {
        elements += `
         <div class="col">
            <div class="card">
                <img src="${products[key].image}" class="card-img-top" alt="${products[key].title}">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h1 class="card-title" onclick="getProduct(${products[key].id})" title="${products[key].title}" data-target="${products[key].id}">${products[key].title}</h1>
                        <i class="material-icons-outlined love" data-product-id="${data.id}">favorite_border</i>
                    </div>
                    <div class="seller-info d-flex flex-column align-items-start mb-2">
                        <div class="star-rate" rating="${Math.round(products[key].rating.rate)}">
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex flex-column justify-content-between product-desc">
                        <p class="card-text lh-base fs-4">${products[key].description}</p>
                        <div class="product-action d-flex align-items-center justify-content-between">
                            <span><strong class="">Price:</strong><span
                                class="badge text-bg-light text-success mx-1">${products[key].price}$</span></span>
                               <div class="d-flex flex-row">
                                    <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        <i class="material-icons-round">remove</i>
                                    </button>

                                    <input id="form1" min="0" name="quantity" value="1" type="number"
                                        class="form-control form-control-sm" style="width: 50px;" />

                                    <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        <i class="material-icons-round">add</i>
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    console.log(elements)
    root.className = "row row-cols-1";
    root.innerHTML = elements;
    root.innerHTML += checkout;
    root.innerHTML += `
        <button class="checkout position-fixed rounded-circle btn btn-dark bg-dark  top-0 right-0">
            <a href="#checkout"><i class="material-icons-round text-bg-dark fs-1">shopping_cart_checkout</i><a>
        </button>
    `
    setRate();
    renderLove();
}

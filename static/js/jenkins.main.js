function FetchData(callBack) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callBack(this.response);
        }
    }

    req.open("GET", "https://dummyjson.com/products");
    req.send();
}


function CreateElement(data) {
    let card = `
    <div class="card" style="width: 18rem;">
      <img src="${data.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.description}</p>
        <a href="${data.id}" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    `
    root.innerHTML += card;



}

function displayData(data) {
    data = JSON.parse(data);
    for (let p of data.products) {
        CreateElement(p)
    }
}

FetchData(displayData)

const cache = {
    search: function(query) {
        let products = JSON.parse(this.getProducts())
        for (let product of products) {
            if (product.title.includes(query)) {
                return {id:product.id , title: product.title}
            }
        }
        return false
    },
    cacheProducts: function (data) {
        sessionStorage.setItem("products", data);
    },
    getProducts: function () {
        return sessionStorage.getItem("products");
    }
};
// https://stackoverflow.com/a/46247496/21407402
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function loadProduct(i) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
	    var title = document.getElementById("name");
	    var description = document.getElementById("description");
	    var price = document.getElementById("price");
	    var img = document.getElementById("img");
	    var container = document.getElementById("img-container");

	    title.innerHTML = data.products[i].name;
	    description.innerHTML = data.products[i].description ? data.products[i].description : "No description available.";
	    price.innerHTML = `Rp ${numberWithCommas(data.products[i].price)},-`;
	    img.src = `/assets/products/${data.products[i].category}/${data.products[i].photo}`;

	    if (data.products[i].darkMode) {
		container.classList.add("img-container-dark");
	    }

	    var selection1 = document.getElementById("selection1");
	    var selection2 = document.getElementById("selection2");
	    
	    if (data.products[i].category != "tees" && data.products[i].category != "hoodies") {
		selection1.style.display = "none";
		selection2.style.display = "none";
	    }
	});
}

function loadAll(id) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);

            for (var i = 0; i < data.products.length; i++) {
                element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="/product?product=${i}">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${data.products[i].category}/${data.products[i].photo}" alt=""></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${data.products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(data.products[i].price)},-</span>
			</a>
		    </div>
		`;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadCategory(id, category) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);

            for (var i = 0; i < data.products.length; i++) {
                if (data.products[i].category == category) {
                    element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="/product?product=${i}">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${data.products[i].category}/${data.products[i].photo}"></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${data.products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(data.products[i].price)},-</span>
			</a>
		    </div>
		`;
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadAge(id, age) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);

            for (var i = 0; i < data.products.length; i++) {
                if (data.products[i].age == age || data.products[i].age == "all") {
                    element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="/product?product=${i}">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${data.products[i].category}/${data.products[i].photo}"><img src="/assets/products/${data.products[i].category}/${data.products[i].photo}" alt=""></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${data.products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(data.products[i].price)},-</span>
			</a>
		    </div>
		`;
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadFeatured(id) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);

            for (var i = 0; i < data.products.length; i++) {
                if (data.products[i].featured) {
                    element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="/product?product=${i}">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${data.products[i].category}/${data.products[i].photo}"></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${data.products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(data.products[i].price)},-</span>
			</a>
		    </div>
		`;
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadNewest(id, n) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);
	    var products = data.products;
	    var maxValue = products.length;

	    if (n <= 0) {
		maxValue = products.length;
	    } else {
		maxValue = clamp(n, 0, products.length);
	    }

	    products.sort((a, b) => b.added - a.added);

            for (var i = 0; i < maxValue; i++) {
		element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="/product?product=${data.products[i].id}">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${products[i].category}/${products[i].photo}" alt=""></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(products[i].price)},-</span>
			</a>
		    </div>
		`;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadPopular(id, n) {
    fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            var element = document.getElementById(id);
	    var products = data.products;
	    var maxValue = products.length;

	    if (n <= 0) {
		maxValue = products.length;
	    } else {
		maxValue = clamp(n, 0, products.length);
	    }

	    products.sort((a, b) => b.bought - a.bought);

            for (var i = 0; i < maxValue; i++) {
		element.innerHTML += `
		    <div class="outer-product shadow">
			<a class="product corner-small" href="">
			    <div class="img-container ${data.products[i].darkMode ? 'img-container-dark' : ''}"><img src="/assets/products/${products[i].category}/${products[i].photo}" alt=""></div>
			    <div class="flex-container">
				<span class="product-title flex-grow">${products[i].name}</span>
				<span class="material-symbols-outlined">favorite</span>
			    </div>
			    <span class="price">Rp ${numberWithCommas(products[i].price)},-</span>
			</a>
		    </div>
		`;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// https://stackoverflow.com/a/2901298/21407402
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

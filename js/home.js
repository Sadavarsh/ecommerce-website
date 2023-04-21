let popularProductContainer = document.getElementById("popular-pd-container");
let basket = JSON.parse(localStorage.getItem("data")) ||[];




/////////// render popular  product /////////////
let renderPopularProducts = () => {
    return (popularProductContainer.innerHTML = products.slice(0,8).map((product) => {
        let {id, name, price, oldPrice, image, desc} = product;
        return `
            <div class="popular-pd-box">
            <div class="popular-pd-img">
                <div class="off">
                    <span>20% 0ff</span>
                </div>
                <img src=${image} alt=${name}>
            </div>
            <div class="popular-pd-content">
                <div class="popular-pd-text">
                    <h3>${name}</h3>
                    <p>Price: &#8377; ${price} <span>&#8377;${oldPrice}</span></p>
                </div>
                <div class="popular-pd-btn" onclick="addToCart(${id})">Add To Cart</div>
            </div>
           </div>
            `;
    }).join(""))
}

renderPopularProducts();

/////////// add to cart product /////////////

const addToCart = (id) => {
    let search = basket.find((x) => x.id === id);
    if(search === undefined) {
      basket.push({
          id:id,
          item: 1,
      })
    }else {
      search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
  }
  
/////////// calculat product quantity /////////////

  let calculation = () => {
      let cartIcon  = document.getElementById("quantity");
      cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
  }
  calculation();


/////////// render latest product /////////////

let latestProducts = document.getElementById("latest-products");

const renderLatestProduct = () => {
    return (latestProducts.innerHTML = products.slice(8,16).map((product) => {
        let {id,name,price,oldPrice,image,desc} = product;
        return `
        <div class="latest-pr-box">
        <div class="latest-pr-img">
            <img src=${image} alt=${name}>
        </div>
        <div class="latest-pr-content">
            <h3>${name}</h3>
            <p>Price: &#8377;${price} <span>&#8377;${oldPrice}</span></p>
            <button class="btn" onclick="addToCart(${id})">Add To Cart</button>
        </div>
        </div>
        `
    }).join(""))
}

renderLatestProduct();





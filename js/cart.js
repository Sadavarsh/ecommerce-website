const leftCart = document.getElementById("cart-left");
const cartContainer = document.querySelector(".cart-container");
const emptyCart = document.querySelector(".empty-cart");
const amount = document.querySelector(".total-amount");


let basket = JSON.parse(localStorage.getItem("data")) ||[];


/////////////////// show product in cart ///////////////////

const showCartProduct = () => {
   if(basket.length !==0) {
    return (leftCart.innerHTML = basket.map((product) => {
        let {id, item} = product;
        let search  = products.find((x) => x.id === id) || [];
        return (
            `
            <div class="cart-box">
            <div class="cart-img">
                <img src=${search.image} alt=${search.name}>
            </div>
            <div class="cart-content">
                <h4>${search.name}</h4>
                <div class="cart-price">
                    <p>Price: &#8377;${search.price} <span>&#8377;${search.oldPrice}</span></p>
                    <p>Total: &#8377;${item * search.price}</p>
                </div>
                <i class="fas fa-minus" onclick="decrement(${id})"></i>
                <span id={id}>${item}</span>
                <i class="fas fa-plus" onclick="addToCart(${id})"></i>
            </div>
            <div class="remove">
                <button class="remove-item btn"onclick="removeCart(${id})">Remove</button>
            </div>
        </div>
        `
        )
    }).join(""))
   }else {
    cartContainer.innerHTML = ``;
    emptyCart.innerHTML = `
         <h2>Your Cart Is Empty</h2>
        <a href="./index.html" class="btn">Back To Home</a>
    `

   }
}


showCartProduct();


/////////////////// decrement product ///////////////////
const decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    basket = basket.filter((x) => x.item !== 0);
    calculation();
    showCartProduct();
    localStorage.setItem("data", JSON.stringify(basket));
}

/////////////////// add to cart product in cart ///////////////////
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
  
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  }

/////////////////// remove product from cart ///////////////////
const removeCart = (id) => {
    basket = basket.filter((x) => x.id !== id);
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

/////////////////// clear cart ///////////////////

const clearCart = () => {
    basket = [];
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}
/////////////////// total amount ///////////////////
const totalAmount = () => {
if (basket.length !==0 ){
    let total = basket.map((x) => {
        let {id,item} = x;
        let search  = products.find((y) => y.id === id) || [];
        return item * search.price;
    }).reduce((x,y) => x + y,0);
    amount.innerHTML = total;
}else return

}
totalAmount();

 const placeOrder  = () => {
    alert("Your Order Is Success");
    location.href = "./index.html";
    clearCart();
    calculation();

 }
  let calculation = () => {
      let cartIcon  = document.getElementById("quantity");
      cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0); 
      
   totalAmount();
   showCartProduct();
  }
  calculation();

//==================================================================================================
//                       search products
// ==================================================================================================

let searchResultContainer = document.querySelector("#search-result");

const showSearchProduct = () => {
    return (searchResultContainer.innerHTML = products.map((product) => {
        let {id, name, image, price} = product;
        return `
                  <div class="result-box" id="result-box">
                    <div class="result-img">
                        <img src=${image} alt=${name}>
                    </div>
                    <div class="result-content">
                        <h4>${name}</h4>
                        <p>Price:&#8377;${price}</p>
                    </div>
                </div>`;
    }).join(""))
}

showSearchProduct();

const search = () => {
    let inputBox = document.querySelector("#search").value.toUpperCase();

    const storeItems = document.getElementById("search-result");

    const produc = document.querySelectorAll(".result-box");
    const pname = document.getElementsByTagName("h4");


    for (var i=0; i< pname.length; i++) {
        let match  = produc[i].getElementsByTagName("h4")[0];
        if(match) {
           let textValue =  match.textContent || match.innerHTML

           if(textValue.toUpperCase().indexOf(inputBox) >-1) {
            storeItems.style.display = "block";
            produc[i].style.display = "";
            if(inputBox.length === 0) {
                storeItems.style.display = "none";
            }
           }else {
            produc[i].style.display = "none"
           }
        }
    }
}
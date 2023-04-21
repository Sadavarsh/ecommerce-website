let heroContainer = document.querySelectorAll(".hero-container");
let index = 0;



function controller(x) {
    index += x;
    showHeroSlide(index)
}

function showHeroSlide(num) {

    if (num == heroContainer.length) {
        num = 0;
        index = 0;
    }
    if (num < 0) {
        num = heroContainer.length - 1;
        index = heroContainer.length - 1;
    }
    for (let slide of heroContainer) {
        slide.style.display = "none"
    }
    heroContainer[num].style.display = "block"
}

showHeroSlide(index);




//==================================================================================================
//                        render popular products
// ==================================================================================================



const popularProductSlider = document.querySelectorAll(".popular-container");
const next = document.querySelectorAll(".next");
const prev = document.querySelectorAll(".prev");


popularProductSlider.forEach((item,i) => {
    let containerDimenstion = item.getBoundingClientRect();
    let containerWidth = containerDimenstion.width;

    next[i].addEventListener("click", ()=>{
        item.scrollLeft += containerWidth;
    })

    prev[i].addEventListener("click", ()=>{
        item.scrollLeft -= containerWidth;
    })
})


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
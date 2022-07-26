import {navbar,navbarmenu,cross} from './navbar.js'
import footer from "./footer.js"
document.querySelector('#navbar-bottom').innerHTML = navbar()
document.querySelector('#navbarmenu').innerHTML = navbarmenu()
document.getElementById('hamburger').addEventListener('click',cross);

document.querySelector('#footer').innerHTML = footer()

let cartData = JSON.parse(localStorage.getItem("cartdata")) || []
// let cartData = [
//     {image:"https://cdn.shopify.com/s/files/1/0361/8553/8692/products/vit_c_1_ebdbf467-a1d3-454f-a18f-e9e753de65c8_720x.png?v=1657950494",
// description:'Makes Skin Glow | Moisturizes | Even Tones OILY, DRY SKIN TYPE',
// title:"Vitamin C Moisturizer With Kakadu Plum & Vitamin E| Fades Pigmentation & Dark Spots| Oily & Dry Skin| Women and Men",
//  productID:"p12",
//  category:"moisturizer",
//  price:"599",
// stackedPrice:800}
// ]
let data = JSON.parse(localStorage.getItem("description")) 
// let data = {image:"https://cdn.shopify.com/s/files/1/0361/8553/8692/products/vit_c_1_ebdbf467-a1d3-454f-a18f-e9e753de65c8_720x.png?v=1657950494",
// description:'Makes Skin Glow | Moisturizes | Even Tones OILY, DRY SKIN TYPE',
// title:"Vitamin C Moisturizer With Kakadu Plum & Vitamin E",
//  productID:"p1",
//  category:"moisturizer",
//  price:"599",
// stackedPrice:800,
// rating:3}

// destructuring//
let {image,description,title,productID,category,price,stackedprice,rating} = data
// //

let getDoc = (x)=> {
    return document.querySelector(x)
}
let crt = (x)=> {
    return document.createElement(x)
}


let div = getDoc('#main>div')

let div2 = getDoc('#title')
let img = crt('img')
img.src = image
let ttl = crt('h1')
let desc = crt('p')
desc.innerText = description
ttl.innerText = title
let pr = crt('h2')
pr.innerText = `RS: ${price}`
let sPrice = crt('h2')
sPrice.innerText = `RS: ${stackedprice}`
sPrice.style.textDecoration = 'line-through'

div.append(img)
div2.append(ttl,desc,sPrice,pr)


// ///////////////////// inc,dec///////////////////
getDoc('#in').addEventListener('click',inc)
getDoc('#dec').addEventListener('click',dec)
let countd = getDoc("button+span")

function inc (){
        countd.innerText++;
        pr.innerText = `RS: ${price*countd.innerText}` ;
    }

    function dec (){
      if(countd.innerText<2){
            alert("Can Not Go Below 1")
        }
        else{
          countd.innerText--;
        pr.innerText = `RS: ${price*countd.innerText}`
        }
       ;
        
    }

    // /////////////////////////////////ADD TO CART//////////////////
    
    let cart = ()=>{
        let flag = true;
        
        cartData.forEach((el) => {
            if(el.productID == productID) flag = false;
        });
        
        if(flag){
            cartData.push(data)
            localStorage.setItem("cartdata",JSON.stringify(cartData))
            // console.log(cartData)
            window.location.href = 'cart.html'
        }else{
            alert("ALREADY ADDED TO CART")
        }
        
    }
    getDoc('#cart').addEventListener('click',cart)

    // ////////////////////////////////customer review///
    let p = crt('p')
    p.innerText = `Rating:- ${rating}/5`
    getDoc('#review').append(p)
    for(let i=0; i<rating; i++){
        let star = crt('span')
        star.innerText = '★'
        getDoc('#review').append(star)
    }
    for(let i=rating; i<5; i++){
        let star = crt('span')
        star.innerText = '☆'
        getDoc('#review').append(star)
    }
  

  export {getDoc,crt} 

const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();

}
function loadContent(){
  //Remove Food Items  From Cart
  let btnRemove=document.querySelectorAll('#cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });
  
  
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });
  
   //Product Cart
  
  let cartBtns=document.querySelectorAll('.aarthi');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });
 UpdateTotal();
}
  
//removeItem
function removeItem(){
	if(confirm("are you sure to Remove")){
		let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
		console.log(title);
		itemList=itemList.filter(el=>el.title!=title);
		
	this.parentElement.remove();
	loadContent();
}
}
//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];
//addCart
function addCart(){
	let food=this.parentElement;
	let title=(food.querySelector('.name').innerHTML);
     let amount=(food.querySelector('.price').innerHTML);
	 let imgsrc=food.querySelector('.img').src;
	 //console.log(title,amount,imgsrc);
	 
	 let newProduct={title,amount,imgsrc}
	 
	  //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }

	 
	 let newProductElement=createCartProduct(title,amount,imgsrc);
	 let element=document.createElement('div');
	 element.innerHTML=newProductElement;
	 let cartBasket=document.querySelector('.cart-content');
	 cartBasket.append(element);
	 loadContent();
}

function createCartProduct(title,amount,imgsrc){
	
	return`<div class="cart-box">           
          <img src="${imgsrc}" class="cart-img">

		   <div class="detail-box">
              <div class="cart-food-title">${title}</div>
              <div class="price-box">
                <div class="cart-price">${amount}</div>
                 <div class="cart-amt">${amount}</div>
             </div>
              <input type="number" value="1" class="cart-quantity">
            </div>
             <i class="fa fa-trash" id="cart-remove"></i>
          </div>
	`;
}


function UpdateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });
  
totalValue.innerHTML='Rs.'+total;


const cartCount=document.querySelector('#cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;
  

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }

  
  
}



import React,{useEffect, useState} from "react";
import minus from "./minus.png"
import plus from "./plus.png"
import { Link } from "react-router-dom";
function DescriptionCard(props){
    const [quantity,setQuantity] = useState(1);
    const rootUrl = "https://drip-dextra-server.vercel.app";
    // const rootUrl = "http://localhost:27017";
    function handleClick(event){
        if(event.target.className==="increment"){
            var inc = event.target.nextSibling.value;
            inc++;
            setQuantity(inc);
        }else if(event.target.className==="decrement" && quantity!==1){
            var dec = document.querySelector(".decrement").previousSibling.value;
            dec--;
            setQuantity(dec)
        }
    }
    async function handleSubmit(){
        await props.openCart();
        // event.preventDefault();
        const cartItem = {"Title":props.title,"Price":props.price,"quantity":quantity,"imgurl":props.url,"customerDeviceID":props.deviceID,"productid":props.paramVal.id,"producttype":props.paramVal.type};
        const response = await fetch(`${rootUrl}/cart`,{
            method:'POST',
            body:JSON.stringify(cartItem),
            headers:{
                'Content-Type':'application/json'
            }
        })    
        if(response.ok){
            const res = await response.json();
            console.log(res);
            props.CartData(res);
            props.homesetter(res);
        } 
    }



    return <div className="descrip">
            <form className="descrip-container" onSubmit={(event)=>{
                event.preventDefault();
                handleSubmit()}}>
            <img src={props.url} className="descrip-image" alt="product"/>
                <div className="descrip-info">
                    <h2>{props.title}</h2>
                    <p className="price">Rs {Math.floor(props.price)}</p>
                    <div className="quantity-counter">
                        <div>
                            <h4 className="quant">Quantity:</h4>
                        </div>
                        <div className="actual-count">
                            <img src={plus} className="increment" onClick={handleClick} alt="product" />
                            <input id="counter-value" class="value" type="number" value={quantity} readOnly/>
                            <img src={minus} className="decrement" onClick={handleClick} alt="product"  />
                        </div> 
                        
                    </div>
                    <button className="descrip-button add-cart" type="submit" name="cartadder">Add to Cart</button>
                    <Link to="/checkout"><button className="descrip-button buy-now">Buy Now</button></Link>
                </div>
            </form>
        <div className="product-description">
            <h1 className="head-descrip">Description</h1>
            <p className="text-descrip">Make every minute count with the striking new Watch. This head-turning accessory features a one-of-a-kind round dial guaranteed to turn heads. The adjustable pin buckle closure provides a tailored fit.
Unique and stylish round dial design stands out
Adjustable pin buckle closure for a perfect fit
Quartz movement maintains accurate time
Crafted from durable aluminum alloy
Measures 38.5mm diameter and 10mm thick
Slip on this watch and feel like you're in direct contact with art. With its contemporary aesthetic, the Watch injects artful flair into any look. Stay on track and in style with this modern marvel. Let the Watch keep you on time and on trend today.</p>
        </div>
    </div>
}   

export default DescriptionCard;
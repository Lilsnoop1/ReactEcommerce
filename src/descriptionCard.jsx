import React,{ useState} from "react";
import minus from "./minus.webp"
import plus from "./plus.webp"
import { Link } from "react-router-dom";
import axios from "axios";
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
        try{
            const response = await axios.post(`${rootUrl}/cart`,cartItem,{
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                },
            }) 

            const res = response.data;
            console.log(res);
            props.homesetter(res);


        }catch(error){
            console.log(error);
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
            {props.paramVal.type ==="watch"?<p className="text-descrip">
            Introducing our distinguished Men's Watches Collection, an exquisite selection of timepieces designed to reflect sophistication and functionality. Crafted with precision and attention to detail, each watch in our collection showcases a blend of classic design and modern innovation.

Available in a variety of styles, including traditional analog, contemporary digital, and hybrid smartwatches, our collection offers something for every preference and lifestyle. Whether you're seeking a sleek, minimalist watch for everyday wear or a bold, statement piece for formal occasions, our Men's Watches Collection has a timepiece to suit your needs.


</p>:props.paramVal.type==="bracelet"?<p className="text-descrip">
Introducing our diverse collection of Men's Bracelets, a range of stylish and versatile accessories crafted to complement a variety of looks and personal styles. Made from premium materials such as genuine leather, stainless steel, and even natural stones, these bracelets are designed with both durability and aesthetics in mind.

Our selection includes a variety of styles, from classic leather bands to modern and edgy designs. Each piece is meticulously crafted to ensure maximum comfort and a secure fit, making them perfect for everyday wear.
</p>:props.paramVal.type==="ring"?<p className="text-descrip">
Introducing our Men's Rings Collection, an exclusive assortment of handcrafted rings that exude elegance, style, and sophistication. Each ring in our collection is meticulously crafted from the finest materials, including precious metals such as gold, sterling silver, and platinum.

Our rings are available in a variety of styles and designs, from sleek and minimalist bands to intricate and ornate designs. Whether you're looking for a classic wedding band, a statement piece to complement your attire, or a personalized ring to make a special occasion even more memorable, our collection has something for every taste and preference.
</p>:null}

        </div>
    </div>
}   

export default DescriptionCard;
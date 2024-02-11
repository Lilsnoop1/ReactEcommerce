import React from "react";


function ProductCard(props){



    return <div className="singleCard">
        <img src={props.Product.imgurl} className="product-list-image"/>
        <div  className="info-data">
            <p id="beegtitle">{props.Product.Title}</p>
            <p>Rs {Math.floor(props.Product.Price)}</p>
            <button type="submit" onClick={(event)=> {
                event.target.innerText = 'Added';
                setTimeout(()=>{
                    event.target.innerText = 'Add to Cart';
                },2000)
                props.SubmitHandler(event)}} className="addtocart adjust">Add to Cart</button>
        </div>
    </div>
}
export default ProductCard;
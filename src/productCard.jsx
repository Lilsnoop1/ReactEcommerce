import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props){



    return <div className="singleCard">
        <Link to={"/productdescription/"+props.idtoSearch +"/"+props.Product.Type}><img src={props.Product.imgurl} className="product-list-image"/></Link>
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
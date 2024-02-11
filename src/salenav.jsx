import React from "react";
import {Link,NavLink} from "react-router-dom"

function SaleNav(){
    const arr = ["bracelet","watch","ring"];
    var picked = Math.random()*3;
    return (
        <div className="saleNav">
            <p className="sale-text">Opening Sale 35% OFF <Link to={"/products/"+arr[picked]} className="sale-link">SHOP NOW</Link></p>
        </div>
    )
}

export default SaleNav;
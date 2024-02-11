import React,{useState} from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";
 
function Products(props){
    const [display,setDisplay] = useState("none");
    const [kart,setKart] = useState(props.realCart);
    
    let {productName} = useParams();
    function handleClick(){
        setDisplay("flex")
    }
    async function handleSubmit(data,index){
        const cartItem = {"Title":data.Title,"Price":data.Price,"quantity":1,"imgurl":data.imgurl,"customerDeviceID":props.deviceID,"productid":index,"producttype":productName};
        const response = await fetch("/cart",{
            method:'POST',
            body:JSON.stringify(cartItem),
            headers:{
                'Content-Type':'application/json'
            }
        })    
        if(response.ok){
            const res = await response.json();
            console.log(res);
            setKart(res);
            props.homesetter(res);
        } 
    }
    if(productName==="watch"){
        return <div key={kart}>
        <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.WatchData?props.WatchData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):null}
            </div>
        </div>
    </div>;
    }else if(productName==="ring"){
        return <div>
        <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.RingData?props.RingData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):null}
            </div>
        </div>
    </div>;
    }else{
        return <div>
        <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.BraceletData?props.BraceletData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):null}
            </div>
        </div>
    </div>;
    }
}

export default Products;
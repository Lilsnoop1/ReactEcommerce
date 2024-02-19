import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./productCard";
import axios from "axios";
 
function Products(props){
    const rootUrl = "https://drip-dextra-server.vercel.app";
    // const rootUrl = "http://localhost:27017";
    
    let {productName} = useParams();
    async function handleSubmit(data,index){
        try{
            const cartItem = {"Title":data.Title,"Price":data.Price,"quantity":1,"imgurl":data.imgurl,"customerDeviceID":props.deviceID,"productid":index,"producttype":productName};
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
    if(productName==="watch"){
        return <div key={props.kart}>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.WatchData?props.WatchData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} idtoSearch={index} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):<p>Loading...</p>}
            </div>
        </div>
    </div>;
    }else if(productName==="ring"){
        return <div key={props.kart}>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.RingData?props.RingData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} idtoSearch={index} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):<p>Loading...</p>}
            </div>
        </div>
    </div>;
    }else{
        return <div key={props.kart}>
        <div className="product-list-div">
            <h2>Products (60)</h2>
            <div className="product-list">
                {props.BraceletData?props.BraceletData.map((singleProduct,index)=>{
                   return <ProductCard Product={singleProduct} idtoSearch={index} SubmitHandler={(event)=>{event.preventDefault();handleSubmit(singleProduct,index)}} /> 
                }):<p>Loading...</p>}
            </div>
        </div>
    </div>;
    }
}

export default Products;
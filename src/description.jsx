import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar.jsx";
import DescriptionCard from "./descriptionCard.jsx";

function Description(props){
    const {productid,producttype} = useParams();
    const watchClicked = props.WatchData[productid];
    const braceletClicked = props.BraceletData[productid];
    const ringClicked = props.RingData[productid];

    function handleClick(){
        // console.log("lalalal");
        // alert("lalalal")
        props.displayConnect("flex");
    }
    if (producttype==="watch"){
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        // console.log({"kartChangesInDescription":kart});
        return <div>
            <DescriptionCard url={watchClicked.imgurl} price={watchClicked.Price} title={watchClicked.Title} 
            id={watchClicked.id} openCart={handleClick} homesetter={props.setHomeKart} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}  
            />
        </div>
    }else if(producttype==="bracelet"){
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        return <div>
            <DescriptionCard url={braceletClicked.imgurl} price={braceletClicked.Price} 
            title={braceletClicked.Title} id={braceletClicked.id} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}
            openCart={handleClick} homesetter={props.setHomeKart} />
        </div>
    }else{
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        return <div>
            <DescriptionCard url={ringClicked.imgurl} price={ringClicked.Price} 
            title={ringClicked.Title} id={ringClicked.id} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}
            openCart={handleClick} homesetter={props.setHomeKart} />
        </div>
    }
}

export default Description;
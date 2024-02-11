import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar.jsx";
import DescriptionCard from "./descriptionCard.jsx";

function Description(props){
    const {productid,producttype} = useParams();
    const watchClicked = props.WatchData[productid];
    const braceletClicked = props.BraceletData[productid];
    const ringClicked = props.RingData[productid];
    const [display,setDisplay] = useState("none");
    const [kart,setKart] = useState(props.realCart);

    console.log({"kartatApp":props.realCart});
    function handleClick(){
        // console.log("lalalal");
        // alert("lalalal")
        setDisplay("flex");
    }
    if (producttype==="watch"){
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        // console.log({"kartChangesInDescription":kart});
        return <div key={kart}>
            <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
            <DescriptionCard url={watchClicked.imgurl} price={watchClicked.Price} title={watchClicked.Title} 
            id={watchClicked.id} openCart={handleClick} CartData={setKart} homesetter={props.setHomeKart} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}  
            />
        </div>
    }else if(producttype==="bracelet"){
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        return <div key={kart}>
            <Navbar displayProperty={display} displaySetter={setDisplay}  finalCart={kart} newState={setKart} setcartem={props.setHomeKart}/>
            <DescriptionCard url={braceletClicked.imgurl} price={braceletClicked.Price} 
            title={braceletClicked.Title} id={braceletClicked.id} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}
            openCart={handleClick} CartData={setKart} homesetter={props.setHomeKart} />
        </div>
    }else{
        // if(kart){
        //     props.ConnectCart(kart)
        // }
        return <div key={kart}>
            <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart} newState={setKart} setcartem={props.setHomeKart}/>
            <DescriptionCard url={ringClicked.imgurl} price={ringClicked.Price} 
            title={ringClicked.Title} id={ringClicked.id} deviceID={props.DeviceID} paramVal={{id:productid,type:producttype}}
            openCart={handleClick} CartData={setKart} homesetter={props.setHomeKart} />
        </div>
    }
}

export default Description;
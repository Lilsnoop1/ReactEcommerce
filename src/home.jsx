import {Link,NavLink,Route,Outlet} from "react-router-dom"
import React,{useState,useEffect} from "react"
import SaleNav from "./salenav.jsx"
import Navbar from "./navbar.jsx"
import Main from "./mainSection.jsx"
import {BestSell} from "./bestSeller.jsx"

function Home(props){
    const [display,setDisplay] = useState("none");
    const [state,setState] = useState(props.Cart);
    console.log(state);

    return <div key={state}>
        <SaleNav/>
        <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={state} newState={setState} setcartem={props.setproductcart}/>
        <Outlet/>
        <Main/>
        {props.WatchData?<BestSell Watch={props.WatchData} Ring={props.RingData} Bracelet={props.BraceletData} displaySet={setDisplay}/>:null}

    </div>
}
export default Home;
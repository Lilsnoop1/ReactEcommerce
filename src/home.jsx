import {Link,NavLink,Route,Outlet} from "react-router-dom"
import React,{useState,useEffect} from "react"
import SaleNav from "./salenav.jsx"
import Navbar from "./navbar.jsx"
import Main from "./mainSection.jsx"
import {BestSell} from "./bestSeller.jsx"

function Home(props){
    return <div>
        <SaleNav/>
        <Outlet/>
        <Main/>
        {props.WatchData?<BestSell Watch={props.WatchData} Ring={props.RingData} Bracelet={props.BraceletData}/>:null}

    </div>
}
export default Home;
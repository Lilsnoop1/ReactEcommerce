import React,{useEffect,useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Products from "./products.jsx";
import Home from "./home.jsx";
import Description from "./description.jsx";
import {v4 as uuidv4} from 'uuid';
import Checkout from "./checkout.js";
import Footer from "./footer.jsx";
import Contact from "./contact.jsx";
import Navbar from "./navbar.jsx";
import axios from "axios"
import getCookie from "./cookiegetter.js";
// http://localhost:27017

function App(){
    // const rootUrl = "http://localhost:27017";
    const rootUrl = "https://drip-dextra-server.vercel.app";
    useEffect(()=>{
        const responseid = async()=>{
            var device = getCookie("device");
            if(device ===null || device===undefined || device===''){
                device = uuidv4();
            }
            
            const idobject = {
                "deviceId":device
            }
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*36000;
            now.setTime(expireTime);
            document.cookie = "device="+device+";expires="+now.toUTCString()+";path=/";
           
            try{
                await axios.post(`${rootUrl}/xyz`, idobject, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    },
                })
            }catch(errors){
                console.log(errors.message);
            }
                
        }
        responseid();
    },[])
    const [ringData,setRingData] = useState(null);
    const [braceletData,setBraceletData] = useState(null);
    const [watchData,setWatchData] = useState(null);
    const [cart,setCart] = useState(null);
    const [display,setDisplay] = useState("none");

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const responseRing = await axios.get(`${rootUrl}/rings`);
                const responseBracelet = await axios.get(`${rootUrl}/bracelets`);
                const responseWatches = await axios.get(`${rootUrl}/watches`);
                const responseCart = await axios.get(`${rootUrl}/carter`);
                

                setRingData(responseRing.data);
                setBraceletData(responseBracelet.data);
                setWatchData(responseWatches.data);
                setCart(responseCart.data);
                
            }catch(error){
                console.log(error);
            }
        }
        fetchData();

    },[])

    return <BrowserRouter>
    <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={cart} newState={setCart}/>
        <Routes>
            <Route path="/" element={cart?<Home WatchData={watchData} BraceletData={braceletData} RingData={ringData} />:<p>loading</p>}/>
            <Route path="/products/:productName" element = {cart?<Products WatchData={watchData} 
            BraceletData={braceletData} RingData={ringData} homesetter={setCart} kart={cart} />:<h1>Loading....Please Wait</h1>}/>
            <Route path="/productdescription/:productid/:producttype" element={watchData?<Description 
            WatchData={watchData} 
            BraceletData={braceletData} 
            RingData={ringData}  
            realCart = {cart}
            setHomeKart={setCart}
            displayConnect={setDisplay}
            />:<p>yayy</p>}/>
            <Route path="/checkout" element={cart?<Checkout kart={cart}/>:<h1>Loading....Please Wait</h1>}/>
            <Route path="/contact" element={cart?<Contact />:null}/>
        </Routes>
        {cart?<Footer/>:null}

    </BrowserRouter>
}

export default App;
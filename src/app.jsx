import React,{useEffect,useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Products from "./products.jsx";
import Home from "./home.jsx";
import Description from "./description.jsx";
import {v4 as uuidv4} from 'uuid';
import Checkout from "./checkout.js";
import Footer from "./footer.jsx";
import Contact from "./contact.jsx";

function App(){
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }

      let device = getCookie("device");

    if(device ===null || device===undefined || device===''){
        device = uuidv4();
    }
    document.cookie = "device="+device+";domain=;path=/";
    const [ringData,setRingData] = useState(null);
    const [braceletData,setBraceletData] = useState(null);
    const [watchData,setWatchData] = useState(null);
    const [cart,setCart] = useState(null);
    const idobject = {
        "deviceId":device
    }

    useEffect(()=>{
        const responseid = async()=>{
            await fetch("/xyz",{
                method:"POST",
                body:JSON.stringify(idobject),
                headers:{
                    'Content-Type':'application/json'
                }
            });
        }
        responseid();
    },[])


    useEffect(()=>{
        const fetchData = async ()=>{
            var counter = 0;
            const responseRing = await fetch("/rings");
            const ringjson = await responseRing.json();

            const responseBracelet = await fetch("/bracelets");
            const braceletjson = await responseBracelet.json();

            const responseWatches = await fetch("/watches");
            const watchjson = await responseWatches.json();

            const responseCart = await fetch("/carter");
            const cartjson = await responseCart.json();


            if(responseWatches.ok){
                setRingData(ringjson);
                setBraceletData(braceletjson);
                setWatchData(watchjson);
                setCart(cartjson);
            }
        }
        fetchData();

    },[])

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={cart?<Home WatchData={watchData} BraceletData={braceletData} RingData={ringData}
            Cart={cart} setproductcart={setCart} />:<p>loading</p>}/>
            <Route path="/products/:productName" element = {cart?<Products setHomeKart={setCart} realCart = {cart} WatchData={watchData} 
            BraceletData={braceletData} RingData={ringData} homesetter={setCart} deviceID={device} />:<h1>Loading....Please Wait</h1>}/>
            <Route path="/productdescription/:productid/:producttype" element={watchData?<Description 
            WatchData={watchData} 
            BraceletData={braceletData} 
            RingData={ringData}  
            realCart = {cart}
            setHomeKart={setCart}
            DeviceID={device}
            />:<p>yayy</p>}/>
            <Route path="/checkout" element={cart?<Checkout setHomeKart={setCart} realCart = {cart} />:<h1>Loading....Please Wait</h1>}/>
            <Route path="/contact" element={cart?<Contact setHomeKart={setCart} realCart = {cart}/>:null}/>
        </Routes>
        {cart?<Footer/>:null}

    </BrowserRouter>
}

export default App;
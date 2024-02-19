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
// http://localhost:27017

function App(){
    // const rootUrl = "http://localhost:27017";
    const rootUrl = "https://drip-dextra-server.vercel.app";
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

      var device = getCookie("device");
    if(device ===null || device===undefined || device===''){
        device = uuidv4();
    }

      const idobject = {
        "deviceId":device
    }
    document.cookie = "device="+device+";domain=;path=/";
    useEffect(()=>{
        const responseid = async()=>{
            // await fetch(`${rootUrl}/xyz`,{
            //     method:'POST',
            //     body:JSON.stringify(idobject),
            //     headers:{
            //         'Content-Type':'application/json'
            //     }
            // });
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
            // const responseRing = await fetch(`${rootUrl}/rings`);
            // const ringjson = await responseRing.json();

            // const responseBracelet = await fetch(`${rootUrl}/bracelets`);
            // const braceletjson = await responseBracelet.json();

            // const responseWatches = await fetch(`${rootUrl}/watches`);
            // const watchjson = await responseWatches.json();

            // const responseCart = await fetch(`${rootUrl}/carter`);
            // const cartjson = await responseCart.json();


            // if(responseWatches.ok){
            //     setRingData(ringjson);
            //     setBraceletData(braceletjson);
            //     setWatchData(watchjson);
            //     setCart(cartjson);
            // }
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
            BraceletData={braceletData} RingData={ringData} homesetter={setCart} kart={cart} deviceID={device} />:<h1>Loading....Please Wait</h1>}/>
            <Route path="/productdescription/:productid/:producttype" element={watchData?<Description 
            WatchData={watchData} 
            BraceletData={braceletData} 
            RingData={ringData}  
            realCart = {cart}
            setHomeKart={setCart}
            displayConnect={setDisplay}
            DeviceID={device}
            />:<p>yayy</p>}/>
            <Route path="/checkout" element={cart?<Checkout kart={cart}/>:<h1>Loading....Please Wait</h1>}/>
            <Route path="/contact" element={cart?<Contact />:null}/>
        </Routes>
        {cart?<Footer/>:null}

    </BrowserRouter>
}

export default App;
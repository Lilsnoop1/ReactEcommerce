import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Icon from "./shopping-cart.webp";
import Menu from "./menu.webp"
import Dropdown from "./down-arrow.webp"
import closeIcon from "./close.webp"
import plus from "./icons8-plus-50.webp"
import minus from "./icons8-subtract-50.webp"
import bin from "./icons8-bin-24.webp"
import axios from "axios";
function Navbar(props){
    var [dropdown,setDropdown] = useState("none");
    var [burger,setBurger] = useState("none")
    var [menu,setMenu]=useState("none");
    const [cartlistamount,setcartamount] = useState(0);
    const [state,setState] = useState(props.finalCart);
    // const [cartCount,setCartcount]  = useState(props.cartVal);
    const rootUrl = "https://drip-dextra-server.vercel.app";
    // const rootUrl = "http://localhost:27017";

    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const cartamount = await axios.get(`${rootUrl}/cartamount`);
                const responseasCart = cartamount.data;
                setcartamount(responseasCart.cartvalues);
            }
            catch(error){
                console.log(error);
            }
          
        }
        fetchData()
    },[state]);

    const menuStyle ={
        "display":menu
    }
    const dropdownStyle = {
        "display":dropdown
    }
    const burgerStyle={
        "display":burger
    }
    function toggle(){
        if(props.displayProperty==="none"){
            props.displaySetter("flex");
        }else{
            props.displaySetter("none");
        }
        
    }
    function Dropdowntoggle(){
        if(dropdown==="none"){
            setDropdown("flex"); 
        }else{
            setDropdown("none");
        }
    }
    function burgerToggle(){
        if(burger==="none"){
            setBurger("flex"); 
        }else{
            setBurger("none");
        }
    }
  function loadMenu(){
        if(menu==="none"){
            setMenu("flex");
        }else{
            setMenu("none");
        }
    }

    function checkout(event){
        event.preventDefault();
    }
    function close(){
        props.displaySetter("none");
    }
    const [valArr,setValArr] = useState([]);
    useEffect(()=>{
        if(state){
            setValArr(state.map((cartVal)=>{
                return cartVal.quantity
            }))
        }

    },[state])

    useEffect(()=>{
        setState(props.finalCart);
    },[props.finalCart])

    function changeVal(event){
        event.preventDefault();
        const name = event.target.className;
        const idtoChange = parseInt(event.target.id);
        var currentVal = event.target.value;
        if(name==="increment-navbar"){
            currentVal++;
            setValArr(prevValue => prevValue.map((val, i) => i === idtoChange ? currentVal : val));
        }else if(name==="decrement-navbar" && currentVal!==1){
            currentVal--;
            setValArr(prevValue => prevValue.map((val, i) => i === idtoChange ? currentVal : val));
        }
    }
    async function saveData(index,header){
        const dataToSave = {
            Header: header,
            quantity: valArr[index]
        }
        
        try{
            const dataSaver = await axios.post(`${rootUrl}/update`,dataToSave,{
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                },
            });
            const responseDataSaver = dataSaver.data;
            setValArr(prevValue => prevValue.map((val, i) => i === index ? responseDataSaver.quantity : val));
            setState(prevCart =>prevCart.map((cartVal)=>(cartVal.Title===responseDataSaver[0].Title)?responseDataSaver[0]:cartVal));
            props.newState(prevCart =>prevCart.map((cartVal)=>(cartVal.Title===responseDataSaver[0].Title)?responseDataSaver[0]:cartVal));
        
        }catch(error){
            console.log(error);
        }
    }
    async function deleteFromList(header,idtoDel,index){
        const dataToDelete = {
            Header: header,
            id: idtoDel
        }
        
        try{
                const datadeleter = await axios.post(`${rootUrl}/deletefromcart`,dataToDelete,{
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    },
                });
                const responseDatadeleter =  datadeleter.data;
                setValArr(prevValue => prevValue.filter((val, i) => {return i!==index}));
                // console.log(responseDatadeleter);
                // console.log(valArr);
                setState(responseDatadeleter);
                props.newState(responseDatadeleter);
        }catch(error){
            console.log(error);
        }
    }

//dont forget to parse
    return (
        <div key={props.finalCart}>
            <div className="nasbar">
                <div className="burger">
                    <img className="burger-icon" onClick={loadMenu} src={Menu} alt="burgericon"/>
                </div>
                <div className="nasbar-brand">
                    <Link to="/" className="nasbar-brand-text">DripDextra</Link>
                </div>
                <div className="nas-links">
                    <Link className="linke" to="/">Home</Link>
                    <span className="linke dropdown" onClick={Dropdowntoggle}>Products <img className="dropdowne-icon" src={Dropdown} alt="dropdownicon"/></span>
                    <Link className="linke" to="/contact">Contact Us</Link>
                </div>
                <div className="cart-icon">
                    <img onClick={toggle} src={Icon} className="cartimg" alt="Shopping-cart"/>
                    <span className="cart-amount">{cartlistamount}</span>
                </div>
            </div>
            <div className="dropdowne-menu" style={dropdownStyle}>
                <div style={{marginLeft:"15vh",gap:"8vh",display:"flex"}}>
                    <Link to="/products/ring" className="linke">Rings </Link>
                    <Link to="/products/bracelet" className="linke">Bracelets </Link>
                    <Link to="/products/watch" className="linke">Watches </Link>
                </div>
            </div>
            <div className="menu" style={menuStyle}>
                <div className="menu-links">
                    <Link className="linke" onClick={loadMenu} to="/">Home</Link>
                    <span className="linke dropdowne" onClick={burgerToggle}>Products <img className="dropdowne-icon" src={Dropdown} alt="dropdownburger"/></span>
                    <div className="burger-dropdown" style={burgerStyle}>
                        <Link to="/products/ring" onClick={loadMenu} className="linke">Rings </Link>
                        <Link to="/products/bracelet" onClick={loadMenu} className="linke">Bracelets </Link>
                        <Link to="/products/watch" onClick={loadMenu} className="linke">Watches </Link>
                    </div>
                    <Link className="linke" onClick={loadMenu} to="/contact">Contact Us</Link>
                    
                </div>
            </div>
            <div className="cart-sidebar" style={{display:props.displayProperty}}>
            <span onClick={close} className="span-close"><img src={closeIcon} className="close-button" alt="close-icon"/></span>
                <div className="cart-inner">
                <form onSubmit={checkout} className="cart-form">
                    {props.finalCart?props.finalCart.map((singleKart,index)=>{
                        const {productid,producttype}=singleKart
                            return <div className="cart-component" key={props.finalCart}>
                            <Link className="cart-image-link" to={"http://localhost:3000/productdescription/"+productid+"/"+producttype}><img src={singleKart.imgurl} alt="cartdata" className="cart-image"/></Link>
                            <div className="quantit-div">
                                <p className="cart-info">{singleKart.Title}</p>
                                <p className="cart-info price-info">Price: Rs.{Math.floor(singleKart.Price * singleKart.quantity)}</p>
                                <div className="quantits">
                                    <div className="inner-quantit">
                                    <div className="inner-but">
                                    <input type="image" src={minus} id={index} onClick={changeVal} className="decrement-navbar" alt="changeicons" value={valArr[index]}/>
                                        <input type="number" className="value nav-val" readOnly value={valArr[index]?valArr[index]:singleKart.quantity}/>
                                        <input type="image" src={plus} id={index} onClick={changeVal} className="increment-navbar" alt="changeicons" value={valArr[index]}/>
                                    </div>
                                    </div>
                                    <div className="bin-save">
                                    <button onClick={()=>saveData(index,singleKart.Title)} className="save-button" type="submit">Save</button>
                                    <input onClick={()=>deleteFromList(singleKart.Title,singleKart.id,index)} type="image" className="bin-image" src={bin} alt="bin"/>
                                    </div>
                                </div>
                            </div>     
                        </div>
                    }):<p>yooo</p>}
                    {props.finalCart?props.finalCart[0]?<Link to="/checkout"><button className="navbar-checkout" onClick={toggle}> Checkout</button></Link>:<h1 className="empty-warn">Cart is Empty</h1>:null}
                </form>
                </div>
            </div>
        </div>
    );
}
export default Navbar;
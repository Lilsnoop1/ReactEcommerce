import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Icon from "./shopping-cart.png";
import Menu from "./menu.png"
import Dropdown from "./down-arrow.png"
import closeIcon from "./close.png"
import plus from "./icons8-plus-50.png"
import minus from "./icons8-subtract-50.png"
import bin from "./icons8-bin-24.png"
function Navbar(props){
    var [dropdown,setDropdown] = useState("none");
    var [burger,setBurger] = useState("none")
    var [menu,setMenu]=useState("none");
    const [cartlistamount,setcartamount] = useState(0);
    const [state,setState] = useState(props.finalCart);
    // const [cartCount,setCartcount]  = useState(props.cartVal);
    const rootUrl = "http://localhost:27017";

    useEffect(()=>{
        const fetchData= async()=>{
            const cartamount = await fetch(`${rootUrl}/cartamount`);
            const responseasCart = await cartamount.json()

            if(cartamount.ok){
                setcartamount(responseasCart.cartvalues);
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
        }else if(name==="decrement-navbar" && currentVal!=1){
            currentVal--;
            setValArr(prevValue => prevValue.map((val, i) => i === idtoChange ? currentVal : val));
        }
    }
    async function saveData(index,header){
        const dataToSave = {
            Header: header,
            quantity: valArr[index]
        }
        
        const dataSaver = await fetch(`${rootUrl}/update`,{
            method:"POST",
            body:JSON.stringify(dataToSave),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(dataSaver.ok){
            const responseDataSaver = await dataSaver.json();
            setValArr(prevValue => prevValue.map((val, i) => i === index ? responseDataSaver.quantity : val));
            console.log(responseDataSaver);
            console.log(valArr);
            setState(prevCart =>prevCart.map((cartVal)=>(cartVal.Title===responseDataSaver[0].Title)?responseDataSaver[0]:cartVal));
            props.newState(prevCart =>prevCart.map((cartVal)=>(cartVal.Title===responseDataSaver[0].Title)?responseDataSaver[0]:cartVal));
            if(props.setcartem){
                props.setcartem(prevCart =>prevCart.map((cartVal)=>(cartVal.Title===responseDataSaver[0].Title)?responseDataSaver[0]:cartVal));
            }
        }
    }
    async function deleteFromList(header,idtoDel,index){
        const dataToDelete = {
            Header: header,
            id: idtoDel
        }
        
        const datadeleter = await fetch(`${rootUrl}/deletefromcart`,{
            method:"POST",
            body:JSON.stringify(dataToDelete),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(datadeleter.ok){
            const responseDatadeleter = await datadeleter.json();
            setValArr(prevValue => prevValue.filter((val, i) => {return i!==index}));
            // console.log(responseDatadeleter);
            // console.log(valArr);
            setState(responseDatadeleter);
            props.newState(responseDatadeleter);
            if(props.setcartem){
                props.setcartem(responseDatadeleter)
            }

        }
    }

//dont forget to parse
    return (
        <div>
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
                    <Link className="linke" to="/">Home</Link>
                    <span className="linke dropdowne" onClick={burgerToggle}>Products <img className="dropdowne-icon" src={Dropdown} alt="dropdownburger"/></span>
                    <div className="burger-dropdown" style={burgerStyle}>
                        <Link to="/products/ring" className="linke">Rings </Link>
                        <Link to="/products/bracelet" className="linke">Bracelets </Link>
                        <Link to="/products/watch" className="linke">Watches </Link>
                    </div>
                    <Link className="linke" to="/contact">Contact Us</Link>
                    
                </div>
            </div>
            <div className="cart-sidebar" style={{display:props.displayProperty}}>
            <span onClick={close} className="span-close"><img src={closeIcon} className="close-button" alt="close-icon"/></span>
                <div className="cart-inner">
                <form onSubmit={checkout} className="cart-form">
                    {state?state.map((singleKart,index)=>{
                        const {productid,producttype}=singleKart
                            return <div className="cart-component">
                            <Link className="cart-image-link" to={"http://localhost:3000/productdescription/"+productid+"/"+producttype}><img src={singleKart.imgurl} alt="cartdata" className="cart-image"/></Link>
                            <div className="quantit-div">
                                <p className="cart-info">{singleKart.Title}</p>
                                <p className="cart-info price-info">Price: Rs.{Math.floor(singleKart.Price * singleKart.quantity)}</p>
                                <div className="quantits">
                                    <input type="image" src={minus} id={index} onClick={changeVal} className="decrement-navbar" alt="changeicons" value={valArr[index]}/>
                                    <input type="number" className="value nav-val" readOnly value={valArr[index]?valArr[index]:singleKart.quantity}/>
                                    <input type="image" src={plus} id={index} onClick={changeVal} className="increment-navbar" alt="changeicons" value={valArr[index]}/>
                                    <button onClick={()=>saveData(index,singleKart.Title)} className="save-button" type="submit">Save</button>
                                    <input onClick={()=>deleteFromList(singleKart.Title,singleKart.id,index)} type="image" className="bin-image" src={bin}/>
                                </div>
                            </div>     
                        </div>
                    }):null}
                    {state[0]?<Link to="/checkout"><button className="navbar-checkout"> Checkout</button></Link>:<h1>Cart is Empty</h1>}
                </form>
                </div>
            </div>
        </div>
    );
}
export default Navbar;
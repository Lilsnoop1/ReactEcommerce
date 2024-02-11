import React,{useState} from "react";
import Navbar from "./navbar";

function Checkout(props){
    const [display,setDisplay] = useState("none");
    const [kart,setKart] = useState(props.realCart);
    const [res,setRes] = useState(null);
    const [validEmail,setValidEmail] = useState(false);
    const [validPhone,setvalidPhone] = useState(false);
    const [validationText,setValidationText] = useState("none");
    var total = 0;

    function handleSubmit(event){
        event.preventDefault();
        setValidationText("block")
        const objectToSave = {
            itemOrdered:[...kart],
            email:event.target[0].value,
            contact:event.target[1].value,
            firstName:event.target[2].value,
            lastName:event.target[3].value,
            address:event.target[4].value
        }
        const fetchData = async ()=>{
            const dataposter = await fetch("/submit",{
                method:"POST",
                body:JSON.stringify(objectToSave),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(dataposter.ok){
                const response = await dataposter.json();
                setRes(response);
            }
        }
        fetchData();

        const checkData = ()=>{
            if(res==="success"){
                setValidEmail(true)
            }else{
                setValidEmail(false)
            }
            if(event.target[1].value.length != 11){
                setvalidPhone(false)
            }else{
                setvalidPhone(true)
            }

        }
        checkData();



        event.target[0].value = null;
        event.target[1].value=null;
        event.target[2].value=null;
        event.target[3].value=null;
        event.target[4].value=null;


    }
    return <div>
        <div className="checkout-nav">
            <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
            <div className="product-display">
                <h1 className="header-checkout">Your Order</h1>
                <div className="inner-check">
                <div className="checkemorders">
                {kart?kart.map((eachKart)=>{
                        return<div className="singleProduct">
                            <img src={eachKart.imgurl} className="checkout-image"/>
                            <div className="checkout-info">
                                <h6>{eachKart.Title}</h6>
                                <h5>Rs {eachKart.Price}</h5>
                                <h6>Quantity: {eachKart.quantity}</h6>
                                {total = total + (eachKart.Price*eachKart.quantity)}
                            </div>
                        </div>
                    }):null}
                    <div className="total"> 
                    <p>Total</p>
                    <p>Rs {total}</p>
                    </div>
                </div>
                    <div className="order-Review">
                        <form className="checkout-form" onSubmit={handleSubmit}>
                            <h2 className="order-header">Customer Information</h2>
                            <div className="customer-details">
                            <h3 className="contact-head">Contact Details</h3>
                                <div className="email-contact">
                                    <div className="label-input">
                                        <label>Email</label>
                                        <input type="text" className="input-to-fix" placeholder="example@domain.com"/>
                                        <p className="email-check" style={{display:validationText}}>{validEmail?null:"* Please Enter A Valid Email"}</p>
                                    </div>
                                    <div className="label-input">
                                        <label>Contact Number</label>
                                        <input type="number" placeholder="XXXXXXXXXXX"  className="value input-to-fix"/>
                                        <p className="email-check" style={{display:validationText}}>{validPhone?null:"* Please Enter A Valid Phone Number"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-details next">
                            <h3 className="contact-head">Customer Details</h3>
                                <div className="customer-contact">
                                    <div className="email-contact">
                                        <div className="label-input">
                                            <label>First Name</label>
                                            <input type="text" className="input-to-fix" placeholder="John"/>
                                        </div>
                                        <div className="label-input">
                                            <label>Last Name</label>
                                            <input type="text" className="input-to-fix" placeholder="Doe"/>
                                        </div>
                                    </div>
                                    <div className="label-input">
                                        <label>Address</label>
                                        <textarea name="address" className="address-area"/>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-details next">
                            <h3 className="contact-head">Payment Method</h3>
                                <div className="email-contact">
                                    <div className="check-input">
                                    <label>Cash On Delivery</label>
                                        <input type="checkbox" className="input-checkbox"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="submit-form">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <p>{res?res:null}</p>
    </div>
}

export default Checkout
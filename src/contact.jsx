import React,{useState} from "react";
import Navbar from "./navbar";

function Contact(props){
    const [display,setDisplay] = useState("none");
    const [kart,setKart] = useState(props.realCart);
    return <div >
    <Navbar displayProperty={display} displaySetter={setDisplay} finalCart={kart}  newState={setKart}  setcartem={props.setHomeKart}/>
    <div className="beeg-contact">
    <h2 className="header-checkout" id="contact">Contact Page</h2>
    </div>
        <div className="contactem-div">
            <form className="form-data">
            <h1>Tell Us Something !</h1>
                <input type="text" className="contact-input" placeholder="Title..."/>
                <input type="text" className="contact-input" placeholder="Text..."/>
                <button type="submit" className="submit-contact">Submit</button>
            </form>
        </div>
    </div>
}

export default Contact;
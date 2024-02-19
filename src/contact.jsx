import React from "react";

function Contact(props){
    return <div >
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
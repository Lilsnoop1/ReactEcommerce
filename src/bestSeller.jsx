import React from "react";
import Slider from "react-slick";
import "./myslick.css";
import "./myslick-theme.css";
import { Link } from "react-router-dom";

function Card(props){
    var saledPrice = parseInt(props.price)+(props.price * 135/100);
    var fitVal=''
    if(props.title.length>15){
        fitVal = props.title.substring(0,16);
    }
    const Id= props.id;
    const Type = props.type;

    function handleSubmit(event){
        event.preventDefault();
    }
    return <div>
    <Link to={"/productdescription/"+Id+"/"+Type} className="description-link">
        <form onSubmit={handleSubmit}>
            <img className="imagey" src={props.url} alt="watch"/>
            <p className="info">{fitVal}</p>
            <p className="info">Rs.{Math.floor(props.price)} <span className="sale-price">{Math.floor(saledPrice)}</span></p>
            <button type="submit" className="addtocart">Add to Cart</button>
        </form>
    </Link>
</div>
}

function BestSell(props){
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      }
    return(

        <div className="myContainer">
        <div className="title-div">
        <h2 className="bestsell-title"> Best Sellers </h2>
        </div>
        <Slider {...settings}>
            {props.Watch.map((singleWatch,indexofWatch)=>{
                for(let x=56;x<60;x++){
                    if(indexofWatch===x){
                        return <Card url={singleWatch.imgurl} price={singleWatch.Price} title={singleWatch.Title} type="watch"
                            id={indexofWatch}
                        />
                    }
                }
            })}
            {props.Ring.map((singleRing,indexofRing)=>{
                for(let x=56;x<60;x++){
                    if(indexofRing===x){
                        return <Card url={singleRing.imgurl} price={singleRing.Price} title={singleRing.Title} type="ring"
                            id={indexofRing}
                        />
                    }
                }
            })}
            {props.Bracelet.map((singleBracelet,indexofBracelet)=>{
                for(let x=56;x<60;x++){
                    if(indexofBracelet===x){
                        return <Card url={singleBracelet.imgurl} 
                        price={singleBracelet.Price} 
                        title={singleBracelet.Title} 
                        type="bracelet"
                        id={indexofBracelet}        
                        />
                    }
                }
            })}

        </Slider>
      </div>
    )
    
}

export {BestSell,Card};
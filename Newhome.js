import { useEffect, useState } from "react";
import './style.css';

// Importing Image
import React from 'react';
import './style.css';
import logo from './Image/logo1.svg';
import bus from './Image/bus.png';
import bus2 from './Image/20757-7-buses-motor-coach-industries.png';
import img1 from './Image/img_212238-removebg-preview.png';
import img2 from './Image/20757-7-buses-motor-coach-industries.png';
import img3 from './Image/Payment-PNG-Transparent.png';
import show1 from './Image/Showbus1.jpg'
class Promotion {
    proname1; proname2; proname3;
    protype1; protype2; protype3;
    procon1; procon2; procon3;

    constructor(promolist) {
        this.setPromotionInfo(promolist);
        this.showTestInfo();
    }

    setPromotionInfo(promolist) {
        this.proname1 = promolist[0]?.promotion_name;
        this.proname2 = promolist[1]?.promotion_name;
        this.proname3 = promolist[2]?.promotion_name;
        this.protype1 = promolist[0]?.promotion_type;
        this.protype2 = promolist[1]?.promotion_type;
        this.protype3 = promolist[2]?.promotion_type;
        this.procon1 = promolist[0]?.promotion_con;
        this.procon2 = promolist[1]?.promotion_con;
        this.procon3 = promolist[2]?.promotion_con;
    }

    showTestInfo() {
        console.log(this.procon1, this.protype1, this.proname1,);
    }
}

export default function Newhome() {
    const [promolist, setpromolist] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3333/getPromotion');
                const data = await response.json();
                console.log(data);
                setpromolist(data);
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
            }
        }

        fetchData();
    }, []);
        // search
    // const handleNext = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.target.form);
    //     const jsonData = {
    //       startpoint: data.get('start'),
    //       endpoint: data.get('end'),
          
    //     }
        
    //     fetch('http://localhost:3333/selectpoint',{
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(jsonData),
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //       if (data.status === 'ok'){
    //           localStorage.setItem('status','1')
    //           window.location = './reserve'//go reserve idoit dont go a
    //       }
          
    //     })
    //     .catch((error) =>{
    //         alert(error)
    //         console.error('Error:', error);
    //     });
    //   };
    
    
        let promoclass
    if (promolist.length > 0) {
        // Instantiate the Promotion class once promolist is populated.
        promoclass = new Promotion(promolist);
    }
    else{
        console.log("no data")
    }


    return (
        
        <div>
            <div id="nav-bar">
                <a href="newhome"><img src={logo} alt="logoja" /></a>
                <ul className="bar">
                    <li><a href="newhome">Home</a></li>
                    <li><a href="#totou">About</a></li>
                    <li><a href="reserve">Reserve</a></li>
                    <li><a href="history">History</a></li>
                    <li><a href="login"><i className="fa-solid fa-right-to-bracket"></i> Login</a></li>
                </ul>
            </div>
            
            <div id="middle">
                <img src={bus} alt="bus" />
                <img src={bus2} alt="bus alt" />
            </div>
            
            <div id="totou">
                <div className="allcard">
                    {/* <div className="card">
                        <img src={img1} alt="" />
                        <h3>เลือกจุดรับและเลือกปลายทางที่รถจะไปส่ง</h3>
                    </div> */}
                    <a href="reserve">
                    <div className="card">
                        <img src={img2} alt="" />
                        <h3>เลือกรถที่คุณต้องการ</h3>
                    </div>
                    </a>
                    <div className="card">
                        <img src={img3} alt="" />
                        <h3>ชำระเงินและติดตามรถที่คุณเลือกได้เลยย</h3>
                    </div>
                </div>
            </div>

            <div id="promo">
    <h2></h2>
    <div className="cardpromoall">
        <div className="promocard">
            <div className="pic">
                <h4></h4>
                <img src={show1} alt="KINTO Promotion" />
            </div>
            <div className="about">
                <p>DEMO</p>
                <p>DEMO</p>  
            </div>
            {/* <div className="linecross"></div>
            <button className="btn-2">Details</button> */}
        </div>

        <div className="promocard">
            <div className="pic">
                {/* <h4>{promoclass?.proname2}</h4> */}
                <img src='https://www.kinto-th.com/KintoCustomerPortalCommon_CW/img/KintologoTransparent.png?6767' alt="BrandX Promotion" />
            </div>
            <div className="about">
                <p>DEMO</p>
                <p>DEMO</p> 
            </div>
            {/* <div className="linecross"></div>
            <button className="btn-2">Details</button> */}
        </div>

        <div className="promocard">
            <div className="pic">
                {/* <h4>{promoclass?.proname3}</h4> */}
                <img src='https://www.kinto-th.com/KintoCustomerPortalCommon_CW/img/KintologoTransparent.png?6767' alt="BrandY Promotion" />
            </div>
            <div className="about">
                <p>DEMO</p>
                <p>DEMO</p> 
            </div>
            {/* <div className="linecross"></div>
            <button className="btn-2">Details</button> */}
        </div>
    </div>
</div>

        
            <div id="footer">
                <h3>Contact</h3>
                <div className="foot">
                    <div className="f-left">
                        <h4>Tel: </h4>
                        <h4>Email : </h4>
                        <h4>Address :</h4>
                    </div>
                    <div className="f-right">
                        <h4>I</h4>
                        <h4>S</h4>
                        <h4>A</h4>
                        <h4>D</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}




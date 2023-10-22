import React from 'react';
import './promo.css';
// Assuming you have local images, import them like this:
import dis1 from './Image/30.jpg';
import dis2 from './Image/50.jpg';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

export default function Promo() {

    function daysBetweenDates(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Get the difference in milliseconds and then convert to days
        const diffInMilliseconds = end - start;
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    
        return diffInDays;
    }
    


    const [carPrice, setCarPrice] = useState([]);

  useEffect(() => {
      async function fetchData1() {
          try {
              const response = await fetch('http://localhost:3333/getCarInfo');
              const data = await response.json();
              // console.log(data);
              setCarPrice(data);
          } catch (error) {
              console.error("Failed to fetch car:", error);
          }
      }

      fetchData1();
  }, []);

  const [itemPrice, setItemPrice] = useState([]);

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch('http://localhost:3333/getItemPrice');
              const data = await response.json();
              console.log(data);
              setItemPrice(data);
          } catch (error) {
              console.error("Failed to fetch car:", error);
          }
      }

      fetchData();
  }, []);
    const start_date = localStorage.getItem("datestart")
    const end_date = localStorage.getItem("dateend")
    const daydiff = daysBetweenDates(start_date,end_date)


    const itemID = localStorage.getItem("itemid");
    const insuID = localStorage.getItem("insuid");      
    const amount = localStorage.getItem("amount");
    if (!amount){
        var total_item_price = 0;
    }else{
        var total_item_price = parseInt(itemPrice.filter(n=>n.item_id == itemID).map(n=>n.item_price).toString())*parseInt(amount.toString())
    }
    
    console.log(itemID)
    console.log(insuID)
    console.log(amount)
    console.log(total_item_price)
    var total_price_final = (parseInt(carPrice.filter(n=>n.car_id==localStorage.getItem("carid")).map(n=> n.start_price).toString())*daydiff) + total_item_price
    console.log(total_price_final)
    localStorage.setItem("final_price",total_price_final)
    console.log(start_date)
    console.log(daydiff)
    // // Test
   console.log(amount)
    // console.log(`Days between ${start_date} and ${end_date}: ${daysBetweenDates(start_date, end_date)} days`);
    const [schid, setschid] = useState(0);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3333/getReserveId');
                const data = await response.json();
                
                setschid(data);
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
            }
        }

        fetchData();
    }, []);
        

    const handleNext = (event) => {
        event.preventDefault();
        
        const carid = localStorage.getItem("carid")
        const empid = localStorage.getItem("empid")
        const insuid = localStorage.getItem("insuid")
        const itemid = localStorage.getItem("itemid")
        let all_price
        const scid = schid.map(n=>n.schedule_id).toString()
        if (!selectedPromo){
            all_price = localStorage.getItem("final_price")
        }else{
            all_price = newprice
        }
        
        // const scid = localStorage.getItem("scid")
        // localStorage.setItem("s",schid)
        // console.log(carid)
        // // console.log(empid) // มีปัญหา
        // console.log(insuid)
        // console.log(itemid)
        // console.log(scid)
        const jsonData = {
          cust_id: 1,
          car_id: carid,
          emp_id: empid,
          schedule_id: scid,
          insurance_id:  insuid,
          item_id: itemid,
          all_price: all_price
        }
        
        fetch('http://localhost:3333/insertReserve',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'ok'){
              window.location = './newhome'
          }else{
            console.log(insuid)
            console.log(itemid)
            console.log(scid)
            console.log(carid)
            console.log(empid)
            console.log(all_price)
          }
        
        })
        }
        const handleCancelPromo = () => {
            setProname("None");
            setNewPrice('');
            setSelectedPromo(null);
        };


    const [selectedPromo, setSelectedPromo] = useState(null);
    const [proname, setProname] = useState("None");
    const [newprice, setNewPrice] = useState('');
    console.log(newprice)
    const handlePro = async (proID) => {
        
        const result = await Swal.fire({
          title: 'Confirmation',
          text: "Do you want to use this Promotion?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        });
        
        if (result.isConfirmed) {
          // Your logic when the user confirms
          if (proID == 1){
            if (localStorage.getItem("cartype") != "Sedan"){
                Swal.fire('Error', 'ไม่สามารถใช้ได้เนื่องจากไม่ได้เลือกรถประเภท Sedan' , 'error');
            }else{
                setSelectedPromo(1)
                setProname("Sedan only")
                const dis1 = 30/100;
                var p = total_price_final-(total_price_final*dis1)
                console.log(selectedPromo)
                setNewPrice(p)
            }
          }else if (proID == 2){
            if (localStorage.getItem("cartype") != "Tour bus"){
                Swal.fire('Error', 'ไม่สามารถใช้ได้เนื่องจากไม่ได้เลือกรถประเภท Tour Bus', 'error');
            }else{
                setSelectedPromo(2)
                setProname("Tour bus only")
                const dis2 = 50/100;
                var p = total_price_final-(total_price_final*dis2)
                setNewPrice(p)
            }
          }
          if (selectedPromo === proID) {
            handleCancelPromo();
            return;
        }
        } else {
          console.log(localStorage.getItem("cartype"))
        }
   };

    return (
        <div>
            <div className="log">
                <h2>Promotion</h2>
                <a href="./reserve.html"><i className="fa fa-backward" aria-hidden="true"></i></a>
            </div>
            <div id="promo">
                <div className="cardpromoall">
                    <div className="promocard">
                        <div className="pic">
                            <h4>First Time Use</h4>
                            {/* Use the imported image */}
                            {/* <img src={scbImage} alt="promo" /> */}
                            <img src={dis1} alt="promo" />
                        </div>
                        <div className="about">
                            <p><strong>Sedan only</strong></p>
                            <p>ลดราคา</p>
                            <p>30%</p>
                        </div>
                        <div className="linecross"></div>
                        {/* <a href="./afterdetails_items.html"> */}
                            <button className="btn-2" onClick={() => handlePro(1)}>{selectedPromo === 1 ? "Cancel" : "Use"}</button>
                        {/* </a> */}
                    </div>
                    <div className="promocard">
                        <div className="pic">
                            <h4>First Time Use</h4>
                            {/* Use the imported image */}
                            {/* <img src={kplusImage} alt="promo" /> */}
                            <img src={dis2} alt="promo" />
                        </div>
                        <div className="about">
                            <p><strong>Tour Bus only</strong></p>
                            <p>ลดราคา</p>
                            <p>50%</p>
                        </div>
                        <div className="linecross"></div>
                        {/* <a href="./afterdetails_items.html"> */}
                            <button className="btn-2" onClick={() => handlePro(2)}>{selectedPromo === 2 ? "Cancel" : "Use"}</button>
                        {/* </a> */}
                    </div>
                    <div className="displaycard">
                        <div className="pic">
                            <h2>Result Price</h2>
                            {/* Use the imported image */}
                            {/* <img src={kplusImage} alt="promo" /> */}
                            {/* <img src={dis2} alt="promo" /> */}
                        </div>
                        <div className="res">
                            <p><strong>Price: {total_price_final}</strong></p>
                            <p>Promotion Selected: {proname}</p>
                            <p>Price After Discount: {newprice}</p>
                        </div>
                        
                        {/* <a href="./afterdetails_items.html"> */}
                            <button className="btn-3" onClick={handleNext}>Payment</button>
                        {/* </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


// import React from "react";
// import { useEffect, useState } from "react"









// ใช้ทดลองเก้บข้อมูลเฉยๆไม่ได้ใช้จริง เพราะเอาไปไว้หน้า promo แล้ว





// export default function Payment(){

//     function daysBetweenDates(startDate, endDate) {
//         const start = new Date(startDate);
//         const end = new Date(endDate);
    
//         // Get the difference in milliseconds and then convert to days
//         const diffInMilliseconds = end - start;
//         const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    
//         return diffInDays;
//     }
    


//     const [carPrice, setCarPrice] = useState([]);

//   useEffect(() => {
//       async function fetchData1() {
//           try {
//               const response = await fetch('http://localhost:3333/getCarInfo');
//               const data = await response.json();
//               // console.log(data);
//               setCarPrice(data);
//           } catch (error) {
//               console.error("Failed to fetch car:", error);
//           }
//       }

//       fetchData1();
//   }, []);

//   const [itemPrice, setItemPrice] = useState([]);

//   useEffect(() => {
//       async function fetchData() {
//           try {
//               const response = await fetch('http://localhost:3333/getItemPrice');
//               const data = await response.json();
//               console.log(data);
//               setItemPrice(data);
//           } catch (error) {
//               console.error("Failed to fetch car:", error);
//           }
//       }

//       fetchData();
//   }, []);
//     const start_date = localStorage.getItem("datestart")
//     const end_date = localStorage.getItem("dateend")
//     const daydiff = daysBetweenDates(start_date,end_date)


//     const itemID = localStorage.getItem("itemid");
//     const insuID = localStorage.getItem("insuid");      
//     const amount = localStorage.getItem("amount");
//     if (!amount){
//         var total_item_price = 0;
//     }else{
//         var total_item_price = parseInt(itemPrice.filter(n=>n.item_id == itemID).map(n=>n.item_price).toString())*parseInt(amount.toString())
//     }
    
//     console.log(itemID)
//     console.log(insuID)
//     console.log(amount)
//     console.log(total_item_price)
//     var total_price_final = (parseInt(carPrice.filter(n=>n.car_id==localStorage.getItem("carid")).map(n=> n.start_price).toString())*daydiff) + total_item_price
//     console.log(total_price_final)
//     localStorage.setItem("final_price",total_price_final)
//     console.log(start_date)
//     console.log(daydiff)
//     // // Test
//    console.log(amount)
//     // console.log(`Days between ${start_date} and ${end_date}: ${daysBetweenDates(start_date, end_date)} days`);
//     const [schid, setschid] = useState(0);
    
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch('http://localhost:3333/getReserveId');
//                 const data = await response.json();
                
//                 setschid(data);
//             } catch (error) {
//                 console.error("Failed to fetch promotions:", error);
//             }
//         }

//         fetchData();
//     }, []);
        

//     const handleNext = (event) => {
//         event.preventDefault();
        
//         const carid = localStorage.getItem("carid")
//         const empid = localStorage.getItem("empid")
//         const insuid = localStorage.getItem("insuid")
//         const itemid = localStorage.getItem("itemid")
//         const scid = schid.map(n=>n.schedule_id).toString()
//         const all_price = localStorage.getItem("final_price")
//         // const scid = localStorage.getItem("scid")
//         // localStorage.setItem("s",schid)
//         // console.log(carid)
//         // // console.log(empid) // มีปัญหา
//         // console.log(insuid)
//         // console.log(itemid)
//         // console.log(scid)
//         const jsonData = {
//           cust_id: 1,
//           car_id: carid,
//           emp_id: empid,
//           schedule_id: scid,
//           insurance_id:  insuid,
//           item_id: itemid,
//           all_price: all_price
//         }
        
//         fetch('http://localhost:3333/insertReserve',{
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(jsonData),
//       })
//       .then(response => response.json())
//       .then(data => {
//           if (data.status === 'ok'){
//               window.location = './newhome'
//           }else{
//             console.log(insuid)
//             console.log(itemid)
//             console.log(scid)
//             console.log(carid)
//             console.log(empid)
//             console.log(all_price)
//           }
        
//         })
//         }
    


//     return (
//         <div>
//             <h1>Details</h1>
//             <div id="card">
//                 <div className="profile-box">
//                     <div className="back-icon">
//                         <a href="reserve"><i className="fa fa-backward" aria-hidden="true"></i></a>
//                     </div>
//                     <div className="txt_field">
//                         <label>Username : {total_price_final}</label>
//                     </div>
//                     {/* <div className="txt_field1">
//                         <label>Time: </label>
//                     </div> */}
//                     <div className="txt_field2">
//                         <label>Car-type :</label>
//                     </div>
//                     <div className="txt_field1">
//                         <label>Start : </label>
//                     </div>
//                     <div className="txt_field1">
//                         <label>Arrived: </label>
//                     </div>
//                     <div className="txt_field1">
//                         <label>Item: </label>
//                         <form>
//                             <div></div>
//                         </form>
//                     </div>
//                     <div className="txt_field1">
//                         <label>Insurance: </label>
//                         <form>
//                             <div></div>   
//                         </form>
//                     </div>
//                     <form action="./newhome" className="log">
//                         <button type="submit" onClick={handleNext}> Payment</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
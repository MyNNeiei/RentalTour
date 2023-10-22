import React from 'react';
import './reserve.css';

import logo from './Image/logo1.svg';
import bus from './Image/bus.png';

import suv from './Image/white-suv-png-2-26-2048.png'
import van from './Image/purepng.com-vantruckvehicletransportwhitevanbuscargodeliveryautocommercialcourier-981525067620autrw.png'
import toyosuv from './Image/toyota suv.png';
import vank from './Image/van.png';
import toyobus from './Image/toyota bus.png';

export default function Reserve() {
    const [formValues, setFormValues] = React.useState({
        cartype: '',
        startdate: '',
        enddate: '',
        startpoint: '',
        endpoint: '',
        seat: ''
      });
      
      const [errors, setErrors] = React.useState({});
      

    const validateForm = () => {
        let tempErrors = {};
      
        if (!formValues.cartype) tempErrors.cartype = 'Please select a bus type.';
        if (!formValues.startdate) tempErrors.startdate = 'Please select a start date.';
        if (!formValues.enddate) tempErrors.enddate = 'Please select an end date.';
        if (!formValues.startpoint) tempErrors.startpoint = 'Please select a start point.';
        if (!formValues.endpoint) tempErrors.endpoint = 'Please select an end point.';
        if (!formValues.seat) tempErrors.seat = 'Please specify the number of seats.';
      
        setErrors(tempErrors);
      
        return Object.keys(tempErrors).length === 0;  // Returns true if no errors.
      };
      

      const handleInputChange = (event) => {
        const { name, value } = event.target;  // Destructure the name and value from the event target (i.e., the input field)
      
        setFormValues(prevValues => ({
          ...prevValues,  // Spread the previous form values
          [name]: value   // Update the value of the specific input field that triggered this handler
        }));
      };
      
    const handleNext = (event) => {
        event.preventDefault();
        console.log(formValues.startpoint)
        if (validateForm()){
        const data = new FormData(event.target.form);
        localStorage.setItem("cartype",data.get('cartype'))
        localStorage.setItem("seat",data.get('seat'))
        localStorage.setItem("start",data.get('startpoint'))
        localStorage.setItem("end",data.get('endpoint'))
        localStorage.setItem("datestart",data.get('startdate'))
        localStorage.setItem("dateend",data.get('enddate'))
        const jsonData = {
          startdate: data.get('startdate'),
          enddate: data.get('enddate'),
          reqtype: data.get('cartype'),
          reqseat: data.get('seat'),
          startpoint: data.get('startpoint'),
          endpoint: data.get('endpoint')
        }
        
        fetch('http://localhost:3333/selectpoint',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'ok'){
              window.location = './choosebus'//go เลือกรถดิวะไอสัสเอ้ย idoit dont go a
          }})
        }else{
            alert("กรอกให้ครบไอหน้าหี")
        }
    }
    
    
    // let status = "pass nav";
    // const storedStatus = localStorage.getItem('status');
    
    // if (storedStatus !== null) {
    //     status = "pass seach";
    //     // console.log(storedStatus)
    //     localStorage.removeItem('status')
    // }
    
    // console.log(status);





    return (
        <div className="reserve-page">
            <div id="nav-bar">
                <a href="newhome"><img src={logo} alt="logoja" /></a>
                <ul className="bar">
                    <li><a href="newhome">Home</a></li>
                    <li><a href="reserve">Reserve</a></li>
                    <li><a href="history">History</a></li>
                    <li><a href="newhome"><i className="fa-solid fa-right-to-bracket"></i> Login</a></li>
                </ul>
            </div>

            <section className="banner">
                <h2>WHAT BUS DO YOU WANT</h2>
                <div className="card-container">
                    <div className="card-img">
                        <img src={bus} alt="" />
                    </div>
                    <div className="card-content">
                        <h3>Reservation</h3>
                        <form>
                            <div className="form-row">
                                <select name="cartype" onChange={handleInputChange} required>
                                    <option disabled selected>Select Bus</option>
                                    <option value="Tour bus">Tour bus</option>
                                    <option value="Sedan">Sedan</option>
                                </select>
                            </div>
                            <div className="form-row">
                            
                                <input name="startdate" className="form-control" type="date" placeholder="Select Datetime" onChange={handleInputChange} />
                                
                                <input name ="enddate" className="form-control" type="date" placeholder="Select Datetime"  onChange={handleInputChange}/>
                            </div>
                            <div className="form-row">
                                <input type="text" placeholder="เลือกจุดรับ" required name="startpoint" onChange={handleInputChange}/>
                                <input type="text" placeholder="เลือกปลายทาง" required name="endpoint" onChange={handleInputChange}/>
                            </div>

                            <div className="form-row">
                                <input type="number" placeholder="How Many Persons?" min="1" name="seat" onChange={handleInputChange}/>
                                <input onClick={handleNext} type="submit" value="SEARCH" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* <div id="totou">
                <div className="allcard">
                    <div className="card">
                        <img src={bus} alt="" />
                        <h3>Bus</h3>
                    </div>
                    <div className="card">
                        <img src={suv} alt="" />
                        <h3>SUV</h3>
                    </div>
                    <div className="card">
                        <img src={van} alt="" />
                        <h3>Van</h3>
                    </div>
                </div>
            </div>

            <div id="promo">
            <h2>Promotion</h2>
            <div className="cardpromoall">

                <div className="promocard">
                    <div className="pic">
                        <h4>Toyota SUV</h4>
                        <img src={toyosuv} alt="promo" />
                    </div>
                    <div className="about">
                        <p><strong>SUV</strong></p>
                        <p>1 - 4 คน</p>
                    </div>
                    <div className="linecross"></div>
                    <a href="./afterdetails_items.html"><button className="btn-2">Details</button></a>
                </div>

                <div className="promocard">
                    <div className="pic">
                        <h4>Van</h4>
                        <img src={vank} alt="promo" />
                    </div>
                    <div className="about">
                        <p><strong>Vios Van</strong></p>
                        <p>5 - 12 คน</p>
                    </div>
                    <div className="linecross"></div>
                    <a href="./afterdetails_items.html"><button className="btn-2">Details</button></a>
                </div>

                <div className="promocard">
                    <div className="pic">
                        <h4>Toyota Bus</h4>
                        <img src={toyobus} alt="promo" />
                    </div>
                    <div className="about">
                        <p><strong>Bus</strong></p>
                        <p>10 - 19 คน</p>
                    </div>
                    <div className="linecross"></div>
                    <a href="./afterdetails_items.html"><button className="btn-2">Details</button></a>
                </div>

            </div>
        </div>

            <div className="view">
                <a href="./promotion.html"><button className="btn-3" type="submit">View All</button></a>
            </div> */}

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





//     return (
//         <div>
//             <div id="nav-bar">
//                 <a href="newhome"><img src={logo} alt="logoja" /></a>
//                 <ul className="bar">
//                     <li><a href="newhome">Home</a></li>
//                     <li><a href="#totou">About</a></li>
//                     <li><a href="reserve">Reserve</a></li>
//                     <li><a href="history">History</a></li>
//                     <li><a href="login"><i className="fa-solid fa-right-to-bracket"></i> Login</a></li>
//                 </ul>
//             </div>
//             <section className="banner">
//                 <h2>WHAT BUS DO YOU WANT</h2>
//                 <div className="card-container">
//                     <div className="card-img">
//                         <img src={bus} alt="" />
//                     </div>
//                     <div className="card-content">
//                         <h3>Reservation</h3>
                        // <form>
                        //     <div className="form-row">
                        //         <select name="cartype" onChange={handleInputChange} required>
                        //             <option disabled selected>Select Bus</option>
                        //             <option value="Tour bus">Tour bus</option>
                        //             <option value="Sedan">Sedan</option>
                        //         </select>
                        //     </div>
                        //     <div className="form-row">
                            
                        //         <input name="startdate" className="form-control" type="date" placeholder="Select Datetime" onChange={handleInputChange} />
                                
                        //         <input name ="enddate" className="form-control" type="date" placeholder="Select Datetime"  onChange={handleInputChange}/>
                        //     </div>
                        //     <div className="form-row">
                        //         <input type="text" placeholder="เลือกจุดรับ" required name="startpoint" onChange={handleInputChange}/>
                        //         <input type="text" placeholder="เลือกปลายทาง" required name="endpoint" onChange={handleInputChange}/>
                        //     </div>

                        //     <div className="form-row">
                        //         <input type="number" placeholder="How Many Persons?" min="1" name="seat" onChange={handleInputChange}/>
                        //         <input onClick={handleNext} type="submit" value="SEARCH" />
                        //     </div>
                        // </form>
//                     </div>
//                 </div>
//             </section>
            
        
//         </div>
        
//     );

// }

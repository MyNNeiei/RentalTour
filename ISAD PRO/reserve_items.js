import React from 'react';
import './afterd_items.css'; // Adjust the path if necessary
import { useEffect, useState } from "react";


function Details() {
    

    // const [itemList, setItemList] = useState([]);
      // Store the currently selected item
    // const [insurance, setInsurance] = useState([]); // moved up to use across functions
    
    
    // // Fetch items for ItemSelect
    // useEffect(() => {
    //     fetch('http://localhost:3333/getItemInfo')
    //     .then(response => response.json())
    //     .then(data => {
    //         setItemList(data);
    //     })
    //     .catch(error => {
    //         console.error("There was an error fetching the data:", error);
    //     });
    // }, []);
    
    // useEffect(() => {
            
    //     fetch('http://localhost:3333/getInsurance')
    //     .then(response => response.json())
    //     .then(data => {
    //         setInsurance(data);
            
    //     })
    //     .catch(error => {
    //         console.error("There was an error fetching the data:", error);
    //     });
    // }, []);




    
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedInsu, setSelectedInsu] = useState(null);
    const [amount, setAmount] = useState("");
    const [check, setCheck] = useState(false);
    const handleNext = (event) => {
        event.preventDefault();
        
        localStorage.setItem("itemid", selectedItem);
        localStorage.setItem("insuid", selectedInsu);
        localStorage.setItem("amount", amount);
        window.location = './promo'
    }
        function ItemSelect() {
            

            const handleItemChange = (event) => {
                setSelectedItem(event.target.value);
                console.log(event.target.value)
                if (event.target.value == 0){
                    setCheck(false)
                    setAmount('')
                }else{
                    setCheck(true)
                }
            };

            return (
                <select value={selectedItem} onChange={handleItemChange}>
                        <option value="0" >ไม่ต้องการอะไรเลย</option>
                        <option value="1" name="Cola">Colone Cola</option>
                        <option value="2" name="Pota">Potato Chiphai</option>
                        <option value="3" name="Diff">Mountain Diff</option>
                        <option value="4" name="Somsod">Somsod Water</option>
                        <option value="5" name="Bar">Snigers Bar</option>
                        <option value="6" name="milk">young_coconut_milk</option> 
                        </select>
            );
        }

        function SelectedInsurance() {
            

            const handleInsuChange = (event) => {
                setSelectedInsu(event.target.value);
                console.log(event.target.value)
                
            };
            return (
                <select value={selectedInsu} onChange={handleInsuChange}>
                        <option value="0" >ไม่ต้องการอะไรเลย</option>
                        <option value="1" name="tak">ประกันผู้โดยสาร</option>
                        <option value="2" name="tai">ประกันผู้โดยสารและรถยนต์</option>
                        <option value="3" name="taifree">ประกันยกเซตคุ้มครองความปลอดภัย</option>
                </select> 
            );
            }
            
            const [User, setUser] = useState([]);
    
        useEffect(() => {
            
                fetch('http://localhost:3333/getUserInfo')
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                })
                .catch(error => {
                    console.error("There was an error fetching the data:", error);
                });
            }, []);
    const User_name = User.map(n=>n.Full_name);
    localStorage.setItem("name",User_name);
    const car_type = localStorage.getItem("cartype");
    const start = localStorage.getItem("start");
    const end = localStorage.getItem("end");


    console.log(start)
    // const cardata = new Car();
    // console.log(cardata.car_type);

    return (
        <div>
            <h1>Details</h1>
            <div id="card">
                <div className="profile-box">
                    <div className="back-icon">
                        <a href="reserve"><i className="fa fa-backward" aria-hidden="true"></i></a>
                    </div>
                    <div className="txt_field">
                        <label>Username : {User_name}</label>
                    </div>
                    {/* <div className="txt_field1">
                        <label>Time: </label>
                    </div> */}
                    <div className="txt_field2">
                        <label>Car-type : {car_type} </label>
                    </div>
                    <div className="txt_field1">
                        <label>Start : {start}</label>
                    </div>
                    <div className="txt_field1">
                        <label>Arrived: {end}</label>
                    </div>
                    <div className="txt_field1">
                        <label>Item: </label>
                        <form>
                        <div>{ItemSelect()}</div>
                        <input disabled={!check} type="number" value={amount} placeholder="จำนวน" required name="amount" min="1" onChange={e => setAmount(e.target.value) }/>
                        </form>
                    </div>
                    <div className="txt_field1">
                        <label>Insurance: </label>
                        <form>
                        <div>{SelectedInsurance()}</div> 
                        </form>
                    </div>
                    <form  className="log">
                        <button onClick={handleNext} type="submit">Next</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Details;

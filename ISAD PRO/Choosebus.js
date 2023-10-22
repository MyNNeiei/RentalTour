import React from "react";
import { useEffect, useState } from "react";
import './details.css';
import toyota1 from './Image/toyota bus.png';
import toyota2 from './Image/toyota2.png';
import Sedan1 from './Image/Sedan1.webp'
import Sedan2 from './Image/Sedan2.webp'
import Sedan3 from './Image/Sedan3.webp'
import Sedan4 from './Image/Sedan4.webp'
import Sedan5 from './Image/Sedan5.webp'
import Sedan6 from './Image/Sedan6.webp'
import bus1 from './Image/Bus1.jpg'
import bus2 from './Image/Bus2.jpg'
import Swal from 'sweetalert2';



class Car{
      car_id;
      license_plate;
      owner_id;
      owner_name;
      owner_surname;
      car_brand;
      car_model;
      car_type;
      start_price;

      constructor(filterCar){
        this.setCarData(filterCar)
      }

      setCarData(filterCar){
        this.car_id = filterCar?.car_id
        this.license_plate = filterCar?.license_plate
        this.owner_id = filterCar?.owner_id
        this.owner_name = filterCar?.owner_name
        this.owner_surname = filterCar?.owner_surname
        this.car_brand = filterCar?.car_brand 
        this.car_model = filterCar?.car_model
        this.car_id = filterCar?.car_id 
        this.car_type = filterCar?.car_type
        this.start_price = filterCar?.start_price
      }

    }
    
export default function Choosebus() {
  const [carlist, setcarlist] = useState([]);
  

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch('http://localhost:3333/getCarInfo');
              const data = await response.json();
              // console.log(data);
              setcarlist(data);
          } catch (error) {
              console.error("Failed to fetch car:", error);
          }
      }

      fetchData();
  }, []);
      
      const car = new Car();
      
      // const handleNext = () => {
      //   if (selectedCarId !== 7 && selectedCarId !== 8) {
      //     const filtercar = carlist.find(n => n.car_id === selectedCarId);
      //     console.log(filtercar?.car_type);
      //     alert(filtercar)
      //     window.location = './detail';
      //   } else {
      //     alert("ไปเลือกพนักงานซะไอเหี้ย");
      //   }
      // };

      const handleNext = async (carId) => {
        const result = await Swal.fire({
          title: 'Confirmation',
          text: "Do you want this Car?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        });
   
        if (result.isConfirmed) {
          const num = carId;
          localStorage.setItem("carid", num)
          if (num != 7 && num != 8){
            var filtercar = carlist.filter(n => n.car_id == num)
            localStorage.setItem("empid", "0");
            // alert(num)
            console.log(car.car_type)
            console.log(car.setCarData(filtercar))
            window.location = './detail'
          }else{
            var filtercar = carlist.filter(n => n.car_id == num)
            console.log(car.setCarData(filtercar))
            
            window.location = './chooseEmp'
          }
        } else {
          
        }
        
          
          }
    
      const Card = ({ image, title , carId ,Info}) => (
            <div id ="selected" className="card"  onClick={() => handleNext(carId)}>
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{Info}</p>
            </div>
        );

        const car1 = "Car Seat: 5 Start Price:600 Per Day"
        const car2 = "Car Seat: 7 Start Price:800 Per Day"
        const car3 = "Car Seat: 5 Start Price:600 Per Day"
        const car4 = "Car Seat: 7 Start Price:900 Per Day"
        const car5 = "Car Seat: 7 Start Price:800 Per Day"
        const car6 = "Car Seat: 12 Start Price:750 Per Day"
        const car7 = "Car Seat: 21 Start Price:1300 Per Day"
        const car8 = "Car Seat: 55 Start Price:1700 Per Day" 
        console.log(car7)
    function renderCar(){
          let newcar
          const req_seat = parseInt(localStorage.getItem("seat").toString())
          if (localStorage.getItem("cartype") == "Sedan"){
            // alert("Show Sedan");
            newcar = carlist.filter(n=>n.car_seat >= req_seat&&n.car_type == localStorage.getItem("cartype"))
            console.log(newcar)
            return(
              <div id="allcardinfo">
              <Card image={Sedan1} title="Sedan Car Number 1"  carId={1} Info={car1}/>
              <Card image={Sedan2} title="Sedan Car Number 2"  carId={2} Info={car2}/>
              <Card image={Sedan3} title="Sedan Car Number 3"  carId={3} Info={car3}/>
              <Card image={Sedan4} title="Sedan Car Number 4"  carId={4} Info={car4}/>
              <Card image={Sedan5} title="Sedan Car Number 5"  carId={5} Info={car5}/>
              <Card image={Sedan6} title="Sedan Car Number 6"  carId={6} Info={car6}/>
            </div>
            )
          }else if (localStorage.getItem("cartype") == "Tour bus"){
            // alert("Show Tour Bus");
            newcar = carlist.filter(n=>n.car_seat >= req_seat&&n.car_type == localStorage.getItem("cartype"))
            console.log(newcar)
            return(
              <div id="allcardinfo">
              <Card image={bus1} title="BUS Car Number 1"  carId={7} Info={car7}/>
              <Card image={bus2} title="BUS Car Number 2"  carId={8} Info={car8}/>
              </div>
            )
          }
        }

  return (
      <div>
          <div id="header">
              <h1>All Car</h1>
              <a href="./reserve.html"><i className="fa fa-backward" aria-hidden="true"></i></a>
          </div>
          <div>{renderCar()}</div>
      </div>
  );
}

const buttonStyle = {
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50' // This style is for .button1
};

import React from 'react';
import './choose_emp.css';
// import './star.html';
import Boy from './Image/boy.jpg'
import Girl from './Image/girl.png'
import Swal from 'sweetalert2';


export default function Employee() {




      const handleNext = async (empID) => {
        const result = await Swal.fire({
          title: 'Confirmation',
          text: "Do you want this person to be your Driver?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        });
   
        if (result.isConfirmed) {
          // Your logic when the user confirms
          localStorage.setItem("empid", empID);
          window.location = './detail'
        } else {
          
        }
   };
    
    return (
        <div>
            <div id="header">
                <h1>All Employee</h1>
                <a href="chooseEmp"><i className="fa fa-backward" aria-hidden="true"></i></a>
            </div>
            <div id="allcardinfo">
                <div className="card" onClick={() => handleNext(1)}>
                    <img src={Girl} alt="" />
                    <div className="info">
                        <h3>Sarita Limbu</h3>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <h4>4/5</h4>
                        <h5>Personality: Happy And Entertain</h5>
                    </div>
                </div>
                <div className="card" onClick={() => handleNext(2)}>
                    <img src={Boy} alt="" />
                    <div className="info">
                        <h3>Alex Gonley</h3>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <h4>3/5</h4>
                        <h5>Personality: Gental And Kindness</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}


